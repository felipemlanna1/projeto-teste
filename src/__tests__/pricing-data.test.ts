import { formatPrice, pricingPlans } from "@/lib/pricing-data";
import type { BillingPeriod } from "@/types/pricing";

describe("formatPrice()", () => {
  it("returns 'Custom' when monthlyPrice is null", () => {
    expect(formatPrice(null, "monthly")).toBe("Custom");
    expect(formatPrice(null, "annual")).toBe("Custom");
  });

  it("returns 'R$ 0' when monthlyPrice is zero", () => {
    expect(formatPrice(0, "monthly")).toBe("R$ 0");
    expect(formatPrice(0, "annual")).toBe("R$ 0");
  });

  it("returns the monthly price formatted with 'R$' prefix for monthly billing", () => {
    expect(formatPrice(97, "monthly")).toBe("R$ 97");
  });

  it("returns 80% of monthly price for annual billing (20% discount)", () => {
    expect(formatPrice(97, "annual")).toBe("R$ 78");
  });

  it("rounds the annual price correctly", () => {
    expect(formatPrice(100, "annual")).toBe("R$ 80");
    expect(formatPrice(99, "annual")).toBe("R$ 79");
  });

  it("handles arbitrary price values for monthly billing", () => {
    expect(formatPrice(200, "monthly")).toBe("R$ 200");
  });

  it("handles arbitrary price values for annual billing", () => {
    expect(formatPrice(200, "annual")).toBe("R$ 160");
  });
});

describe("pricingPlans", () => {
  it("exports an array of 3 plans", () => {
    expect(pricingPlans).toHaveLength(3);
  });

  it("has a Basic plan with monthlyPrice of 0 and isPopular false", () => {
    const basic = pricingPlans.find((p) => p.variant === "basic");
    expect(basic).toBeDefined();
    expect(basic!.monthlyPrice).toBe(0);
    expect(basic!.isPopular).toBe(false);
    expect(basic!.name).toBe("Basic");
  });

  it("has a Pro plan with monthlyPrice of 97 and isPopular true", () => {
    const pro = pricingPlans.find((p) => p.variant === "pro");
    expect(pro).toBeDefined();
    expect(pro!.monthlyPrice).toBe(97);
    expect(pro!.isPopular).toBe(true);
    expect(pro!.name).toBe("Pro");
  });

  it("has an Enterprise plan with monthlyPrice of null and isPopular false", () => {
    const enterprise = pricingPlans.find((p) => p.variant === "enterprise");
    expect(enterprise).toBeDefined();
    expect(enterprise!.monthlyPrice).toBeNull();
    expect(enterprise!.isPopular).toBe(false);
    expect(enterprise!.name).toBe("Enterprise");
  });

  it("each plan has required fields", () => {
    for (const plan of pricingPlans) {
      expect(plan.id).toBeTruthy();
      expect(plan.name).toBeTruthy();
      expect(plan.description).toBeTruthy();
      expect(plan.features).toBeInstanceOf(Array);
      expect(plan.ctaText).toBeTruthy();
      expect(plan.ctaHref).toBeTruthy();
      expect(typeof plan.isPopular).toBe("boolean");
    }
  });

  it("Enterprise plan CTA href includes WhatsApp URL", () => {
    const enterprise = pricingPlans.find((p) => p.variant === "enterprise");
    expect(enterprise!.ctaHref).toContain("wa.me");
  });

  it("Basic plan has at least 3 included features and 2 excluded features", () => {
    const basic = pricingPlans.find((p) => p.variant === "basic");
    const included = basic!.features.filter((f) => f.included);
    const excluded = basic!.features.filter((f) => !f.included);
    expect(included.length).toBeGreaterThanOrEqual(3);
    expect(excluded.length).toBeGreaterThanOrEqual(2);
  });

  it("Pro plan has all 5 first features included and the last excluded", () => {
    const pro = pricingPlans.find((p) => p.variant === "pro");
    const included = pro!.features.filter((f) => f.included);
    expect(included.length).toBeGreaterThanOrEqual(4);
  });

  it("Enterprise plan has all features included", () => {
    const enterprise = pricingPlans.find((p) => p.variant === "enterprise");
    const excluded = enterprise!.features.filter((f) => !f.included);
    expect(excluded).toHaveLength(0);
  });

  it("billingPeriod type guard: 'monthly' and 'annual' are valid", () => {
    const monthly: BillingPeriod = "monthly";
    const annual: BillingPeriod = "annual";
    expect(formatPrice(97, monthly)).toBe("R$ 97");
    expect(formatPrice(97, annual)).toBe("R$ 78");
  });
});
