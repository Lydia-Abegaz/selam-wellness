---
name: Stitch Design System
description: Google Stitch design export token values and key differences from the prior palette
---

## Key Token Differences (Stitch v3 vs old app)
- `primary` is now **#9d3a17** (darker terracotta) — was #BD522D
- `primary-container` is **#bd522d** (old primary becomes the container)
- Full Material Design 3 semantic token set with `on-*`, `*-container`, `surface-*` hierarchy

## Special Utility Classes (from Stitch)
- `.tibeb-pattern` — diagonal repeating-linear-gradient cultural stripe
- `.tibeb-border` — dot-grid cultural accent
- `.glass-card` — rgba(255,248,246,0.70) + backdrop-blur(12px)
- `.organic-shape` — pebble border-radius (63% 37% 54% 46% / 55% 48% 52% 45%)
- `.soft-shadow` — 0 10px 30px -10px rgba(67,52,46,0.12)

## Typography
- Display/Headline: Be Vietnam Pro (loaded via Google Fonts CDN in index.html)
- Body/Label: Plus Jakarta Sans (loaded via @fontsource package AND Google Fonts CDN)
- Display-lg letter-spacing: -0.02em; label-sm letter-spacing: 0.04em

## Image Assets (Stitch AI-generated, copied to public/images/)
- `kuriftu-spa.png` — spa treatment room at Kuriftu Resort
- `self-care-hero.png` — modern Ethiopian self-care routine
- `beauty-icons.png` — minimalist Ethiopian beauty app icons
- `stitch-landing.png`, `stitch-home.png` — Stitch reference screens

**Why:** Stitch uses a refined primary that is darker (#9d3a17) than the old app's primary (#BD522D). The old primary becomes `primary-container`. This improves contrast ratios and aligns with Material You dynamic color spec.

**How to apply:** When adding new components, use semantic token names (`bg-primary`, `text-on-surface`, etc.) matching the Stitch Tailwind config pattern, NOT the old hex values directly.
