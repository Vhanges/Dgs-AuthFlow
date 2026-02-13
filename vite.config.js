import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    server: {
      watch: {
        usePolling: true,
      },
      // proxy: {
      //   "/api": {
      //     target: env.VITE_API_BASE_URL,
      //     changeOrigin: true,
      //   },
      // },
    },
  };
});
