<template>
  <ion-page>
    <HeaderComponent :is-admin="true" :has-notifications="true" />

    <ion-content class="bg-darkbg text-white">
      <div class="flex flex-1 overflow-hidden min-h-full">
        
        <aside class="w-64 bg-darkcard border-r border-darkborder flex flex-col hidden md:flex">
          <nav class="p-6 space-y-2 flex-1 mt-4">
            <h3 class="text-xs font-bold text-gray-500 mb-4 px-4 tracking-wider uppercase">Menú Principal</h3>
            <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-darkbg text-goldaccent font-bold border-l-2 border-goldaccent">
              <span>Estadísticas</span>
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-darkbg hover:text-white transition-colors">
              <span>Catálogo</span>
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-darkbg hover:text-white transition-colors">
              <span>Sugerencias de juegos</span>
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-darkbg hover:text-white transition-colors">
              <span>Fotos pendientes</span>
            </a>
          </nav>
          
          <div class="p-6 border-t border-darkborder flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-darkbg border border-darkborder flex justify-center items-center text-gray-300 font-bold text-xs">AD</div>
              <div class="text-sm">
                <p class="font-bold text-white">Admin</p>
                <p class="text-xs text-gray-500">admin@ludogame.com</p>
              </div>
            </div>
          </div>
        </aside>

        <main class="flex-1 overflow-y-auto p-8 bg-darkbg">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-white">Panel de Control</h2>
            <p class="text-gray-400 text-sm">Bienvenido de nuevo, Admin</p>
          </div>

          <div class="mb-10">
            <h3 class="text-lg font-bold text-white mb-4">Juegos por Género</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="genre in genreStats" :key="genre.name" class="bg-darkcard border border-darkborder rounded-xl p-6 relative shadow-lg">
                <div class="flex items-center gap-4 mb-4">
                  <div>
                    <p class="text-2xl font-bold text-white">{{ genre.count }}</p>
                    <p class="text-sm text-gray-400">{{ genre.name }}</p>
                  </div>
                </div>
                <div class="w-full bg-darkbg h-1.5 rounded-full mt-4">
                  <div class="bg-cyanaccent h-1.5 rounded-full" :style="{ width: genre.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-6 flex justify-between items-end">
            <div>
              <h3 class="text-lg font-bold text-white">Juegos Sugeridos por Usuarios</h3>
              <p class="text-sm text-gray-400">{{ suggestions.length }} sugerencias pendientes de revisión</p>
            </div>
            <span class="px-3 py-1 bg-cyanaccent/10 border border-cyanaccent/20 text-cyanaccent rounded-full text-xs font-bold">{{ suggestions.length }} pendientes</span>
          </div>

          <div class="bg-darkcard border border-darkborder rounded-xl overflow-hidden shadow-lg">
            <table class="w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-transparent border-b border-darkborder text-gray-400 text-xs uppercase font-semibold">
                <tr>
                  <th class="p-4 px-6">Título</th>
                  <th class="p-4">Usuario</th>
                  <th class="p-4">Plataforma</th>
                  <th class="p-4">Género</th>
                  <th class="p-4">Fecha</th>
                  <th class="p-4">Estado</th>
                  <th class="p-4 px-6 text-end">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-darkborder/50">
                <tr v-for="item in suggestions" :key="item.title" class="hover:bg-darkbg/50 transition-colors group">
                  <td class="p-4 px-6 font-bold text-white">{{ item.title }}</td>
                  <td class="p-4 text-gray-300">{{ item.user }}</td>
                  <td class="p-4">
                    <span class="px-3 py-1 bg-darkbg border border-darkborder rounded text-xs text-gray-300">
                      {{ item.platform }}
                    </span>
                  </td>
                  <td class="p-4 text-gray-400">{{ item.genre }}</td>
                  <td class="p-4 text-gray-400">{{ item.date }}</td>
                  <td class="p-4">
                    <span class="px-3 py-1 bg-yellow-900/30 text-goldaccent rounded-full text-xs font-bold border border-goldaccent/20">
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="p-4 px-6 flex gap-2 justify-end">
                    <button @click="processSuggestion(item, 'approve')" class="px-3 py-1.5 bg-brandgreen hover:bg-green-400 text-black font-bold rounded text-xs transition-colors">Añadir</button>
                    <button @click="processSuggestion(item, 'reject')" class="px-3 py-1.5 bg-coral hover:bg-red-400 text-white font-bold rounded text-xs transition-colors">Descartar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import { ref } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const genreStats = ref([
  { name: 'Acción', count: 1834, percentage: 85 },
  { name: 'Shooter', count: 1256, percentage: 65 },
  { name: 'Carreras', count: 687, percentage: 35 },
  { name: 'Puzzle', count: 423, percentage: 20 }
]);

const suggestions = ref([
  { title: 'Ninja Shadows', user: 'Laura Torres', platform: 'Nintendo', genre: 'Aventura', date: '11 ene', status: 'Pendiente' }
]);

const processSuggestion = (item, action) => {
  console.log(`Acción ${action} ejecutada sobre el juego: ${item.title}`);
};
</script>