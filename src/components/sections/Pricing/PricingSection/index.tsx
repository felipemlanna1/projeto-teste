"use client";

import { useState } from "react";
import type { BillingPeriod } from "@/types/pricing";
import { pricingPlans } from "@/lib/pricing-data";
import { PricingToggle } from "@/components/sections/Pricing/PricingToggle";
import { PricingCard } from "@/components/sections/Pricing/PricingCard";

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  return (
    <section
      aria-labelledby="pricing-heading"
      className="w-full bg-gray-50 py-20 dark:bg-gray-900 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="pricing-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Planos para Todos os Tamanhos
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Escolha o plano ideal para o seu negocio. Sem taxas ocultas.
          </p>
          <PricingToggle
            billingPeriod={billingPeriod}
            onToggle={setBillingPeriod}
          />
        </div>

        <div className="mt-16 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
