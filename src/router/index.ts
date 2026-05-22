import { createRouter, createWebHistory } from '@ionic/vue-router';
import LoginView from '@/views/LoginView.vue';
import CatalogoView from '@/views/CatalogoView.vue';
import DashboardView from '@/views/DashboardView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/catalogo',
    name: 'Catalogo',
    component: CatalogoView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;