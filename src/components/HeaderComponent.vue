<template>
  <ion-header class="ion-no-border">
    <div class="flex items-center justify-between px-8 py-4 border-b border-darkborder bg-darkbg text-white">
      <div class="flex items-center gap-3">
        <img src="/Logotipo_Blanco.png" alt="LudoGame Logo" class="w-10 h-10 object-contain">
        <h1 class="text-xl font-bold tracking-wide">LudoGame</h1>
      </div>
      
      <nav class="flex gap-6 text-sm text-gray-300">
        <router-link to="/catalogo" class="hover:text-white transition-colors" active-class="text-brandgreen">
          Catálogo
        </router-link>
        <router-link to="/biblioteca" class="hover:text-white transition-colors" active-class="text-brandgreen">
          Mi Biblioteca
        </router-link>
        <router-link to="/contacto" class="hover:text-white transition-colors" active-class="text-brandgreen">
          Contacto
        </router-link>
      </nav>

      <div class="flex items-center gap-4">
        <slot name="search"></slot>

        <div class="relative">
          <select v-model="currentLang" class="bg-darkbg border border-darkborder rounded-lg pl-3 pr-8 py-2 text-xs text-gray-300 hover:text-white focus:outline-none focus:border-brandgreen appearance-none cursor-pointer font-medium transition-colors">
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
          <span class="absolute right-2.5 top-2.5 text-[10px] text-gray-400 pointer-events-none">▼</span>
        </div>

        <div class="w-8 h-8 rounded-full bg-brandgreen flex items-center justify-center text-black font-bold text-xs relative">
          {{ isAdmin ? 'AD' : 'MA' }}
          <span v-if="hasNotifications" class="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full border-2 border-darkcard"></span>
        </div>
      </div>
    </div>
  </ion-header>
</template>

<script setup>
import { IonHeader } from '@ionic/vue';
import { ref } from 'vue';

defineProps({
  isAdmin: {
    type: Boolean,
    default: false
  },
  hasNotifications: {
    type: Boolean,
    default: false
  }
});

const currentLang = ref('es');
</script>