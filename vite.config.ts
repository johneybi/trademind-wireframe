import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const isProjectPages = repository !== "" && !repository.endsWith(".github.io");
  const base = process.env.GITHUB_ACTIONS && isProjectPages ? `/${repository}/` : "/";

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
