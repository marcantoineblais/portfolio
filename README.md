# marcblais.xyz — Portfolio

Bilingual (FR / EN) portfolio built with Next.js 16, next-intl and Tailwind CSS 4.

```bash
pnpm install
pnpm dev     # http://localhost:3000 → redirects to /fr or /en
pnpm build
```

## Structure

| Path | What it is |
| --- | --- |
| `src/app/[locale]/` | Layout (metadata, fonts, i18n provider) and the single page |
| `src/proxy.ts` | next-intl locale detection / redirect (`/` → `/fr` or `/en`) |
| `src/messages/{fr,en}.json` | **All the text on the site** — edit copy here |
| `src/components/` | Hero, Navbar, About, Projects, Skills, Experience, Contact, Footer |
| `src/components/ScrollEffects.tsx` | Parallax (`data-speed`), reveal-on-scroll (`data-reveal`) and timeline progress |
| `src/data/tech.ts` | Technology logos + skill groups |

## To fill in

- **Experience timeline** — replace the `[bracketed]` placeholders in `experience.items` of both message files.
- **Resume** — drop `public/cv-fr.pdf` and `public/cv-en.pdf` (or a single `public/cv.pdf`). The download buttons appear automatically on the next build.
- **Photo** — the "MAB" monogram in the About card (`src/components/About.tsx`) can be swapped for a `next/image` portrait.
