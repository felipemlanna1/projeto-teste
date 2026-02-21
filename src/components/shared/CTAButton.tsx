"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  href: string
  children: ReactNode
  variant?: "primary" | "secondary"
  className?: string
}

export function CTAButton({ href, children, variant = "primary", className }: CTAButtonProps) {
  const isExternal = href.startsWith("http")
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2",
        variant === "primary" && [
          "h-12 min-w-[200px] px-6",
          "bg-[#25D366] hover:bg-[#1ebe5d] text-white text-base",
          "shadow-lg shadow-green-900/30",
          "focus-visible:ring-green-400",
        ],
        variant === "secondary" && [
          "h-12 min-w-[160px] px-6",
          "border-2 border-white/40 hover:border-white/70 hover:bg-white/10",
          "text-white text-base",
          "focus-visible:ring-white/50",
        ],
        className
      )}
    >
      {children}
    </a>
  )
}
