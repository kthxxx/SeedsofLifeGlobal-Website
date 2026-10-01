import assert from "node:assert/strict"
import { test } from "node:test"

const baseUrl = process.env.HERO_TEST_URL ?? "http://127.0.0.1:3000"

for (const pathname of [
  "/about",
  "/gallery",
  "/contact",
  "/leadership/jennifer-moore",
  "/leadership/teacher-sally-blanco-sapalo",
]) {
  test(`${pathname} opens with a photographic hero`, async () => {
    const response = await fetch(new URL(pathname, baseUrl))
    assert.equal(response.status, 200)
    const html = await response.text()
    const main = html.slice(html.indexOf('id="main-content"'))
    const opening = main.match(/<(section|header)\b[^>]*>([\s\S]*?)<\/\1>/)
    assert.ok(opening, "page has a hero section")
    assert.match(opening[2], /<img\b[^>]*>/, "hero contains a photograph")
  })
}

test("the Mt. Moriah story shows all five supplied photos with date context", async () => {
  const response = await fetch(new URL("/stories/mt-moriah-opening", baseUrl))
  assert.equal(response.status, 200)
  const html = await response.text()
  const main = html.slice(html.indexOf('id="main-content"'))
  const opening = main.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)
  assert.ok(opening, "story has a header")
  assert.match(opening[1], /IMG_2145\.jpg/, "hero shows Mt. Moriah itself")
  for (const filename of ["IMG_2104.jpg", "IMG_4057.jpg", "IMG_4084.jpg", "IMG_3973.jpg", "IMG_2145.jpg"]) {
    assert.ok(main.includes(filename), `${filename} appears on the story`)
  }
  assert.match(main, /photo dates have not been confirmed/i)
})

test("the gallery includes every supplied Mt. Moriah photo", async () => {
  const response = await fetch(new URL("/gallery", baseUrl))
  assert.equal(response.status, 200)
  const html = await response.text()
  for (const filename of ["IMG_2104.jpg", "IMG_4057.jpg", "IMG_4084.jpg", "IMG_3973.jpg", "IMG_2145.jpg"]) {
    assert.ok(html.includes(filename), `${filename} appears in the gallery`)
  }
})
