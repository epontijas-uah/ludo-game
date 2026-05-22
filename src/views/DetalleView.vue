<template>
  <div class="bg-darkbg text-white font-sans min-h-screen flex flex-col selection:bg-brandgreen selection:text-black">
    
    <header class="flex items-center justify-between px-8 py-4 border-b border-darkborder bg-darkbg">
      <div class="flex items-center gap-3">
        <img src="/Logotipo_Blanco.png" alt="LudoGame Logo" class="w-10 h-10 object-contain">
        <h1 class="text-xl font-bold tracking-wide">LudoGame</h1>
      </div>
      
      <nav class="flex gap-6 text-sm text-gray-300">
        <a href="#" class="hover:text-white transition-colors">Catálogo</a>
        <a href="#" class="hover:text-white transition-colors">Mi Biblioteca</a>
        <a href="#" class="hover:text-white transition-colors">Contacto</a>
      </nav>
      
      <div class="flex items-center gap-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Buscar videojuegos..." 
          class="bg-darkcard text-sm rounded-full px-4 py-2 w-64 border border-darkborder focus:outline-none focus:border-brandgreen transition-colors"
        >
        
        <div class="relative">
          <select 
            v-model="selectedLanguage"
            class="bg-darkbg border border-darkborder rounded-lg pl-3 pr-8 py-2 text-xs text-gray-300 hover:text-white focus:outline-none focus:border-brandgreen appearance-none cursor-pointer font-medium transition-colors"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
          <span class="absolute right-2.5 top-2.5 text-[10px] text-gray-400 pointer-events-none">▼</span>
        </div>
        
        <div class="w-8 h-8 rounded-full bg-brandgreen flex items-center justify-center text-black font-bold text-xs">
          MA
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-8 py-12 w-full flex-1">
      
      <a href="#" @click.prevent="goBack" class="text-gray-400 hover:text-white flex items-center gap-2 mb-8 text-sm transition-colors w-max">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Volver al catálogo</span>
      </a>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div class="md:col-span-4">
          <div class="w-full aspect-[3/4] bg-darkcard rounded-xl overflow-hidden shadow-2xl border border-darkborder relative">
            <img 
              :src="game.coverUrl" 
              :alt="`Carátula de ${game.title}`" 
              class="w-full h-full object-cover"
            >
          </div>
        </div>

        <div class="md:col-span-8 flex flex-col justify-start">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-2 text-white">{{ game.title }}</h2>
          <p class="text-gray-400 text-lg mb-6 font-medium">{{ game.developer }}</p>

          <div class="flex items-center gap-1 mb-6 text-goldaccent">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-gray-400 text-sm ml-2 font-medium">
              ({{ game.rating }}/5 - {{ game.reviewsCount }} reseñas)
            </span>
          </div>

          <div class="flex flex-wrap gap-2 mb-8 items-center">
            <span 
              v-for="tag in game.tags" 
              :key="tag"
              class="px-3 py-1.5 bg-darkcard border border-darkborder rounded-full text-xs font-bold text-gray-300"
            >
              {{ tag }}
            </span>
            
            <div class="h-4 w-px bg-darkborder mx-1 hidden sm:block"></div>

            <span class="px-3 py-1.5 bg-gray-700 text-white rounded-full text-xs font-bold">PC</span>
            <span class="px-3 py-1.5 bg-blue-900 text-blue-200 rounded-full text-xs font-bold border border-blue-700">PS5</span>
          </div>

          <div class="mb-10">
            <h3 class="text-xl font-bold mb-4 border-b border-darkborder pb-2 text-white">Acerca del juego</h3>
            <p class="text-gray-300 leading-relaxed text-sm md:text-base">
              {{ game.description }}
            </p>
          </div>

          <div class="mt-auto border-t border-darkborder pt-8 flex items-center gap-4">
            <button 
              @click="toggleLibrary"
              class="font-bold py-3.5 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
              :class="isInLibrary ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-brandgreen text-black hover:bg-green-400'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="isInLibrary" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ isInLibrary ? 'En tu biblioteca' : 'Añadir a mi biblioteca' }}
            </button>

            <button 
              @click="toggleFavorite"
              class="w-14 h-14 rounded-lg border border-darkborder flex items-center justify-center bg-darkcard hover:bg-gray-700 transition-colors shadow-md cursor-pointer"
              :class="isFavorited ? 'text-goldaccent border-goldaccent/40' : 'text-gray-400 hover:text-goldaccent'"
            >
              <svg class="w-6 h-6" :class="isFavorited ? 'fill-current' : 'fill-none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const game = ref({})

// Función para simular la búsqueda del juego por su ID
const cargarDatosDelJuego = (id) => {
  // Aquí harías un fetch a tu API. Ejemplo simulado:
  console.log('Buscando en la base de datos el juego con ID:', id)
  
  // Asignamos los datos recuperados al estado reactivo
  game.value = {
    title: 'Elden Ring',
    developer: 'FromSoftware / Bandai Namco',
    rating: 4.9,
    reviewsCount: '12,450',
    tags: ['RPG de Acción', 'Mundo Abierto'],
    coverUrl: 'https://images.unsplash.com/...',
    description: 'Levántate, Sinluz...'
  }
}

onMounted(() => {
  // Captura el parámetro :id de la URL actual
  const juegoId = route.params.id
  cargarDatosDelJuego(juegoId)
})

const goBack = () => {
  // Regresa a la página anterior en el historial del navegador
  router.back()
}
</script>