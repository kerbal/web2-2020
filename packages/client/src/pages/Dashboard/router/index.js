import Home from '../components/Home/Home.vue';
import Login from '../components/Login/Login.vue';
import store from '../../../store/store';

export default [{
  path: '/dashboard',
  component: Home,
  beforeEnter: (to, from, next) => {
    if (store.state.isAuth) {
      next();
    } else {
      next('/login');
    }
  },
}, {
  path: '/login',
  component: Login,
  beforeEnter: (to, from, next) => {
    if (store.state.isAuth) {
      next('/dashboard');
    } else {
      next();
    }
  },
}];
