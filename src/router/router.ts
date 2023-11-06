import { createRouter, createWebHistory } from 'vue-router';
import SwPlanets from '../views/SwPlanets.view.vue';

const routes = [
  {
    path: '/planets',
    name: 'SwPlanets',
    component: SwPlanets,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/planets'
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;