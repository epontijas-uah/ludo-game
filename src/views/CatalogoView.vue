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

        <!-- Estado de carga -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <svg class="animate-spin w-8 h-8 text-brandgreen" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span class="ml-3 text-gray-400 text-sm">Cargando catálogo...</span>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-center">
          <p class="text-red-400 font-bold">{{ error }}</p>
          <button @click="cargarJuegos" class="mt-3 px-4 py-2 bg-brandgreen/20 border border-brandgreen/30 text-brandgreen rounded text-sm hover:bg-brandgreen/30 transition-colors cursor-pointer">
            Reintentar
          </button>
        </div>
        
        <template v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div 
              v-for="game in filteredGames" 
              :key="game.id" 
              class="bg-darkcard rounded-xl border border-darkborder overflow-hidden flex flex-col shadow-lg group hover:border-gray-500 transition-all duration-300"
            >
              <div class="h-64 bg-gray-700 relative overflow-hidden">
                <img 
                  :src="game.image || 'https://placehold.co/400x256/1a1a2e/666?text=Sin+imagen'" 
                  :alt="game.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  @error="(e) => e.target.src = 'https://placehold.co/400x256/1a1a2e/666?text=Sin+imagen'"
                >
              </div>
              
              <div class="p-4 flex flex-col flex-1">
                <h3 class="font-bold text-sm mb-4 line-clamp-2" :title="game.title">
                  {{ game.title }}
                </h3>
                
                <button 
                  @click="addToLibrary(game)"
                  :disabled="addingId === game.id"
                  class="mt-auto w-full bg-brandgreen hover:bg-green-400 text-black text-xs font-bold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="text-lg leading-none">+</span>
                  {{ addingId === game.id ? 'Añadiendo...' : 'Añadir a mi librería' }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="filteredGames.length === 0" class="text-center py-12 text-gray-500">
            No hay videojuegos disponibles con los filtros seleccionados.
          </div>
        </template>
      </main>
    </div>

  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { getJuegosAprobados } from '@/services/juegoService'
import { agregarJuegoABiblioteca } from '@/services/bibliotecaService'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// Estados de UI
const loading = ref(false)
const error = ref(null)
const addingId = ref(null)

// Filtros
const searchQuery = ref('')
const selectedPlatforms = ref([])
const selectedGenres = ref([])

// Listas dinámicas de filtros (se construyen desde los datos del backend)
const platformsList = ref([])
const genresList = ref([])

// Juegos cargados desde el backend
const games = ref([])

// Mapea un juego del backend al formato que usa la vista
const mapearJuego = (j) => ({
  id: j.id,
  title: j.nombre || j.titulo || 'Sin título',
  platforms: j.plataformas?.map(p => p.nombre || p) || [],
  genres: j.generos?.map(g => g.nombre || g) || (j.genero ? [j.genero] : []),
  image: j.imagenUrl || j.imagen || null
})

// Carga los juegos aprobados desde el backend
const cargarJuegos = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await getJuegosAprobados()
    games.value = res.data.map(mapearJuego)

    // Construye las listas de filtros dinámicamente desde los datos reales
    const plataformasSet = new Set()
    const generosSet = new Set()
    games.value.forEach(g => {
      g.platforms.forEach(p => plataformasSet.add(p))
      g.genres.forEach(gen => generosSet.add(gen))
    })
    platformsList.value = [...plataformasSet].sort()
    genresList.value = [...generosSet].sort()
  } catch (e) {
    console.error('Error al cargar el catálogo:', e)
    error.value = 'No se pudo cargar el catálogo. Comprueba la conexión con el servidor.'
  } finally {
    loading.value = false
  }
}

// Pipeline de filtrado reactivo
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

// Añade el juego a la biblioteca del usuario autenticado
const addToLibrary = async (game) => {
  if (!authStore.usuarioId) {
    alert('Debes iniciar sesión para añadir juegos a tu biblioteca.')
    return
  }
  addingId.value = game.id
  try {
    // plataformaId: usa la primera plataforma del juego como valor por defecto
    // Ajusta esta lógica si quieres que el usuario elija la plataforma
    const plataformaId = game.platformIds?.[0] ?? 1
    await agregarJuegoABiblioteca(authStore.usuarioId, game.id, plataformaId)
    alert(`"${game.title}" añadido a tu biblioteca.`)
  } catch (e) {
    const msg = e.response?.data?.message || 'No se pudo añadir el juego.'
    alert(msg)
  } finally {
    addingId.value = null
  }
}

onMounted(cargarJuegos)
</script>