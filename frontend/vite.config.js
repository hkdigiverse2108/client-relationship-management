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
import viteCompression from "vite-plugin-compression";
import { fileURLToPath, URL } from "node:url";
import path from "path";

// Load env from the project root (one level above /frontend) so that the
// single CRM/.env file is shared by both frontend and backend.
export default defineConfig(({ mode }) => {
  const rootDir = path.resolve(__dirname, "..");
  const env = loadEnv(mode, rootDir, ""); // load ALL vars (no prefix filter)

  return {
    plugins: [
      react(),
      viteCompression({ algorithm: "gzip" }) // Add compression plugin
    ],

    // Build optimizations for chunk splitting
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("chart.js") || id.includes("react-chartjs-2") || id.includes("recharts")) return "vendor-charts";
              if (id.includes("react-big-calendar") || id.includes("date-fns") || id.includes("dayjs")) return "vendor-calendar";
              if (id.includes("jspdf") || id.includes("jspdf-autotable")) return "vendor-pdf";
              if (id.includes("react-icons") || id.includes("sweetalert2") || id.includes("react-hot-toast") || id.includes("ux4g-web-components")) return "vendor-ui";
              if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom") || id.includes("axios")) return "vendor-core";
              return "vendor";
            }
          }
        }
      }
    },

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