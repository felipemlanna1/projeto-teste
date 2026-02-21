import React from "react";
import { render, screen } from "@testing-library/react";
import { PricingCard } from "@/components/sections/Pricing/PricingCard";
import { pricingPlans } from "@/lib/pricing-data";

const basicPlan = pricingPlans.find((p) => p.variant === "basic")!;
const proPlan = pricingPlans.find((p) => p.variant === "pro")!;
const enterprisePlan = pricingPlans.find((p) => p.variant === "enterprise")!;

describe("PricingCard — Basic plan", () => {
  it("renders the Basic plan name", () => {
    render(<PricingCard plan={basicPlan} billingPeriod="monthly" index={0} />);
    expect(screen.getByText("Basic")).toBeInTheDocument();
  });

  it("renders the Basic plan description", () => {
    render(<PricingCard plan={basicPlan} billingPeriod="monthly" index={0} />);
    expect(screen.getByText(basicPlan.description)).toBeInTheDocument();
  });

  it("renders 'R$ 0' as the price for the free plan", () => {
    render(<PricingCard plan={basicPlan} billingPeriod="monthly" index={0} />);
    expect(screen.getByText("R$ 0")).toBeInTheDocument();
  });

  it("does NOT render the 'Popular' badge for the Basic plan", () => {
    render(<PricingCard plan={basicPlan} billingPeriod="monthly" index={0} />);
    expect(screen.queryByText("Popular")).not.toBeInTheDocument();
  });

  it("renders the CTA button text for Basic plan", () => {
    render(<PricingCard plan={basicPlan} billingPeriod="monthly" index={0} />);
    expect(screen.getByText(basicPlan.ctaText)).toBeInTheDocument();
  });

  it("renders all feature texts for Basic plan", () => {
    render(<PricingCard plan={basicPlan} billingPeriod="monthly" index={0} />);
    for (const feature of basicPlan.features) {
      expect(screen.getByText(feature.text)).toBeInTheDocument();
    }
  });

  it("does NOT render '/mes' suffix for zero-price plan", () => {
    render(<PricingCard plan={basicPlan} billingPeriod="monthly" index={0} />);
    expect(screen.queryByText("/mes")).not.toBeInTheDocument();
  });
});

describe("PricingCard — Pro plan", () => {
  it("renders the Pro plan name", () => {
    render(<PricingCard plan={proPlan} billingPeriod="monthly" index={1} />);
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("renders the 'Popular' badge for the Pro plan", () => {
    render(<PricingCard plan={proPlan} billingPeriod="monthly" index={1} />);
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });

  it("renders the correct monthly price for the Pro plan", () => {
    render(<PricingCard plan={proPlan} billingPeriod="monthly" index={1} />);
    expect(screen.getByText("R$ 97")).toBeInTheDocument();
  });

  it("renders the annual discounted price for the Pro plan", () => {
    render(<PricingCard plan={proPlan} billingPeriod="annual" index={1} />);
    expect(screen.getByText("R$ 78")).toBeInTheDocument();
  });

  it("renders '/mes' suffix for the Pro plan", () => {
    render(<PricingCard plan={proPlan} billingPeriod="monthly" index={1} />);
    expect(screen.getByText("/mes")).toBeInTheDocument();
  });

  it("renders the CTA button text for Pro plan", () => {
    render(<PricingCard plan={proPlan} billingPeriod="monthly" index={1} />);
    expect(screen.getByText(proPlan.ctaText)).toBeInTheDocument();
  });

  it("renders all feature texts for the Pro plan", () => {
    render(<PricingCard plan={proPlan} billingPeriod="monthly" index={1} />);
    for (const feature of proPlan.features) {
      expect(screen.getByText(feature.text)).toBeInTheDocument();
    }
  });
});

describe("PricingCard — Enterprise plan", () => {
  it("renders the Enterprise plan name", () => {
    render(
      <PricingCard plan={enterprisePlan} billingPeriod="monthly" index={2} />
    );
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("renders 'Custom' as the price for the Enterprise plan", () => {
    render(
      <PricingCard plan={enterprisePlan} billingPeriod="monthly" index={2} />
    );
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("renders 'Custom' for Enterprise plan even in annual billing", () => {
    render(
      <PricingCard plan={enterprisePlan} billingPeriod="annual" index={2} />
    );
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("does NOT render the 'Popular' badge for the Enterprise plan", () => {
    render(
      <PricingCard plan={enterprisePlan} billingPeriod="monthly" index={2} />
    );
    expect(screen.queryByText("Popular")).not.toBeInTheDocument();
  });

  it("renders the CTA link with target='_blank' for Enterprise", () => {
    render(
      <PricingCard plan={enterprisePlan} billingPeriod="monthly" index={2} />
    );
    const link = screen.getByRole("link", { name: new RegExp(enterprisePlan.ctaText) });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does NOT render '/mes' for the Enterprise plan", () => {
    render(
      <PricingCard plan={enterprisePlan} billingPeriod="monthly" index={2} />
    );
    expect(screen.queryByText("/mes")).not.toBeInTheDocument();
  });

  it("renders all feature texts for the Enterprise plan", () => {
    render(
      <PricingCard plan={enterprisePlan} billingPeriod="monthly" index={2} />
    );
    for (const feature of enterprisePlan.features) {
      expect(screen.getByText(feature.text)).toBeInTheDocument();
    }
  });
});
