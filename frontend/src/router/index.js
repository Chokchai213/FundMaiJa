import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import VerifyNewAccount from "../views/VerifyNewAccount.vue";
import VerifyUserFromEmail from "../views/VerifyUserFromEmail.vue";
import MyInvestment from "../views/MyInvestment.vue";
import SearchFund from "../views/SearchFund.vue";
import ChangePasswordForm from "../views/ChangePasswordForm.vue";
import { getCookie } from "../utils/CookieUtils";
const routerHistory = createWebHistory();

const routes = [
  {
    path: "/mainfeed",
    component: Main,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/myinvestment/",
    component: MyInvestment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/changepassword",
    component: ChangePasswordForm,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/searchfund",
    component: SearchFund,
    meta: {
      requiresAuth: true,
    },
  },
  ,
  {
    path: "/",
    redirect: "/signin",
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
    component: SignUp,
  },
  {
    path: "/verifyyouraccount/:email",
    name: "VerifyNewAccount",
    component: VerifyNewAccount,
  },
  {
    path: "/verify-email/:userId/:token",
    name: "VerifyUserFromEmail",
    component: VerifyUserFromEmail,
  },
];

const router = createRouter({
  history: routerHistory,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = getCookie("accessToken");
    if (token) {
      next();
    } else {
      next("/signin");
    }
  } else {
    if (from.path === "/signin") {
      window.location.reload();
    }
    next();
  }
});

//if user got redirected from signin reload to remount
router.afterEach((to, from, next) => {
  if (from.path === "/signin" || from.path === "/signup") {
    window.location.reload();
  }
});

export default router;
