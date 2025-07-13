import { createApp } from "vue";
import "./css/style.css";
import App from "./App.vue";

// 创建并挂载Vue应用
const mountApp = () => {
  const app = createApp(App);
  app.mount("#app");
};

// 当DOM加载完成后执行挂载
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}
