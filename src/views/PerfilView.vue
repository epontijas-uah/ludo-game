<template>
  <ion-page>
    <ion-header class="ion-no-border">
        <HeaderComponent :is-admin="false">
            <template #search>
                <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Buscar videojuegos..." 
                class="bg-darkcard text-sm rounded-full px-4 py-2 w-64 border border-darkborder focus:outline-none focus:border-brandgreen transition-all"
                >
            </template>
        </HeaderComponent>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-content-transparent">
      <main class="p-6 max-w-xl w-full mx-auto">
        <div class="bg-darkcard border border-darkborder rounded-xl p-5 space-y-5 shadow-xl">
          
          <div class="flex items-center gap-5 border-b border-darkborder pb-5">
            <div class="relative group cursor-pointer">
              <div class="w-16 h-16 rounded-full bg-brandgreen flex items-center justify-center text-black font-black text-2xl overflow-hidden">
                MA
              </div>
              <label class="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span class="text-[10px] font-bold text-white text-center leading-tight">Cambiar<br>Foto</span>
                <input type="file" class="hidden" accept="image/*" @change="handleFileChange">
              </label>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white leading-tight">Marco Antonio</h2>
              <p class="text-[11px] text-gray-400 mt-0.5">Usuario miembro desde 2026</p>
            </div>
          </div>

          <form @submit.prevent="handleSaveChanges" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-400 mb-1 font-medium">Nombre Completo</label>
                <div class="w-full bg-darkbg border border-darkborder rounded-md px-3 transition-colors focus-within:border-brandgreen">
                  <ion-input 
                    v-model="fullName"
                    type="text" 
                    class="custom-ion-input text-white"
                  ></ion-input>
                </div>
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1 font-medium">Correo Electrónico</label>
                <div class="w-full bg-darkbg border border-darkborder rounded-md px-3 opacity-50 cursor-not-allowed">
                  <ion-input 
                    v-model="email"
                    type="email" 
                    disabled
                    class="custom-ion-input text-gray-400"
                  ></ion-input>
                </div>
              </div>
            </div>

            <div class="border-t border-darkborder pt-4 space-y-3">
              <h3 class="text-xs font-bold text-brandgreen uppercase tracking-wider">Modificar Contraseña</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Nueva Contraseña</label>
                  <div class="w-full bg-darkbg border border-darkborder rounded-md px-3 transition-colors focus-within:border-brandgreen">
                    <ion-input 
                      v-model="newPassword"
                      type="password" 
                      placeholder="••••••••"
                      class="custom-ion-input text-white"
                    ></ion-input>
                  </div>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Confirmar Contraseña</label>
                  <div class="w-full bg-darkbg border border-darkborder rounded-md px-3 transition-colors focus-within:border-brandgreen">
                    <ion-input 
                      v-model="confirmPassword"
                      type="password" 
                      placeholder="••••••••"
                      class="custom-ion-input text-white"
                    ></ion-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <ion-button 
                type="submit"
                class="main-submit-btn font-bold"
              >
                Guardar Cambios
              </ion-button>
            </div>
          </form>

        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { 
  IonPage, 
  IonHeader,
  IonContent, 
  IonSelect, 
  IonSelectOption, 
  IonInput, 
  IonButton 
} from '@ionic/vue'

const selectedLanguage = ref('es')
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
ion-content.ion-content-transparent {
  --background: transparent;
}

/* Conserva la altura fina y fuentes exactas de tus inputs */
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

/* Modificamos el select del header para que coincida en altura y espaciados */
.custom-lang-select {
  --color: #d1d5db;
  --placeholder-color: #d1d5db;
  padding-inline-start: 8px;
  padding-inline-end: 4px;
  height: 26px;
}

/* Botón principal mapeado al color brandgreen de tu main.css */
.main-submit-btn {
  --background: var(--color-brandgreen);
  --color: #000000;
  --border-radius: 6px;
  --box-shadow: none;
  font-weight: 700;
  text-transform: none;
  font-size: 0.85rem;
  height: 36px;
}
</style>