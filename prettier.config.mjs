/**
 * Formatting for the whole project: `pnpm prettier` formats every file in place.
 * @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  // Node built-ins, packages, then relative files. Side-effect imports (CSS) are never moved:
  // the plugin only sorts the imports between them.
  importOrder: ["<BUILTIN_MODULES>", "<THIRD_PARTY_MODULES>", "", "^[.]"],
  // Merges `import type { A }` and `import { b }` from the same module into `import { b, type A }`.
  importOrderTypeScriptVersion: "5.0.0",
};

export default config;
