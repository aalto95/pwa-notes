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
      path: "/note/:id",
      name: "note",
      component: () => import("../views/NoteView.vue"),
    },
    {
      path: "/note",
      name: "new-note",
      component: () => import("../views/NoteView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {});

export default router;
