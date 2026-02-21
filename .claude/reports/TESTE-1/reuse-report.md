# Reuse Report: TESTE-1

## Items Analyzed: 12

## Reuse Map

| # | Item | Type | Classification | Source/Location | Action |
| --- | ---- | ---- | -------------- | --------------- | ------ |
| 1 | `next/image` | Framework utility | REUSE | Built-in Next.js 16 | Import and use directly for hero image |
| 2 | `next/font/google` (Geist Sans) | Framework utility | REUSE | `src/app/layout.tsx` lines 1–13 | Font variables `--font-geist-sans` already registered globally; consume in Hero via Tailwind `font-sans` |
| 3 | Tailwind CSS 4 | Styling framework | REUSE | `src/app/globals.css` line 1; `postcss.config.mjs` | Use utility classes for layout, gradient, animation, responsive design |
| 4 | `@/*` path alias | TypeScript config | REUSE | `tsconfig.json` line 22 | Use `@/components/sections/Hero` imports throughout |
| 5 | `--background` / `--foreground` CSS vars | Design tokens | REUSE | `src/app/globals.css` lines 3–20 | Available but insufficient for hero gradient; new brand color vars must be added |
| 6 | Root layout body/font wiring | Layout scaffolding | REUSE | `src/app/layout.tsx` lines 24–34 | Hero renders as child of existing layout; no changes needed to layout itself |
| 7 | `cn()` utility | Class merging utility | CREATE | Does not exist (`src/lib/` is empty) | Create `src/lib/utils.ts` with `cn()` using `clsx` + `tailwind-merge`; install packages |
| 8 | `HeroSection` component | Section component | CREATE | `src/components/sections/Hero/` does not exist | Create `src/components/sections/Hero/index.tsx` |
| 9 | Gradient headline text | Sub-component | CREATE | No existing gradient text component | Create inline in `HeroSection` using Tailwind `bg-clip-text text-transparent bg-gradient-to-r` |
| 10 | Primary CTA button | UI component | CREATE | `src/components/ui/` is empty; shadcn/ui not installed | Create `src/components/ui/Button.tsx`; shadcn/ui `Button` is the recommended option once installed |
| 11 | Hero image with overlay | Image sub-component | CREATE | No existing image wrapper with overlay | Implement via `next/image` inside a relative-positioned `div` with an absolute overlay `div` |
| 12 | Animated background gradient | CSS animation | CREATE | No animation utilities exist | Implement via Tailwind CSS 4 `@keyframes` in `globals.css` or inline `animate-*` custom class |

---

## Existing Code to Reuse

### `next/image`
Available from the `next` package (16.1.6). Already used in `src/app/page.tsx` line 1 and lines 7–13. Use `priority` prop on the hero image to improve LCP.

```tsx
import Image from "next/image"
// Usage with overlay container:
// <div className="relative">
//   <Image src="..." alt="..." fill className="object-cover" priority />
//   <div className="absolute inset-0 bg-black/40" />
// </div>
```

### `next/font/google` — Geist Sans
Already loaded globally in `src/app/layout.tsx` and wired to `--font-geist-sans`. Tailwind CSS 4 registers `--font-sans: var(--font-geist-sans)` in `globals.css` via `@theme inline`. The Hero component can use `font-sans` without any additional font setup.

### `@/*` path alias
`tsconfig.json` maps `@/*` to `./src/*`. All new component imports must use this alias:

```tsx
import { HeroSection } from "@/components/sections/Hero"
import { Button } from "@/components/ui/Button"
```

### Tailwind CSS 4 utilities relevant to Hero
The following Tailwind 4 utility groups are available without any configuration:
- Layout: `flex`, `grid`, `min-h-screen`, `max-w-*`, `px-*`, `py-*`, `container`
- Gradient text: `bg-gradient-to-r`, `from-*`, `to-*`, `bg-clip-text`, `text-transparent`
- Responsive: `sm:`, `md:`, `lg:`, `xl:` breakpoint prefixes
- Animation: `animate-*` (Tailwind 4 built-ins); custom keyframes added in `globals.css`
- Image overlay: `absolute`, `inset-0`, `relative`, `object-cover`

### Root layout
`src/app/layout.tsx` provides the HTML shell, font variables, and `antialiased` body. The Hero section slots in as a child of `<body>` through `src/app/page.tsx`. No modifications to the layout are needed for the Hero.

---

## Code to Extend

### `src/app/globals.css`
Needs two additions to support the animated background gradient:

1. New CSS custom properties for brand gradient colors (the existing `--background` / `--foreground` tokens are monochrome and insufficient for a SaaS landing page gradient).
2. A `@keyframes gradient-shift` animation and corresponding `animate-gradient` class so the background gradient animates smoothly.

```css
/* Addition to globals.css */
:root {
  --gradient-start: #6366f1;   /* indigo-500 */
  --gradient-mid:   #8b5cf6;   /* violet-500 */
  --gradient-end:   #06b6d4;   /* cyan-500 */
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

@theme inline {
  --animate-gradient: gradient-shift 6s ease infinite;
}
```

### `src/app/page.tsx`
The current `page.tsx` is the default Next.js scaffold content. It must be replaced to mount the `HeroSection` component. The existing structure (single default export, Server Component by default, uses `next/image`) is the correct pattern to follow — the file is extended, not rewritten from scratch.

---

## New Code to Create

### 1. `src/lib/utils.ts` — `cn()` utility
Required by all components for conditional class merging. Needs `clsx` and `tailwind-merge` packages.

```bash
npm install clsx tailwind-merge
```

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

### 2. `src/components/ui/Button.tsx` — Primary CTA Button
shadcn/ui `Button` is the recommended baseline. Since shadcn/ui is not yet installed, create a minimal typed button. When shadcn/ui is added later via `npx shadcn@latest add button`, this file should be replaced.

```tsx
// src/components/ui/Button.tsx
"use client"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2",
        variant === "primary" && "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90",
        variant === "outline" && "border border-white/30 text-white hover:bg-white/10",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-12 px-6 text-base",
        size === "lg" && "h-14 px-8 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 3. `src/components/sections/Hero/index.tsx` — Hero Section
Main section component. Server Component (no `"use client"` needed — no interactivity required for the hero itself).

```tsx
// src/components/sections/Hero/index.tsx
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden",
        "bg-[length:400%_400%] bg-gradient-to-br from-indigo-950 via-violet-900 to-cyan-900",
        "animate-gradient"
      )}
    >
      {/* Hero image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Gradient headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
          <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Venda mais
          </span>{" "}
          com WhatsApp
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
          Automatize seu atendimento, converta leads e escale suas vendas com a plataforma SaaS mais completa do Brasil.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" variant="primary">
            Começar agora — grátis
          </Button>
          <Button size="lg" variant="outline">
            Ver demonstração
          </Button>
        </div>
      </div>
    </section>
  )
}
```

### 4. `src/types/hero.ts` — Hero TypeScript types (optional but recommended)
Typed props for future Hero variants or CMS-driven content.

```ts
// src/types/hero.ts
export interface HeroContent {
  headline: string
  headlineGradient: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  imageUrl: string
  imageAlt: string
}
```

### Summary of files to create

| File | Purpose |
| ---- | ------- |
| `src/lib/utils.ts` | `cn()` class merging utility |
| `src/components/ui/Button.tsx` | Primary CTA button (shadcn/ui compatible API) |
| `src/components/sections/Hero/index.tsx` | Full Hero Section component |
| `src/types/hero.ts` | TypeScript types for Hero content |

### Packages to install

| Package | Reason |
| ------- | ------ |
| `clsx` | Conditional class names |
| `tailwind-merge` | Merge Tailwind classes without conflicts |

---

## Overall: PASS
