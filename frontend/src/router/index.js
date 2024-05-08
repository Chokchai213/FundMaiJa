import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import SignIn from "../views/SignIn.vue";
const routerHistory = createWebHistory();

const routes = [
  {
    path: "/",
    component: Main
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;