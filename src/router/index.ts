import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NoteView from "../views/NoteView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/note",
      name: "new-note",
      component: NoteView,
      children: [
        {
          path: "/:id",
          name: "note",
          component: NoteView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {});

export default router;
