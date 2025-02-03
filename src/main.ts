import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./main.css";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ToastService from "primevue/toastservice";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
    },
  },
});
app.use(ToastService);
app.mount("#app");
