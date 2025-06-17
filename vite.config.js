import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['fabric', 'react-select','html2canvas'],
  },
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      stream: 'stream-browserify',
      buffer: 'buffer-browserify',
    },
  },
  module: {
    rules: [
      {
        test: /pdf\.worker\.js$/,
        use: "worker-loader",
      },
    ],
  },  
});