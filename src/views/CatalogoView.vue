<template>
  <ion-page>
    <HeaderComponent :is-admin="false">
      <template #search>
        <div class="search-wrapper">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Buscar videojuegos..." 
            class="search-input"
          >
        </div>
      </template>
    </HeaderComponent>

    <ion-content class="catalog-content">
      <div class="catalog-container">
        <ion-grid class="ion-no-padding">
          <ion-row>
            
            <ion-col size="12" size-md="2" size-lg="2" class="filters-sidebar hidden-sm-down">
              <h2 class="sidebar-main-title">Filtros</h2>
              
              <div class="filter-group">
                <h3 class="filter-title">
                  Plataforma <span class="arrow-indicator">▼</span>
                </h3>
                <div class="checkbox-list">
                  <label 
                    v-for="platform in platformsList" 
                    :key="platform" 
                    class="checkbox-item"
                  >
                    <input 
                      type="checkbox" 
                      :value="platform"
                      v-model="selectedPlatforms"
                      class="custom-checkbox"
                    > 
                    <span class="label-text">{{ platform }}</span>
                  </label>
                </div>
              </div>

              <div class="filter-group">
                <h3 class="filter-title">
                  Género <span class="arrow-indicator">▼</span>
                </h3>
                <div class="checkbox-list">
                  <label 
                    v-for="genre in genresList" 
                    :key="genre" 
                    class="checkbox-item"
                  >
                    <input 
                      type="checkbox" 
                      :value="genre"
                      v-model="selectedGenres"
                      class="custom-checkbox"
                    > 
                    <span class="label-text">{{ genre }}</span>
                  </label>
                </div>
              </div>
            </ion-col>

            <ion-col size="12" size-md="9" size-lg="9.5" class="main-catalog-area">
              <div class="catalog-header">
                <h1 class="catalog-title">Catálogo de Videojuegos</h1>
                <span class="games-counter">
                  {{ filteredGames.length }} juegos encontrados
                </span>
              </div>

              <div v-if="loading" class="spinner-container">
                <ion-spinner name="crescent" class="custom-spinner"></ion-spinner>
                <span class="spinner-text">Cargando catálogo...</span>
              </div>

              <div v-else-if="error" class="error-container">
                <p class="error-message">{{ error }}</p>
                <ion-button @click="cargarJuegos" fill="outline" class="retry-btn">
                  Reintentar
                </ion-button>
              </div>
              
              <template v-else>
                <ion-grid class="ion-no-padding">
                  <ion-row class="games-grid-row">
                    <ion-col 
                      size="12" 
                      size-sm="6" 
                      size-md="4" 
                      size-lg="3" 
                      v-for="game in filteredGames" 
                      :key="game.id" 
                      class="game-card-col"
                    >
                      <div class="game-card">
                        <div class="image-wrapper">
                          <img 
                            :src="game.image || 'https://placehold.co/400x256/1a1a2e/666?text=Sin+imagen'" 
                            :alt="game.title" 
                            class="game-image"
                            @error="(e) => e.target.src = 'https://placehold.co/400x256/1a1a2e/666?text=Sin+imagen'"
                          >
                        </div>
                        
                        <div class="card-info">
                          <h3 class="game-card-title" :title="game.title">
                            {{ game.title }}
                          </h3>
                          
                          <ion-button 
                            @click="addToLibrary(game)"
                            :disabled="addingId === game.id"
                            expand="block"
                            class="add-library-btn"
                          >
                            <span class="plus-sign" v-if="addingId !== game.id">+</span>
                            <span>{{ addingId === game.id ? 'Añadiendo...' : 'Añadir a mi librería' }}</span>
                          </ion-button>
                        </div>
                      </div>
                    </ion-col>
                  </ion-row>
                </ion-grid>

                <div v-if="filteredGames.length === 0" class="empty-state">
                  No hay videojuegos disponibles con los filtros seleccionados.
                </div>
              </template>
            </ion-col>

          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonSpinner, IonButton } from '@ionic/vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { getJuegosAprobados } from '@/services/juegoService'
import { agregarJuegoABiblioteca } from '@/services/bibliotecaService'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const loading = ref(false)
const error = ref(null)
const addingId = ref(null)

const searchQuery = ref('')
const selectedPlatforms = ref([])
const selectedGenres = ref([])

const platformsList = ref([])
const genresList = ref([])
const games = ref([])

const mapearJuego = (j) => ({
  id: j.id,
  title: j.nombre || j.titulo || 'Sin título',
  platforms: j.plataformas?.map(p => p.nombre || p) || [],
  genres: j.generos?.map(g => g.nombre || g) || (j.genero ? [j.genero] : []),
  image: j.imagenUrl || j.imagen || null
})

const cargarJuegos = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await getJuegosAprobados()
    games.value = res.data.map(mapearJuego)

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

const addToLibrary = async (game) => {
  if (!authStore.usuarioId) {
    alert('Debes iniciar sesión para añadir juegos a tu biblioteca.')
    return
  }
  addingId.value = game.id
  try {
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

<style scoped>
.catalog-content {
  --background: var(--bg);
  --color: var(--text-primary);
  font-family: sans-serif;
}

/* Contenedor estructural centrado */
.catalog-container {
  max-w: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 12px;
  box-sizing: border-box;
}

/* Columna de Filtros Lateral */
.filters-sidebar {
  border-right: 1px solid var(--border);
  padding: 24px 24px 24px 0;
}

.sidebar-main-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 32px 0;
  color: var(--text-primary);
}

.filter-group {
  margin-bottom: 32px;
}

.filter-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--brand-green);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow-indicator {
  font-size: 0.65rem;
  color: var(--text-secondary);
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.custom-checkbox {
  accent-color: var(--brand-green);
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.label-text {
  font-size: 0.85rem;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.checkbox-item:hover .label-text {
  color: var(--text-primary);
}

/* Área del catálogo de tarjetas */
.main-catalog-area {
  padding: 24px 0 24px 24px;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
}

.catalog-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  color: var(--text-primary);
}

.games-counter {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Configuración de Rejilla de tarjetas */
.games-grid-row {
  margin: -10px;
}

.game-card-col {
  padding: 10px;
}

/* Diseño de las tarjetas de Videojuegos */
.game-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.game-card:hover {
  border-color: #555860;
}

.image-wrapper {
  width: 100%;
  height: 240px;
  background: #2a2e35;
  overflow: hidden;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.game-card:hover .game-image {
  transform: scale(1.03);
}

.card-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.game-card-title {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 16px 0;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.6em; 
}

/* Botón Añadir a Librería */
.add-library-btn {
  --background: var(--brand-green);
  --color: #000000;
  --border-radius: 8px;
  --box-shadow: none;
  font-weight: 700;
  font-size: 0.75rem;
  height: 36px;
  margin: auto 0 0 0;
}

.plus-sign {
  font-size: 1.1rem;
  margin-right: 4px;
  line-height: 0;
}

/* Spinners y Estados de Mensajes */
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  gap: 12px;
}

.custom-spinner {
  --color: var(--brand-green);
  width: 32px;
  height: 32px;
}

.spinner-text {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.error-container {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
}

.error-message {
  color: #f87171;
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0 0 16px 0;
}

.retry-btn {
  --color: var(--brand-green);
  --border-color: rgba(0, 229, 150, 0.3);
  --border-radius: 6px;
  font-size: 0.8rem;
}

.empty-state {
  text-align: center;
  padding: 48px 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}


/* Adaptación Responsiva */
@media (max-width: 768px) {
  .hidden-sm-down {
    display: none !important;
  }
  
  .main-catalog-area {
    padding: 12px 0;
  }

  .catalog-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>