<template>
  <ion-page>
    <HeaderComponent :is-admin="false">
      <template #search>
        <div class="search-wrapper">
          <input   
            type="text"   
            v-model="searchQuery"   
            placeholder="Buscar en mi biblioteca..."   
            class="search-input"  
          >
        </div>
      </template>
    </HeaderComponent>
  
    <ion-content class="library-content" :fullscreen="true">
      <div class="library-container">
        
        <header class="library-header-section">
          <h2 class="library-main-title">Mi Biblioteca</h2>  
          <p class="library-subtitle">{{ games.length }} juegos en tu colección</p>  
        </header>
  
        <div class="filter-bar">  
          <div class="filter-controls">  
            <div class="select-wrapper">  
              <select   
                v-model="selectedFilter"  
                class="custom-select"   
              >  
                <option value="Todos">Todos</option>  
                <option value="En curso">En curso</option>  
                <option value="Finalizado">Finalizado</option>  
                <option value="Pendiente">Pendiente</option>  
                <option value="Jugado regularmente">Jugado regularmente</option>  
              </select>  
              <span class="select-arrow">▼</span>  
            </div>  
            <span class="filter-counter-text hidden-sm-down">  
              Mostrando {{ filteredGames.length }} de {{ games.length }}  
            </span>  
          </div>  
        </div>  
  
        <div v-if="loading" class="spinner-container">  
          <ion-spinner name="crescent" class="custom-spinner"></ion-spinner>
          <span class="spinner-text">Consultando tu biblioteca...</span>  
        </div>  
  
        <div v-else-if="error" class="error-panel">  
          <div class="error-icon-box">  
            <svg class="error-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>  
            </svg>  
          </div>  
          <h3 class="error-title">
            {{ authStore.usuarioId ? 'Error de conexión' : 'Acceso Restringido' }}
          </h3>  
          <p class="error-desc">{{ error }}</p>  
          
          <ion-button   
            v-if="!authStore.usuarioId"  
            @click="$router.push('/login')"   
            expand="block"
            class="action-btn"  
          >  
            Ir al Login  
          </ion-button>  
          <ion-button   
            v-else  
            @click="cargarBiblioteca"   
            fill="outline"
            class="retry-btn"  
          >  
            Reintentar  
          </ion-button>  
        </div>  
  
        <template v-else>  
          <ion-grid class="ion-no-padding" v-if="filteredGames.length > 0">
            <ion-row class="library-grid-row">
              <ion-col
                size="12"
                size-sm="6"
                size-md="4"
                size-lg="3"
                v-for="game in filteredGames"   
                :key="game.id"
                class="game-card-col"
              >
                <GameStatusCardComponent   
                  :game="game"   
                  @toggle-favorite="toggleFavorite"   
                  @update-status="updateGameStatus"   
                />  
              </ion-col>
            </ion-row>
          </ion-grid>  
  
          <div v-else class="empty-state">  
            <div class="empty-icon-box">
              <svg class="empty-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>  
            <h3 class="empty-title">Tu biblioteca está vacía</h3>  
            <p class="empty-desc">Parece que aún no has añadido ningún juego a tu colección.</p>  
            <ion-button   
              @click="$router.push('/catalogo')"  
              class="action-btn explore-btn"  
            >  
              Explorar Catálogo  
            </ion-button>  
          </div>  
        </template>  

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonSpinner, IonButton } from '@ionic/vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import GameStatusCardComponent from '@/components/GameStatusCardComponent.vue'
import { getBibliotecaUsuario, actualizarEstadoJuego } from '@/services/bibliotecaService'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const loading = ref(false)
const error = ref(null)

const searchQuery = ref('')
const selectedFilter = ref('Todos')
const games = ref([])

const mapearEntrada = (entrada) => ({
  id: entrada.id,
  juegoId: entrada.juego?.id ?? entrada.juegoId,
  title: entrada.juego?.nombre || entrada.juego?.titulo || 'Sin título',
  status: entrada.estado || 'Pendiente',
  isFavorite: entrada.favorito ?? false,
  image: entrada.juego?.imagenUrl || entrada.juego?.imagen || null
})

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

const toggleFavorite = (id) => {
  const game = games.value.find(g => g.id === id)
  if (game) game.isFavorite = !game.isFavorite
}

const updateGameStatus = async (id, newStatus) => {
  const game = games.value.find(g => g.id === id)
  if (!game) return
  const prevStatus = game.status
  game.status = newStatus 
  try {
    await actualizarEstadoJuego(authStore.usuarioId, game.juegoId, newStatus)
  } catch (e) {
    console.error('Error al actualizar estado:', e)
    game.status = prevStatus 
  }
}

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
.library-content {  
  --background: var(--bg);
  --color: var(--text-primary);
  font-family: sans-serif;
}  

/* Contenedor estructural centralizado */
.library-container {
  max-w: 1300px;
  width: 80%;
  margin: 0 auto;
  padding: 48px 24px;
  box-sizing: border-box;
}

.library-header-section {
  margin-bottom: 8px;
}

.library-main-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 0 6px 0;
  color: var(--text-primary);
}

.library-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0 0 32px 0;
}

/* Barra de Filtros superior */
.filter-bar {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.select-wrapper {
  position: relative;
  display: inline-block;
}

.custom-select {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 40px 10px 16px;
  font-size: 0.85rem;
  color: var(--text-primary);
  outline: none;
  appearance: none;
  cursor: pointer;
  min-width: 180px;
  transition: border-color 0.2s ease;
}

.custom-select:focus {
  border-color: var(--brand-green);
}

.select-arrow {
  position: absolute;
  right: 14px;
  top: 14px;
  font-size: 0.65rem;
  color: var(--text-secondary);
  pointer-events: none;
}

.filter-counter-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Rejilla estructural */
.library-grid-row {
  margin: -12px;
}

.game-card-col {
  padding: 12px;
}

/* Spinners y cargas */
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  gap: 16px;
}

.custom-spinner {
  --color: var(--brand-green);
  width: 40px;
  height: 40px;
}

.spinner-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Panel de Error y bloqueos */
.error-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  max-w: 480px;
  margin: 40px auto 0 auto;
}

.error-icon-box {
  background: rgba(239, 68, 68, 0.1);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px auto;
}

.error-svg {
  width: 32px;
  height: 32px;
  color: #ef4444;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.error-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 24px 0;
  line-height: 1.4;
}

/* Estado Vacío */
.empty-state {
  text-align: center;
  padding: 80px 0;
  max-w: 420px;
  margin: 0 auto;
}

.empty-icon-box {
  margin-bottom: 20px;
  color: var(--text-muted);
}

.empty-svg {
  width: 64px;
  height: 64px;
  margin: 0 auto;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.empty-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 32px 0;
  line-height: 1.5;
}

/* Botones Comunes de Acción */
.action-btn {
  --background: var(--brand-green);
  --color: #000000;
  --border-radius: 10px;
  --box-shadow: none;
  font-weight: 700;
  font-size: 0.85rem;
  height: 44px;
  margin: 0;
}

.explore-btn {
  transition: transform 0.2s ease;
}

.explore-btn:hover {
  transform: scale(1.03);
}

.retry-btn {
  --color: var(--text-primary);
  --border-color: var(--border);
  --border-radius: 10px;
  font-size: 0.85rem;
  height: 44px;
  padding-left: 32px;
  padding-right: 32px;
}

/* Buscador Header */
.search-input {
  background: #22252a;
  border: 1px solid #2e3238;
  color: #ffffff;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 0.85rem;
  outline: none;
  width: 240px;
}

/* Media Queries Responsivas */
@media (max-width: 768px) {
  .hidden-sm-down {
    display: none !important;
  }

  .library-container {
    padding: 24px 16px;
  }

  .filter-bar {
    padding: 12px;
  }

  .custom-select {
    min-width: 100%;
    width: 100%;
  }

  .filter-controls {
    width: 100%;
  }

  .select-wrapper {
    width: 100%;
  }
}
</style>