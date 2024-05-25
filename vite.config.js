import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        category: resolve(__dirname, "src/category.html"),
        enchantment: resolve(__dirname, "src/enchantment.html"),
      },
    },
  },
});
