<template>
  <div class="bg-darkbg text-white font-sans min-h-screen flex flex-col selection:bg-brandgreen selection:text-black">
    
    <HeaderComponent :is-admin="false">
      <template #search>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Buscar videojuegos..." 
          class="bg-darkcard text-sm rounded-full px-4 py-2 w-64 border border-darkborder focus:outline-none focus:border-brandgreen transition-all"
        >
      </template>
    </HeaderComponent>

    <div class="flex flex-1">
      
      <aside class="w-64 border-r border-darkborder p-6 hidden md:block bg-darkbg">
        <h2 class="text-xl font-bold mb-8">Filtros</h2>
        
        <div class="mb-8">
          <h3 class="text-sm font-semibold text-brandgreen mb-4 flex justify-between items-center">
            Plataforma <span class="text-xs">▼</span>
          </h3>
          <div class="space-y-3">
            <label 
              v-for="platform in platformsList" 
              :key="platform" 
              class="flex items-center gap-3 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
            >
              <input 
                type="checkbox" 
                :value="platform"
                v-model="selectedPlatforms"
                class="accent-brandgreen w-4 h-4 rounded bg-darkcard border-darkborder"
              > 
              {{ platform }}
            </label>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-brandgreen mb-4 flex justify-between items-center">
            Género <span class="text-xs">▼</span>
          </h3>
          <div class="space-y-3">
            <label 
              v-for="genre in genresList" 
              :key="genre" 
              class="flex items-center gap-3 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
            >
              <input 
                type="checkbox" 
                :value="genre"
                v-model="selectedGenres"
                class="accent-brandgreen w-4 h-4 rounded bg-darkcard border-darkborder"
              > 
              {{ genre }}
            </label>
          </div>
        </div>
      </aside>

      <main class="flex-1 p-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold">Catálogo de Videojuegos</h2>
          <span class="text-sm text-gray-400">
            {{ filteredGames.length }} juegos encontrados
          </span>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div 
            v-for="game in filteredGames" 
            :key="game.id" 
            class="bg-darkcard rounded-xl border border-darkborder overflow-hidden flex flex-col shadow-lg group hover:border-gray-500 transition-all duration-300"
          >
            <div class="h-64 bg-gray-700 relative overflow-hidden">
              <img 
                :src="game.image" 
                :alt="game.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              >
            </div>
            
            <div class="p-4 flex flex-col flex-1">
              <h3 class="font-bold text-sm mb-4 line-clamp-2" :title="game.title">
                {{ game.title }}
              </h3>
              
              <button 
                @click="addToLibrary(game)"
                class="mt-auto w-full bg-brandgreen hover:bg-green-400 text-black text-xs font-bold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                <span class="text-lg leading-none">+</span> Añadir a mi librería
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredGames.length === 0" class="text-center py-12 text-gray-500">
          No hay videojuegos disponibles con los filtros seleccionados.
        </div>
      </main>
    </div>

  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { ref, computed } from 'vue'

// Search and multi-checkbox filters states
const searchQuery = ref('')
const selectedPlatforms = ref([])
const selectedGenres = ref([])

// Data dictionaries for list building
const platformsList = ['PlayStation 5', 'Xbox Series X', 'Nintendo Switch', 'PC']
const genresList = ['Acción', 'Aventura', 'RPG', 'Deportes']

// Mock Data catalog including relations for live filtering
const games = ref([
  { 
    id: 1, 
    title: 'The Legend of Zelda: Tears of the Kingdom', 
    platforms: ['Nintendo Switch'], 
    genres: ['Aventura', 'RPG'], 
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 2, 
    title: 'Elden Ring', 
    platforms: ['PlayStation 5', 'Xbox Series X', 'PC'], 
    genres: ['Acción', 'RPG'], 
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 3, 
    title: 'Hogwarts Legacy', 
    platforms: ['PlayStation 5', 'Xbox Series X', 'PC', 'Nintendo Switch'], 
    genres: ['Aventura', 'RPG'], 
    image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?auto=format&fit=crop&q=80&w=400' 
  }
])

// Filter Logic Pipeline
const filteredGames = computed(() => {
  return games.value.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesPlatform = selectedPlatforms.value.length === 0 || 
      game.platforms.some(p => selectedPlatforms.value.includes(p))
      
    const matchesGenre = selectedGenres.value.length === 0 || 
      game.genres.some(g => selectedGenres.value.includes(g))

    return matchesSearch && matchesPlatform && matchesGenre
  })
})

// Interaction Method
const addToLibrary = (game) => {
  console.log(`Añadiendo al inventario del usuario: ${game.title}`)
  // Aquí podrás integrar la lógica con Axios/Fetch o Pinia en el futuro
}
</script>