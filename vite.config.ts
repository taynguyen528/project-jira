import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, "./src/assets"),
            components: path.resolve(__dirname, "./src/components"),
            layouts: path.resolve(__dirname, "./src/layouts"),
            template: path.resolve(__dirname, "./src/template"),
            contexts: path.resolve(__dirname, "./src/contexts"),
            constant: path.resolve(__dirname, "./src/constant"),
            hooks: path.resolve(__dirname, "./src/hooks"),
            store: path.resolve(__dirname, "./src/store"),
            types: path.resolve(__dirname, "./src/types"),
            utils: path.resolve(__dirname, "./src/utils"),
            api: path.resolve(__dirname, "./src/api"),
            schemas: path.resolve(__dirname, "./src/schemas"),
            router: path.resolve(__dirname, "./src/router"),
            pages: path.resolve(__dirname, "./src/pages"),
        },
    },
});
