import SignIn from "@/views/SignIn";
import { createRouter, createWebHistory } from "vue-router";
import AnalyticsPage from "@/views/AnalyticsPage";

const routes = [
  {
    path: "/",
    component: SignIn,
  },
  {
    path: "/analytics",
    component: AnalyticsPage,
    name: "Analytics",
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
