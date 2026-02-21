"use client";

import type { BillingPeriod } from "@/types/pricing";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  billingPeriod: BillingPeriod;
  onToggle: (period: BillingPeriod) => void;
}

export function PricingToggle({ billingPeriod, onToggle }: PricingToggleProps) {
  const isAnnual = billingPeriod === "annual";

  function handleToggle() {
    onToggle(isAnnual ? "monthly" : "annual");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleToggle();
    }
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          isAnnual
            ? "text-gray-500 dark:text-gray-400"
            : "text-gray-900 dark:text-white"
        )}
      >
        Mensal
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        aria-label="Alternar entre cobranca mensal e anual"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          isAnnual ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
            isAnnual ? "translate-x-6 mt-1" : "translate-x-1 mt-1"
          )}
        />
      </button>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          isAnnual
            ? "text-gray-900 dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        )}
      >
        Anual
      </span>
      {isAnnual && (
        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
          -20%
        </span>
      )}
    </div>
  );
}
