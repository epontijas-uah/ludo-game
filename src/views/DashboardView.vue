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
  
        <!-- Estado de carga -->  
        <div v-if="loading" class="flex justify-center items-center py-16">  
          <svg class="animate-spin w-8 h-8 text-cyanaccent" fill="none" viewBox="0 0 24 24">  
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>  
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>  
          </svg>  
          <span class="ml-3 text-gray-400 text-sm">Cargando sugerencias...</span>  
        </div>  
  
        <!-- Error -->  
        <div v-else-if="error" class="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-center">  
          <p class="text-red-400 font-bold">{{ error }}</p>  
          <button @click="cargarDatos" class="mt-3 px-4 py-2 bg-cyanaccent/20 border border-cyanaccent/30 text-cyanaccent rounded text-sm hover:bg-cyanaccent/30 transition-colors cursor-pointer">  
            Reintentar  
          </button>  
        </div>  
  
        <!-- Tabla de sugerencias -->  
        <div v-else class="bg-darkcard border border-darkborder rounded-xl overflow-hidden shadow-lg">  
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
                      :disabled="actionLoading === item.id"  
                      class="px-3 py-1.5 bg-brandgreen hover:bg-green-400 text-black font-bold rounded text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"  
                    >  
                      {{ actionLoading === item.id ? '...' : 'Añadir' }}  
                    </button>  
                    <button   
                      @click="discardSuggestion(item.id)"  
                      :disabled="actionLoading === item.id"  
                      class="px-3 py-1.5 bg-coral hover:bg-red-400 text-white font-bold rounded text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"  
                    >  
                      {{ actionLoading === item.id ? '...' : 'Descartar' }}  
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
import { ref, computed, onMounted } from 'vue'  
import { getJuegosAprobados, getJuegosPendientes, moderarJuego } from '@/services/juegoService'  
  
// Pestaña de navegación seleccionada por defecto en el menú  
const currentTab = ref('Estadísticas')  
  
// Estados de carga y error  
const loading = ref(false)  
const error = ref(null)  
const actionLoading = ref(null) // ID del juego en proceso de moderación  
  
// Métricas calculadas dinámicamente desde los juegos aprobados  
const genreMetrics = ref([])  
  
// Listado reactivo de sugerencias pendientes del backend  
const suggestions = ref([])  
  
// Propiedad computada para rastrear dinámicamente el número de ítems restantes  
const pendingSuggestionsCount = computed(() => suggestions.value.length)  
  
// Calcula las métricas de género agrupando los juegos aprobados  
const calcularMetricas = (juegos) => {  
  const conteo = {}  
  juegos.forEach(j => {  
    const genero = j.genero || 'Sin género'  
    conteo[genero] = (conteo[genero] || 0) + 1  
  })  
  const total = juegos.length || 1  
  const sorted = Object.entries(conteo)  
    .sort((a, b) => b[1] - a[1])  
    .slice(0, 4)  
  const maxCount = sorted[0]?.[1] || 1  
  genreMetrics.value = sorted.map(([genre, count]) => ({  
    genre,  
    count,  
    percentage: Math.round((count / maxCount) * 100) + '%'  
  }))  
}  
  
// Mapea un juego del backend al formato que usa la tabla  
const mapearSugerencia = (j) => ({  
  id: j.id,  
  title: j.nombre || j.titulo || 'Sin título',  
  user: j.usuario?.nombre || j.usuario?.email || 'Desconocido',  
  platform: j.plataforma?.nombre || j.plataforma || '-',  
  genre: j.genero || '-',  
  date: j.fechaPropuesta  
    ? new Date(j.fechaPropuesta).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })  
    : '-',  
  status: 'Pendiente'  
})  
  
// Carga inicial de datos desde el backend  
const cargarDatos = async () => {  
  loading.value = true  
  error.value = null  
  try {  
    const [aprobadosRes, pendientesRes] = await Promise.all([  
      getJuegosAprobados(),  
      getJuegosPendientes()  
    ])  
    calcularMetricas(aprobadosRes.data)  
    suggestions.value = pendientesRes.data.map(mapearSugerencia)  
  } catch (e) {  
    console.error('Error al cargar datos del dashboard:', e)  
    error.value = 'No se pudieron cargar los datos. Comprueba la conexión con el servidor.'  
  } finally {  
    loading.value = false  
  }  
}  
  
// Aprobar sugerencia → llama a PUT /api/juegos/moderar/{id}?aprobar=true  
const acceptSuggestion = async (id) => {  
  actionLoading.value = id  
  try {  
    await moderarJuego(id, true)  
    suggestions.value = suggestions.value.filter(item => item.id !== id)  
  } catch (e) {  
    console.error(`Error al aprobar juego ID ${id}:`, e)  
    alert('No se pudo aprobar la sugerencia. Inténtalo de nuevo.')  
  } finally {  
    actionLoading.value = null  
  }  
}  
  
// Descartar sugerencia → llama a PUT /api/juegos/moderar/{id}?aprobar=false  
const discardSuggestion = async (id) => {  
  actionLoading.value = id  
  try {  
    await moderarJuego(id, false)  
    suggestions.value = suggestions.value.filter(item => item.id !== id)  
  } catch (e) {  
    console.error(`Error al descartar juego ID ${id}:`, e)  
    alert('No se pudo descartar la sugerencia. Inténtalo de nuevo.')  
  } finally {  
    actionLoading.value = null  
  }  
}  
  
onMounted(cargarDatos)  
</script>