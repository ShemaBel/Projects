import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import signUp from "../views/signUp.vue";
import login from "../views/login.vue";
import Profile from "../views/Profile.vue";
import UpdateProfile from "../components/Profile/UpdateProfile.vue";
import ErrorPage from "../views/ErrorPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signUp",
    name: "signUp",
    component: signUp,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/update-profile",
    name: "UpdateProfile",
    component: UpdateProfile,
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    // Titre basé sur la route reconnue
    document.title = `${to.name} | ${process.env.VUE_APP_TITLE || "MyApp"}`;
  } else {
    // Titre pour une route inconnue
    document.title = `Unknown Page | ${process.env.VUE_APP_TITLE || "MyApp"}`;
  }
  next();
});

export default router;
