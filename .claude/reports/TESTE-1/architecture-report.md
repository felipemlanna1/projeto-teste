# Architecture Report: TESTE-1

## Stack Scope: frontend

## Checks

| # | Check | Status | Evidence |
| --- | ----- | ------ | -------- |
| 1 | `@/` alias configured in tsconfig.json | PASS | `"paths": { "@/*": ["./src/*"] }` present in tsconfig.json |
| 2 | TypeScript strict mode enabled | PASS | `"strict": true` in tsconfig.json compilerOptions |
| 3 | Tailwind CSS v4 configured | PASS | `@import "tailwindcss"` in globals.css; `@tailwindcss/postcss` in postcss.config.mjs and devDependencies |
| 4 | ESLint 9 configured | PASS | eslint.config.mjs uses `defineConfig` (ESLint 9 flat config) with next/core-web-vitals and next/typescript rules |
| 5 | Next.js App Router in use | PASS | `src/app/layout.tsx` and `src/app/page.tsx` confirm App Router structure |
| 6 | page.tsx is a Server Component | PASS | No `"use client"` directive in page.tsx; correct default |
| 7 | layout.tsx is a Server Component | PASS | No `"use client"` directive; uses `next/font/google` server-side correctly |
| 8 | Hero.tsx planned as Server Component | PASS | Hero section has no interactivity requiring client state; static markup + CSS animation is valid in Server Component |
| 9 | Animated gradient requires client boundary assessment | INFO | CSS keyframe animations are fully supported in Server Components; `"use client"` is NOT needed unless JS-driven animation (e.g., framer-motion with useEffect) is used |
| 10 | Planned directory `src/components/sections/Hero/` matches CLAUDE.md structure | PASS | CLAUDE.md specifies `src/components/sections/Hero/` explicitly |
| 11 | Planned file naming — PascalCase for components | PASS | `Hero.tsx` is PascalCase; `index.ts` is camelCase barrel export — both correct per project rules |
| 12 | Planned shared CTA at `src/components/shared/` | PASS | Matches CLAUDE.md directory structure; CTA button is reusable across sections |
| 13 | Planned types at `src/types/` | PASS | Matches CLAUDE.md directory structure |
| 14 | page.tsx line count within 200-line limit | PASS | Current page.tsx is 65 lines; after Hero import it will stay well under limit |
| 15 | Hero.tsx projected line count within 150-line limit | PASS | Hero section content (headline, subheadline, CTA, image, gradient) fits within 150 lines if structured correctly |
| 16 | No circular dependencies risk | PASS | page.tsx imports Hero; Hero imports shared CTAButton; no back-references possible in this topology |
| 17 | next/image used for Hero image | PASS | page.tsx already uses `next/image`; the same pattern must be applied in Hero for the hero image with overlay |
| 18 | No exposed secrets or credentials | PASS | No .env files, no hardcoded secrets detected in any scanned file |
| 19 | No `any` TypeScript usage in existing files | PASS | No `any` found in layout.tsx or page.tsx |
| 20 | shadcn/ui NOT installed yet | WARN (MEDIUM) | package.json has no `@radix-ui` or `class-variance-authority` — shadcn/ui is listed in CLAUDE.md stack but not installed; Hero CTA button should not depend on shadcn components until the library is installed |
| 21 | `next` version mismatch vs CLAUDE.md | INFO | package.json has `next: 16.1.6`; CLAUDE.md states "Next.js 16 (App Router)" — these align |
| 22 | `React` import not needed in page.tsx (React 19 + JSX transform) | PASS | page.tsx correctly omits explicit React import; same pattern must be followed in Hero.tsx |
| 23 | globals.css uses `body { font-family: Arial }` which conflicts with Geist font | WARN (MEDIUM) | layout.tsx sets `--font-geist-sans` CSS variable but globals.css overrides body font-family with `Arial, Helvetica`; Hero typography will use Arial unless this is resolved before implementation |

## Issues Found

### CRITICAL

No critical issues found.

### HIGH

No high severity issues found.

### MEDIUM

**M-1: shadcn/ui not installed**

- File: `package.json`
- Detail: The CLAUDE.md tech stack lists `shadcn/ui` as the UI component library. It is not present in package.json. The Hero section needs a CTA button; if the implementer reaches for shadcn's `<Button>` component it will cause a missing module error at build time.
- Resolution: Either install shadcn/ui before or during implementation (`npx shadcn@latest init`), or implement the CTA button as a plain Tailwind component in `src/components/shared/CTAButton.tsx` without shadcn dependency. The latter is safe for this ticket and does not block Hero.

**M-2: globals.css body font-family overrides Geist font variable**

- File: `src/app/globals.css` line 25
- Detail: `body { font-family: Arial, Helvetica, sans-serif; }` is a hard override that ignores `--font-geist-sans` set in layout.tsx. Hero section text will render in Arial, not Geist, unless this is corrected. This creates a visual inconsistency between fonts defined and fonts displayed.
- Resolution: Change to `font-family: var(--font-sans);` to respect the CSS variable set by `@theme inline` in globals.css, or remove the manual `font-family` rule entirely since `@theme inline` already maps `--font-sans`.

**M-3: page.tsx is a plain Next.js scaffold — will need full replacement**

- File: `src/app/page.tsx`
- Detail: Current page.tsx is the default Create Next App scaffold with Vercel/Next.js branding content, internal links, and Next.js logo. The Hero section implementation will require replacing all of this content with the landing page structure. This is expected but should be done as a clean replacement, not an additive edit.
- Resolution: Replace the entire body of `Home()` in page.tsx to render `<Hero />` and future section components. Retain the Server Component default (no `"use client"`).

**M-4: layout.tsx metadata is placeholder**

- File: `src/app/layout.tsx` lines 15-18
- Detail: `title: "Create Next App"` and `description: "Generated by create next app"` are scaffold defaults. While not blocking Hero rendering, SEO validation will fail at a later pipeline phase if this is not updated. The Hero ticket scope includes SEO as a required skill.
- Resolution: Update metadata to reflect the actual SaaS product name, description, and relevant Open Graph tags before or alongside the Hero implementation.

## Recommended File Structure

The following is the complete file structure to create for TESTE-1 Hero Section implementation:

```
src/
├── app/
│   ├── globals.css              # MODIFY: fix body font-family (M-2)
│   ├── layout.tsx               # MODIFY: update metadata title/description (M-4)
│   └── page.tsx                 # MODIFY: replace scaffold content, import <Hero /> (M-3)
│
├── components/
│   ├── sections/
│   │   └── Hero/
│   │       ├── Hero.tsx         # CREATE: Server Component — main Hero section
│   │       └── index.ts         # CREATE: barrel re-export — export { Hero } from './Hero'
│   │
│   └── shared/
│       └── CTAButton.tsx        # CREATE: Client Component ("use client") — interactive button
│                                #         Accept: href, children, variant props
│                                #         Pure Tailwind, no shadcn dependency (M-1)
│
└── types/
    └── hero.ts                  # CREATE (optional): HeroProps type if Hero accepts props
                                 #         Can be inlined in Hero.tsx if types are simple
```

### Component Boundary Rules for This Ticket

**Hero.tsx — Server Component (no directive)**

Responsibilities: layout structure, headline markup, subheadline text, image with overlay, gradient background. All of these are static markup and CSS — no client APIs needed.

Animated gradient: Use CSS `@keyframes` in globals.css or Tailwind's `animate-` utilities. CSS animations run in the browser but do not require a React Client Component boundary — the component can remain a Server Component.

If a JS-driven animation library (framer-motion, GSAP) is chosen instead, add `"use client"` only to an `AnimatedBackground.tsx` sub-component and keep Hero.tsx as a Server Component wrapping it.

**CTAButton.tsx — Client Component (`"use client"`)**

Responsibilities: click handling, potential analytics events, hover state if managed via JS. Even if the initial implementation is a plain anchor tag, declaring it `"use client"` now is correct because CTA buttons will eventually need event tracking.

If the CTA is purely an `<a>` tag with no JS state, it can remain a Server Component. Decide at implementation time.

### Import Pattern in page.tsx

```typescript
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

### Hero.tsx Structure Outline

```typescript
// NO "use client" — Server Component
import Image from "next/image";
import { CTAButton } from "@/components/shared/CTAButton";

export function Hero() {
  return (
    <section>
      {/* Animated gradient background — CSS only */}
      {/* Headline with text gradient */}
      {/* Subheadline */}
      {/* CTA Button */}
      {/* Hero image with overlay */}
    </section>
  );
}
```

### index.ts

```typescript
export { Hero } from "./Hero";
```

## Overall: PASS

No critical or high severity issues were found. The planned architecture is sound and consistent with the CLAUDE.md project conventions. Three medium issues (shadcn/ui not installed, globals.css font override, layout.tsx placeholder metadata) and one medium note (page.tsx full scaffold replacement) must be addressed during implementation but do not block the Hero section from being built correctly. The implementer should follow the file structure and component boundary rules above.
