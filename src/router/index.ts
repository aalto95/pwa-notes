import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/note',
      name: 'new-note',
      component: () => import('../views/NoteView.vue'),
      children: [
        {
          path: '/:id',
          name: 'note',
          component: () => import('../views/NoteView.vue')
        }
      ]
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    }
  ]
});

router.beforeEach(async (to, from) => {});

export default router;
