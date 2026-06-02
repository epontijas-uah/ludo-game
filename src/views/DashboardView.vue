<template>  
  <div class="dashboard-layout">  
      
    <HeaderComponent :is-admin="true" />  
  
    <div class="dashboard-body">  
        
      <aside class="sidebar">  
        <nav class="sidebar-nav">  
          <h3 class="sidebar-section-title">Menú Principal</h3>  
            
          <a   
            href="#"   
            @click.prevent="currentTab = 'Estadísticas'"  
            class="sidebar-link"  
            :class="{ 'active': currentTab === 'Estadísticas' }"  
          >  
            <svg class="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />  
            </svg>  
            Estadísticas  
          </a>  
  
          <a   
            href="#"   
            @click.prevent="currentTab = 'Catálogo'"  
            class="sidebar-link"  
            :class="{ 'active': currentTab === 'Catálogo' }"  
          >  
            <svg class="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />  
            </svg>  
            Catálogo  
          </a>  
  
          <a   
            href="#"   
            @click.prevent="currentTab = 'Sugerencias'"  
            class="sidebar-link"  
            :class="{ 'active': currentTab === 'Sugerencias' }"  
          >  
            <svg class="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />  
            </svg>  
            Sugerencias de juegos  
          </a>  
  
          <a   
            href="#"   
            @click.prevent="currentTab = 'Fotos'"  
            class="sidebar-link"  
            :class="{ 'active': currentTab === 'Fotos' }"  
          >  
            <svg class="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />  
            </svg>  
            Fotos pendientes  
          </a>  
        </nav>  
  
        <div class="sidebar-footer">  
          <div class="user-profile-summary">  
            <div class="user-avatar-fallback">  
              AD  
            </div>  
            <div class="user-profile-text">  
              <p class="profile-name">Admin</p>  
              <p class="profile-email">admin@ludogame.com</p>  
            </div>  
          </div>  
          <button class="settings-btn" aria-label="Configuración">  
            <svg class="settings-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />  
            </svg>  
          </button>  
        </div>  
      </aside>  
  
      <main class="main-content">  
          
        <div class="content-header">  
          <h2 class="page-title">Panel de Control</h2>  
          <p class="page-subtitle">Bienvenido de nuevo, Admin</p>  
        </div>  
  
        <div class="dashboard-section">  
          <h3 class="section-title">Juegos por Género</h3>  
          <div class="metrics-grid">  
              
            <div   
              v-for="metric in genreMetrics"  
              :key="metric.genre"  
              class="metric-card"  
            >  
              <div class="metric-card-header">  
                <div class="metric-icon-wrapper">  
                  <svg class="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />  
                  </svg>  
                </div>  
                <div>  
                  <p class="metric-value">{{ metric.count }}</p>  
                  <p class="metric-label">{{ metric.genre }}</p>  
                </div>  
              </div>  
              <div class="metric-progress-container">  
                <div class="metric-progress-bar" :style="{ width: metric.percentage }"></div>  
              </div>  
            </div>  
  
          </div>  
        </div>  
  
        <div class="table-section-header">  
          <div class="table-section-title-wrapper">  
            <div class="table-section-icon">  
              <svg class="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />  
              </svg>  
            </div>  
            <div>  
              <h3 class="section-title-inline">Juegos Sugeridos por Usuarios</h3>  
              <p class="table-section-subtitle">{{ pendingSuggestionsCount }} sugerencias pendientes de revisión</p>  
            </div>  
          </div>  
          <span class="badge-status">  
            {{ pendingSuggestionsCount }} pendientes  
          </span>  
        </div>  
  
        <div v-if="loading" class="spinner-container">  
          <svg class="animate-spin spinner-svg" fill="none" viewBox="0 0 24 24">  
            <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>  
            <path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>  
          </svg>  
          <span class="loading-text">Cargando sugerencias...</span>  
        </div>  
  
        <div v-else-if="error" class="error-alert">  
          <p class="error-alert-text">{{ error }}</p>  
          <button @click="cargarDatos" class="retry-btn">  
            Reintentar  
          </button>  
        </div>  
  
        <div v-else class="table-card-wrapper">  
          <div class="responsive-table-scroll">  
            <table class="data-table">  
              <thead>  
                <tr>  
                  <th class="th-start">Juego</th>  
                  <th>Usuario</th>  
                  <th>Plataforma</th>  
                  <th>Género</th>  
                  <th>Fecha</th>  
                  <th>Estado</th>  
                  <th class="th-end">Acciones</th>  
                </tr>  
              </thead>  
              <tbody>  
                <tr   
                  v-for="item in suggestions"   
                  :key="item.id"  
                  class="table-row-interactive"  
                >  
                  <td class="td-title">{{ item.title }}</td>  
                  <td class="td-user">{{ item.user }}</td>  
                  <td>  
                    <span class="platform-tag">  
                      {{ item.platform }}  
                    </span>  
                  </td>  
                  <td class="td-muted">{{ item.genre }}</td>  
                  <td class="td-muted">{{ item.date }}</td>  
                  <td>  
                    <span class="badge-table-pending">  
                      {{ item.status }}  
                    </span>  
                  </td>  
                  <td class="td-actions">  
                    <button   
                      @click="acceptSuggestion(item.id)"  
                      :disabled="actionLoading === item.id"  
                      class="action-btn-accept"  
                    >  
                      {{ actionLoading === item.id ? '...' : 'Añadir' }}  
                    </button>  
                    <button   
                      @click="discardSuggestion(item.id)"  
                      :disabled="actionLoading === item.id"  
                      class="action-btn-discard"  
                    >  
                      {{ actionLoading === item.id ? '...' : 'Descartar' }}  
                    </button>  
                  </td>  
                </tr>  
  
                <tr v-if="suggestions.length === 0">  
                  <td colspan="7" class="table-empty-state">  
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'  
import { getJuegosAprobados, getJuegosPendientes, moderarJuego } from '@/services/juegoService'  
  
const currentTab = ref('Estadísticas')  
  
const loading = ref(false)  
const error = ref(null)  
const actionLoading = ref(null)  
  
const genreMetrics = ref([])  
const suggestions = ref([])  
  
const isDark = ref(true)
let themeObserver = null

const pendingSuggestionsCount = computed(() => suggestions.value.length)  
  
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
  
onMounted(() => {
  cargarDatos()
  
  // Sincronización del tema oscuro/claro global por mutación de clases
  isDark.value = !document.documentElement.classList.contains('light-mode')  
  themeObserver = new MutationObserver(() => {  
    isDark.value = !document.documentElement.classList.contains('light-mode')  
  })  
  themeObserver.observe(document.documentElement, {  
    attributes: true,  
    attributeFilter: ['class']  
  })  
})  

onBeforeUnmount(() => {  
  if (themeObserver) themeObserver.disconnect()  
})  
</script>  
  
<style scoped>  
/* Estructura Base del Dashboard */  
.dashboard-layout {  
  background-color: var(--bg);  
  color: var(--text-primary);  
  font-family: sans-serif;  
  min-height: 100vh;  
  display: flex;  
  flex-direction: column;  
}  
  
.dashboard-body {  
  display: flex;  
  flex: 1;  
  overflow: hidden;  
}  
  
/* Sidebar o Barra lateral */  
.sidebar {  
  width: 260px;  
  background-color: var(--bg-card);  
  border-right: 1px solid var(--border);  
  display: flex;  
  flex-direction: column;  
}  
  
@media (max-width: 768px) {  
  .sidebar {  
    display: none; /* Se oculta de forma responsiva en móviles */  
  }  
}  
  
.sidebar-nav {  
  padding: 24px;  
  display: flex;  
  flex-direction: column;  
  gap: 8px;  
  flex: 1;  
  margin-top: 16px;  
}  
  
.sidebar-section-title {  
  font-size: 11px;  
  font-weight: 700;  
  color: var(--text-muted);  
  margin-bottom: 16px;  
  padding-left: 16px;  
  padding-right: 16px;  
  letter-spacing: 0.05em;  
  text-transform: uppercase;  
}  
  
.sidebar-link {  
  display: flex;  
  align-items: center;  
  gap: 12px;  
  padding: 12px 16px;  
  border-radius: 8px;  
  font-weight: 700;  
  font-size: 0.9rem;  
  text-decoration: none;  
  border-left: 2px solid transparent;  
  color: var(--text-secondary);  
  transition: all 0.2s ease;  
}  
  
.sidebar-link:hover {  
  background-color: var(--bg);  
  color: var(--text-primary);  
}  
  
.sidebar-link.active {  
  background-color: var(--bg);  
  color: var(--gold-accent);  
  border-left-color: var(--gold-accent);  
}  
  
.sidebar-icon {  
  width: 20px;  
  height: 20px;  
  flex-shrink: 0;  
}  
  
/* Perfil del Administrador en Sidebar */  
.sidebar-footer {  
  padding: 24px;  
  border-top: 1px solid var(--border);  
  display: flex;  
  align-items: center;  
  justify-content: space-between;  
}  
  
.user-profile-summary {  
  display: flex;  
  align-items: center;  
  gap: 12px;  
}  
  
.user-avatar-fallback {  
  width: 32px;  
  height: 32px;  
  border-radius: 50%;  
  background-color: var(--bg);  
  border: 1px solid var(--border);  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  color: var(--text-secondary);  
  font-weight: 700;  
  font-size: 11px;  
}  
  
.user-profile-text {  
  font-size: 0.85rem;  
}  
  
.profile-name {  
  font-weight: 700;  
  margin: 0;  
  color: var(--text-primary);  
}  
  
.profile-email {  
  font-size: 11px;  
  margin: 0;  
  color: var(--text-muted);  
}  
  
.settings-btn {  
  background: transparent;  
  border: none;  
  padding: 0;  
  color: var(--text-muted);  
  cursor: pointer;  
  display: flex;  
  align-items: center;  
  transition: color 0.2s ease;  
}  
  
.settings-btn:hover {  
  color: var(--text-primary);  
}  
  
.settings-icon {  
  width: 16px;  
  height: 16px;  
}  
  
/* Contenedor Contenido Principal */  
.main-content {  
  flex: 1;  
  overflow-y: auto;  
  padding: 32px;  
  background-color: var(--bg);  
}  
  
.content-header {  
  margin-bottom: 32px;  
}  
  
.page-title {  
  font-size: 1.5rem;  
  font-weight: 700;  
  margin: 0;  
  color: var(--text-primary);  
}  
  
.page-subtitle {  
  font-size: 0.875rem;  
  margin: 4px 0 0 0;  
  color: var(--text-muted);  
}  
  
.dashboard-section {  
  margin-bottom: 40px;  
}  
  
.section-title {  
  font-size: 1.125rem;  
  font-weight: 700;  
  color: var(--text-primary);  
  margin: 0 0 16px 0;  
}  
  
/* Rejilla de Tarjetas de Métricas */  
.metrics-grid {  
  display: grid;  
  grid-template-columns: repeat(1, minmax(0, 1fr));  
  gap: 16px;  
}  
  
@media (min-width: 768px) {  
  .metrics-grid {  
    grid-template-columns: repeat(2, minmax(0, 1fr));  
  }  
}  
  
@media (min-width: 1024px) {  
  .metrics-grid {  
    grid-template-columns: repeat(4, minmax(0, 1fr));  
  }  
}  
  
.metric-card {  
  background-color: var(--bg-card);  
  border: 1px solid var(--border);  
  border-radius: 12px;  
  padding: 24px;  
  position: relative;  
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);  
}  
  
.metric-card-header {  
  display: flex;  
  align-items: center;  
  gap: 16px;  
}  
  
.metric-icon-wrapper {  
  color: var(--gold-accent);  
  display: flex;  
  align-items: center;  
}  
  
.metric-icon {  
  width: 24px;  
  height: 24px;  
}  
  
.metric-value {  
  font-size: 1.5rem;  
  font-weight: 700;  
  margin: 0;  
  color: var(--text-primary);  
}  
  
.metric-label {  
  font-size: 0.875rem;  
  margin: 0;  
  color: var(--text-secondary);  
}  
  
/* Línea de progreso interna */  
.metric-progress-container {  
  width: 100%;  
  background-color: var(--bg);  
  height: 6px;  
  border-radius: 9999px;  
  margin-top: 16px;  
  overflow: hidden;  
}  
  
.metric-progress-bar {  
  background-color: var(--gold-accent); /* Sincronizado con la identidad visual */  
  height: 100%;  
  border-radius: 9999px;  
  transition: width 0.5s ease;  
}  
  
/* Cabecera sección tabla de sugerencias */  
.table-section-header {  
  margin-bottom: 24px;  
  display: flex;  
  justify-content: space-between;  
  align-items: flex-end;  
}  
  
.table-section-title-wrapper {  
  display: flex;  
  align-items: center;  
  gap: 12px;  
}  
  
.table-section-icon {  
  color: var(--gold-accent);  
  display: flex;  
  align-items: center;  
}  
  
.section-title-inline {  
  font-size: 1.125rem;  
  font-weight: 700;  
  color: var(--text-primary);  
  margin: 0;  
}  
  
.table-section-subtitle {  
  font-size: 0.875rem;  
  margin: 2px 0 0 0;  
  color: var(--text-muted);  
}  
  
.badge-status {  
  padding: 4px 12px;  
  background-color: rgba(var(--gold-accent), 0.1);  
  border: 1px solid rgba(var(--gold-accent), 0.2);  
  color: var(--gold-accent);  
  border-radius: 9999px;  
  font-size: 0.75rem;  
  font-weight: 700;  
}  
  
/* Envoltorio Tabla de Contenido */  
.table-card-wrapper {  
  background-color: var(--bg-card);  
  border: 1px solid var(--border);  
  border-radius: 12px;  
  overflow: hidden;  
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);  
}  
  
.responsive-table-scroll {  
  overflow-x: auto;  
}  
  
.data-table {  
  width: 100%;  
  text-align: left;  
  font-size: 0.875rem;  
  border-collapse: collapse;  
  white-space: nowrap;  
}  
  
.data-table thead {  
  background-color: transparent;  
  border-bottom: 1px solid var(--border);  
  color: var(--text-muted);  
  font-size: 0.75rem;  
  font-weight: 700;  
  text-transform: uppercase;  
}  
  
.data-table th {  
  padding: 16px;  
  font-weight: 600;  
}  
  
.th-start {  
  padding-left: 24px;  
}  
  
.th-end {  
  padding-right: 24px;  
  text-align: right;  
}  
  
.data-table tbody {  
  color: var(--text-secondary);  
}  
  
.data-table tbody tr {  
  border-bottom: 1px solid var(--border);  
  transition: background-color 0.2s ease;  
}  
  
.data-table tbody tr:last-child {  
  border-bottom: none;  
}  
  
.table-row-interactive:hover {  
  background-color: rgba(0, 0, 0, 0.02);  
}  
  
.light-mode .table-row-interactive:hover {  
  background-color: rgba(0, 0, 0, 0.02);  
}  
  
/* Celdas Específicas */  
.td-title {  
  padding: 16px 16px 16px 24px;  
  font-weight: 700;  
  color: var(--text-primary);  
}  
  
.td-user {  
  padding: 16px;  
  color: var(--text-secondary);  
}  
  
.td-muted {  
  padding: 16px;  
  color: var(--text-muted);  
}  
  
.td-actions {  
  padding: 16px 24px 16px 16px;  
  display: flex;  
  gap: 8px;  
  justify-content: flex-end;  
}  
  
/* Etiquetas internas de tabla */  
.platform-tag {  
  padding: 4px 12px;  
  background-color: var(--bg);  
  border: 1px solid var(--border);  
  border-radius: 4px;  
  font-size: 0.75rem;  
  color: var(--text-secondary);  
}  
  
.badge-table-pending {  
  padding: 4px 12px;  
  background-color: rgba(234, 179, 8, 0.1);  
  color: var(--gold-accent);  
  border-radius: 9999px;  
  font-size: 0.75rem;  
  font-weight: 700;  
  border: 1px solid rgba(234, 179, 8, 0.2);  
}  
  
/* Botones de Acción de Moderación */  
.action-btn-accept {  
  padding: 6px 12px;  
  background-color: var(--brand-green);  
  color: #000000;  
  font-weight: 700;  
  border-radius: 4px;  
  font-size: 0.75rem;  
  border: none;  
  cursor: pointer;  
  transition: opacity 0.2s ease;  
}  
  
.action-btn-accept:hover:not(:disabled) {  
  opacity: 0.85;  
}  
  
.action-btn-discard {  
  padding: 6px 12px;  
  background-color: #ef4444; /* Color Coral/Rojo uniforme */  
  color: #ffffff;  
  font-weight: 700;  
  border-radius: 4px;  
  font-size: 0.75rem;  
  border: none;  
  cursor: pointer;  
  transition: opacity 0.2s ease;  
}  
  
.action-btn-discard:hover:not(:disabled) {  
  opacity: 0.85;  
}  
  
.action-btn-accept:disabled,  
.action-btn-discard:disabled {  
  opacity: 0.4;  
  cursor: not-allowed;  
}  
  
/* Estados vacíos (Empty State) */  
.table-empty-state {  
  padding: 32px;  
  text-align: center;  
  color: var(--text-muted);  
}  
  
/* Feedback visual de carga (Spinner) */  
.spinner-container {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  padding: 64px 0;  
}  
  
.spinner-svg {  
  width: 32px;  
  height: 32px;  
  color: var(--gold-accent);  
  animation: spin 1s linear infinite;  
}  
  
.spinner-circle {  
  opacity: 0.25;  
}  
  
.spinner-path {  
  opacity: 0.75;  
}  
  
.loading-text {  
  margin-left: 12px;  
  color: var(--text-muted);  
  font-size: 0.875rem;  
}  
  
/* Alertas de error del Servidor */  
.error-alert {  
  background-color: rgba(220, 38, 38, 0.1);  
  border: 1px solid rgba(220, 38, 38, 0.2);  
  border-radius: 12px;  
  padding: 24px;  
  text-align: center;  
}  
  
.error-alert-text {  
  color: #ef4444;  
  font-weight: 700;  
  margin: 0 0 12px 0;  
}  
  
.retry-btn {  
  padding: 8px 16px;  
  background-color: rgba(220, 38, 38, 0.15);  
  border: 1px solid rgba(220, 38, 38, 0.25);  
  color: #ef4444;  
  border-radius: 4px;  
  font-size: 0.875rem;  
  cursor: pointer;  
  transition: background-color 0.2s ease;  
}  
  
.retry-btn:hover {  
  background-color: rgba(220, 38, 38, 0.25);  
}  
  
@keyframes spin {  
  from { transform: rotate(0deg); }  
  to { transform: rotate(360deg); }  
}  
</style>