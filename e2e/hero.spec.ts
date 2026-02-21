import { test, expect } from "@playwright/test"

test.describe("Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("renders the hero section", async ({ page }) => {
    await expect(page.locator("section")).toBeVisible()
  })

  test("renders h1 headline with WhatsApp text", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText("WhatsApp")
  })

  test("renders the eyebrow badge", async ({ page }) => {
    await expect(page.getByText(/Automação via WhatsApp/i)).toBeVisible()
  })

  test("renders primary CTA button", async ({ page }) => {
    const primaryCta = page.getByRole("link", { name: /Falar com WhatsApp/i })
    await expect(primaryCta).toBeVisible()
  })

  test("primary CTA links to WhatsApp deeplink", async ({ page }) => {
    const primaryCta = page.getByRole("link", { name: /Falar com WhatsApp/i })
    const href = await primaryCta.getAttribute("href")
    expect(href).toContain("wa.me")
  })

  test("renders secondary CTA button", async ({ page }) => {
    const secondaryCta = page.getByRole("link", { name: /Ver Planos/i })
    await expect(secondaryCta).toBeVisible()
  })

  test("secondary CTA links to pricing section", async ({ page }) => {
    const secondaryCta = page.getByRole("link", { name: /Ver Planos/i })
    const href = await secondaryCta.getAttribute("href")
    expect(href).toBe("#pricing")
  })

  test("renders subheadline text", async ({ page }) => {
    await expect(page.getByText(/Automatize/i)).toBeVisible()
  })

  test("hero section is full viewport height", async ({ page }) => {
    const section = page.locator("section").first()
    const boundingBox = await section.boundingBox()
    const viewportSize = page.viewportSize()
    expect(boundingBox?.height).toBeGreaterThanOrEqual(viewportSize!.height * 0.9)
  })
})

test.describe("Hero Section — Responsive", () => {
  test("mobile layout: 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    const heading = page.getByRole("heading", { level: 1 })
    await expect(heading).toBeVisible()
    const primaryCta = page.getByRole("link", { name: /Falar com WhatsApp/i })
    await expect(primaryCta).toBeVisible()
    await page.screenshot({ path: "e2e/screenshots/hero-mobile.png" })
  })

  test("tablet layout: 768px", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await page.screenshot({ path: "e2e/screenshots/hero-tablet.png" })
  })

  test("desktop layout: 1280px", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await page.screenshot({ path: "e2e/screenshots/hero-desktop.png" })
  })
})
