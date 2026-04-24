# Current State

## Project

- name: Ryan Prisco Personal Website + RP Commercial Capital + Blog + Admin
- app root: `/Users/trevor/Projects/CLAUDE/Ryan Prisco/`
- live URLs:
  - https://ryanprisco.com (home)
  - https://ryanprisco.com/commercial (RP Commercial Capital)
  - https://ryanprisco.com/blog (public blog index)
  - https://ryanprisco.com/admin (password-gated admin)
- GitHub: ImparioFlex/ryan-prisco (auto-deploys on push to main)
- Vercel project: imparioflexs-projects/ryan-prisco (framework preset: **Next.js**)

## Stack

- Next.js 16 + TS + Tailwind v4 + Supabase (free tier, shared project)
- Supabase project ref: `glqvbljjxqworcjvfrov`
- `rp_posts` table + `rp-blog-images` storage bucket (public read; RLS filters drafts)
- Admin uses password-only auth (SHA-256 cookie, no user accounts)
- Local dev: `npm run dev` on port **47480**

## Current Goal

Live site is up. Awaiting Ryan's feedback on blog preview/CMS + form wiring.

## What Was Last Completed (2026-04-24)

- **Full migration from static HTML to Next.js 16 + Supabase**
- Homepage + commercial page ported 1:1 (design preserved). Commercial CSS scoped under `.cc-scope` wrapper to prevent globals bleed; CSS vars declared in flat rule so PostCSS doesn't drop them
- New `/blog` + `/blog/[slug]` with featured hero, grid, block renderer (paragraph/header/quote/image/list), related posts, author card at bottom
- `/admin/login` + `/admin` dashboard + `/admin/new` + `/admin/edit/[id]` — five-step guided editor (title → tag → cover photo → intro → content blocks). Live full-screen Preview overlay with instant render
- Author card: 120px circular headshot, bio, "Book a Call" + "More about Ryan" CTAs — renders on both live posts AND preview
- Middleware gates every `/admin` route via httpOnly cookie. Password stored only as SHA-256 hash comparison via Web Crypto
- Supabase env vars live in Vercel production (anon key, service role key, URL, ADMIN_PASSWORD)
- Deploy troubleshooting: framework preset was "Other" (static) → changed to "Next.js" so routing works. Vercel Authentication was enabled → disabled so public can access
- Footer: "website by IMPARIO FLEX" credit → imparioflex.com (both pages)
- Nav fixes: Book a Call → Google Calendar, Commercial Lending → /commercial

## What Is In Progress

- None. Site is live, awaiting Ryan to write his first post and test the admin flow

## Admin Credentials (share with Ryan when ready)

- URL: `https://ryanprisco.com/admin/login`
- Password: `wyI4Qm0zFISKg3dZaV`
- To change password: update `ADMIN_PASSWORD` env var in Vercel + redeploy

## Needed From Ryan Before Fully Done

- **Form backend** — commercial transaction form still shows JS alert only; needs Resend + possibly GHL webhook wiring
- **Real blog post** from Ryan to pressure-test the editor + publish flow

## Next 3 Priorities

1. Wire commercial transaction form to Resend (needs sending domain verified — `mail.ryanprisco.com` or `mail.rpcommercialcapital.com`)
2. Optional: add GHL webhook alongside Resend for CRM capture
3. Onboard Ryan — walk him through /admin, create first real post

## Files Most Likely Involved Next

- `src/app/commercial/page.tsx` — contains the transaction form (currently `onSubmit = alert(...)`)
- New: `src/lib/contact-actions.ts` (not yet created) would house the Resend server action
- `src/app/page.tsx` — homepage; blog section auto-shows when posts exist

## Architecture Notes

- Single Vercel project, single domain — old setup had two Vercel projects for two domains; simplified to one Next.js app with `/commercial` as a route
- Old `rpcommercialcapital.com` Vercel project is orphaned (domain still maps there). Trevor to decide: redirect to ryanprisco.com/commercial OR add domain to this project as alias
- `_static-archive/` folder (gitignored) holds the original static HTML for reference
- PostCSS native CSS nesting is in use inside `commercial.css` — when mixing declarations with nested rules, split into two consecutive `.cc-scope {}` blocks (one flat for props/vars, one nested for child rules). PostCSS drops mixed top-level properties otherwise.
- Supabase service role key bypasses RLS — only ever imported server-side via `supabase-admin.ts` (has `import "server-only"`)
