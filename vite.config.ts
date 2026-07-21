import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  base: "/blog/",

  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        archive: resolve(__dirname, "archive.html"),
        article: resolve(__dirname, "article.html"),
        tags: resolve(__dirname, "tags.html"),
      },
    },
  },

  server: {
    host: "127.0.0.1",
    port: 5173,

    watch: {
      ignored: ["**/node_modules/**"],
    },
  },
});
