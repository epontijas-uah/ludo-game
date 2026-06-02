<template>
  <ion-page>
    <HeaderComponent :is-admin="false" />

    <ion-content :fullscreen="true" class="support-content absolute-center-content">
      
      <div class="login-style-viewport">
        
        <div class="main-centered-card">
          
          <div class="support-header-box">
            <div class="support-icon-circle">
              <svg class="support-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            
            <h2 class="support-title">¿Necesitas ayuda?</h2>
            <p class="support-description">
              Envíanos tus dudas, reportes de errores o sugerencias sobre el catálogo. Nuestro equipo de administración te responderá lo antes posible.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="support-card-form">
            
            <div class="form-group">
              <label class="input-label">Asunto</label>
              <div class="select-wrapper">
                <select 
                  v-model="selectedSubject"
                  class="custom-select"
                >
                  <option v-for="option in subjectOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
                <span class="select-arrow">▼</span>
              </div>
            </div>

            <div class="form-group">
              <label class="input-label">Mensaje</label>
              <textarea 
                v-model="message"
                rows="5" 
                required
                placeholder="Describe tu consulta aquí..." 
                class="custom-textarea"
              ></textarea>
            </div>

            <ion-button 
              type="submit" 
              expand="block"
              class="main-submit-btn"
            >
              Enviar Mensaje
            </ion-button>
          </form>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const selectedSubject = ref('Problema técnico en la plataforma')
const message = ref('')

const subjectOptions = [
  'Problema técnico en la plataforma',
  'Error en la información de un videojuego',
  'Sugerencia de nueva funcionalidad',
  'Dudas sobre la cuenta'
]

const handleSubmit = () => {
  if (!message.value.trim()) return

  const ticketData = {
    subject: selectedSubject.value,
    body: message.value.trim(),
    timestamp: new Date().toISOString()
  }

  console.log('Procesando envío de ticket de soporte:', ticketData)
  message.value = ''
}
</script>

<style scoped>
.support-content {
  --background: var(--bg);
  --color: var(--text-primary);
  font-family: sans-serif;
}

/* Modificación de las propiedades internas de ion-content */
.absolute-center-content::part(scroll) {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

/* Viewport con el comportamiento de centrado estricto de LoginView */
.login-style-viewport {
  display: flex;
  align-items: center;      
  justify-content: center;   
  flex: 1 0 auto;
  width: 100%;
  min-height: calc(100vh - 70px); 
  padding: 40px 24px;
  box-sizing: border-box;
}

/* Tarjeta centralizada */
.main-centered-card {
  max-width: 540px; 
  width: 100%;
  box-sizing: border-box;
}

/* Sección superior de presentación */
.support-header-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 28px;
}

.support-icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 20px;
}

.support-icon {
  width: 32px;
  height: 32px;
  color: var(--brand-green);
}

.support-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 12px 0;
}

.support-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  max-w: 460px;
}

/* Diseño de la tarjeta del formulario */
.support-card-form {
  background: var(--bg-card);
  padding: 32px;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

/* Estilo para los selectores nativos */
.select-wrapper {
  position: relative;
  width: 100%;
}

.custom-select {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 40px 12px 16px;
  font-size: 0.85rem;
  color: var(--text-primary);
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.custom-select:focus {
  border-color: var(--brand-green);
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 0.65rem;
  color: var(--text-secondary);
  pointer-events: none;
}

/* Áreas de texto */
.custom-textarea {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.85rem;
  color: var(--text-primary);
  outline: none;
  resize: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  font-family: sans-serif;
}

.custom-textarea:focus {
  border-color: var(--brand-green);
}

/* Botón de envío principal */
.main-submit-btn {
  --background: var(--brand-green);
  --color: #000000;
  --border-radius: 8px;
  --box-shadow: none;
  font-weight: 700;
  font-size: 0.95rem;
  height: 46px;
  margin: 8px 0 0 0;
}

/* Ajustes para móviles */
@media (max-width: 576px) {
  .login-style-viewport {
    padding: 24px 16px;
    align-items: flex-start; /* Evita roturas si el teclado se despliega en pantalla */
  }

  .support-card-form {
    padding: 20px;
  }

  .support-title {
    font-size: 1.5rem;
  }
}
</style>