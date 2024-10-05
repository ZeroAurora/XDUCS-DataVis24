import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/daily-temperature",
      name: "daily-temperature",
      component: () => import("../views/DailyTemperatureView.vue"),
    },
    {
      path: "/spatial-plot",
      name: "spatial-plot",
      component: () => import("../views/SpatialPlotView.vue"),
    },
  ],
});

export default router;
