import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/styles/main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
