<template>
  <div class="bg-darkbg text-white font-sans min-h-screen flex flex-col selection:bg-brandgreen selection:text-black">
    
    <HeaderComponent :is-admin="true" />

    <div class="flex flex-1 overflow-hidden">
      
      <aside class="w-64 bg-darkcard border-r border-darkborder flex flex-col hidden md:flex">
        <nav class="p-6 space-y-2 flex-1 mt-4">
          <h3 class="text-xs font-bold text-gray-500 mb-4 px-4 tracking-wider uppercase">Menú Principal</h3>
          
          <a 
            href="#" 
            @click.prevent="currentTab = 'Estadísticas'"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-bold border-l-2 transition-all"
            :class="currentTab === 'Estadísticas' ? 'bg-darkbg text-goldaccent border-goldaccent' : 'text-gray-400 hover:bg-darkbg hover:text-white border-transparent'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Estadísticas
          </a>

          <a 
            href="#" 
            @click.prevent="currentTab = 'Catálogo'"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-bold border-l-2 transition-all"
            :class="currentTab === 'Catálogo' ? 'bg-darkbg text-goldaccent border-goldaccent' : 'text-gray-400 hover:bg-darkbg hover:text-white border-transparent'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Catálogo
          </a>

          <a 
            href="#" 
            @click.prevent="currentTab = 'Sugerencias'"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-bold border-l-2 transition-all"
            :class="currentTab === 'Sugerencias' ? 'bg-darkbg text-goldaccent border-goldaccent' : 'text-gray-400 hover:bg-darkbg hover:text-white border-transparent'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Sugerencias de juegos
          </a>

          <a 
            href="#" 
            @click.prevent="currentTab = 'Fotos'"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-bold border-l-2 transition-all"
            :class="currentTab === 'Fotos' ? 'bg-darkbg text-goldaccent border-goldaccent' : 'text-gray-400 hover:bg-darkbg hover:text-white border-transparent'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Fotos pendientes
          </a>
        </nav>

        <div class="p-6 border-t border-darkborder flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-darkbg border border-darkborder flex justify-center items-center text-gray-300 font-bold text-xs">
              AD
            </div>
            <div class="text-sm">
              <p class="font-bold text-white">Admin</p>
              <p class="text-xs text-gray-500">admin@ludogame.com</p>
            </div>
          </div>
          <button class="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto p-8 bg-darkbg">
        
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-white">Panel de Control</h2>
          <p class="text-gray-400 text-sm">Bienvenido de nuevo, Admin</p>
        </div>

        <div class="mb-10">
          <h3 class="text-lg font-bold text-white mb-4">Juegos por Género</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div 
              v-for="metric in genreMetrics" 
              :key="metric.genre"
              class="bg-darkcard border border-darkborder rounded-xl p-6 relative shadow-lg"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="text-goldaccent">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-2xl font-bold text-white">{{ metric.count }}</p>
                  <p class="text-sm text-gray-400">{{ metric.genre }}</p>
                </div>
              </div>
              <div class="w-full bg-darkbg h-1.5 rounded-full mt-4">
                <div class="bg-cyanaccent h-1.5 rounded-full transition-all duration-500" :style="{ width: metric.percentage }"></div>
              </div>
            </div>

          </div>
        </div>

        <div class="mb-6 flex justify-between items-end">
          <div class="flex items-center gap-3">
            <div class="text-cyanaccent">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">Juegos Sugeridos por Usuarios</h3>
              <p class="text-sm text-gray-400">{{ pendingSuggestionsCount }} sugerencias pendientes de revisión</p>
            </div>
          </div>
          <span class="px-3 py-1 bg-cyanaccent/10 border border-cyanaccent/20 text-cyanaccent rounded-full text-xs font-bold">
            {{ pendingSuggestionsCount }} pendientes
          </span>
        </div>

        <div class="bg-darkcard border border-darkborder rounded-xl overflow-hidden shadow-lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-transparent border-b border-darkborder text-gray-400 text-xs font-bold uppercase">
                <tr>
                  <th class="p-4 px-6 font-medium">Juego</th>
                  <th class="p-4 font-medium">Usuario</th>
                  <th class="p-4 font-medium">Plataforma</th>
                  <th class="p-4 font-medium">Género</th>
                  <th class="p-4 font-medium">Fecha</th>
                  <th class="p-4 font-medium">Estado</th>
                  <th class="p-4 px-6 text-right font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-darkborder">
                <tr 
                  v-for="item in suggestions" 
                  :key="item.id"
                  class="hover:bg-darkbg/50 transition-colors group"
                >
                  <td class="p-4 px-6 font-bold text-white">{{ item.title }}</td>
                  <td class="p-4 text-gray-300">{{ item.user }}</td>
                  <td class="p-4">
                    <span class="px-3 py-1 bg-darkbg border border-darkborder rounded text-xs text-gray-300">
                      {{ item.platform }}
                    </span>
                  </td>
                  <td class="p-4 text-gray-400">{{ item.genre }}</td>
                  <td class="p-4 text-gray-400">{{ item.date }}</td>
                  <td class="p-4">
                    <span class="px-3 py-1 bg-yellow-900/30 text-goldaccent rounded-full text-xs font-bold border border-goldaccent/20">
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="p-4 px-6 flex gap-2 justify-end">
                    <button 
                      @click="acceptSuggestion(item.id)"
                      class="px-3 py-1.5 bg-brandgreen hover:bg-green-400 text-black font-bold rounded text-xs transition-colors cursor-pointer"
                    >
                      Añadir
                    </button>
                    <button 
                      @click="discardSuggestion(item.id)"
                      class="px-3 py-1.5 bg-coral hover:bg-red-400 text-white font-bold rounded text-xs transition-colors cursor-pointer"
                    >
                      Descartar
                    </button>
                  </td>
                </tr>

                <tr v-if="suggestions.length === 0">
                  <td colspan="7" class="p-8 text-center text-gray-500">
                    No quedan sugerencias pendientes por revisar en el sistema.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { ref, computed } from 'vue'

// Pestaña de navegación seleccionada por defecto en el menú
const currentTab = ref('Estadísticas')

// Métricas de control dinámicas
const genreMetrics = ref([
  { genre: 'Acción', count: 1834, percentage: '85%' },
  { genre: 'Shooter', count: 1256, percentage: '65%' },
  { genre: 'Carreras', count: 687, percentage: '35%' },
  { genre: 'Puzzle', count: 423, percentage: '20%' }
])

// Listado reactivo de sugerencias hechas por la comunidad
const suggestions = ref([
  { id: 1, title: 'Stellar Odyssey', user: 'Carlos García', platform: 'PC', genre: 'RPG', date: '15 ene', status: 'Pendiente' },
  { id: 2, title: 'Racing Legends 2024', user: 'Maria López', platform: 'PlayStation', genre: 'Carreras', date: '14 ene', status: 'Pendiente' },
  { id: 3, title: 'Cyber Warriors', user: 'Juan Martinez', platform: 'Xbox', genre: 'Acción', date: '14 ene', status: 'Pendiente' },
  { id: 4, title: 'Puzzle Kingdom', user: 'Ana Rodríguez', platform: 'Movil', genre: 'Puzzle', date: '13 ene', status: 'Pendiente' },
  { id: 5, title: 'Fantasy Quest Online', user: 'Pedro Sánchez', platform: 'PC', genre: 'MMORPG', date: '12 ene', status: 'Pendiente' },
  { id: 6, title: 'Ninja Shadows', user: 'Laura Torres', platform: 'Nintendo', genre: 'Aventura', date: '11 ene', status: 'Pendiente' }
])

// Propiedad computada para rastrear dinámicamente el número de ítems restantes
const pendingSuggestionsCount = computed(() => {
  return suggestions.value.filter(item => item.status === 'Pendiente').length
})

// Acciones del administrador
const acceptSuggestion = (id) => {
  console.log(`Sugerencia aprobada ID: ${id}. Se procede a la inserción en el catálogo global.`)
  suggestions.value = suggestions.value.filter(item => item.id !== id)
}

const discardSuggestion = (id) => {
  console.log(`Sugerencia desestimada ID: ${id}. Removiendo de la cola de moderación.`)
  suggestions.value = suggestions.value.filter(item => item.id !== id)
}
</script>