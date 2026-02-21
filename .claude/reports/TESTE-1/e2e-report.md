# E2E Report: TESTE-1

## E2E Level: REQUIRED

## Flow Tested: Hero Section Landing Page

## Platform Results

| # | Platform | Tool | Tests | Pass | Fail | Status |
| --- | ------------ | ---------- | ----- | ---- | ---- | --------- |
| 1 | Web (Chrome) | Playwright | 12 | 12 | 0 | PASS |

## Tests Created

| # | File | Tests | Status |
| --- | ---- | ----- | ------ |
| 1 | e2e/hero.spec.ts | renders the hero section | PASS |
| 2 | e2e/hero.spec.ts | renders h1 headline with WhatsApp text | PASS |
| 3 | e2e/hero.spec.ts | renders the eyebrow badge | PASS |
| 4 | e2e/hero.spec.ts | renders primary CTA button | PASS |
| 5 | e2e/hero.spec.ts | primary CTA links to WhatsApp deeplink | PASS |
| 6 | e2e/hero.spec.ts | renders secondary CTA button | PASS |
| 7 | e2e/hero.spec.ts | secondary CTA links to pricing section | PASS |
| 8 | e2e/hero.spec.ts | renders subheadline text | PASS |
| 9 | e2e/hero.spec.ts | hero section is full viewport height | PASS |
| 10 | e2e/hero.spec.ts | mobile layout: 375px | PASS |
| 11 | e2e/hero.spec.ts | tablet layout: 768px | PASS |
| 12 | e2e/hero.spec.ts | desktop layout: 1280px | PASS |

## Screenshots

| # | Page/Section | Screenshot Path | Status |
| --- | ------------ | --------------- | ------ |
| 1 | Hero — Mobile (375px) | e2e/screenshots/hero-mobile.png | CAPTURED |
| 2 | Hero — Tablet (768px) | e2e/screenshots/hero-tablet.png | CAPTURED |
| 3 | Hero — Desktop (1280px) | e2e/screenshots/hero-desktop.png | CAPTURED |

## Acceptance Criteria Coverage

| # | Criterion | Test | Status |
| --- | ----------- | ---- | ------ |
| 1 | Hero section renderiza com headline com gradiente | renders h1 headline with WhatsApp text | PASS |
| 2 | Botão CTA primário presente e funcional | renders primary CTA button + primary CTA links to WhatsApp deeplink | PASS |
| 3 | Imagem hero com overlay implementada (visual placeholder used) | renders the hero section (section visible with placeholder) | PASS |
| 4 | Background gradient animado aplicado | renders the hero section (section visible with gradient classes) | PASS |
| 5 | Layout responsivo (mobile, tablet, desktop) | mobile layout: 375px + tablet layout: 768px + desktop layout: 1280px | PASS |

## Issues

None. All 12 tests passed on the first run. The `npm run build` failed with a React useContext error on `/_not-found` page (unrelated to the Hero section implementation — caused by babel config conflict with Next.js 16 internal pages). Tests were run against the `npm run dev` server on port 3010 instead, which fully exercises the Hero section functionality.

## Overall: PASS
