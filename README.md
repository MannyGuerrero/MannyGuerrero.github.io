# Manny Guerrero site

Two editions from one codebase. Static Next.js export for GitHub Pages.

| URL | Edition | Reader |
|---|---|---|
| `/` | Clients and Partners | Bain partners, client executives |
| `/peers/` | Peers and Hiring | Product leaders, candidates, LinkedIn audience |

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

All copy is in `src/content/site.ts`. All copy is currently confirmed, so no `c("...")` wrappers remain. If you add copy you are unsure about, wrap it in `c("...")`: it renders normally, `npm run guard` lists it with its line number, and the strict build fails until you verify the text and remove the wrapper.

## Release checklist

1. Check that `src/content/site.ts` has no `c("...")` wrappers (run `npm run guard`). Remove tiles and sections you cannot support. The industry count in the headline and counter updates itself from the tiles.
2. Create `blocklist.local.txt` from `blocklist.local.txt.example`. List every real client, product, vendor and partner name. This file is gitignored. Never commit it.
3. Run `npm run release`. It builds and runs the guard in strict mode. It must print "Guard passed."
4. Optional: `npm run og` regenerates the social preview images.
5. Push to GitHub (see Deploy).

## What the guard checks

`scripts/guard.mjs` scans the built HTML in `out/`.

| Check | Preview | `--ci` | `--release` |
|---|---|---|---|
| Blocklisted names | runs if file exists | runs if file exists | required |
| Em or en dash, double hyphen, arrow, emoji | fail | fail | fail |
| Image without alt | fail | fail | fail |
| Umbrage or Bain named outside the role line | fail | fail | fail |
| Unconfirmed `c("...")` items in the content file | warn | fail | fail |

## Deploy to GitHub Pages (separate account)

1. Create the GitHub account and a **public** repo named `YOURACCOUNT.github.io`.
2. Use the account's noreply email for commits: `git config user.email "ID+USERNAME@users.noreply.github.com"`.
3. In this folder: `git init`, `git add .`, `git commit -m "Initial site"`, add the remote, push to `main`.
4. Repo Settings, Pages, Source: **GitHub Actions**.
5. Repo Settings, Secrets and variables, Variables: add `NEXT_PUBLIC_SITE_URL` (for example `https://YOURACCOUNT.github.io`). Leave `NEXT_PUBLIC_INDEXABLE` unset while private.
6. The workflow builds and runs `guard:ci`. It fails if any unconfirmed `c("...")` copy, dash, arrow, emoji or employer leak is present. For a first deploy you can run the workflow manually (Actions, Run workflow) with **preview** checked, which only warns. The site stays noindex either way.

## Custom domain (when you have it)

1. Create `public/CNAME` containing only the domain, for example `yourname.com`.
2. DNS at the registrar: four A records for the apex pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a CNAME for `www` pointing to `YOURACCOUNT.github.io`.
3. Repo Settings, Pages, Custom domain: enter the domain. Wait for the DNS check, then tick Enforce HTTPS (can take up to 24 hours).
4. Set the repo variable `NEXT_PUBLIC_SITE_URL` to `https://yourname.com`.

## Going public (launch gate)

Do this only after Umbrage sign off.

1. Set repo variable `NEXT_PUBLIC_INDEXABLE` to `true`.
2. Edit `public/robots.txt`: replace `Disallow: /` with `Allow: /`.
3. Push. Check the LinkedIn Post Inspector for both URLs.

## Project layout

```
src/content/site.ts      all copy and numbers (edit here)
src/components/Edition.tsx   page sections for both editions
src/components/Client.tsx    reveal, counters, hero canvas
src/components/Visuals.tsx   animated diagrams: Bridge, Converge, IndustryMap
src/app/globals.css      design tokens and styles
scripts/guard.mjs        release guard
scripts/make-og.py       social preview images
scripts/make-preview.mjs self-contained preview HTML from ./out
scripts/smoke/           optional hydration smoke test (needs: npm i -D esbuild jsdom)
public/                  favicon, robots, portrait, OG images
```

## Rules baked in

1. Numbers come only from verified facts in `site.ts` (see HANDOFF.md, Numbers).
2. No client, product, vendor or partner names. Describe the thing.
3. No em dashes, en dashes, double hyphens, arrows or emoji.
4. The employer appears only in the role line.
