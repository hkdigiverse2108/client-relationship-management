// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// lovable
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// // Vite config for the CRM frontend. Alias `@` -> /src for clean imports.
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     port: 5173,
//     open: true,
//   },
// });


import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import path from "path";

// Load env from the project root (one level above /frontend) so that the
// single CRM/.env file is shared by both frontend and backend.
export default defineConfig(({ mode }) => {
  const rootDir = path.resolve(__dirname, "..");
  const env = loadEnv(mode, rootDir, ""); // load ALL vars (no prefix filter)

  return {
    plugins: [react()],

    // Tell Vite where to look for .env files → project root
    envDir: rootDir,

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    server: {
      // Port comes from VITE_PORT in the root .env (default: 5173)
      port: parseInt(env.VITE_PORT) || 5173,
      open: true,
    },
  };
});