import { test, expect } from "@playwright/test";

test.describe("Pricing Section E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);
  });

  test("3 planos visíveis (Basic, Pro, Enterprise)", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Basic" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pro" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Enterprise" })
    ).toBeVisible();
  });

  test("Preços corretos no modo mensal (R$ 0, R$ 97, Custom)", async ({
    page,
  }) => {
    await expect(page.getByText("R$ 0").first()).toBeVisible();
    await expect(page.getByText("R$ 97").first()).toBeVisible();
    await expect(page.getByText("Custom").first()).toBeVisible();
  });

  test("Toggle funciona: preços mudam para modo anual (R$ 0, R$ 78, Custom)", async ({
    page,
  }) => {
    const toggle = page.getByRole("switch", {
      name: /alternar entre cobranca mensal e anual/i,
    });
    await expect(toggle).toBeVisible();

    await toggle.click();
    await page.waitForTimeout(300);

    await expect(page.getByText("R$ 0").first()).toBeVisible();
    await expect(page.getByText("R$ 78").first()).toBeVisible();
    await expect(page.getByText("Custom").first()).toBeVisible();

    await expect(page.getByText("R$ 97")).not.toBeVisible();
  });

  test("Badge -20% aparece no modo anual", async ({ page }) => {
    await expect(page.getByText("-20%")).not.toBeVisible();

    const toggle = page.getByRole("switch", {
      name: /alternar entre cobranca mensal e anual/i,
    });
    await toggle.click();
    await page.waitForTimeout(300);

    await expect(page.getByText("-20%")).toBeVisible();
  });

  test("Badge Popular visível no plano Pro", async ({ page }) => {
    await expect(page.getByText("Popular", { exact: true })).toBeVisible();
  });

  test("CTAs presentes e clicáveis", async ({ page }) => {
    const ctaBasic = page.getByRole("link", { name: /comecar gratis/i });
    await expect(ctaBasic).toBeVisible();
    await expect(ctaBasic).toHaveAttribute("href", "/signup");

    const ctaPro = page.getByRole("link", { name: /assinar pro/i });
    await expect(ctaPro).toBeVisible();
    await expect(ctaPro).toHaveAttribute("href", "/signup?plan=pro");

    const ctaEnterprise = page.getByRole("link", {
      name: /falar no whatsapp/i,
    });
    await expect(ctaEnterprise).toBeVisible();
    await expect(ctaEnterprise).toHaveAttribute("href", /wa\.me/);
  });

  test("ARIA: role=switch presente no toggle", async ({ page }) => {
    const toggle = page.getByRole("switch");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-checked", "false");

    await toggle.click();
    await page.waitForTimeout(300);

    await expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  test("Screenshots dos estados mensal e anual", async ({ page }) => {
    await page.screenshot({
      path: "e2e/screenshots/pricing-monthly.png",
      fullPage: true,
    });

    const toggle = page.getByRole("switch");
    await toggle.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "e2e/screenshots/pricing-annual.png",
      fullPage: true,
    });
  });
});
