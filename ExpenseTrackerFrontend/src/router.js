import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import DashboardView from './views/DashboardView.vue';
import ReportsView from './views/ReportsView.vue';

const routes = [
    { path: '/', component: LoginView },
    { path: '/dashboard', component: DashboardView },
    { path: '/reports', component: ReportsView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
