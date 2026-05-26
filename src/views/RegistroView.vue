<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-content-transparent">
      
      <div class="min-h-full bg-darkbg text-white font-sans flex flex-col items-center justify-center p-6 relative selection:bg-brandgreen selection:text-black">
        
        <div class="absolute top-4 right-4">
          <div class="relative bg-darkcard border border-darkborder rounded-md">
            <ion-select 
              v-model="selectedLanguage"
              interface="popover"
              toggle-icon="chevron-down-outline"
              class="text-[11px] text-gray-300 font-medium custom-lang-select"
            >
              <ion-select-option value="es">ES</ion-select-option>
              <ion-select-option value="en">EN</ion-select-option>
            </ion-select>
          </div>
        </div>

        <div class="mb-5 text-center flex flex-col items-center">
          <img 
            src="/Logotipo_Blanco.png" 
            alt="LudoGame Logo" 
            class="w-12 h-12 object-contain mb-2 logo-img"
          >
          <h1 class="text-2xl font-bold text-white tracking-tight">LudoGame</h1>
          <p class="text-gray-400 mt-1 text-xs">Tu biblioteca de videojuegos</p>
        </div>

        <div class="bg-darkcard border border-darkborder p-6 rounded-xl w-full max-w-[360px] shadow-2xl">
          <h2 class="text-xl font-bold text-white mb-1 text-center">Crear Cuenta</h2>
          <p class="text-gray-400 text-center text-xs mb-5">Regístrate para comenzar tu colección</p>
          
          <form @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-gray-300 mb-1">Nombre de usuario</label>
              <div class="w-full bg-darkbg border border-darkborder rounded-md px-3 transition-colors focus-within:border-brandgreen">
                <ion-input 
                  v-model="username"
                  type="text" 
                  required
                  placeholder="usuario123" 
                  class="custom-ion-input text-white"
                ></ion-input>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-300 mb-1">Correo electrónico</label>
              <div class="w-full bg-darkbg border border-darkborder rounded-md px-3 transition-colors focus-within:border-brandgreen">
                <ion-input 
                  v-model="email"
                  type="email" 
                  required
                  placeholder="ejemplo@correo.com" 
                  class="custom-ion-input text-white"
                ></ion-input>
              </div>
            </div>
            
            <div>
              <label class="block text-xs font-medium text-gray-300 mb-1">Contraseña</label>
              <div class="w-full bg-darkbg border border-darkborder rounded-md px-3 transition-colors focus-within:border-brandgreen">
                <ion-input 
                  v-model="password"
                  type="password" 
                  required
                  placeholder="••••••••" 
                  class="custom-ion-input text-white"
                ></ion-input>
              </div>
            </div>
            
            <ion-button 
              type="submit" 
              expand="block"
              class="main-submit-btn font-bold mt-2"
            >
              Registrarse
            </ion-button>
          </form>

          <p class="text-center text-xs text-gray-400 mt-6">
            ¿Ya tienes cuenta? 
            <a href="#" class="text-brandgreen! font-medium hover:underline ml-1">Inicia sesión</a>
          </p>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { 
  IonPage, 
  IonContent, 
  IonSelect, 
  IonSelectOption, 
  IonInput, 
  IonButton 
} from '@ionic/vue'

const username = ref('')
const email = ref('')
const password = ref('')
const selectedLanguage = ref('es')

const handleRegister = () => {
  if (!username.value || !email.value || !password.value) return
  console.log('Registrando usuario:', {
    username: username.value,
    email: email.value,
    password: password.value
  })
}
</script>

<style scoped>
ion-content.ion-content-transparent {
  --background: transparent;
}

.custom-ion-input {
  --background: transparent;
  --color: #ffffff;
  --placeholder-color: #52525b;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --padding-start: 0px;
  --padding-end: 0px;
  font-size: 0.815rem;
  height: 36px;
}

.custom-lang-select {
  --color: #d1d5db;
  --placeholder-color: #d1d5db;
  padding-inline-start: 8px;
  padding-inline-end: 4px;
  height: 28px;
}

.main-submit-btn {
  --background: var(--color-brandgreen);
  --color: #000000;
  --border-radius: 6px;
  --box-shadow: none;
  font-weight: 700;
  text-transform: none;
  font-size: 0.85rem;
  height: 38px;
}
</style>