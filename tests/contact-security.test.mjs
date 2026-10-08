import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { resolve, dirname } from "node:path"
import { test } from "node:test"
import vm from "node:vm"
import ts from "typescript"

const require = createRequire(import.meta.url)
const site = "https://www.seedsoflifeglobal.org"
const valid = { name: "Jane Doe", email: "jane@example.com", subject: "Other", message: "Please tell me about volunteering.", website: "" }

// Execute the real TypeScript route/config and helpers, without sending emails
// or accessing an external Redis database. Only the network boundary is replaced.
function loadApp(env = {}, fetch = async () => { throw new Error("Unexpected network call") }) {
  const cache = new Map()
  function load(filename) {
    const absolute = resolve(filename)
    if (cache.has(absolute)) return cache.get(absolute)
    const exports = {}
    cache.set(absolute, exports)
    const code = ts.transpileModule(readFileSync(absolute, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText
    vm.runInNewContext(code, {
      exports, __dirname: dirname(absolute),
      require: (name) => name.startsWith("@/") ? load(`${name.slice(2)}.ts`) : name.startsWith(".") ? load(resolve(dirname(absolute), `${name}.ts`)) : require(name),
      process: { env: { NODE_ENV: "development", NEXT_PUBLIC_SITE_URL: site, ...env } },
      fetch, Request, Response, Headers, URL, TextDecoder, TextEncoder, AbortSignal,
      setTimeout, clearTimeout, Buffer, console: { error() {} },
    }, { filename: absolute })
    return exports
  }
  return { route: () => load("app/api/contact/route.ts"), config: () => load("next.config.ts").default }
}

function request(body = valid, headers = {}, raw = false) {
  return new Request(`${site}/api/contact`, {
    method: "POST", headers: { "content-type": "application/json", origin: site, ...headers },
    body: raw ? body : JSON.stringify(body),
  })
}

for (const [name, body] of [["null", null], ["array", []], ["string", "hello"], ["number", 4]]) {
  test(`rejects a JSON ${name} with 400 instead of throwing`, async () => {
    assert.equal((await loadApp().route().POST(request(body))).status, 400)
  })
}

test("rejects malformed JSON", async () => {
  assert.equal((await loadApp().route().POST(request("{", {}, true))).status, 400)
})

test("rejects a non-JSON content type", async () => {
  assert.equal((await loadApp().route().POST(request(valid, { "content-type": "text/plain" }))).status, 415)
})

test("rejects a body over 32 KiB even when Content-Length is missing or understated", async () => {
  for (const headers of [{}, { "content-length": "10" }]) {
    const body = JSON.stringify(valid) + " ".repeat(32769)
    assert.equal((await loadApp().route().POST(request(body, headers, true))).status, 413)
  }
})

test("rejects an excessive Content-Length before consuming the body", async () => {
  const app = loadApp()
  const req = request(valid, { "content-length": "50000" })
  assert.equal((await app.route().POST(req)).status, 413)
  assert.equal(req.bodyUsed, false)
})

test("rejects objects in form fields rather than treating them as empty", async () => {
  assert.equal((await loadApp().route().POST(request({ ...valid, subject: {} }))).status, 400)
})

test("rejects ASCII controls in email header fields before any network calls", async () => {
  for (const field of ["name", "email", "subject"]) {
    for (const code of [1, 9, 10, 13, 31, 127]) {
      const value = field === "email" ? `jane${String.fromCharCode(code)}@example.com` : `Jane${String.fromCharCode(code)}Doe`
      assert.equal((await loadApp().route().POST(request({ ...valid, [field]: value }))).status, 400)
    }
  }
})

test("a stalled request body returns 408 and cancels its stream", async () => {
  let cancelled = false
  const stream = new ReadableStream({ cancel() { cancelled = true } })
  const req = new Request(`${site}/api/contact`, { method: "POST", headers: { origin: site, "content-type": "application/json" }, body: stream, duplex: "half" })
  assert.equal((await loadApp().route().POST(req)).status, 408)
  assert.equal(cancelled, true)
})

test("split UTF-8 chunks preserve a valid Unicode submission", async () => {
  const data = new TextEncoder().encode(JSON.stringify({ ...valid, name: "José" }))
  const stream = new ReadableStream({ start(controller) {
    for (const byte of data) controller.enqueue(Uint8Array.of(byte))
    controller.close()
  } })
  const req = new Request(`${site}/api/contact`, { method: "POST", headers: { origin: site, "content-type": "application/json" }, body: stream, duplex: "half" })
  assert.equal((await loadApp().route().POST(req)).status, 503)
})

test("explicit additional and Vercel system origins are allowed without a wildcard", async () => {
  for (const [key, value, origin] of [
    ["CONTACT_ALLOWED_ORIGINS", "https://seedsoflifeglobal.org", "https://seedsoflifeglobal.org"],
    ["VERCEL_URL", "sol-deployment.vercel.app", "https://sol-deployment.vercel.app"],
    ["VERCEL_BRANCH_URL", "sol-git-main.vercel.app", "https://sol-git-main.vercel.app"],
    ["VERCEL_PROJECT_PRODUCTION_URL", "sol.vercel.app", "https://sol.vercel.app"],
  ]) {
    const app = loadApp({ NODE_ENV: "production", VERCEL: "1", [key]: value })
    assert.equal((await app.route().POST(request(valid, { origin }))).status, 503)
    assert.equal((await app.route().POST(request(valid, { origin: `${origin}.evil.example` }))).status, 403)
  }
})

test("production does not allow localhost origins", async () => {
  assert.equal((await loadApp({ NODE_ENV: "production" }).route().POST(request(valid, { origin: "http://localhost:3000" }))).status, 403)
})

test("rejects missing or foreign origins", async () => {
  for (const origin of [null, "https://evil.example", "https://www.seedsoflifeglobal.org.evil.example"]) {
    const req = request()
    if (origin === null) req.headers.delete("origin")
    else req.headers.set("origin", origin)
    assert.equal((await loadApp().route().POST(req)).status, 403)
  }
})

test("local development accepts its own loopback origin", async () => {
  const req = new Request("http://127.0.0.1:3000/api/contact", { method: "POST", headers: { "content-type": "application/json", origin: "http://127.0.0.1:3000" }, body: JSON.stringify(valid) })
  assert.equal((await loadApp().route().POST(req)).status, 503)
})

const production = {
  NODE_ENV: "production", VERCEL: "1", UPSTASH_REDIS_REST_URL: "https://example.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "test-token-not-a-secret", RESEND_API_KEY: "test-key", CONTACT_FROM_EMAIL: "team@example.com",
}

function redisNetwork() {
  const counts = new Map()
  const calls = []
  const emails = []
  return {
    calls, emails,
    fetch: async (url, options) => {
      if (url === "https://api.resend.com/emails") {
        emails.push(JSON.parse(options.body))
        return Response.json({ id: "test-email" })
      }
      assert.equal(url, "https://example.upstash.io/")
      assert.equal(options.headers.Authorization, "Bearer test-token-not-a-secret")
      assert.equal(options.cache, "no-store")
      assert.ok(options.signal, "Redis requests have a deadline")
      const command = JSON.parse(options.body)
      assert.equal(command[0], "EVAL", "counter increment and expiration must be atomic")
      assert.match(command[1], /EXPIRE/i)
      assert.equal(command[2], "1")
      assert.equal(command[4], "900")
      calls.push(command)
      const count = (counts.get(command[3]) ?? 0) + 1
      counts.set(command[3], count)
      return Response.json({ result: [count, 900] })
    },
  }
}

test("rate limit is shared across fresh instances and ignores spoofed generic forwarding headers", async () => {
  const network = redisNetwork()
  for (let i = 0; i < 6; i++) {
    const res = await loadApp(production, network.fetch).route().POST(request(valid, { "x-vercel-forwarded-for": "203.0.113.7", "x-forwarded-for": `198.51.100.${i}` }))
    assert.equal(res.status, i < 5 ? 200 : 429)
    if (i === 5) assert.equal(res.headers.get("retry-after"), "900")
  }
  assert.equal(network.emails.length, 5)
  assert.ok(!network.calls[0][3].includes("203.0.113.7"), "Redis keys do not store raw IP addresses")
})

test("production fails closed without Redis credentials", async () => {
  assert.equal((await loadApp({ NODE_ENV: "production", VERCEL: "1", RESEND_API_KEY: "test-key", CONTACT_FROM_EMAIL: "team@example.com" }).route().POST(request(valid, { "x-vercel-forwarded-for": "203.0.113.7" }))).status, 503)
})

test("production refuses untrusted or invalid client IPs", async () => {
  for (const headers of [{ "x-forwarded-for": "203.0.113.7" }, { "x-vercel-forwarded-for": "invalid" }, { "x-vercel-forwarded-for": "203.0.113.7, 198.51.100.5" }]) {
    assert.equal((await loadApp(production).route().POST(request(valid, headers))).status, 503)
  }
  assert.equal((await loadApp({ ...production, VERCEL: "0" }).route().POST(request(valid, { "x-vercel-forwarded-for": "203.0.113.7" }))).status, 503)
})

test("Redis outages and invalid counter responses never fall back to an unprotected send", async () => {
  for (const fetch of [async () => { throw new Error("offline") }, async () => Response.json({ error: "unauthorized" }, { status: 401 }), async () => Response.json({ result: ["invalid", 900] })]) {
    assert.equal((await loadApp(production, fetch).route().POST(request(valid, { "x-vercel-forwarded-for": "203.0.113.7" }))).status, 503)
  }
})

test("email failures produce a controlled error without leaking provider details", async () => {
  const network = redisNetwork()
  const app = loadApp(production, (url, options) => url === "https://api.resend.com/emails" ? Promise.reject(new Error("secret provider error")) : network.fetch(url, options))
  const res = await app.route().POST(request(valid, { "x-vercel-forwarded-for": "203.0.113.7" }))
  assert.equal(res.status, 502)
  assert.doesNotMatch(await res.text(), /secret provider error/)
})

test("successful email preserves HTML escaping and replies only to the submitted address", async () => {
  const network = redisNetwork()
  const res = await loadApp(production, network.fetch).route().POST(request({ ...valid, name: "Jane <script>" }, { "x-vercel-forwarded-for": "203.0.113.8" }))
  assert.equal(res.status, 200)
  assert.equal(res.headers.get("cache-control"), "no-store")
  assert.match(network.emails[0].html, /&lt;script&gt;/)
  assert.doesNotMatch(network.emails[0].html, /<script>/)
  assert.equal(network.emails[0].reply_to, "jane@example.com")
  assert.deepEqual(network.emails[0].to, ["seedsoflifeglobal@gmail.com"])
})

test("honeypot submissions never send email", async () => {
  const res = await loadApp().route().POST(request({ ...valid, website: "spam.example" }))
  assert.equal(res.status, 200)
})

test("production applies a compatible CSP and security headers on every path", async () => {
  const config = loadApp({ NODE_ENV: "production" }).config()
  assert.equal(config.poweredByHeader, false)
  const rules = await config.headers()
  const headers = Object.fromEntries(rules.find(rule => rule.source === "/:path*").headers.map(h => [h.key, h.value]))
  assert.equal(headers["X-Frame-Options"], "DENY")
  assert.equal(headers["X-Content-Type-Options"], "nosniff")
  assert.equal(headers["Referrer-Policy"], "strict-origin-when-cross-origin")
  assert.match(headers["Permissions-Policy"], /camera=\(\)/)
  assert.match(headers["Strict-Transport-Security"], /max-age=/)
  const csp = headers["Content-Security-Policy"]
  assert.match(csp, /frame-ancestors 'none'/)
  assert.match(csp, /object-src 'none'/)
  assert.match(csp, /base-uri 'self'/)
  assert.match(csp, /form-action 'self'/)
  assert.match(csp, /upgrade-insecure-requests/)
  assert.doesNotMatch(csp, /unsafe-eval/)
})

test("development CSP permits local hot reload without forcing HTTPS", async () => {
  const headers = (await loadApp().config().headers())[0].headers
  const csp = headers.find(h => h.key === "Content-Security-Policy").value
  assert.match(csp, /unsafe-eval/)
  assert.doesNotMatch(csp, /upgrade-insecure-requests/)
  assert.ok(!headers.some(h => h.key === "Strict-Transport-Security"))
})
