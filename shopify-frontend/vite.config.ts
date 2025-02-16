/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base:
    import.meta.env.NODE_ENV === "production"
      ? import.meta.env.API_URL
      : import.meta.env.VITE_DEV_API_URL,
});
