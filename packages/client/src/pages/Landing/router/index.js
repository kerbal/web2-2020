import Home from '../components/Home/Home.vue';
import About from '../components/About/About.vue';
import Header from '../components/Header.vue';

export default [{
  path: '',
  components: {
    default: Home,
    header: Header,
  },
}, {
  path: '/about',
  component: About,
}];
