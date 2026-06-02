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
          <h2 class="card-title">Iniciar sesión</h2>
          <p class="card-subtitle">Ingresa tus credenciales para acceder</p>
          
          <form @submit.prevent="handleLogin">
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
                
                <ion-col size="12" class="field-col">
                  <ion-item lines="outline" class="custom-item">
                    <ion-input 
                      v-model="password"
                      type="password" 
                      required
                      label="Contraseña"
                      label-placement="stacked"
                      placeholder="••••••••" 
                      class="custom-input"
                    ></ion-input>
                  </ion-item>
                </ion-col>

                <ion-col size="12" v-if="errorMsg" class="field-col">
                  <div class="error-container">
                    {{ errorMsg }}
                  </div>
                </ion-col>
                
                <ion-col size="12" class="ion-text-end field-col">
                  <a href="#" class="recovery-link">
                    Recuperar contraseña
                  </a>
                </ion-col>
                
                <ion-col size="12" class="field-col-large">
                  <ion-button 
                    type="submit" 
                    expand="block"
                    :disabled="loading"
                    class="main-submit-btn"
                  >
                    {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </form>

          <div class="divider-container">
            <div class="divider-line"></div>
            <span class="divider-text">O CONTINÚA CON</span>
            <div class="divider-line"></div>
          </div>

          <ion-grid class="ion-no-padding">
            <ion-row class="ion-justify-content-center social-row">
              <ion-col size="5.5">
                <ion-button 
                  expand="block"
                  @click="loginWithProvider('Google')"
                  class="social-provider-btn"
                >
                  Google
                </ion-button>
              </ion-col>
              <ion-col size="5.5">
                <ion-button 
                  expand="block"
                  @click="loginWithProvider('GitHub')"
                  class="social-provider-btn"
                >
                  GitHub
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>

          <p class="register-notice">
            ¿No tienes una cuenta? 
            <a href="#" class="register-link">Regístrate</a>
          </p>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
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
import { loginUsuario } from '@/services/usuarioService'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const selectedLanguage = ref('es')
const loading = ref(false)
const errorMsg = ref('')

const isDark = ref(true)

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

const handleLogin = async () => {
  if (!email.value || !password.value) return
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await loginUsuario({ email: email.value, password: password.value })
    const { usuario, token } = res.data
    authStore.login(usuario, token)
    if (authStore.isAdmin) {
      router.push('/dashboard')
    } else {
      router.push('/catalogo')
    }
  } catch (e) {
    console.error('Error al iniciar sesión:', e)
    errorMsg.value = e.response?.data?.message || 'Credenciales incorrectas. Inténtalo de nuevo.'
  } finally {
    loading.value = false
  }
}

const loginWithProvider = (provider) => {
  console.log(`Login con proveedor: ${provider}`)
  errorMsg.value = `El login con ${provider} no está disponible aún.`
}
</script>

<style scoped>
/* Estructura base */
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

/* Contenedor idéntico para ambos controles */
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

/* Ajustes del botón para que el icono use todo el espacio */
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
  width: 38px; /* Ancho idéntico al alto del contenedor */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* El icono ahora hereda el tamaño completo del botón */
.theme-icon {
  width: 100%;
  height: 100%;
  padding: 8px; /* Controla el margen interno del SVG de forma limpia */
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

/* Elementos de Input */
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

.recovery-link {
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--gold-accent);
  transition: opacity 0.2s ease;
}

.recovery-link:hover {
  opacity: 0.8;
}

/* Botón de envío */
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

/* Divisores */
.divider-container {
  margin: 32px 0 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.divider-line {
  height: 1px;
  flex: 1;
  background-color: var(--border);
}

.divider-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

/* Fila de botones sociales */
.social-row {
  gap: 12px;
}

/* Botones Sociales */
.social-provider-btn {
  --background: var(--bg);
  --color: var(--text-secondary);
  --border-color: var(--border);
  --border-style: solid;
  --border-width: 1px;
  --border-radius: 8px;
  --box-shadow: none;
  font-size: 0.9rem;
  height: 42px;
  margin: 0;
}

/* Registro */
.register-notice {
  text-align: center;
  font-size: 0.85rem;
  margin: 32px 0 0 0;
  color: var(--text-muted);
}

.register-link {
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
  color: var(--brand-green);
}

.register-link:hover {
  text-decoration: underline;
}

/* Errores */
.error-container {
  font-size: 0.85rem;
  color: #f87171;
  background-color: rgba(127, 29, 29, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
}
</style>