import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import rehypeMermaid from "rehype-mermaid";

export default defineConfig({
  integrations: [alpinejs(), tailwind(), icon({ include: { ri: ["*"] } })],
  markdown: {
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          strategy: "pre-mermaid",
        },
      ],
    ],
    syntaxHighlight: {
      excludeLangs: ["mermaid", "math"],
    },
  },
  output: "static",
  site: "https://ramonpzg.github.io",
});
