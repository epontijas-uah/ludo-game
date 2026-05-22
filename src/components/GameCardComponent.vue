<template>
  <div class="game-card">
    <div class="image-container">
      <img :src="image" :alt="title" class="game-image">
    </div>
    <div class="card-body">
      <h3 class="game-title">{{ title }}</h3>
      <button @click="onAdd" class="add-button">
        <span class="plus-icon">+</span> Añadir a mi librería
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Definición de los atributos que puede recibir el componente
defineProps({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

// Definición del evento que se disparará al pulsar el botón
const emit = defineEmits(['add-click']);

const onAdd = () => {
  emit('add-click');
};
</script>

<style scoped>
.game-card {
  background-color: #222222;
  border: 1px solid #4a4a4a;
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.image-container {
  height: 16rem;
  background-color: #374151;
  position: relative;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.game-title {
  font-weight: 700;
  font-size: 0.875rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #ffffff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.25rem;
  height: 2.5rem;
}

.add-button {
  margin-top: auto;
  width: 100%;
  background-color: #00E676;
  color: #000000;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.625rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #4ade80;
}

.plus-icon {
  font-size: 1.125rem;
  line-height: 1;
}
</style>