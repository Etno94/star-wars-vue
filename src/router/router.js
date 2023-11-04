import { createRouter, createWebHistory } from 'vue-router';
import BSTable from '../components/table.component.vue';

const routes = [
  {
    path: '/',
    name: 'Table',
    component: BSTable,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;