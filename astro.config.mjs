import { defineConfig } from "astro/config"
import db from "@astrojs/db"
import vercel from "@astrojs/vercel/serverless"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config

export default defineConfig({
	output: "server",
	integrations: [db(), tailwind()],
	adapter: vercel(),
	markdown: {
		shikiConfig: {
			theme: "dracula", // Set the theme for your code blocks.
			langs: ["javascript", "typescript", "python", "php"], // Extend the supported languages, if needed.
			wrap: true, // Avoid horizontal scrolling with word wrapping.
		},
	},
})
