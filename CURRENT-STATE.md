# Current State

## Project

- name: Ryan Prisco Personal Website + RP Commercial Capital
- app root: `/Users/trevor/Projects/CLAUDE/Ryan Prisco/`
- live URL: https://ryan-prisco.vercel.app
- commercial: https://ryan-prisco.vercel.app/rp-commercial.html
- GitHub: ImparioFlex/ryan-prisco (auto-deploys on push to main)

## Current Goal

Get ryanprisco.com live as Ryan's personal hub, routing visitors to either The Katalyst Team (home loans) or RP Commercial Capital (commercial). Sent to Ryan for review 2026-04-05.

## What Was Last Completed

- Built full personal site (index.html) — cream/navy/teal/lime palette, Manrope, parallax photo breaks
- Two-path content structure: Home Loans → Katalyst Team, Commercial → RP Commercial Capital
- Dedicated reverse mortgage section (navy, HECM specialist positioning)
- Blog section with 3 dummy posts + Unsplash images
- Compliance bar: NMLS# 987736, Company NMLS# 1533336, 10 licensed states, EHO logo, reverse mortgage disclaimer
- Built rp-commercial.html — Stitch design direction (Noto Serif + Manrope, navy/gold, private equity aesthetic)
- Commercial page: hero with stats bar, 4 service cards, Ryan about section, 4-step process, deal submission form
- Entrance animations on both pages, scroll reveals
- GitHub repo + Vercel deployed

## What Is In Progress

- Awaiting Ryan's review/approval before connecting domain

## Needed From Ryan Before Launch

- **ryanprisco.com DNS** — Trevor has domain in Namecheap. Point A record to `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`, then add domain in Vercel settings
- **Calendar/booking link** — Google Calendar booking URL for "Book a Call" buttons (both pages)
- **Commercial email** — deals@rpcommercialcapital.com or whatever he wants
- **Commercial phone number** — for RP Commercial Capital contact section
- **Blog decision** — placeholder posts are live; needs to decide on blog platform (custom dashboard, GHL, or skip for now)
- **Form backend** — deal submission form currently alerts on submit; needs Resend/Formspree/GHL wired up

## Next 3 Priorities

1. Connect ryanprisco.com domain once Ryan approves
2. Wire up "Book a Call" links with real calendar URL
3. Wire deal submission form to real endpoint

## Files Most Likely Involved Next

- `index.html` — main personal site
- `rp-commercial.html` — commercial capital landing page
