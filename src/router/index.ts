import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/:id",
      name: "note",
      component: () => import("../views/NoteView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {});

export default router;