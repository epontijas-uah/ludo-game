<template>
  <ion-page>
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

    <ion-content>
      <div class="catalog-container">
        
        <aside class="sidebar-filters">
          <h2 class="sidebar-title">Filtros</h2>
          
          <div class="filter-group">
            <h3 class="filter-header" @click="isPlatformOpen = !isPlatformOpen">
              Plataforma 
              <span class="arrow" :class="{ 'arrow-rotated': !isPlatformOpen }">▼</span>
            </h3>
            <div v-show="isPlatformOpen" class="options-list">
              <label v-for="plat in platforms" :key="plat.id" class="option-item">
                <input type="checkbox" v-model="selectedPlatforms" :value="plat.id" class="checkbox-input"> 
                {{ plat.name }}
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h3 class="filter-header" @click="isGenreOpen = !isGenreOpen">
              Género 
              <span class="arrow" :class="{ 'arrow-rotated': !isGenreOpen }">▼</span>
            </h3>
            <div v-show="isGenreOpen" class="options-list">
              <label v-for="genre in genres" :key="genre.id" class="option-item">
                <input type="checkbox" v-model="selectedGenres" :value="genre.id" class="checkbox-input"> 
                {{ genre.name }}
              </label>
            </div>
          </div>
        </aside>

        <main class="main-content">
          <div class="main-content-header">
            <h2 class="catalog-main-title">Catálogo de Videojuegos</h2>
            <span class="results-count">{{ filteredGames.length }} juegos encontrados</span>
          </div>

          <div class="games-grid">
            <GameCardComponent 
              v-for="game in filteredGames" 
              :key="game.id"
              :title="game.title"
              :image="game.image"
              @add-click="addToLibrary(game)"
            />
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
import GameCardComponent from '@/components/GameCardComponent.vue';

const searchQuery = ref('');
const selectedPlatforms = ref([]);
const selectedGenres = ref([]);

const isPlatformOpen = ref(true);
const isGenreOpen = ref(true);

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
  { id: 2, title: 'Hogwarts Legacy', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?auto=format&fit=crop&q=80&w=400', genres: ['rpg', 'adventure'], platforms: ['ps5', 'xbox', 'pc', 'switch'] },
  { id: 3, title: 'Cyberpunk 2077', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?auto=format&fit=crop&q=80&w=400', genres: ['rpg', 'shooter'], platforms: ['ps5', 'xbox', 'pc'] },
  { id: 4, title: 'The Legend of Zelda: Tears of the Kingdom', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?auto=format&fit=crop&q=80&w=400', genres: ['adventure', 'rpg'], platforms: ['switch'] }
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

<style scoped>
ion-content {
  --background: #333333;
  color: #ffffff;
}

.catalog-container {
  display: flex;
  min-height: 100%;
  width: 100%;
  background-color: #333333;
  font-family: sans-serif;
}

.search-input {
  background-color: #222222;
  font-size: 0.875rem;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  width: 16rem;
  border: 1px solid #4a4a4a;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #00E676;
}

.sidebar-filters {
  width: 16rem;
  border-right: 1px solid #4a4a4a;
  padding: 1.5rem;
  background-color: #333333;
  box-sizing: border-box;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 2rem;
  color: #ffffff;
}

.filter-group {
  margin-bottom: 2rem;
}

.filter-header {
  font-size: 0.875rem;
  font-weight: 600;
  color: #00E676;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
  margin-bottom: 1rem;
  cursor: pointer;
  user-select: none;
}

.arrow {
  font-size: 0.75rem;
  transition: transform 0.2s ease;
  display: inline-block;
}

.arrow-rotated {
  transform: rotate(-90deg);
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #d1d5db;
  cursor: pointer;
}

.checkbox-input {
  accent-color: #00E676;
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.main-content {
  flex: 1;
  padding: 2rem;
  box-sizing: border-box;
}

/* Contenedor flexible para alinear título y resultados en los extremos */
.main-content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
}

.catalog-main-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.025em;
}

/* Estilo para el texto contador de resultados a la derecha */
.results-count {
  font-size: 0.875rem;
  color: #9ca3af;
  font-weight: 500;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (max-width: 1200px) {
  .games-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 992px) {
  .games-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .sidebar-filters {
    display: none;
  }
  .games-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>