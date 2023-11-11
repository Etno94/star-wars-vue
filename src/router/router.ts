import { createRouter, createWebHistory } from 'vue-router';
import SwPlanets from '../pages/views/Planets/SwPlanets.view.vue';
import PageNotFound from '../pages/not-found/404.view.vue';
import CoomingSoon from '../pages/CoomingSoon.view.vue';
import HomePlanet from '../pages/views/Home/Home.view.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePlanet,
  },
  {
    path: '/planets',
    name: 'SwPlanets',
    component: SwPlanets,
  },
  {
    path: '/films',
    name: 'SwFilms',
    component: CoomingSoon,
  },
  {
    path: '/people',
    name: 'SwPeople',
    component: CoomingSoon,
  },
  {
    path: '/species',
    name: 'SwSpecies',
    component: CoomingSoon,
  },
  {
    path: '/starships',
    name: 'SwStarships',
    component: CoomingSoon,
  },
  {
    path: '/vehicles',
    name: 'SwVehicles',
    component: CoomingSoon,
  },
  {
    path: '/not-found',
    name: 'Page404',
    component: PageNotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/not-found'
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;