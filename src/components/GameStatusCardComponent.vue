<template>
  <div class="bg-darkcard rounded-xl border border-darkborder overflow-hidden relative shadow-lg group hover:border-gray-500 transition-all duration-300">
    
    <button 
      @click="$emit('toggle-favorite', game.id)"
      class="absolute top-3 right-3 w-8 h-8 rounded-full bg-darkbg/80 backdrop-blur border border-darkborder flex items-center justify-center shadow-lg z-10 transition-colors"
      :class="game.isFavorite ? 'text-goldaccent' : 'text-gray-400 hover:text-goldaccent'"
    >
      {{ game.isFavorite ? '★' : '☆' }}
    </button>

    <div class="h-64 bg-gray-700 relative overflow-hidden">
      <img 
        :src="game.image" 
        :alt="game.title" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      >
    </div>

    <div class="p-4">
      <h3 class="font-bold text-sm mb-3 truncate" :title="game.title">
        {{ game.title }}
      </h3>
      
      <div class="relative">
        <select 
          :value="game.status"
          @change="$emit('update-status', game.id, $event.target.value)"
          class="w-full font-bold text-xs rounded-lg py-2.5 px-3 appearance-none cursor-pointer text-center transition-colors focus:outline-none"
          :class="getStatusClasses(game.status)"
        >
          <option value="En curso">En curso</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Finalizado">Terminado</option>
          <option value="Jugado regularmente">Jugado regularmente</option>
        </select>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  game: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-favorite', 'update-status'])

// El diccionario de estilos se traslada aquí para encapsular el componente
const getStatusClasses = (status) => {
  switch (status) {
    case 'En curso':
      return 'bg-brandgreen text-black'
    case 'Pendiente':
      return 'bg-darkbg border border-darkborder text-gray-300'
    case 'Finalizado':
      return 'bg-coral text-white'
    case 'Jugado regularmente':
      return 'bg-goldaccent text-white'
    default:
      return 'bg-gray-600 text-white'
  }
}
</script>