import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import rehypeMermaid from "rehype-mermaid";

export default defineConfig({
  integrations: [mdx(), tailwind(), icon({ include: { ri: ["*"] } })],
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
