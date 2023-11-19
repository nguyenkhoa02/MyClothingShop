import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/stores/auth.store";
import AuthService from '@/services/auth.service';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/authentication',
        name: 'Authentication',
        component: () => import('@/views/AuthenticationView.vue'),
        props: true,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/product/:id",
        name: "DetailItem",
        component: () => import("@/views/DetailItemView.vue"),
        props: true,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/cart",
        name: "Cart",
        component: () => import("@/views/CartView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach(async (to, from, next) => {
    try {
        const checkAuth = await AuthService.checkAuth();
        const authStore = useAuthStore();
        if (to.meta.requiresAuth && !checkAuth) {
            console.log('Authentication failed. Redirecting to /authentication');
            return next('/authentication');
        }

        if (to.name === 'Authentication' && checkAuth) {
            console.log('Already authenticated. Redirecting to /');
            return next('/');
        }

        if (checkAuth) {
            authStore.login(checkAuth.data.token, checkAuth.data.user);
        }

        return next();
    } catch (e) {
        console.error('Error checking authentication:', e);
        return next({ name: 'Authentication' });
    }
});

export default router;