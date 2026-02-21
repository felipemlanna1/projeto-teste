# Screen Composition: HeroSection

## Ticket: TESTE-1

## Section Type: hero

---

## Layout Structure

| Element | Tailwind Layout | Responsive | Priority |
| ------- | --------------- | ---------- | -------- |
| `<section>` wrapper | `relative flex min-h-screen items-center overflow-hidden` | Full viewport on all breakpoints | Container |
| Animated gradient background | `absolute inset-0 -z-10 bg-[length:400%_400%] animate-gradient` | Same size as section at all breakpoints | Background layer |
| Inner grid container | `mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 md:py-32` | Single column mobile/tablet → 2-col desktop | Content wrapper |
| Content column (left on desktop) | `flex flex-col items-center text-center lg:items-start lg:text-left` | Centered on mobile, left-aligned on desktop | Text group |
| Badge / eyebrow | `inline-flex items-center gap-2 rounded-full px-4 py-1.5` | Visible all breakpoints | Badge |
| Headline `<h1>` | `text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl lg:text-6xl` | Scales up at each breakpoint | Heading |
| Gradient span inside headline | `bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent` | Inline; scales with headline | Decorative |
| Subheadline `<p>` | `mt-4 text-lg leading-8 text-white/75 sm:text-xl max-w-xl` | `max-w-xl` on all; centered on mobile | Supporting text |
| CTA group | `mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start` | Stack on mobile, row from sm up | Action group |
| Primary CTA (`<a>` deeplink) | `inline-flex items-center justify-center gap-2 h-12 min-w-[200px] px-6 rounded-full font-semibold text-base text-white` | `h-12` (48px) all breakpoints — meets 44px touch target | Primary action |
| Secondary CTA (`<a>`) | `inline-flex items-center justify-center h-12 min-w-[160px] px-6 rounded-full font-semibold text-base border-2 border-white/40 text-white` | `h-12` (48px) all breakpoints | Secondary action |
| Hero image column (right on desktop) | `relative hidden lg:flex items-center justify-center` | Hidden on mobile/tablet, visible lg+ | Illustration |
| Hero image container | `relative w-full aspect-square max-w-lg` | Fluid width, square aspect | Image |
| Image overlay | `absolute inset-0 rounded-2xl bg-gradient-to-t from-indigo-950/60 to-transparent` | Matches image container | Visual polish |
| Floating WhatsApp badge | `absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 flex items-center gap-2 rounded-full px-4 py-2 bg-[#25D366] text-white text-sm font-semibold shadow-lg` | Centered below image on mobile, bottom-right on sm+ | Social proof badge |

---

## Visual Hierarchy

| Priority | Element | Typography | Color | Size |
| -------- | ------- | ---------- | ----- | ---- |
| 1st focal | Headline `<h1>` gradient span ("Venda mais com WhatsApp") | `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight` | `text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400` | 36px → 48px → 60px |
| 2nd | Subheadline `<p>` | `text-lg sm:text-xl leading-8 font-normal` | `text-white/75` | 18px → 20px |
| 3rd | Primary CTA "Falar com WhatsApp" | `text-base font-semibold` | `bg-[#25D366] hover:bg-[#1ebe5d] text-white` | 16px, h-12 (48px tall) |
| 4th action | Secondary CTA "Ver Planos" | `text-base font-semibold` | `border-2 border-white/40 text-white hover:bg-white/10` | 16px, h-12 (48px tall) |

---

## Spacing

| Level | Tailwind Class | Between |
| ----- | -------------- | ------- |
| Section | `py-20 md:py-32` | Top and bottom of the full hero section |
| Grid gap | `gap-12` | Between content column and image column |
| Content group | `flex flex-col gap-6` | Between badge, headline, and subheadline block |
| Headline → subheadline | `mt-4` | Vertical gap from h1 to supporting paragraph |
| Subheadline → CTA group | `mt-10` | Vertical gap between paragraph and button row |
| CTA buttons | `gap-4` | Between primary and secondary CTA |
| Badge internals | `gap-2 px-4 py-1.5` | Icon and label inside badge |
| CTA button internals | `gap-2 px-6` | Icon and text inside each CTA button |

---

## Responsive Behavior

| Breakpoint | Layout | Columns | Font Scale | Notes |
| ---------- | ------ | ------- | ---------- | ----- |
| mobile (base, <640px) | Stack, full-width | 1 | 80% (text-4xl = 36px) | Image column hidden; CTAs stacked vertically; text centered |
| tablet (sm, 640px+) | Stack, wider margins | 1 | 90% (text-5xl = 48px) | CTAs shift to horizontal row; text still centered; image still hidden |
| desktop (lg, 1024px+) | Side-by-side grid | 2 (content left, image right) | 100% (text-6xl = 60px) | Image column appears; text left-aligned; max-w-7xl constrains width |
| wide (xl, 1280px+) | Same as desktop | 2 | 100% | Max-width container prevents overflow stretching |

---

## Layout Sketch (Text Wireframe)

### Mobile (< 640px) — Single Column, Centered

```
+--------------------------------------------------+
|                                                  |
|  [ANIMATED PURPLE/INDIGO/BLUE GRADIENT BG]       |
|                                                  |
|    +------------------------------------------+  |
|    |  [BADGE] Novo: Automacao via WhatsApp     |  |
|    |                                           |  |
|    |  Venda mais com                           |  |
|    |  WhatsApp  (gradient purple→blue text)    |  |
|    |                                           |  |
|    |  Automatize seu atendimento e             |  |
|    |  converta mais leads com a plataforma     |  |
|    |  SaaS mais completa do Brasil.            |  |
|    |                                           |  |
|    |  [  Falar com WhatsApp  ] (green, full)   |  |
|    |  [      Ver Planos      ] (outline, full) |  |
|    +------------------------------------------+  |
|                                                  |
+--------------------------------------------------+
```

### Desktop (>= 1024px) — Two Column Grid

```
+------------------------------------------------------------------+
|  [ANIMATED PURPLE/INDIGO/BLUE GRADIENT BG]                       |
|                                                                  |
|  +---------------------------+  +-----------------------------+  |
|  | [BADGE] Novo: Automacao   |  |                             |  |
|  |                           |  |   +---------------------+   |  |
|  | Venda mais com            |  |   |                     |   |  |
|  | WhatsApp                  |  |   |   [HERO IMAGE]      |   |  |
|  | (gradient headline)       |  |   |   product mockup    |   |  |
|  |                           |  |   |   or illustration   |   |  |
|  | Automatize seu atendimento|  |   |                     |   |  |
|  | e converta mais leads com |  |   |  [gradient overlay] |   |  |
|  | a plataforma SaaS mais    |  |   +---------------------+   |  |
|  | completa do Brasil.       |  |   [WhatsApp floating badge] |  |
|  |                           |  +-----------------------------+  |
|  | [ Falar c/ WhatsApp ] [Ver|  |                                 |
|  |   Planos ]                |                                    |
|  +---------------------------+                                    |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Tailwind Classes Reference

### `<section>` — outer wrapper

```
relative flex min-h-screen items-center overflow-hidden
bg-gradient-to-br from-indigo-950 via-violet-900 to-indigo-900
bg-[length:400%_400%] animate-gradient
```

### Animated background — requires `@keyframes` addition to globals.css

```css
/* globals.css addition */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

@theme inline {
  --animate-gradient: gradient-shift 8s ease infinite;
}
```

### Inner grid container

```
mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8
grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
py-20 md:py-32
```

### Content column

```
flex flex-col items-center text-center lg:items-start lg:text-left
```

### Eyebrow badge

```
inline-flex items-center gap-2 rounded-full
px-4 py-1.5 mb-4
bg-white/10 border border-white/20
text-sm font-medium text-white/90
backdrop-blur-sm
```

### Headline `<h1>`

```
text-4xl sm:text-5xl lg:text-6xl
font-extrabold tracking-tight leading-tight
text-white
```

### Gradient text span inside headline

```
bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400
bg-clip-text text-transparent
```

### Subheadline `<p>`

```
mt-4 max-w-xl
text-lg sm:text-xl leading-8 font-normal
text-white/75
```

### CTA group wrapper

```
mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start
```

### Primary CTA — "Falar com WhatsApp" (WhatsApp deeplink `<a>`)

```
inline-flex items-center justify-center gap-2
h-12 min-w-[200px] px-6 rounded-full
bg-[#25D366] hover:bg-[#1ebe5d]
text-white text-base font-semibold
shadow-lg shadow-green-900/30
transition-colors duration-200
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400
```

Deeplink href: `https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20plataforma!`

### Secondary CTA — "Ver Planos" (`<a>`)

```
inline-flex items-center justify-center
h-12 min-w-[160px] px-6 rounded-full
border-2 border-white/40 hover:border-white/70 hover:bg-white/10
text-white text-base font-semibold
transition-all duration-200
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
```

### Image column (desktop only)

```
relative hidden lg:flex items-center justify-center
```

### Image container

```
relative w-full aspect-square max-w-lg
rounded-2xl overflow-hidden
shadow-2xl shadow-indigo-950/50
```

### Hero image (next/image)

```
object-cover
```

Props: `fill`, `priority`, `alt="Dashboard da plataforma WhatsApp SaaS"`

### Image gradient overlay

```
absolute inset-0
bg-gradient-to-t from-indigo-950/60 via-transparent to-transparent
rounded-2xl
```

### Floating WhatsApp social proof badge

```
absolute bottom-4 right-4
flex items-center gap-2
rounded-full px-4 py-2
bg-[#25D366] text-white text-sm font-semibold
shadow-lg
```

---

## Component File Map

| Component | File | Type | Notes |
| --------- | ---- | ---- | ----- |
| `Hero` | `src/components/sections/Hero/Hero.tsx` | Server Component | No `"use client"` needed |
| `Hero` barrel | `src/components/sections/Hero/index.ts` | Re-export | `export { Hero } from './Hero'` |
| `CTAButton` | `src/components/shared/CTAButton.tsx` | Client Component | `"use client"` — for analytics/events |
| `hero.ts` types | `src/types/hero.ts` | Types | `HeroProps` interface |
| gradient keyframes | `src/app/globals.css` | CSS extension | Add `@keyframes gradient-shift` and `--animate-gradient` |
| page.tsx | `src/app/page.tsx` | Server Component | Replace scaffold with `<Hero />` |

---

## Globals.css Required Additions

The following must be added to `src/app/globals.css` for the animated gradient to work, and to fix the Arial font override identified in architecture report M-2:

```css
/* Brand color tokens */
:root {
  --gradient-from:  #4338ca;  /* indigo-700  */
  --gradient-via:   #7c3aed;  /* violet-600  */
  --gradient-to:    #1e1b4b;  /* indigo-950  */
  --color-whatsapp: #25D366;
}

/* Animated gradient keyframes */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

/* Register animation in Tailwind 4 theme */
@theme inline {
  --animate-gradient: gradient-shift 8s ease infinite;
}

/* Fix M-2: replace Arial override with Geist font variable */
body {
  font-family: var(--font-sans);
}
```

---

## Self-Check

- [x] Layout: PASS — full-viewport section with animated gradient background; two-column grid on desktop, single-column on mobile; all layout via Tailwind utilities
- [x] Hierarchy: PASS — 4 priority levels: gradient headline (1st), subheadline (2nd), primary WhatsApp CTA (3rd), secondary outline CTA (4th)
- [x] Spacing: PASS — all spacing via Tailwind classes: `py-20 md:py-32`, `gap-12`, `gap-6`, `gap-4`, `mt-4`, `mt-10`, `px-4 sm:px-6 lg:px-8`; no custom CSS values
- [x] Responsive: PASS — mobile-first base → sm → lg breakpoints; single column on mobile/tablet, two-column on desktop; font scales from text-4xl → text-5xl → text-6xl; CTAs stack on mobile, row from sm+; image hidden on mobile/tablet
- [x] Touch targets: PASS — both CTAs use `h-12` (48px height), exceeding 44px minimum; `min-w-[160px]` / `min-w-[200px]` ensure adequate tap width
- [x] WhatsApp integration: PASS — primary CTA is an `<a>` tag with `https://wa.me/` deeplink and URL-encoded message; green color `#25D366` matches WhatsApp brand; floating WhatsApp badge provides additional social proof
- [x] Brazil SaaS context: PASS — Portuguese copy ("Falar com WhatsApp", "Ver Planos"), WhatsApp-first CTA flow, indigo/violet brand gradient appropriate for tech SaaS
- [x] Server Component boundary: PASS — Hero.tsx is a Server Component (no `"use client"`); CSS animation requires no JS; CTAButton.tsx is a Client Component for future event tracking
- [x] next/image: PASS — hero image uses `<Image fill priority />` with proper alt text; overlay div uses absolute positioning over relative container
- [x] No shadcn/ui dependency: PASS — CTAButton and all elements use pure Tailwind classes; no `@radix-ui` or `cva` imports required
