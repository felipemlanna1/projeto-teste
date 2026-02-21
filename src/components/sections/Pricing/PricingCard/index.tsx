"use client";

import { motion, type Variants } from "framer-motion";
import type { BillingPeriod, PricingPlan } from "@/types/pricing";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing-data";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.15,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
};

interface PricingCardProps {
  plan: PricingPlan;
  billingPeriod: BillingPeriod;
  index: number;
}

export function PricingCard({ plan, billingPeriod, index }: PricingCardProps) {
  const isPro = plan.variant === "pro";
  const isEnterprise = plan.variant === "enterprise";

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className={cn(
        "relative flex flex-col rounded-2xl p-8 shadow-sm ring-1",
        isPro
          ? "bg-indigo-600 ring-indigo-600 text-white"
          : "bg-white dark:bg-gray-800 ring-gray-200 dark:ring-gray-700"
      )}
    >
      {isPro && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-4 py-1 text-xs font-semibold text-white shadow-md">
          Popular
        </span>
      )}

      <div className="mb-6">
        <h3
          className={cn(
            "text-xl font-semibold",
            isPro ? "text-white" : "text-gray-900 dark:text-white"
          )}
        >
          {plan.name}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm",
            isPro ? "text-indigo-200" : "text-gray-600 dark:text-gray-400"
          )}
        >
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <span
          className={cn(
            "text-5xl font-bold tracking-tight",
            isPro ? "text-white" : "text-gray-900 dark:text-white"
          )}
        >
          {formatPrice(plan.monthlyPrice, billingPeriod)}
        </span>
        {plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
          <span
            className={cn(
              "ml-1 text-sm",
              isPro ? "text-indigo-200" : "text-gray-500 dark:text-gray-400"
            )}
          >
            /mes
          </span>
        )}
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature.text} className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                feature.included
                  ? isPro
                    ? "bg-indigo-400 text-white"
                    : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : isPro
                    ? "bg-indigo-700 text-indigo-300"
                    : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
              )}
              aria-hidden="true"
            >
              {feature.included ? "✓" : "✕"}
            </span>
            <span
              className={cn(
                "text-sm",
                feature.included
                  ? isPro
                    ? "text-indigo-100"
                    : "text-gray-700 dark:text-gray-300"
                  : isPro
                    ? "text-indigo-300 line-through"
                    : "text-gray-400 dark:text-gray-500 line-through"
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={plan.ctaHref}
        aria-label={`${plan.ctaText} — plano ${plan.name}`}
        target={isEnterprise ? "_blank" : undefined}
        rel={isEnterprise ? "noopener noreferrer" : undefined}
        className={cn(
          "block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all",
          isPro
            ? "bg-white text-indigo-600 hover:bg-indigo-50"
            : isEnterprise
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
        )}
      >
        {plan.ctaText}
      </a>
    </motion.div>
  );
}
