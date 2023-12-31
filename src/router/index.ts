import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import getInfo from '../views/getInfo.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/getInfo',
    name: 'getInfo',
    component: getInfo,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    //https://next.router.vuejs.org/guide/advanced/lazy-loading.html
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
