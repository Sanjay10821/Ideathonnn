import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/functions": {
        target: "https://qsejhzkmfiinhhsrlozl.supabase.co",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path, // keep path exactly as-is
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZWpoemttZmlpbmhoc3Jsb3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1OTc0NDcsImV4cCI6MjA4ODE3MzQ0N30.57FXWzHjMENcw7iLHHkQjPzvkqKkbeveA09RbmJHH4s');
          });
        },
      },
    },
  },
});