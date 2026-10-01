import { chromium } from "playwright"

const [url, output, width = "1440", height = "900"] = process.argv.slice(2)
if (!url || !output) throw new Error("Usage: node capture.mjs URL OUTPUT [WIDTH HEIGHT]")

const browser = await chromium.launch({ channel: "chrome", headless: true })
try {
  const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) }, deviceScaleFactor: 1 })
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 })
  await page.locator("main h1").first().waitFor({ timeout: 20000 })
  await page.waitForFunction(() => {
    const image = document.querySelector("main > section:first-child img, main > article > header:first-child img, main > header:first-child img")
    return !image || (image.complete && image.naturalWidth > 0)
  }, null, { timeout: 30000 })
  await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }" })
  await page.screenshot({ path: output, animations: "allow", caret: "hide", timeout: 120000 })
  const metrics = await page.evaluate(() => ({
    title: document.title,
    horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
    heroImageLoaded: (() => { const image = document.querySelector("main > section:first-child img, main > article > header:first-child img, main > header:first-child img"); return image ? image.complete && image.naturalWidth > 0 : null })(),
  }))
  process.stdout.write(`${response?.status()} ${url} ${JSON.stringify(metrics)} ${output}\n`)
} finally {
  await browser.close()
}
