import Vue from 'vue';
import VueRouter from 'vue-router';
import ladingRoutes from '../pages/Landing/router/index';
import dashBoardRoutes from '../pages/Dashboard/router/index';

// Register all routers and sub-routers from each specific pages.

Vue.use(VueRouter);

const routes = [
  ...dashBoardRoutes,
  ...ladingRoutes,
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
