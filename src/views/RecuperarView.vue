<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-content">
      <div class="login-container">
        
        <div class="top-controls-wrapper">
          <div class="control-item-bg">
            <ion-select 
              v-model="selectedLanguage"
              interface="popover"
              toggle-icon="chevron-down-outline"
              class="custom-lang-select"
            >
              <ion-select-option value="es">ES</ion-select-option>
              <ion-select-option value="en">EN</ion-select-option>
            </ion-select>
          </div>

          <div class="control-item-bg">
            <ion-button
              @click="toggleTheme"
              fill="clear"
              class="top-theme-btn"
              :aria-label="isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'"
            >
              <svg v-if="isDark" class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              <svg v-else class="theme-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </ion-button>
          </div>
        </div>

        <div class="login-header">
          <img 
            :src="logoSrc" 
            alt="LudoGame Logo" 
            class="logo-img"
          >
          <h1 class="site-title">LudoGame</h1>
          <p class="site-subtitle">Tu biblioteca de videojuegos</p>
        </div>

        <div class="login-card">
          <h2 class="card-title">¿Olvidaste tu contraseña?</h2>
          <p class="card-subtitle">Introduce tu correo electrónico para recibir las instrucciones de recuperación.</p>
          
          <form @submit.prevent="handlePasswordReset">
            <ion-grid class="ion-no-padding">
              <ion-row>
                
                <ion-col size="12" class="field-col">
                  <ion-item lines="outline" class="custom-item">
                    <ion-input 
                      v-model="email"
                      type="email" 
                      required
                      label="Correo electrónico"
                      label-placement="stacked"
                      placeholder="ejemplo@correo.com" 
                      class="custom-input"
                    ></ion-input>
                  </ion-item>
                </ion-col>
                
                <ion-col size="12" class="field-col-large">
                  <ion-button 
                    type="submit" 
                    expand="block"
                    class="main-submit-btn"
                  >
                    Enviar instrucciones
                  </ion-button>
                </ion-col>

              </ion-row>
            </ion-grid>
          </form>

          <p class="register-notice">
            <router-link to="/login" class="register-link">Volver al inicio de sesión</router-link>
          </p>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { 
  IonPage, 
  IonContent, 
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonSelect, 
  IonSelectOption, 
  IonInput, 
  IonButton 
} from '@ionic/vue'

const email = ref('')
const selectedLanguage = ref('es')

const isDark = ref(true)

// Manejo del logo dinámico idéntico a Login
const logoSrc = computed(() => {
  return isDark.value ? '/Logotipo_Blanco.png' : '/Logotipo_negro.png'
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('light-mode', !isDark.value)
}

let themeObserver = null

onMounted(() => {
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

const handlePasswordReset = () => {
  if (!email.value) return
  console.log('Enviando instrucciones de recuperación a:', email.value)
}
</script>

<style scoped>
/* Estructura base utilizando variables globales */
.login-content {
  --background: var(--bg);
  --color: var(--text-primary);
  font-family: sans-serif;
}

.login-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
}

/* Fila de controles superiores */
.top-controls-wrapper {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-item-bg {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  box-sizing: border-box;
}

.custom-lang-select {
  --color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  padding: 0 8px;
}

.top-theme-btn {
  --color: var(--text-secondary);
  --background-hover: transparent;
  --background-activated: transparent;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  margin: 0;
  height: 100%;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-icon {
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
}

/* Cabecera */
.login-header {
  margin-bottom: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  margin-bottom: 12px;
}

.site-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--text-primary);
}

.site-subtitle {
  font-size: 0.9rem;
  margin: 6px 0 0 0;
  color: var(--text-muted);
}

/* Tarjeta */
.login-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px var(--shadow);
  transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 6px 0;
  color: var(--text-primary);
}

.card-subtitle {
  font-size: 0.85rem;
  text-align: center;
  margin: 0 0 28px 0;
  color: var(--text-muted);
}

.field-col {
  margin-bottom: 20px;
}

.field-col-large {
  margin-bottom: 4px;
  margin-top: 8px;
}

/* Elementos de Input de Ionic */
.custom-item {
  --background: var(--input-bg);
  --border-color: var(--input-border);
  --border-radius: 8px;
  --highlight-color-focused: var(--brand-green);
  --color: var(--input-text);
  --padding-start: 14px;
  transition: --background 0.25s ease, --border-color 0.25s ease;
}

.custom-input {
  --color: var(--input-text);
  --placeholder-color: var(--input-placeholder);
  font-size: 0.95rem;
  min-height: 44px;
}

.custom-item.item-has-focus {
  --border-color: var(--brand-green);
}

/* Botón de envío Verde Corporativo */
.main-submit-btn {
  --background: var(--brand-green);
  --color: #000000;
  --border-radius: 8px;
  --box-shadow: none;
  font-weight: 700;
  font-size: 0.95rem;
  height: 46px;
  margin: 0;
}

/* Enlace inferior de navegación */
.register-notice {
  text-align: center;
  font-size: 0.85rem;
  margin: 32px 0 0 0;
  color: var(--text-muted);
}

.register-link {
  font-weight: 600;
  text-decoration: none;
  color: var(--text-muted);
  transition: color 0.2s ease;
}

.register-link:hover {
  color: var(--text-primary);
  text-decoration: underline;
}
</style>