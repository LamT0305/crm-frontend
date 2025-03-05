import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Allows access from other devices
    port: 5173, // Keep it consistent with ngrok
    strictPort: true,
    allowedHosts: [".ngrok-free.app"], // Allow ngrok subdomains
    cors: true, // Enable CORS (useful for API requests)
  },
});
