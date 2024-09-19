import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/daily-temperature",
      name: "daily-temperature",
      component: () => import("../views/DailyTemperatureView.vue"),
    },
  ],
});

export default router;
