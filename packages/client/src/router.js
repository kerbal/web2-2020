import Vue from 'vue';
import VueRouter from 'vue-router';

// Register all routers and sub-routers from each specific pages.

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
