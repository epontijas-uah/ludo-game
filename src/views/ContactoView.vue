<template>
  <div class="bg-darkbg text-white font-sans min-h-screen flex flex-col selection:bg-brandgreen selection:text-black">
    
    <HeaderComponent :is-admin="false" />

    <main class="max-w-2xl mx-auto px-8 py-16 text-center flex-1">
      
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-darkcard border border-darkborder mb-6">
        <svg class="w-8 h-8 text-brandgreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </div>
      
      <h2 class="text-3xl font-bold mb-4">¿Necesitas ayuda?</h2>
      <p class="text-gray-400 mb-10">
        Envíanos tus dudas, reportes de errores o sugerencias sobre el catálogo. Nuestro equipo de administración te responderá lo antes posible.
      </p>

      <form @submit.prevent="handleSubmit" class="bg-darkcard p-8 rounded-xl border border-darkborder text-left shadow-lg">
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-400 mb-2">Asunto</label>
          <div class="relative">
            <select 
              v-model="selectedSubject"
              class="w-full bg-darkbg border border-darkborder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brandgreen appearance-none cursor-pointer transition-colors"
            >
              <option v-for="option in subjectOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <span class="absolute right-4 top-4.5 text-xs text-gray-400 pointer-events-none">▼</span>
          </div>
        </div>

        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-400 mb-2">Mensaje</label>
          <textarea 
            v-model="message"
            rows="5" 
            required
            placeholder="Describe tu consulta aquí..." 
            class="w-full bg-darkbg border border-darkborder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brandgreen resize-none transition-colors"
          ></textarea>
        </div>

        <button 
          type="submit" 
          class="w-full bg-brandgreen hover:bg-green-400 text-black font-bold py-3 px-6 rounded-lg transition-colors text-lg shadow-md cursor-pointer"
        >
          Enviar Mensaje
        </button>
      </form>
    </main>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { ref } from 'vue'

// Reactive bindings for data capture
const selectedSubject = ref('Problema técnico en la plataforma')
const message = ref('')

// Subject dropdown options list mapping
const subjectOptions = [
  'Problema técnico en la plataforma',
  'Error en la información de un videojuego',
  'Sugerencia de nueva funcionalidad',
  'Dudas sobre la cuenta'
]

// Form submission logic pipeline
const handleSubmit = () => {
  if (!message.value.trim()) return

  // Mock data payload ready for API integration (Axios / Fetch)
  const ticketData = {
    subject: selectedSubject.value,
    body: message.value.trim(),
    timestamp: new Date().toISOString()
  }

  console.log('Procesando envío de ticket de soporte:', ticketData)

  // Clear inputs after successful submission handling
  message.value = ''
}
</script>