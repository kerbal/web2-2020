import Vue from 'vue';
import VueRouter from 'vue-router';
import ladingRoutes from '../pages/Landing/router/index';
import dashBoardRoutes from '../pages/Dashboard/router/index';

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
