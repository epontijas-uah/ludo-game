<template>
  <ion-page>
    <ion-header class="ion-no-border">
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
    </ion-header>

    <ion-content :fullscreen="true" class="profile-content absolute-center-content">
      
      <div class="login-style-viewport">
        
        <div class="main-centered-card">
          
          <div class="profile-avatar-header">
            <div class="avatar-group-wrapper">
              <div class="avatar-letters-box">
                MA
              </div>
              <label class="avatar-overlay-label">
                <span class="overlay-text">Cambiar<br>Foto</span>
                <input type="file" class="hidden-file-input" accept="image/*" @change="handleFileChange">
              </label>
            </div>
            <div class="profile-identity">
              <h2 class="user-display-name">Marco Antonio</h2>
              <p class="user-meta-date">Usuario miembro desde 2026</p>
            </div>
          </div>

          <form @submit.prevent="handleSaveChanges" class="profile-form">
            <div class="form-grid-columns">
              
              <div class="form-group">
                <label class="input-label">Nombre Completo</label>
                <div class="input-field-container">
                  <ion-input 
                    v-model="fullName"
                    type="text" 
                    class="custom-ion-input"
                  ></ion-input>
                </div>
              </div>
              
              <div class="form-group disabled-state">
                <label class="input-label">Correo Electrónico</label>
                <div class="input-field-container field-disabled">
                  <ion-input 
                    v-model="email"
                    type="email" 
                    disabled
                    class="custom-ion-input"
                  ></ion-input>
                </div>
              </div>

            </div>

            <div class="password-modification-zone">
              <h3 class="section-zone-title">Modificar Contraseña</h3>
              
              <div class="form-grid-columns">
                <div class="form-group">
                  <label class="input-label">Nueva Contraseña</label>
                  <div class="input-field-container">
                    <ion-input 
                      v-model="newPassword"
                      type="password" 
                      placeholder="••••••••"
                      class="custom-ion-input"
                    ></ion-input>
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="input-label">Confirmar Contraseña</label>
                  <div class="input-field-container">
                    <ion-input 
                      v-model="confirmPassword"
                      type="password" 
                      placeholder="••••••••"
                      class="custom-ion-input"
                    ></ion-input>
                  </div>
                </div>
              </div>

            </div>

            <div class="form-actions-row">
              <ion-button 
                type="submit"
                class="main-submit-btn"
              >
                Guardar Cambios
              </ion-button>
            </div>
          </form>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { 
  IonPage, 
  IonHeader,
  IonContent, 
  IonInput, 
  IonButton 
} from '@ionic/vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const searchQuery = ref('')
const fullName = ref('Marco Antonio')
const email = ref('marco@correo.com')
const newPassword = ref('')
const confirmPassword = ref('')

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    console.log('Nueva imagen de perfil seleccionada:', file.name)
  }
}

const handleSaveChanges = () => {
  console.log('Guardando cambios de perfil:', {
    fullName: fullName.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value
  })
}
</script>

<style scoped>
.profile-content {
  --background: var(--bg);
  --color: var(--text-primary);
  font-family: sans-serif;
}

/* Forzado de las capas internas del Shadow DOM de Ionic */
.absolute-center-content::part(scroll) {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

/* Alineamiento idéntico al LoginView para centrado perfecto */
.login-style-viewport {
  display: flex;
  align-items: center;      
  justify-content: center;   
  flex: 1 0 auto;
  width: 100%;
  min-height: calc(100vh - 70px); 
  padding: 24px;
  box-sizing: border-box;
}

/* Tarjeta contenedora de perfil con un ancho controlado y estilizado oscuro */
.main-centered-card {
  max-width: 576px; 
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Encabezado del Perfil */
.profile-avatar-header {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.avatar-group-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  cursor: pointer;
}

.avatar-letters-box {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--brand-green);
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.5rem;
}

.avatar-overlay-label {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.avatar-group-wrapper:hover .avatar-overlay-label {
  opacity: 1;
}

.overlay-text {
  font-size: 0.65rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  line-height: 1.2;
}

.hidden-file-input {
  display: none;
}

.profile-identity {
  display: flex;
  flex-direction: column;
}

.user-display-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
}

.user-meta-date {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin: 2px 0 0 0;
}

/* Estructura del Formulario */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-grid-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 100%));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
  font-weight: 500;
}

.input-field-container {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.input-field-container:focus-within {
  border-color: var(--brand-green);
}

.field-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.custom-ion-input {
  --background: transparent;
  --color: var(--text-primary);
  --placeholder-color: #52525b;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --padding-start: 0px;
  --padding-end: 0px;
  font-size: 0.85rem;
  height: 36px;
}

.field-disabled .custom-ion-input {
  --color: var(--text-secondary);
}

/* Bloque Zona Inferior: Contraseñas */
.password-modification-zone {
  border-top: 1px solid var(--border);
  padding-top: 16px;
  margin-top: 4px;
}

.section-zone-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--brand-green);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 12px 0;
}

.form-actions-row {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}

/* Botón de Envío */
.main-submit-btn {
  --background: var(--brand-green);
  --color: #000000;
  --border-radius: 6px;
  --box-shadow: none;
  font-weight: 700;
  text-transform: none;
  font-size: 0.85rem;
  height: 38px;
  margin: 0;
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

/* Adaptación para pantallas de teléfonos */
@media (max-width: 576px) {
  .login-style-viewport {
    padding: 16px;
    align-items: flex-start; /* Permite scroll natural si el teclado del móvil se despliega */
  }

  .main-centered-card {
    padding: 16px;
  }

  .form-grid-columns {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>