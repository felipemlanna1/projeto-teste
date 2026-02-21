export type BillingPeriod = "monthly" | "annual";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  features: PricingFeature[];
  ctaText: string;
  ctaHref: string;
  isPopular: boolean;
  variant: "basic" | "pro" | "enterprise";
}
