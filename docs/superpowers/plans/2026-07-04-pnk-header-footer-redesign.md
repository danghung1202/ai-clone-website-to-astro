# PNK Header Footer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the weak current header/footer with a Tailwind UI-inspired premium mega menu, mobile drawer, and structured clinic footer while keeping the existing Astro/CSS stack.

**Architecture:** Keep navigation content in `src/data/navigation.ts`, render semantic Astro markup in `Header.astro` and `Footer.astro`, and use scoped global CSS plus a small inline script for menu state. Do not add Tailwind or a new UI runtime dependency in this pass.

**Tech Stack:** Astro 5, TypeScript data modules, existing global CSS, existing static verifier, Playwright browser QA.

---

### Task 1: Static Regression

**Files:**
- Modify: `tools/verify-static-build.mjs`

- [ ] Add checks that built home HTML includes `data-mega-menu`, `data-mobile-drawer`, `footer-treatment-group`, `footer-bottom`, and key links for Botox, Hudvård, Bokadirekt, and Allmänna villkor.
- [ ] Run `npm run verify:static`; expected result before implementation is failure on the new header/footer checks.

### Task 2: Navigation Data

**Files:**
- Modify: `src/data/navigation.ts`

- [ ] Add `megaMenuGroups` for treatment categories and featured links.
- [ ] Add `footerBottomLinks` for legal/contact utility links.
- [ ] Keep existing `navItems` and `footerGroups` exports compatible with current imports.

### Task 3: Header Markup And Behavior

**Files:**
- Modify: `src/components/Header.astro`

- [ ] Render a desktop nav shell with a `Behandlingar` trigger and full-width mega menu.
- [ ] Render a full-screen mobile drawer with treatment groups, utility nav, contact prompt, and Bokadirekt CTA.
- [ ] Update script to handle scroll tone, drawer open/close, mega menu click/keyboard close, Escape handling, and link-close behavior.

### Task 4: Footer Markup

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] Render a premium footer band with brand copy, booking CTA, treatment link groups, clinic links, contact details, and bottom legal row.
- [ ] Reuse `footerGroups`, `footerBottomLinks`, `site`, and `assets`.

### Task 5: CSS And Responsive QA

**Files:**
- Modify: `src/styles/global.css`

- [ ] Replace header/menu/footer styling with responsive premium styling matching the current black/gold/cream Venetian direction.
- [ ] Keep desktop header fixed and readable over video; keep mobile drawer full-screen and scrollable.
- [ ] Run `npm run verify:static`; expected result after implementation is pass.
- [ ] Run Playwright QA at desktop and mobile widths to verify no header/footer overflow, drawer opens/closes, and mega menu is visible/interactable.
