# Build Report — TESTE-1 Hero Section

**Date**: 2026-02-21
**Phase**: 8 — Production Build
**Agent**: Pipeline (sonnet)
**Ticket**: TESTE-1 Hero Section da Landing Page

---

## Summary

| Metric | Value |
|--------|-------|
| Build Tool | Next.js 16.1.6 (Turbopack) |
| Compile Time | ~1.8s |
| Routes | 2 (/, /_not-found) |
| Output | Static prerendering |
| Result | SUCCESS |

---

## Build Output

```
▲ Next.js 16.1.6 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 1759.7ms
  Running TypeScript ...
  Collecting page data using 9 workers ...
✓ Generating static pages using 9 workers (4/4) in 358.2ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content
```

---

## Fixes Applied During Build Phase

### 1. `eslint.config.mjs` — Add `coverage/**` to ignore list
- **Problem**: ESLint was linting `coverage/lcov-report/block-navigation.js` (generated artifact), reporting 1 warning about unused disable directive.
- **Fix**: Added `"coverage/**"` to the `globalIgnores` list.
- **Result**: 0 errors, 0 warnings.

### 2. `next.config.ts` — Set `turbopack.root`
- **Problem**: Next.js 16 + Turbopack detected multiple `package-lock.json` files in the monorepo and emitted a workspace root warning on every build.
- **Fix**: Set `turbopack.root` to `path.resolve(__dirname)` so Turbopack uses the worktree as the canonical root.
- **Result**: Warning eliminated.

### 3. `package.json` — Prefix build script with `NODE_ENV=production`
- **Problem**: The Claude Code agent environment sets a non-standard `NODE_ENV` value. Next.js 16 with Turbopack fails to prerender `/_global-error` when `NODE_ENV` is not `"production"`, throwing `TypeError: Cannot read properties of null (reading 'useContext')`.
- **Fix**: Changed `"build": "next build"` → `"build": "NODE_ENV=production next build"`.
- **Result**: Build passes in any shell environment.

### 4. `babel.config.js` — Removed
- **Problem**: `babel.config.js` at the project root was being picked up by Next.js 16 during build, forcing Babel transpilation (instead of SWC/Turbopack), which caused the `useContext` failure.
- **Fix**: Deleted `babel.config.js`. Jest uses the inline transform in `jest.config.js` (`["babel-jest", { presets: ["next/babel"] }]`), so Jest continues to work without the root-level file.
- **Result**: Build uses Turbopack as intended; Jest still passes all 35 tests.

---

## Quality Gate

| Gate | Required | Actual | Result |
|------|----------|--------|--------|
| Compile success | yes | yes | PASS |
| TypeScript check | no errors | 0 errors | PASS |
| Static page generation | complete | 4/4 | PASS |
| ESLint errors | 0 | 0 | PASS |
| ESLint warnings | 0 | 0 | PASS |

**Phase 8 Quality Gate: PASSED**
