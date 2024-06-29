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
      api: path.resolve(__dirname, "./src/api"),
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      avatar: path.resolve(__dirname, "./src/components/Avatar"),
      container: path.resolve(__dirname, "./src/components/Container"),
      drawer: path.resolve(__dirname, "./src/components/Drawer"),
      label: path.resolve(__dirname, "./src/components/Label"),
      modals: path.resolve(__dirname, "./src/components/Modals"),
      spinners: path.resolve(__dirname, "./src/components/Spinners"),
      tinyEditor: path.resolve(__dirname, "./src/components/tinyEditor"),
      constant: path.resolve(__dirname, "./src/constant"),
      contexts: path.resolve(__dirname, "./src/contexts"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      projectHooks: path.resolve(__dirname, "./src/hooks/ProjectHooks"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      pages: path.resolve(__dirname, "./src/pages"),
      projMgmt: path.resolve(__dirname, "./src/pages/ProjMgmt"),
      userMgmt: path.resolve(__dirname, "./src/pages/UserMgmt"),
      router: path.resolve(__dirname, "./src/router"),
      schemas: path.resolve(__dirname, "./src/schemas"),
      store: path.resolve(__dirname, "./src/store"),
      drawerSlice: path.resolve(__dirname, "./src/store/quanLyDrawer"),
      modalSlice: path.resolve(__dirname, "./src/store/quanLyModal"),
      userSlice: path.resolve(__dirname, "./src/store/quanLyNguoiDung"),
      projSlice: path.resolve(__dirname, "./src/store/quanLyProject"),
      projCtgrSlice: path.resolve(
        __dirname,
        "./src/store/quanLyProjectCategory"
      ),
      spinnerSlice: path.resolve(__dirname, "./src/store/quanLySpinner"),
      template: path.resolve(__dirname, "./src/template"),
      projMgmtTpl: path.resolve(__dirname, "./src/template/ProjMgmt"),
      userMgmtTpl: path.resolve(__dirname, "./src/template/UserMgmt"),
      types: path.resolve(__dirname, "./src/types"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
