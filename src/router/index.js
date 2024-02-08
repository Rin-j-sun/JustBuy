import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserRegistration from '../components/UserRegistration.vue';
import UserLogin from '../components/UserLogin.vue'
import ShoppingCart from "@/components/ShoppingCart.vue";
import UserOrders from "@/components/UserOrders.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/registration',
        name: 'registration',
        component: UserRegistration
    },
    {
        path:'/login',
        name:'login',
        component: UserLogin
    },
    {
        path:'/cart',
        name:'cart',
        component: ShoppingCart
    },
    {
        path:'/orders',
        name:'orders',
        component: UserOrders
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router