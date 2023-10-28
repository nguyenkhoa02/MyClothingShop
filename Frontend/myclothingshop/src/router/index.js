import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/views/AuthenticationView.vue";
import AboutView from "@/views/AboutView.vue";
import AuthenticationView from "@/views/AuthenticationView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/authentication',
      name: 'Authentication',
      component: AuthenticationView,
    }
  ]
})

router.beforeEach((to, from, next) => {
  // const publicPages = ['', '/authentication/Login', '/authentication/SignUp'];
  const publicPages = ['/authentication'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/authentication');
  }

  next();
})

export default router
