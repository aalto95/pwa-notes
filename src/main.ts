import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import router from "./router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);
app.mount("#app");
