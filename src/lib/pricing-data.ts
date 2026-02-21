import type { BillingPeriod, PricingPlan } from "@/types/pricing";

export function formatPrice(
  monthlyPrice: number | null,
  billingPeriod: BillingPeriod
): string {
  if (monthlyPrice === null) return "Custom";
  if (monthlyPrice === 0) return "R$ 0";
  const price =
    billingPeriod === "annual"
      ? Math.round(monthlyPrice * 0.8)
      : monthlyPrice;
  return `R$ ${price}`;
}

const WHATSAPP_ENTERPRISE_URL =
  "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20plano%20Enterprise";

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Ideal para comecar sem custo",
    monthlyPrice: 0,
    features: [
      { text: "Ate 100 mensagens por mes", included: true },
      { text: "1 numero de WhatsApp", included: true },
      { text: "Templates basicos", included: true },
      { text: "Relatorios avancados", included: false },
      { text: "Integracao com CRM", included: false },
      { text: "Suporte prioritario", included: false },
    ],
    ctaText: "Comecar Gratis",
    ctaHref: "/signup",
    isPopular: false,
    variant: "basic",
  },
  {
    id: "pro",
    name: "Pro",
    description: "O plano mais popular para equipes em crescimento",
    monthlyPrice: 97,
    features: [
      { text: "Mensagens ilimitadas", included: true },
      { text: "Ate 5 numeros de WhatsApp", included: true },
      { text: "Templates personalizados", included: true },
      { text: "Relatorios avancados", included: true },
      { text: "Integracao com CRM", included: true },
      { text: "Suporte prioritario", included: false },
    ],
    ctaText: "Assinar Pro",
    ctaHref: "/signup?plan=pro",
    isPopular: true,
    variant: "pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Para grandes equipes com necessidades customizadas",
    monthlyPrice: null,
    features: [
      { text: "Mensagens ilimitadas", included: true },
      { text: "Numeros ilimitados de WhatsApp", included: true },
      { text: "Templates personalizados", included: true },
      { text: "Relatorios avancados", included: true },
      { text: "Integracao com CRM", included: true },
      { text: "Suporte prioritario 24/7", included: true },
    ],
    ctaText: "Falar no WhatsApp",
    ctaHref: WHATSAPP_ENTERPRISE_URL,
    isPopular: false,
    variant: "enterprise",
  },
];
