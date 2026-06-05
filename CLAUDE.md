# Ooho Website — Project Guide

## What we're building
The Ooho agency website. Interactive, scroll-driven, modern. Pages: Work, Services, Pricing, Approach, Book a Call. Resources: Writing, Twitter/X, LinkedIn, Terms of Service.

Reference aesthetic: offmenu.design — minimal, generous whitespace, confident typography, AI-native studio feel. Work speaks louder than decoration.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 (custom tokens in `tailwind.config.js`) |
| Animation | GSAP + ScrollTrigger |
| Routing | React Router v6 |
| Font | Archivo (Google Fonts — variable font) |

---

## Design Reference

See [`DESIGN.md`](./DESIGN.md) — Awesomic style reference (white canvas, bold monochrome). This drives the token system below.

---

## Design Tokens

### Colors

| Token | Value | Role |
|---|---|---|
| `midnight-ink` | `#09090b` | Primary text, headings, filled buttons |
| `graphite` | `#3f3f46` | Secondary text, ghost button text/border |
| `steel-gray` | `#71717a` | Icons, subtle decorative accents |
| `silver-mist` | `#a1a1aa` | Helper text, placeholders, subtle borders |
| `faded-gray` | `#d4d4d8` | Light borders and dividers |
| `cloud-white` | `#ffffff` | Page background, card surfaces, text on dark |
| `canvas-white` | `#f4f4f5` | Secondary section backgrounds, input fields |
| `whisper-gray` | `#ececee` | Elevated card backgrounds |
| `jet-black` | `#18181b` | High-contrast text on white, icon fills |
| `deep-gray` | `#222222` | Link colors, soft-contrast text |
| `vibrant-magenta` | `#fe45e2` | Accent — highlights and decorative only |
| `ember-glow` | `#ff5a00` | Status badges and urgency indicators only |

Accent colors (`vibrant-magenta`, `ember-glow`) are reserved for specific highlights — do not use as primary CTA colors.

### Typography Scale
Font: **Archivo** (all weights, variable). Sizes from `DESIGN.md`:

| Token | Size | Line Height | Usage |
|---|---|---|---|
| `caption` | 10px | 1.50 | Fine print, meta |
| `body` | 14px | 1.56 | Standard body copy |
| `body-lg` | 16px | 1.62 | Lead body copy |
| `subheading` | 18px | 1.64 | Sub-section labels |
| `heading` | 32px | 1.28 | Section headers |
| `heading-lg` | 40px | 1.25 | Large section headers |
| `display-sm` | 56px | 1.12 | Hero sub-headlines |
| `display` | 64px | 1.00 | Hero headlines |

### Spacing
Base 4px grid. Key values: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 64, 68, 80, 120.

Layout constants: section gap 40px · card padding 28px · element gap 8px.

### Border Radius
| Use | Value | Tailwind token |
|---|---|---|
| Cards | 36px | `rounded-cards` |
| Smaller cards | 28px | `rounded-cards-sm` |
| Badges / inputs / buttons / nav | 12px | `rounded-badges` etc. |
| Image masks | 48px | `rounded-image-masks` |
| Icon containers | 40px | `rounded-icon` |
| Large elements | 64px | `rounded-elements-lg` |

---

## Navigation Structure
```
Primary:  Work · Services · Pricing · Approach · Book a Call
Resources: Writing · Twitter/X · LinkedIn · Terms of Service
```
Nav opens as a full-screen dark overlay (ink background, large Archivo type — as per design screenshot).

---

## Conventions

- **No comments** unless the WHY is non-obvious.
- **Components** live in `src/components/`. Pages in `src/pages/`.
- **Tailwind only** — no inline styles, no CSS modules, no styled-components.
- **GSAP** for all animation. No CSS keyframes for complex sequences.
- Prefer `clamp()` for fluid type scaling between breakpoints.
- Mobile-first responsive. Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

---

## Project Structure
```
src/
  components/
    Nav.tsx
    Footer.tsx
    ui/           ← primitive components (Button, Tag, etc.)
  pages/
    Home.tsx
    Work.tsx
    Services.tsx
    Pricing.tsx
    Approach.tsx
  lib/
    gsap.ts       ← GSAP setup / plugin registration
  styles/
    globals.css   ← Tailwind directives + @font-face
  App.tsx
  main.tsx
```

---

## Status
- [ ] Vite + React + Tailwind scaffolded
- [ ] Tailwind tokens configured
- [ ] Archivo font loaded
- [ ] Nav component
- [ ] Styleguide page (`/styleguide`)
- [ ] Home page
- [ ] Remaining pages
- [ ] Accent colors locked
