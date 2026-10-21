import type { StaticImageData } from "next/image";

import catcam_desktop_live_dark from "../images/projects/catcam/desktop-live-dark.webp";
import catcam_desktop_live_light from "../images/projects/catcam/desktop-live-light.webp";
import catcam_desktop_recordings_dark from "../images/projects/catcam/desktop-recordings-dark.webp";
import catcam_desktop_settings_light from "../images/projects/catcam/desktop-settings-light.webp";
import catcam_mobile_filters_dark from "../images/projects/catcam/mobile-filters-dark.webp";
import catcam_mobile_live_dark from "../images/projects/catcam/mobile-live-dark.webp";
import catcam_mobile_recordings_light from "../images/projects/catcam/mobile-recordings-light.webp";
import catcam_mobile_settings_light from "../images/projects/catcam/mobile-settings-light.webp";
import concours_desktop_admin_dashboard from "../images/projects/concours/desktop-admin-dashboard.webp";
import concours_desktop_admin_design_editor from "../images/projects/concours/desktop-admin-design-editor.webp";
import concours_desktop_admin_winners from "../images/projects/concours/desktop-admin-winners.webp";
import concours_desktop_contest_landing from "../images/projects/concours/desktop-contest-landing.webp";
import concours_mobile_contest_landing from "../images/projects/concours/mobile-contest-landing.webp";
import concours_mobile_entry_address_autocomplete from "../images/projects/concours/mobile-entry-address-autocomplete.webp";
import concours_mobile_entry_confirmation from "../images/projects/concours/mobile-entry-confirmation.webp";
import concours_mobile_entry_form from "../images/projects/concours/mobile-entry-form.webp";
import jelly_desktop_downloads_search from "../images/projects/jelly/desktop-downloads-search.webp";
import jelly_desktop_torrents from "../images/projects/jelly/desktop-torrents.webp";
import jelly_desktop_transfer_progress from "../images/projects/jelly/desktop-transfer-progress.webp";
import jelly_desktop_transfers from "../images/projects/jelly/desktop-transfers.webp";
import jelly_mobile_downloads_search from "../images/projects/jelly/mobile-downloads-search.webp";
import jelly_mobile_torrents from "../images/projects/jelly/mobile-torrents.webp";
import jelly_mobile_trackers from "../images/projects/jelly/mobile-trackers.webp";
import jelly_mobile_transfers from "../images/projects/jelly/mobile-transfers.webp";
import lookaloft_desktop_aircraft from "../images/projects/lookaloft/desktop-aircraft.webp";
import lookaloft_desktop_orion_nebula from "../images/projects/lookaloft/desktop-orion-nebula.webp";
import lookaloft_desktop_sky from "../images/projects/lookaloft/desktop-sky.webp";
import lookaloft_desktop_tonight from "../images/projects/lookaloft/desktop-tonight.webp";
import lookaloft_mobile_intro from "../images/projects/lookaloft/mobile-intro.webp";
import lookaloft_mobile_pleiades from "../images/projects/lookaloft/mobile-pleiades.webp";
import lookaloft_mobile_saturn from "../images/projects/lookaloft/mobile-saturn.webp";
import lookaloft_mobile_sky from "../images/projects/lookaloft/mobile-sky.webp";
import molson_desktop_admin_teams from "../images/projects/molson/desktop-admin-teams.webp";
import molson_desktop_hero from "../images/projects/molson/desktop-hero.webp";
import molson_desktop_my_score from "../images/projects/molson/desktop-my-score.webp";
import molson_desktop_my_team from "../images/projects/molson/desktop-my-team.webp";
import molson_mobile_hero from "../images/projects/molson/mobile-hero.webp";
import molson_mobile_my_player from "../images/projects/molson/mobile-my-player.webp";
import molson_mobile_my_score from "../images/projects/molson/mobile-my-score.webp";
import molson_mobile_my_team from "../images/projects/molson/mobile-my-team.webp";
import scramble_desktop_smart_mode from "../images/projects/scramble/desktop-smart-mode.webp";
import scramble_desktop_suggestions from "../images/projects/scramble/desktop-suggestions.webp";
import scramble_desktop_training from "../images/projects/scramble/desktop-training.webp";
import scramble_desktop_wordfeud from "../images/projects/scramble/desktop-wordfeud.webp";
import scramble_mobile_home from "../images/projects/scramble/mobile-home.webp";
import scramble_mobile_keyboard from "../images/projects/scramble/mobile-keyboard.webp";
import scramble_mobile_suggestions from "../images/projects/scramble/mobile-suggestions.webp";
import scramble_mobile_training from "../images/projects/scramble/mobile-training.webp";

export type ProjectShot = { key: string; src: StaticImageData };

export type Project = {
  /** Also the key under `projects.items` in the message files */
  slug: string;
  kind: "client" | "personal";
  /** Public address of the live app, when there is one */
  url?: string;
  /** Tailwind classes for the section background and accents */
  bg: string;
  accent: string;
  accentText: string;
  card: string;
  stack: string[];
  /** Desktop screenshots (first one is shown first) and phone screenshots */
  desktop: ProjectShot[];
  mobile: ProjectShot[];
};

/**
 * Projects shown in the "Projects" section, in order.
 * Text (name, tagline, features, captions…) lives in src/messages/{fr,en}.json
 * under projects.items.<slug>.
 */
export const PROJECTS: Project[] = [
  {
    slug: "concours",
    kind: "client",
    bg: "bg-indigo-50",
    accent: "bg-indigo-600",
    accentText: "text-indigo-700",
    card: "bg-white",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "MongoDB",
      "Mongoose",
      "Zod",
      "TipTap",
      "Turborepo",
      "pnpm",
      "Docker",
      "Caddy",
      "Vitest",
      "Microsoft Graph",
    ],
    desktop: [
      { key: "desktop-contest-landing", src: concours_desktop_contest_landing },
      { key: "desktop-admin-dashboard", src: concours_desktop_admin_dashboard },
      {
        key: "desktop-admin-design-editor",
        src: concours_desktop_admin_design_editor,
      },
      { key: "desktop-admin-winners", src: concours_desktop_admin_winners },
    ],
    mobile: [
      { key: "mobile-contest-landing", src: concours_mobile_contest_landing },
      {
        key: "mobile-entry-address-autocomplete",
        src: concours_mobile_entry_address_autocomplete,
      },
      { key: "mobile-entry-form", src: concours_mobile_entry_form },
      {
        key: "mobile-entry-confirmation",
        src: concours_mobile_entry_confirmation,
      },
    ],
  },
  {
    slug: "molson",
    kind: "client",
    bg: "bg-red-50",
    accent: "bg-red-700",
    accentText: "text-red-700",
    card: "bg-white",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HeroUI",
      "next-intl",
      "MongoDB",
      "Mongoose",
      "Resend",
      "React Email",
      "node-cron",
      "Altcha",
    ],
    desktop: [
      { key: "desktop-my-team", src: molson_desktop_my_team },
      { key: "desktop-hero", src: molson_desktop_hero },
      { key: "desktop-my-score", src: molson_desktop_my_score },
      { key: "desktop-admin-teams", src: molson_desktop_admin_teams },
    ],
    mobile: [
      { key: "mobile-hero", src: molson_mobile_hero },
      { key: "mobile-my-team", src: molson_mobile_my_team },
      { key: "mobile-my-score", src: molson_mobile_my_score },
      { key: "mobile-my-player", src: molson_mobile_my_player },
    ],
  },
  {
    slug: "scramble",
    kind: "personal",
    url: "https://scramblecheetah.com",
    bg: "bg-amber-50",
    accent: "bg-amber-500",
    accentText: "text-amber-700",
    card: "bg-white",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "Better Auth",
      "MongoDB",
      "Mongoose",
      "Zod",
      "Web Workers",
      "Turborepo",
      "pnpm",
      "Vitest",
      "Docker",
      "GitHub Actions",
      "Caddy",
    ],
    desktop: [
      { key: "desktop-suggestions", src: scramble_desktop_suggestions },
      { key: "desktop-smart-mode", src: scramble_desktop_smart_mode },
      { key: "desktop-training", src: scramble_desktop_training },
      { key: "desktop-wordfeud", src: scramble_desktop_wordfeud },
    ],
    mobile: [
      { key: "mobile-suggestions", src: scramble_mobile_suggestions },
      { key: "mobile-keyboard", src: scramble_mobile_keyboard },
      { key: "mobile-training", src: scramble_mobile_training },
      { key: "mobile-home", src: scramble_mobile_home },
    ],
  },
  {
    slug: "lookaloft",
    kind: "personal",
    url: "https://lookaloft.com",
    bg: "bg-slate-100",
    accent: "bg-blue-900",
    accentText: "text-blue-900",
    card: "bg-white",
    stack: [
      "TypeScript",
      "Vite",
      "WebGL2",
      "Astronomy Engine",
      "satellite.js",
      "PWA",
      "Node.js",
      "Vitest",
      "Docker",
      "GitHub Actions",
      "Caddy",
    ],
    desktop: [
      { key: "desktop-sky", src: lookaloft_desktop_sky },
      { key: "desktop-orion-nebula", src: lookaloft_desktop_orion_nebula },
      { key: "desktop-aircraft", src: lookaloft_desktop_aircraft },
      { key: "desktop-tonight", src: lookaloft_desktop_tonight },
    ],
    mobile: [
      { key: "mobile-sky", src: lookaloft_mobile_sky },
      { key: "mobile-pleiades", src: lookaloft_mobile_pleiades },
      { key: "mobile-saturn", src: lookaloft_mobile_saturn },
      { key: "mobile-intro", src: lookaloft_mobile_intro },
    ],
  },
  {
    slug: "catcam",
    kind: "personal",
    bg: "bg-stone-100",
    accent: "bg-orange-700",
    accentText: "text-orange-700",
    card: "bg-white",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "hls.js",
      "sharp",
      "JWT",
      "Docker",
      "GitHub Actions",
      "Shinobi",
    ],
    desktop: [
      { key: "desktop-live-light", src: catcam_desktop_live_light },
      { key: "desktop-live-dark", src: catcam_desktop_live_dark },
      { key: "desktop-recordings-dark", src: catcam_desktop_recordings_dark },
      { key: "desktop-settings-light", src: catcam_desktop_settings_light },
    ],
    mobile: [
      { key: "mobile-live-dark", src: catcam_mobile_live_dark },
      { key: "mobile-recordings-light", src: catcam_mobile_recordings_light },
      { key: "mobile-filters-dark", src: catcam_mobile_filters_dark },
      { key: "mobile-settings-light", src: catcam_mobile_settings_light },
    ],
  },
  {
    slug: "jelly",
    kind: "personal",
    bg: "bg-emerald-50",
    accent: "bg-emerald-600",
    accentText: "text-emerald-700",
    card: "bg-white",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "WebSocket",
      "Turborepo",
      "Docker",
      "WireGuard",
      "qBittorrent",
      "Jackett",
      "Jellyfin",
      "GitHub Actions",
    ],
    desktop: [
      { key: "desktop-transfers", src: jelly_desktop_transfers },
      { key: "desktop-torrents", src: jelly_desktop_torrents },
      { key: "desktop-downloads-search", src: jelly_desktop_downloads_search },
      {
        key: "desktop-transfer-progress",
        src: jelly_desktop_transfer_progress,
      },
    ],
    mobile: [
      { key: "mobile-transfers", src: jelly_mobile_transfers },
      { key: "mobile-torrents", src: jelly_mobile_torrents },
      { key: "mobile-downloads-search", src: jelly_mobile_downloads_search },
      { key: "mobile-trackers", src: jelly_mobile_trackers },
    ],
  },
];
