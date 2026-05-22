<template>
  <ion-header class="ion-no-border">
    <div class="topbar">
      <div class="container">
        <!-- Left: logo + título -->
        <div class="left">
          <router-link to="/" class="brand" aria-label="LudoGame home">
            <img src="/Logotipo_Blanco.png" alt="LudoGame Logo" class="logo">
            <span class="site-title">LudoGame</span>
          </router-link>
        </div>

        <!-- Center: navegación (alineada en el centro visual) -->
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

        <!-- Right: slot para acciones (buscar / idioma / avatar) -->
        <div class="right">
          <slot name="actions">
            <!-- fallback opcional (si quieres un avatar por defecto) -->
            <div v-if="showAvatarFallback" class="avatar-fallback" :title="isAdmin ? 'Admin' : 'Usuario'">
              {{ isAdmin ? 'AD' : 'MA' }}
              <span v-if="hasNotifications" class="notif-dot" aria-hidden="true"></span>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </ion-header>
</template>

<script setup>
import { IonHeader } from '@ionic/vue';
import { ref } from 'vue';

defineProps({
  isAdmin: { type: Boolean, default: false },
  hasNotifications: { type: Boolean, default: false },
  /**
   * showAvatarFallback: cuando no haya contenido en el slot "actions",
   * muestra el avatar por defecto. Puedes cambiar a false si no quieres el avatar.
   */
  showAvatarFallback: { type: Boolean, default: false }
});

const currentLang = ref('es');
</script>

<style scoped>
/* Paleta y layout general para parecerse a la imagen */
.topbar {
  background: #2f2f2f;               /* color barra */
  border-bottom: 1px solid #262626;  /* línea inferior sutil */
  color: #e6e6e6;
  height: 56px;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Contenedor centrado y con tres columnas (izq - centro - der) */
.container {
  width: 100%;
  max-width: 1200px;   /* ancho content */
  margin: 0 auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
}

/* LEFT */
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

/* CENTER: navegación */
.main-nav {
  display: flex;
  justify-content: center;    /* centra los links en la columna central */
  gap: 28px;
  align-items: center;
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
  color: #00E676; /* text-brandgreen */
  font-weight: 600;
}

/* RIGHT: slot para acciones (vacío por defecto) */
.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

/* Avatar fallback */
.avatar-fallback {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: #00E676;
  color: #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  position: relative;
}

/* notificación pequeña */
.notif-dot {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 10px;
  height: 10px;
  background: #ff6b6b; /* coral */
  border-radius: 999px;
  border: 2px solid #2f2f2f; /* borde igual que la barra para "flotar" */
}

/* Responsive: ocultar nav en pantallas muy pequeñas y dejar slot derecho visible */
@media (max-width: 720px) {
  .main-nav {
    display: none;
  }
  .container {
    grid-template-columns: auto auto; /* logo + acciones */
  }
}
</style>