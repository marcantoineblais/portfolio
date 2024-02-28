import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chats-titre': "url('./components/catcam/images/chats.png')",
        'chat-logo': "url('./components/catcam/images/catcam-logo.png')",
        'tile-texture': "url('./components/scrabble/images/tile-texture.jpg')"
      },
    },
  },
  plugins: [],
};
export default config;
