import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "./plugins/toast";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '@fortawesome/fontawesome-free/css/all.css';

createApp(App).use(router).use(store).use(toast).mount("#app");
