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
  {
    path: "/enrolment/:id",
    name: "enrolment",

    component: () =>
      import(/* webpackChunkName: "enrolment" */ "../views/enrolmentView.vue"),
  },
  {
    path: "/my-courses/:id",
    name: "my-courses",

    component: () =>
      import(/* webpackChunkName: "lecture" */ "../views/myCoursesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
