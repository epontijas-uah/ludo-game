<template>  
  <!-- Cambiamos el div por ion-page e ion-content para que ocupe todo el alto -->  
  <ion-page class="bg-darkbg selection:bg-brandgreen selection:text-black">  
    <HeaderComponent :is-admin="false">  
      <template #search>  
        <input   
          type="text"   
          v-model="searchQuery"   
          placeholder="Buscar en mi biblioteca..."   
          class="search-input"  
        >  
      </template>  
    </HeaderComponent>  
  
    <ion-content class="ion-padding-horizontal bg-darkbg" :fullscreen="true">  
      <!-- Un contenedor con min-h-screen asegura que el fondo oscuro cubra todo -->  
      <main class="max-w-7xl mx-auto py-12 min-h-screen">  
        <h2 class="text-3xl font-bold mb-2 text-white">Mi Biblioteca</h2>  
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
        </div>  
  
        <!-- Estado de carga -->  
        <div v-if="loading" class="flex flex-col justify-center items-center py-20">  
          <svg class="animate-spin w-10 h-10 text-brandgreen" fill="none" viewBox="0 0 24 24">  
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>  
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>  
          </svg>  
          <span class="mt-4 text-gray-400">Consultando tu biblioteca...</span>  
        </div>  
  
        <!-- Error o Inicio de sesión requerido -->  
        <div v-else-if="error" class="bg-darkcard border border-darkborder shadow-xl rounded-2xl p-12 text-center max-w-lg mx-auto">  
          <div class="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">  
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>  
            </svg>  
          </div>  
          <h3 class="text-xl font-bold text-white mb-2">{{ authStore.usuarioId ? 'Error de conexión' : 'Acceso Restringido' }}</h3>  
          <p class="text-gray-400 mb-6">{{ error }}</p>  
          <button   
            v-if="!authStore.usuarioId"  
            @click="$router.push('/login')"   
            class="w-full py-3 bg-brandgreen text-black font-bold rounded-xl hover:bg-opacity-90 transition-all cursor-pointer"  
          >  
            Ir al Login  
          </button>  
          <button   
            v-else  
            @click="cargarBiblioteca"   
            class="px-8 py-3 border border-darkborder text-white rounded-xl hover:bg-darkborder transition-all cursor-pointer"  
          >  
            Reintentar  
          </button>  
        </div>  
  
        <template v-else>  
          <div v-if="filteredGames.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">  
            <GameStatusCardComponent   
              v-for="game in filteredGames"   
              :key="game.id"  
              :game="game"  
              @toggle-favorite="toggleFavorite"  
              @update-status="updateGameStatus"  
            />  
          </div>  
  
          <!-- Vista cuando no hay juegos (Vacía) -->  
          <div v-else class="text-center py-20">  
            <div class="text-6xl mb-4">🎮</div>  
            <h3 class="text-xl font-bold text-white mb-2">Tu biblioteca está vacía</h3>  
            <p class="text-gray-400 mb-8">Parece que aún no has añadido ningún juego a tu colección.</p>  
            <button   
              @click="$router.push('/catalogo')"  
              class="px-6 py-3 bg-brandgreen text-black font-bold rounded-xl hover:scale-105 transition-transform"  
            >  
              Explorar Catálogo  
            </button>  
          </div>  
        </template>  
      </main>  
    </ion-content>  
  </ion-page>  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import GameStatusCardComponent from '@/components/GameStatusCardComponent.vue'
import { getBibliotecaUsuario, actualizarEstadoJuego } from '@/services/bibliotecaService'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// Estados de UI
const loading = ref(false)
const error = ref(null)

// Filtros
const searchQuery = ref('')
const selectedFilter = ref('Todos')

// Juegos de la biblioteca del usuario
const games = ref([])

// Mapea una entrada de biblioteca del backend al formato de la vista
const mapearEntrada = (entrada) => ({
  id: entrada.id,
  juegoId: entrada.juego?.id ?? entrada.juegoId,
  title: entrada.juego?.nombre || entrada.juego?.titulo || 'Sin título',
  status: entrada.estado || 'Pendiente',
  isFavorite: entrada.favorito ?? false,
  image: entrada.juego?.imagenUrl || entrada.juego?.imagen || null
})

// Carga la biblioteca del usuario autenticado
const cargarBiblioteca = async () => {
  if (!authStore.usuarioId) {
    error.value = 'Debes iniciar sesión para ver tu biblioteca.'
    return
  }
  loading.value = true
  error.value = null
  try {
    const res = await getBibliotecaUsuario(authStore.usuarioId)
    games.value = res.data.map(mapearEntrada)
  } catch (e) {
    console.error('Error al cargar la biblioteca:', e)
    error.value = 'No se pudo cargar tu biblioteca. Comprueba la conexión con el servidor.'
  } finally {
    loading.value = false
  }
}

// Alterna favorito localmente (sin endpoint dedicado por ahora)
const toggleFavorite = (id) => {
  const game = games.value.find(g => g.id === id)
  if (game) game.isFavorite = !game.isFavorite
}

// Actualiza el estado del juego en el backend y luego en local
const updateGameStatus = async (id, newStatus) => {
  const game = games.value.find(g => g.id === id)
  if (!game) return
  const prevStatus = game.status
  game.status = newStatus // optimistic update
  try {
    await actualizarEstadoJuego(authStore.usuarioId, game.juegoId, newStatus)
  } catch (e) {
    console.error('Error al actualizar estado:', e)
    game.status = prevStatus // revertir si falla
  }
}

// Pipeline de filtrado reactivo
const filteredGames = computed(() => {
  return games.value.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = selectedFilter.value === 'Todos' || game.status === selectedFilter.value
    return matchesSearch && matchesFilter
  })
})

onMounted(cargarBiblioteca)
</script>

<style scoped>  
/* Nos aseguramos de que el fondo de ion-content sea el oscuro */  
ion-content {  
  --background: #111111; /* Tu color darkbg */  
}  
</style>