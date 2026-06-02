<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button router-link="/" router-direction="root" fill="clear" aria-label="LudoGame home" class="brand-btn">
          <img :src="logoSrc" alt="LudoGame Logo" class="logo" slot="start" />
          <span class="site-title">LudoGame</span>
        </ion-button>
      </ion-buttons>

      <div slot="primary" class="main-nav">
        <ion-button
          router-link="/catalogo"
          router-direction="root"
          fill="clear"
          class="nav-link"
        >
          Catálogo
        </ion-button>
        <ion-button
          router-link="/biblioteca"
          router-direction="root"
          fill="clear"
          class="nav-link"
        >
          Mi Biblioteca
        </ion-button>
        <ion-button
          router-link="/contacto"
          router-direction="root"
          fill="clear"
          class="nav-link"
        >
          Contacto
        </ion-button>
      </div>

      <ion-buttons slot="end">
        <slot name="actions"></slot>
        <ion-button
          @click="toggleTheme"
          fill="clear"
          class="theme-btn"
          :aria-label="isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'"
        >
          <svg v-if="isDark" class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <svg v-else class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
} from '@ionic/vue';

const isDark = ref(true);

// Propiedad computada para alternar la ruta de la imagen automáticamente
const logoSrc = computed(() => {
  return isDark.value ? '/Logotipo_Blanco.png' : '/Logotipo_negro.png';
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('light-mode', !isDark.value);
};

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = prefersDark;
  document.documentElement.classList.toggle('light-mode', !prefersDark);
});
</script>

<style scoped>
ion-header {
  display: block;
}

ion-toolbar {
  --background: var(--bg-header);
  --border-color: var(--border-header);
  --border-width: 0 0 1px 0;
  --border-style: solid;
  --color: var(--text-primary);
  --min-height: 56px;
  --padding-start: 16px;
  --padding-end: 16px;
  display: flex;
  align-items: center;
  position: relative;
  transition: --background 0.25s ease, --color 0.25s ease;
}

ion-buttons[slot="start"] {
  display: inline-flex;
  align-items: center;
}

.brand-btn {
  --color: inherit;
  --background: transparent;
  --background-hover: transparent;
  --background-activated: transparent;
  --box-shadow: none;
  --padding-start: 0;
  --padding-end: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
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
  color: var(--text-primary);
  letter-spacing: 0.02em;
  transition: color 0.25s ease;
}

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
  --color: var(--text-secondary);
  --background: transparent;
  --background-hover: transparent;
  --background-activated: transparent;
  --box-shadow: none;
  --padding-start: 2px;
  --padding-end: 2px;
  font-size: 0.95rem;
  text-transform: none;
  letter-spacing: 0;
  transition: color 0.15s ease;
  height: auto;
  margin: 0;
}

.nav-link:hover {
  --color: var(--text-primary);
}

.nav-link.active {
  --color: var(--brand-green);
  font-weight: 600;
}

ion-buttons[slot="end"] {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.theme-btn {
  --color: var(--text-secondary);
  --background: transparent;
  --background-hover: transparent;
  --background-activated: transparent;
  --box-shadow: none;
  --padding-start: 6px;
  --padding-end: 6px;
  --border-radius: 8px;
  transition: color 0.2s ease;
}

.theme-btn:hover {
  --color: var(--text-primary);
}

.theme-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.theme-btn:hover .theme-icon {
  transform: rotate(20deg);
}

@media (max-width: 720px) {
  .main-nav {
    display: none;
  }
}
</style>