import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
const routerHistory = createWebHistory();

const routes = [
  {
    path: "/",
    component: Main
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  }
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;