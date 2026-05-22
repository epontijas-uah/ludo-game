import { createRouter, createWebHistory } from '@ionic/vue-router';
import LoginView from '@/views/LoginView.vue';
import CatalogoView from '@/views/CatalogoView.vue';
import DashboardView from '@/views/DashboardView.vue';
import BibliotecaView from '@/views/BibliotecaView.vue';
import ContactoView from '@/views/ContactoView.vue';
import DetalleView from '@/views/DetalleView.vue';

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
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: ContactoView
  },
  {
    path: '/biblioteca',
    name: 'Biblioteca',
    component: BibliotecaView
  },
  {
    path: '/juego/:id',
    name: 'juego-detalle',
    component: DetalleView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;