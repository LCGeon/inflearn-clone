import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/lecture",
    name: "lecture",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/lectureView.vue"),
  },
  {
    path: "/lodmap",
    name: "lodmap",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/lodmapView.vue"),
  },
  {
    path: "/mentoring",
    name: "mentoring",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mentoringView.vue"),
  },
  {
    path: "/community",
    name: "community",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/communityView.vue"),
  },
  {
    path: "/inflearn",
    name: "inflearn",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/inflearnView.vue"),
  },
  {
    path: "/signup",
    name: "signup",

    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/signupView.vue"),
  },
  {
    path: "/upload",
    name: "upload",

    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/uploadMainView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
