# marcblais.net — Portfolio

Bilingual (FR / EN) portfolio built with Next.js 16, next-intl and Tailwind CSS 4.

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build
pnpm lint
pnpm prettier  # format every file and sort imports
```

## Languages and URLs

The locale never shows in the URL: it comes from the `NEXT_LOCALE` cookie (or the browser's language on a first
visit). Each section has its own path per language, and the address bar follows the section on screen:

| Section  | English     | French          |
| -------- | ----------- | --------------- |
| Hero     | `/`         | `/`             |
| About    | `/about`    | `/a-propos`     |
| Projects | `/projects` | `/realisations` |
| Skills   | `/skills`   | `/competences`  |
| Contact  | `/contact`  | `/contact`      |

A path that only exists in one language (a shared `/a-propos` link) opens the site in that language. Switching
language keeps the visitor on the same spot of the page.

## Structure

| Path                         | What it is                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/app/[locale]/`          | Layout (fonts, i18n provider), the home page and `[section]/` (same page, opened on a section)     |
| `src/i18n/routing.ts`        | Locales and localized section paths                                                                |
| `src/proxy.ts`               | next-intl locale detection, plus the language of one-language paths                                |
| `src/messages/{fr,en}.json`  | **All the text on the site** — edit copy here                                                      |
| `src/components/`            | Hero, Navbar, About, Projects, Skills, Contact, Footer                                             |
| `src/lib/scrollEffects.ts`   | Scroll engine: stacked scenes, parallax (`data-speed`), reveal-on-scroll (`data-reveal`), URL sync |
| `src/lib/scrollToSection.ts` | Menu navigation: jumps close to a far section, then glides into it                                 |
| `src/data/projects.ts`       | Projects (screenshots, stack, colors); their text lives in the message files                       |
| `src/data/tech.ts`           | Technology logos + skill groups                                                                    |
