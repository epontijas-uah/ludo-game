<template>
  <ion-header class="ion-no-border">
    <div class="topbar">
      <div class="container">
        <div class="left">
          <router-link to="/" class="brand" aria-label="LudoGame home">
            <img src="/Logotipo_Blanco.png" alt="LudoGame Logo" class="logo">
            <span class="site-title">LudoGame</span>
          </router-link>
        </div>

        <nav class="main-nav" role="navigation" aria-label="Main navigation">
          <router-link to="/catalogo" class="nav-link" active-class="active">
            Catálogo
          </router-link>
          <router-link to="/biblioteca" class="nav-link" active-class="active">
            Mi Biblioteca
          </router-link>
          <router-link to="/contacto" class="nav-link" active-class="active">
            Contacto
          </router-link>
        </nav>

        <div class="right">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </ion-header>
</template>

<script setup>
import { IonHeader } from '@ionic/vue';

defineProps({
  isAdmin: { type: Boolean, default: false }
});
</script>

<style scoped>
.topbar {
  background: #2f2f2f;
  border-bottom: 1px solid #262626;
  color: #e6e6e6;
  height: 56px;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Usamos position: relative para que el menú se posicione respecto a este contenedor */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
}

.site-title {
  font-weight: 700;
  font-size: 1rem;
  color: #f3f3f3;
  letter-spacing: 0.02em;
}

/* CENTER: navegación con posicionamiento absoluto para garantizar el centro real */
.main-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 28px;
  align-items: center;
  z-index: 10;
}

.nav-link {
  color: #cfcfcf;
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.15s ease;
  padding: 6px 2px;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link.active {
  color: #00E676;
  font-weight: 600;
}

/* RIGHT */
.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

/* Responsive */
@media (max-width: 720px) {
  .main-nav {
    display: none;
  }
}
</style>