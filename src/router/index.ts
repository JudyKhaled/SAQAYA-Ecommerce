import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import Contact from "../views/Contact.vue";
import About from "../views/About.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/products", name: "Products", component: Products },
  { path: "/contact", name: "Contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
