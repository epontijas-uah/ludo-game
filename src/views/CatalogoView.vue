<template>
  <ion-page>
    <HeaderComponent :is-admin="false">
      <template #search>
        <input type="text" v-model="searchQuery" placeholder="Buscar videojuegos..." class="bg-darkcard text-sm rounded-full px-4 py-2 w-64 border border-darkborder focus:outline-none focus:border-brandgreen text-white">
      </template>
    </HeaderComponent>

    <ion-content class="bg-darkbg text-white">
      <div class="flex flex-1 min-h-full">
        
        <aside class="w-64 border-r border-darkborder p-6 hidden md:block bg-darkbg">
          <h2 class="text-xl font-bold mb-8">Filtros</h2>
          
          <div class="mb-8">
            <h3 class="text-sm font-semibold text-brandgreen mb-4 flex justify-between items-center">Plataforma <span>▼</span></h3>
            <div class="space-y-3">
              <label v-for="plat in platforms" :key="plat.id" class="flex items-center gap-3 text-sm text-gray-300">
                <input type="checkbox" v-model="selectedPlatforms" :value="plat.id" class="accent-brandgreen w-4 h-4 rounded"> {{ plat.name }}
              </label>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-brandgreen mb-4 flex justify-between items-center">Género <span>▼</span></h3>
            <div class="space-y-3">
              <label v-for="genre in genres" :key="genre.id" class="flex items-center gap-3 text-sm text-gray-300">
                <input type="checkbox" v-model="selectedGenres" :value="genre.id" class="accent-brandgreen w-4 h-4 rounded"> {{ genre.name }}
              </label>
            </div>
          </div>
        </aside>

        <main class="flex-1 p-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="game in filteredGames" :key="game.id" class="bg-darkcard rounded-xl border border-darkborder overflow-hidden flex flex-col shadow-lg">
              <div class="h-64 bg-gray-700 relative">
                <img :src="game.image" :alt="game.title" class="w-full h-full object-cover">
              </div>
              <div class="p-4 flex flex-col flex-1">
                <h3 class="font-bold text-sm mb-4 line-clamp-2">{{ game.title }}</h3>
                <button @click="addToLibrary(game)" class="mt-auto w-full bg-brandgreen hover:bg-green-400 text-black text-xs font-bold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2">
                  <span class="text-lg leading-none">+</span> Añadir a mi librería
                </button>
              </div>
            </div>
          </div>
        </main>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import { ref, computed } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const searchQuery = ref('');
const selectedPlatforms = ref([]);
const selectedGenres = ref([]);

const platforms = ref([
  { id: 'ps5', name: 'PlayStation 5' },
  { id: 'xbox', name: 'Xbox Series X' },
  { id: 'switch', name: 'Nintendo Switch' },
  { id: 'pc', name: 'PC' }
]);

const genres = ref([
  { id: 'action', name: 'Acción' },
  { id: 'adventure', name: 'Aventura' },
  { id: 'rpg', name: 'RPG' },
  { id: 'shooter', name: 'Shooter' }
]);

const games = ref([
  { id: 1, title: 'Elden Ring', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?auto=format&fit=crop&q=80&w=400', genres: ['rpg', 'action'], platforms: ['ps5', 'xbox', 'pc'] },
  { id: 2, title: 'Hogwarts Legacy', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?auto=format&fit=crop&q=80&w=400', genres: ['rpg', 'adventure'], platforms: ['ps5', 'xbox', 'pc', 'switch'] }
]);

const filteredGames = computed(() => {
  return games.value.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesPlatform = selectedPlatforms.value.length === 0 || game.platforms.some(p => selectedPlatforms.value.includes(p));
    const matchesGenre = selectedGenres.value.length === 0 || game.genres.some(g => selectedGenres.value.includes(g));
    return matchesSearch && matchesPlatform && matchesGenre;
  });
});

const addToLibrary = (game) => {
  console.log('Añadido a la biblioteca:', game.title);
};
</script>