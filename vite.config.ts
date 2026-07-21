import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/blog/",

  plugins: [tailwindcss()],

  server: {
    host: "127.0.0.1",
    port: 5173,

    watch: {
      ignored: ["**/node_modules/**"],
    },
  },
});
