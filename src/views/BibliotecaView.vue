<template>
  <div class="bg-darkbg text-white font-sans min-h-screen selection:bg-brandgreen selection:text-black">
    
    <HeaderComponent :is-admin="false">
      <template #search>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar videojuegos..." 
          class="search-input"
        >
      </template>
    </HeaderComponent>

    <main class="max-w-7xl mx-auto px-8 py-12">
      <h2 class="text-3xl font-bold mb-2">Mi Biblioteca</h2>
      <p class="text-gray-400 mb-8">{{ games.length }} juegos en tu colección</p>

      <div class="bg-darkcard border border-darkborder rounded-xl p-4 flex justify-between items-center mb-8">
        <div class="flex gap-4 items-center">
          <div class="relative">
            <select 
              v-model="selectedFilter"
              class="bg-darkbg border border-darkborder rounded-lg pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-brandgreen appearance-none cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Jugado regularmente">Jugado regularmente</option>
            </select>
            <span class="absolute right-3 top-3 text-xs text-gray-400 pointer-events-none">▼</span>
          </div>
          <span class="text-sm text-gray-400 hidden md:block">
            Mostrando {{ filteredGames.length }} de {{ games.length }}
          </span>
        </div>
        
        <div class="flex gap-2">
          <button class="p-2.5 bg-darkbg rounded-lg border border-darkborder text-brandgreen">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div 
          v-for="game in filteredGames" 
          :key="game.id" 
          class="bg-darkcard rounded-xl border border-darkborder overflow-hidden relative shadow-lg group hover:border-gray-500 transition-all duration-300"
        >
          <button 
            @click="toggleFavorite(game.id)"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-darkbg/80 backdrop-blur border border-darkborder flex items-center justify-center shadow-lg z-10 transition-colors"
            :class="game.isFavorite ? 'text-goldaccent' : 'text-gray-400 hover:text-goldaccent'"
          >
            {{ game.isFavorite ? '★' : '☆' }}
          </button>

          <div class="h-64 bg-gray-700 relative overflow-hidden">
            <img 
              :src="game.image" 
              :alt="game.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            >
          </div>

          <div class="p-4">
            <h3 class="font-bold text-sm mb-3 truncate" :title="game.title">
              {{ game.title }}
            </h3>
            
            <div class="relative">
              <select 
                v-model="game.status"
                class="w-full font-bold text-xs rounded-lg py-2.5 px-3 appearance-none cursor-pointer text-center transition-colors focus:outline-none"
                :class="getStatusClasses(game.status)"
              >
                <option value="En curso">En curso</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Finalizado">Terminado</option>
                <option value="Jugado regularmente">Jugado regularmente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredGames.length === 0" class="text-center py-12 text-gray-500">
        No se encontraron juegos que coincidan con los criterios de búsqueda.
      </div>
    </main>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { ref, computed } from 'vue'

// State variables
const searchQuery = ref('')
const selectedFilter = ref('Todos')

// Mock Data structure based on your current catalog layout
const games = ref([
  { id: 1, title: 'The Legend of Zelda', status: 'En curso', isFavorite: true, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Elden Ring', status: 'Pendiente', isFavorite: false, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: "Baldur's Gate 3", status: 'Finalizado', isFavorite: false, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'Cyberpunk 2077', status: 'Jugado regularmente', isFavorite: true, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?auto=format&fit=crop&q=80&w=400' },
  { id: 5, title: 'The Legend of Zelda', status: 'En curso', isFavorite: true, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
  { id: 6, title: 'Elden Ring', status: 'Pendiente', isFavorite: false, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
  { id: 7, title: "Baldur's Gate 3", status: 'Finalizado', isFavorite: false, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400' },
  { id: 8, title: 'Cyberpunk 2077', status: 'Jugado regularmente', isFavorite: true, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?auto=format&fit=crop&q=80&w=400' },
  { id: 9, title: 'The Legend of Zelda', status: 'En curso', isFavorite: true, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
  { id: 10, title: 'Elden Ring', status: 'Pendiente', isFavorite: false, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
  { id: 11, title: "Baldur's Gate 3", status: 'Finalizado', isFavorite: false, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400' },
  { id: 12, title: 'Cyberpunk 2077', status: 'Jugado regularmente', isFavorite: true, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?auto=format&fit=crop&q=80&w=400' }
])

// Actions
const toggleFavorite = (id) => {
  const game = games.value.find(g => g.id === id)
  if (game) {
    game.isFavorite = !game.isFavorite
  }
}

// Style dictionary mapping for card selectors
const getStatusClasses = (status) => {
  switch (status) {
    case 'En curso':
      return 'bg-brandgreen text-black'
    case 'Pendiente':
      return 'bg-darkbg border border-darkborder text-gray-300'
    case 'Finalizado':
      return 'bg-coral text-white'
    case 'Jugado regularmente':
      return 'bg-goldaccent text-white'
    default:
      return 'bg-gray-600 text-white'
  }
}

// Search and Dropdown filter logic pipeline
const filteredGames = computed(() => {
  return games.value.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = selectedFilter.value === 'Todos' || game.status === selectedFilter.value
    return matchesSearch && matchesFilter
  })
})
</script>