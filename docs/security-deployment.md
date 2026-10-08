# Security deployment: Vercel + GoDaddy domain

The website runs on Vercel; GoDaddy manages the domain/DNS. No DNS changes are
required for these code changes. Publish the updated repository through your
normal Vercel deployment workflow. Local changes do not update the live site.

## Shared contact rate limiting

Before enabling email delivery, create/connect an Upstash Redis database in the
Vercel Marketplace or your Upstash account. Use the same database for all
production instances/regions. Set these **server-only** Vercel environment values:

- `UPSTASH_REDIS_REST_URL`: the database's HTTPS REST URL.
- `UPSTASH_REDIS_REST_TOKEN`: the standard read/write REST token, not a read-only token.
- `NEXT_PUBLIC_SITE_URL`: the exact canonical HTTPS domain visitors use.
- `CONTACT_ALLOWED_ORIGINS`: optional comma-separated additional exact origins
  if another domain serves the form without redirecting to the canonical domain.

Never prefix Redis/email secrets with `NEXT_PUBLIC_`, commit them, or paste them
into chat. Redeploy after changing environment settings. Vercel system variables
identify the hosting environment and authorized deployment/branch URLs.

The route uses only `x-vercel-forwarded-for` on Vercel, not caller-provided generic
forwarding headers. If moving away from Vercel, configure a new trusted ingress
strategy before enabling this endpoint; it deliberately refuses production
submissions elsewhere. A DNS-only GoDaddy domain pointing to Vercel is supported.

Five validated submissions per client IP are allowed per 15-minute window across
all instances. Redis keys contain an HMAC of the IP, not the raw address, and
expire after 15 minutes. Users behind a shared network share that limit. A 429
response includes `Retry-After`. Missing configuration or a Redis outage returns
503 instead of bypassing protection. The development server uses a single bounded
local bucket. This is not a DDoS firewall: Vercel Firewall/bot protection should
also be configured for `/api/contact` if abuse is observed.

Email setup remains separate and paused. These changes do not add or alter Resend
credentials. Existing `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`
settings are still needed when you choose to enable delivery.

## Other protections

- JSON-only submissions, a streamed 32 KiB maximum, and a five-second body deadline.
- Object/field validation, header-control-character rejection, HTML escaping,
  honeypot detection, and exact-origin validation.
- Redis and email timeouts, controlled error responses, and no caching of submissions.
- No provider error bodies or visitor messages are written to application logs.
- CSP restricts resources to this origin and blocks plugins/framing. Inline Next.js
  bootstrap scripts/styles remain allowed to preserve static generation and design;
  this is a baseline CSP, not a strict nonce-based XSS policy. Development alone
  allows eval/WebSockets for hot reload.
- Anti-framing, MIME-sniffing, referrer, and permissions headers on all paths.
- Production HSTS requires HTTPS for this host, without `includeSubDomains` or
  preload so unrelated GoDaddy-managed subdomains are not forced into HTTPS.

The Vercel preview toolbar may be blocked by this same-origin production CSP;
use the Vercel dashboard for preview comments instead of weakening the live policy.

## Verification

Run `node --test tests/contact-security.test.mjs`, `npm run lint`,
`npx tsc --noEmit --incremental false`, and `npm run build`.
The full suite (`node --test tests/*.test.mjs`) also needs a running local server;
set `HERO_TEST_URL` when testing a production preview on another local port.

The remaining full-audit alerts are the development-only `braces` → `micromatch`
→ `fast-glob` → Next.js ESLint dependency chain. At the time of this change,
`braces` has no patched npm release; npm's forced remedy downgrades the Next.js
lint configuration to version 14. Do not use that incompatible downgrade.
Only lint trusted repository files, and recheck the full audit when upstream
publishes a fix. Production-only auditing is separate from these tooling alerts.

After deployment, inspect the domain's HTTPS response headers and confirm the
form fails safely while email is paused. Do not send test messages to real
recipients without choosing to enable delivery. Local mocked-network tests cover
rate-limit behavior without touching a real Redis database or sending mail.
