<template>
  <ion-page>
    <HeaderComponent :is-admin="false">
      <template #search>
        <div class="search-wrapper">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar videojuegos..."
            class="search-input"
          >
        </div>
      </template>
    </HeaderComponent>

    <ion-content class="game-detail-content absolute-center-content" :scroll-y="true">
      
      <div class="login-style-viewport">
        
        <div class="main-centered-card">
          
          <a href="#" @click.prevent="goBack" class="back-link">
            <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Volver al catálogo</span>
          </a>

          <div class="game-flex-layout">
            
            <div class="layout-left-col">
              <div class="cover-box">
                <img
                  :src="game.coverUrl"
                  :alt="`Carátula de ${game.title}`"
                  class="cover-image-render"
                >
              </div>
            </div>

            <div class="layout-right-col">
              <h1 class="game-title">{{ game.title }}</h1>
              <p class="game-developer">{{ game.developer }}</p>

              <div class="rating-container">
                <div class="stars-wrapper">
                  <svg v-for="i in 5" :key="i" class="star-icon" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="reviews-text">
                  ({{ game.rating }}/5 - {{ game.reviewsCount }} reseñas)
                </span>
              </div>

              <div class="tags-wrapper">
                <ion-chip 
                  v-for="tag in game.tags" 
                  :key="tag" 
                  class="custom-chip"
                >
                  {{ tag }}
                </ion-chip>

                <ion-chip class="platform-chip pc">PC</ion-chip>
                <ion-chip class="platform-chip ps5">PS5</ion-chip>
              </div>

              <div class="description-section">
                <h2 class="section-title">Acerca del juego</h2>
                <p class="description-text">
                  {{ game.description }}
                </p>
              </div>

              <div class="actions-container">
                <ion-button
                  @click="toggleLibrary"
                  class="library-btn"
                  :class="{ 'in-library': isInLibrary }"
                >
                  <svg class="btn-icon-space" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-if="!isInLibrary">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg class="btn-icon-space" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-else>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ isInLibrary ? 'En tu biblioteca' : 'Añadir a mi biblioteca' }}</span>
                </ion-button>

                <ion-button
                  @click="toggleFavorite"
                  fill="clear"
                  class="favorite-btn"
                  :class="{ 'is-favorited': isFavorited }"
                >
                  <svg class="star-btn-icon" :class="{ 'fill-icon': isFavorited }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </ion-button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IonPage, IonContent, IonChip, IonButton } from '@ionic/vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const route = useRoute()
const router = useRouter()

const game = ref({})
const searchQuery = ref('')
const isInLibrary = ref(false)
const isFavorited = ref(false)

const cargarDatosDelJuego = (id) => {
  game.value = {
    title: 'Elden Ring',
    developer: 'FromSoftware / Bandai Namco',
    rating: 4.9,
    reviewsCount: '12,450',
    tags: ['RPG de Acción', 'Mundo Abierto', 'Fantasía Oscura'],
    coverUrl: 'https://images.unsplash.com/photo-1655821888788-6107699e173b?auto=format&fit=crop&q=80&w=600',
    description: 'Levántate, Sinluz, y déjate guiar por la gracia para esgrimir el poder del Círculo de Elden y convertirte en el Señor de Elden en las Tierras Intermedias. Un vasto mundo en el que los campos abiertos, con una gran variedad de situaciones, y las inmensas mazmorras, con diseños complejos y tridimensionales, se conectan con total fluidez.'
  }
}

onMounted(() => {
  cargarDatosDelJuego(route.params.id)
})

const goBack = () => router.back()
const toggleLibrary = () => { isInLibrary.value = !isInLibrary.value }
const toggleFavorite = () => { isFavorited.value = !isFavorited.value }
</script>

<style scoped>
.game-detail-content {
  --background: var(--bg);
  --color: var(--text-primary);
  font-family: sans-serif;
}

/* Forzamos a que las capas internas de scroll de Ionic actúen como un contenedor Flex completo */
.absolute-center-content::part(scroll) {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

/* Contenedor idéntico al viewport de Login que calcula el 100% del alto disponible menos el header */
.login-style-viewport {
  display: flex;
  align-items: center;      /* Centrado vertical estricto */
  justify-content: center;   /* Centrado horizontal estricto */
  width: 100%;
  margin-top: 3%;
  padding: 0 20%;
  box-sizing: border-box;
}

/* Tarjeta contenedora de datos con ancho máximo */
.main-centered-card {
  width: 100%;
  box-sizing: border-box;
}

/* Enlace Volver */
.back-link {
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 28px;
  font-size: 0.8rem;
  transition: color 0.2s ease;
  width: max-content;
}

.back-link:hover {
  color: var(--text-primary);
}

.back-icon {
  width: 14px;
  height: 14px;
}

/* Maquetación en dos columnas */
.game-flex-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 48px;
  width: 100%;
}

/* Columna Izquierda (Carátula) */
.layout-left-col {
  flex: 0 0 280px; 
}

.cover-box {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.cover-image-render {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Columna Derecha (Datos) */
.layout-right-col {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.game-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 6px 0;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.1;
}

.game-developer {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0 0 20px 0;
}

/* Estrellas */
.rating-container {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
}

.stars-wrapper {
  display: flex;
  color: #ffb400;
  gap: 2px;
}

.star-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.reviews-text {
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-left: 6px;
}

/* Chips */
.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 24px;
}

.custom-chip {
  --background: #22252a;
  --color: #9ca3af;
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0;
  padding: 4px 12px;
  height: 28px;
  border-radius: 14px;
}

.platform-chip {
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0;
  padding: 4px 12px;
  height: 28px;
  border-radius: 14px;
}

.platform-chip.pc {
  --background: #2a2e35;
  --color: #cbd5e1;
}

.platform-chip.ps5 {
  --background: #1e3a8a;
  --color: #93c5fd;
}

/* Sinopsis */
.description-section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  padding-bottom: 6px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
}

.description-text {
  color: #6b7280;
  line-height: 1.5;
  font-size: 0.85rem;
  margin: 0;
}

/* Botonera */
.actions-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.library-btn {
  --background: var(--brand-green);
  --color: #000000;
  --border-radius: 6px;
  --box-shadow: none;
  font-weight: 700;
  font-size: 0.85rem;
  height: 38px;
  margin: 0;
}

.library-btn.in-library {
  --background: #374151;
  --color: #ffffff;
}

.btn-icon-space {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

.favorite-btn {
  --background: transparent;
  --color: #9ca3af;
  --border-color: var(--border);
  --border-style: solid;
  --border-width: 1px;
  --border-radius: 6px;
  --padding-start: 0;
  --padding-end: 0;
  margin: 0;
  height: 38px;
  width: 38px;
}

.favorite-btn.is-favorited {
  --color: #ffb400;
  --border-color: rgba(255, 180, 0, 0.4);
}

.star-btn-icon {
  width: 18px;
  height: 18px;
}

.fill-icon {
  fill: currentColor;
}

/* Reglas de visualización responsive */
@media (max-width: 768px) {
  .login-style-viewport {
    min-height: auto;
    padding: 24px 16px;
  }

  .game-flex-layout {
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }
  
  .layout-left-col {
    flex: initial;
    width: 100%;
    max-width: 240px;
  }

  .game-title {
    text-align: center;
    font-size: 2rem;
  }

  .game-developer {
    text-align: center;
  }

  .rating-container, .tags-wrapper, .actions-container {
    justify-content: center;
  }
}
</style>