import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    // 1. Forces Vite to use IPv4 instead of letting VS Code get confused by IPv6 localhost
    host: "127.0.0.1",
    port: 5173,

    // 2. Prevents the file watcher from choking on node_modules
    watch: {
      ignored: ["**/node_modules/**"],
      // If you are using WSL (Windows Subsystem for Linux),
      // uncomment the line below to force file polling:
      // usePolling: true,
    },
  },
});
