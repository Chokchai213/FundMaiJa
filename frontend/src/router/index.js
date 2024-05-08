import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import VerifyNewAccount from "../views/VerifyNewAccount.vue";
import VerifyUserFromEmail from "../views/VerifyUserFromEmail.vue";
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
  {
    path: "/signup",
    name: "SignUp",
    component : SignUp,
  },
  {
    path:"/verifyyouraccount/:email",
    name: "VerifyNewAccount",
    component : VerifyNewAccount
  },
  {
    path:"/verify-email/:userId/:token",
    name: "VerifyUserFromEmail",
    component : VerifyUserFromEmail
  }
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;