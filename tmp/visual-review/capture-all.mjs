import { chromium } from "playwright"
import { join } from "node:path"

const outputDirectory = "tmp/visual-review"
const routes = [
  ["about", "/about"],
  ["programs", "/programs"],
  ["gallery", "/gallery"],
  ["involved", "/involved"],
  ["contact", "/contact"],
  ["jennifer-moore", "/leadership/jennifer-moore"],
  ["teacher-sally", "/leadership/teacher-sally-blanco-sapalo"],
]
const viewports = [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
]

const browser = await chromium.launch({ channel: "chrome", headless: true })
try {
  for (const [device, width, height] of viewports) {
    for (const [name, pathname] of routes) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
      const errors = []
      page.on("pageerror", (error) => errors.push(error.message))
      const url = new URL(pathname, "http://127.0.0.1:3000")
      try {
        const response = await page.goto(url.toString(), { waitUntil: "domcontentloaded", timeout: 30000 })
        await page.locator("main h1").first().waitFor({ timeout: 30000 })
        await page.waitForFunction(() => {
          const image = document.querySelector("main > section:first-child img, main > article > header:first-child img, main > header:first-child img")
          return !image || (image.complete && image.naturalWidth > 0)
        }, null, { timeout: 30000 })
        await page.addStyleTag({ content: "*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }" })
        const output = join(outputDirectory, `${name}-${device}.png`)
        await page.screenshot({ path: output, animations: "allow", caret: "hide", timeout: 45000 })
        const metrics = await page.evaluate(() => ({
          horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
          heroImageLoaded: (() => {
            const image = document.querySelector("main > section:first-child img, main > article > header:first-child img, main > header:first-child img")
            return image ? image.complete && image.naturalWidth > 0 : null
          })(),
        }))
        process.stdout.write(`${device} ${pathname} status=${response?.status()} overflow=${metrics.horizontalOverflow} heroLoaded=${metrics.heroImageLoaded} errors=${errors.length} ${output}\n`)
      } catch (error) {
        process.stdout.write(`${device} ${pathname} FAILED ${error.message}\n`)
      } finally {
        await page.close()
      }
    }
  }
} finally {
  await browser.close()
}
