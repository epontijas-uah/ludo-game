<template>
  <ion-page>
    <HeaderComponent :is-admin="true" :has-notifications="true" />

    <ion-content>
      <div class="dashboard-container">
        
        <aside class="sidebar-menu">
          <nav class="nav-container">
            <h3 class="sidebar-section-title">Menú Principal</h3>
            
            <a href="#" class="nav-link active">
              <svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 19h2V10H5v9zm5 0h2V5h-2v14zm5 0h2v-7h-2v7zm5 0h2v-4h-2v4z"/>
              </svg>
              <span>Estadísticas</span>
            </a>
            
            <a href="#" class="nav-link">
              <svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 10a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-5 4a2 2 0 114 0" />
              </svg>
              <span>Catálogo</span>
            </a>
            
            <a href="#" class="nav-link">
              <svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <span>Sugerencias de juegos</span>
            </a>
            
            <a href="#" class="nav-link">
              <svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>Fotos pendientes</span>
            </a>
          </nav>
          
          <div class="sidebar-footer">
            <div class="user-profile">
              <div class="user-avatar">AD</div>
              <div class="user-info">
                <p class="user-name">Admin</p>
                <p class="user-email">admin@ludogame.com</p>
              </div>
            </div>
            <button class="settings-btn">
              <svg class="settings-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>
        </aside>

        <main class="main-content">
          
          <div class="content-header">
            <h2 class="main-title">Panel de Control</h2>
            <p class="subtitle">Bienvenido de nuevo, Admin</p>
          </div>

          <div class="metrics-section">
            <h3 class="section-title">Juegos por Género</h3>
            <div class="metrics-grid">
              <div v-for="genre in genreStats" :key="genre.name" class="metric-card">
                <div class="card-body">
                  <div class="icon-wrapper">
                    <svg v-if="genre.icon === 'swords'" class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <svg v-else-if="genre.icon === 'target'" class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                    <svg v-else-if="genre.icon === 'car'" class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h18M3 12h18M3 19h18M3 5v14M21 5v14" />
                    </svg>
                    <svg v-else class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
                    </svg>
                  </div>
                  <div class="metric-text-group">
                    <p class="metric-count">{{ genre.count }}</p>
                    <p class="metric-name">{{ genre.name }}</p>
                  </div>
                </div>
                
                <div class="progress-container">
                  <div 
                    class="progress-bar" 
                    :class="{ 'progress-bar-filled': genre.percentage > 0 }"
                    :style="{ width: genre.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="table-section-header">
            <div class="table-title-container">
              <svg class="section-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 10a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-5 4a2 2 0 114 0" />
              </svg>
              <div>
                <h3 class="table-title">Juegos Sugeridos por Usuarios</h3>
                <p class="table-subtitle">{{ suggestions.length }} sugerencias pendientes de revisión</p>
              </div>
            </div>
            <span class="badge-count">
              {{ suggestions.length }} pendientes
            </span>
          </div>

          <div class="table-card">
            <div class="responsive-table-wrapper">
              <table class="dashboard-table">
                <thead>
                  <tr>
                    <th class="col-padded">Juego</th>
                    <th>Usuario</th>
                    <th>Plataforma</th>
                    <th>Género</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th class="col-padded text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in suggestions" :key="item.title">
                    <td class="col-padded cell-highlight">{{ item.title }}</td>
                    <td class="cell-muted">{{ item.user }}</td>
                    <td>
                      <span class="badge-platform">
                        {{ item.platform }}
                      </span>
                    </td>
                    <td class="cell-muted">{{ item.genre }}</td>
                    <td class="cell-muted">{{ item.date }}</td>
                    <td>
                      <span class="badge-status">
                        {{ item.status }}
                      </span>
                    </td>
                    <td class="col-padded">
                      <div class="actions-container">
                        <button @click="processSuggestion(item, 'approve')" class="btn-action btn-add">
                          ✓ Añadir
                        </button>
                        <button @click="processSuggestion(item, 'reject')" class="btn-action btn-reject">
                          X Descartar
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import { ref } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

// Porcentajes y estados calibrados al diseño de dashboard.png
const genreStats = ref([
  { name: 'Acción', count: 1834, percentage: 55, icon: 'swords' },
  { name: 'Shooter', count: 1256, percentage: 40, icon: 'target' },
  { name: 'Carreras', count: 687, percentage: 0, icon: 'car' },
  { name: 'Puzzle', count: 423, percentage: 12, icon: 'puzzle' }
]);

const suggestions = ref([
  { title: 'Stellar Odyssey', user: 'Carlos García', platform: 'PC', genre: 'RPG', date: '15 ene', status: 'Pendiente' },
  { title: 'Racing Legends 2024', user: 'Maria López', platform: 'PlayStation', genre: 'Carreras', date: '14 ene', status: 'Pendiente' },
  { title: 'Cyber Warriors', user: 'Juan Martinez', platform: 'Xbox', genre: 'Acción', date: '14 ene', status: 'Pendiente' },
  { title: 'Puzzle Kingdom', user: 'Ana Rodríguez', platform: 'Movil', genre: 'Puzzle', date: '13 ene', status: 'Pendiente' },
  { title: 'Fantasy Quest Online', user: 'Pedro Sánchez', platform: 'PC', genre: 'MMORPG', date: '12 ene', status: 'Pendiente' },
  { title: 'Ninja Shadows', user: 'Laura Torres', platform: 'Nintendo', genre: 'Aventura', date: '11 ene', status: 'Pendiente' }
]);

const processSuggestion = (item, action) => {
  console.log(`Acción [${action}] procesada para: ${item.title}`);
};
</script>

<style scoped>
ion-content {
  --background: #222222;
}

/* Contenedor Principal */
.dashboard-container {
  display: flex;
  min-height: 100%;
  width: 100%;
  background-color: #222222;
  color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Menú Lateral */
.sidebar-menu {
  width: 16rem;
  background-color: #1a1a1a;
  border-right: 1px solid #2d2d2d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.nav-container {
  padding: 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sidebar-section-title {
  font-size: 11px;
  font-weight: 700;
  color: #555555;
  margin-bottom: 0.75rem;
  padding-left: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 0.85rem;
  border-radius: 0.5rem;
  color: #aaaaaa;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

/* Estado activo exacto con tinte dorado */
.nav-link.active {
  background-color: rgba(255, 193, 7, 0.08);
  color: #ffc107;
  font-weight: 600;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Pie de la Barra Lateral */
.sidebar-footer {
  padding: 1rem 0.85rem;
  border-top: 1px solid #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #2d2d2d;
  border: 1px solid #444444;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.75rem;
}

.user-info {
  font-size: 0.75rem;
  line-height: 1.2;
}

.user-name {
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.user-email {
  color: #777777;
  margin: 0;
}

.settings-btn {
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
}

.settings-btn:hover {
  color: #ffffff;
}

.settings-icon {
  width: 1.15rem;
  height: 1.15rem;
}

/* Contenido Principal */
.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #222222;
  box-sizing: border-box;
}

.content-header {
  margin-bottom: 2rem;
}

.main-title {
  font-size: 1.65rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.subtitle {
  color: #888888;
  font-size: 0.8rem;
  margin: 0.25rem 0 0 0;
}

/* Sección de Métricas */
.metrics-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
}

.metric-card {
  background-color: #2a2a2a;
  border-radius: 0.5rem;
  padding: 1.25rem;
  border: 1px solid #333333;
}

.card-body {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-wrapper {
  color: #aaaaaa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.metric-text-group {
  display: flex;
  flex-direction: column;
}

.metric-count {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.1;
}

.metric-name {
  font-size: 0.75rem;
  color: #777777;
  margin: 0;
}

/* Barra de Progreso */
.progress-container {
  width: 100%;
  background-color: #1a1a1a;
  height: 0.35rem;
  border-radius: 9999px;
  margin-top: 1.25rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 9999px;
  background-color: transparent;
}

.progress-bar-filled {
  background-color: #00bcd4;
}

/* Cabecera de la Tabla */
.table-section-header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title-container {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.section-icon {
  width: 1.35rem;
  height: 1.35rem;
  color: #a855f7;
}

.table-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.table-subtitle {
  font-size: 0.75rem;
  color: #777777;
  margin: 0;
}

.badge-count {
  padding: 0.35rem 0.85rem;
  background-color: rgba(0, 188, 212, 0.15);
  color: #00bcd4;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Contenedor de la Tabla */
.table-card {
  background-color: #2a2a2a;
  border: 1px solid #333333;
  border-radius: 0.5rem;
  overflow: hidden;
}

.responsive-table-wrapper {
  overflow-x: auto;
}

.dashboard-table {
  width: 100%;
  text-align: left;
  font-size: 0.85rem;
  border-collapse: collapse;
}

.dashboard-table th {
  border-bottom: 1px solid #3c3c3c;
  color: #777777;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  padding: 1rem 0.75rem;
}

.dashboard-table td {
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #333333;
}

.col-padded {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

.cell-highlight {
  font-weight: 700;
  color: #ffffff;
}

.cell-muted {
  color: #aaaaaa;
}

.text-center {
  text-align: center;
}

/* Badges de Fila */
.badge-platform {
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid #444444;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #cccccc;
}

.badge-status {
  padding: 0.25rem 0.75rem;
  background-color: rgba(255, 152, 0, 0.15);
  color: #ffb300;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Acciones Modernas y Limpias */
.actions-container {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.btn-action {
  padding: 0.4rem 0.85rem;
  font-weight: 700;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  color: #ffffff;
  transition: opacity 0.2s;
}

.btn-action:hover {
  opacity: 0.9;
}

.btn-add {
  background-color: #00c853;
}

.btn-reject {
  background-color: #ff5252;
}

/* Adaptabilidad básica */
@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .sidebar-menu {
    display: none;
  }
  .metrics-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>