# Current State

## Project

- name: Ryan Prisco Personal Website + RP Commercial Capital
- app root: `/Users/trevor/Projects/CLAUDE/Ryan Prisco/`
- live URLs:
  - https://ryanprisco.com (personal hub)
  - https://rpcommercialcapital.com (commercial lending)
- GitHub: ImparioFlex/ryan-prisco (auto-deploys on push to main)
- Vercel projects (ImparioFlex team):
  - `ryan-prisco` — serves root `index.html` → ryanprisco.com
  - `rp-commercial-capital` — rootDirectory=`commercial`, serves `commercial/index.html` → rpcommercialcapital.com

## Current Goal

Domains live. Awaiting Ryan on calendar link + form backend + blog decision.

## What Was Last Completed (2026-04-21 launch)

- Both domains DNS configured + live in Namecheap + Vercel, SSL provisioned
- Email forwarding set up: `deals@rpcommercialcapital.com` → `rpcommcap@gmail.com` via Namecheap forwarder
- Live mailto link + Ryan's phone `(626) 818-1919` wired into commercial contact section
- Self-hosted all Ryan photos from `/images/` on Vercel edge (replaced slow GHL filesafe.space CDN)
  - ryan-hero.png 1.9MB → 866KB
  - photo-break.jpg 7.8MB → 369KB
- Preloaded hero image with `fetchpriority=high`, removed 280ms artificial reveal delay
- Tightened all entrance animations: 0.65–0.9s → 0.35–0.4s, translateY 22–48px → 10–16px
- Removed JS scroll-based parallax (was causing scroll jank) — static bg instead
- Split commercial into its own Vercel project (`rp-commercial-capital`, rootDir=`commercial`) so rpcommercialcapital.com serves at clean `/` URL

## What Is In Progress

- None — production state reached for initial launch

## Needed From Ryan Before Fully Done

- **Calendar/booking link** — Google Calendar booking URL for "Book a Call" buttons (both pages)
- **Form backend** — deal submission form on commercial currently alerts on submit; needs Resend/Formspree wired
- **Blog decision** — 3 placeholder posts live; pick a blog platform or remove section
- **Commercial contact phone for form** — currently only contact-section shows phone; may want phone field validation or Twilio lookup

## Next 3 Priorities (after Ryan feedback)

1. Wire `Book a Call` buttons with real calendar URL (both sites)
2. Wire commercial deal submission form to Resend
3. Decide blog direction (platform or delete)

## Files Most Likely Involved Next

- `index.html` — personal site (ryanprisco.com)
- `commercial/index.html` — commercial site (rpcommercialcapital.com)
- `vercel.json` — project-level config (minimal; cleanUrls only)
- `images/` (personal) and `commercial/images/` (commercial) — asset folders are separate per project

## Architecture Notes

- Two Vercel projects point at the **same GitHub repo** with different `rootDirectory` settings
- `cleanUrls: true` in root vercel.json only (strips .html on personal site)
- Image assets are duplicated per project — if updating Ryan's headshot, update both `/images/ryan-about.png` AND `/commercial/images/ryan-about.png`
- **Host-based rewrites in Vercel rewrites do NOT fire on static deployments** (confirmed via testing). Use separate projects or redirects (not rewrites) for host routing.
