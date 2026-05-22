<template>
  <div class="lang-selector-container" :class="containerClass">
    <label class="sr-only" :for="id">Idioma</label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @change="onChange"
        class="lang-select"
        aria-label="Seleccionar idioma"
      >
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <span class="select-arrow" aria-hidden="true">▼</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: 'es' },
  options: {
    type: Array,
    default: () => [
      { label: 'ES', value: 'es' },
      { label: 'EN', value: 'en' }
    ]
  },
  /**
   * containerClass: clase extra a añadir al contenedor
   * id: id para el select (útil para tests / accesibilidad)
   */
  containerClass: { type: String, default: '' },
  id: { type: String, default: 'lang-select' }
});

const emit = defineEmits(['update:modelValue']);

function onChange(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style scoped>
/* contenedor posicionado (se posiciona respecto a un ancestor con position: relative) */
.lang-selector-container {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 30;
  display: inline-block;
}

/* select visual */
.lang-select {
  background-color: #222222;
  border: 1px solid #4a4a4a;
  border-radius: 0.5rem;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: #d1d5db;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

/* focus */
.lang-select:focus {
  border-color: #00E676;
  box-shadow: 0 0 0 3px rgba(0,230,118,0.08);
}

/* flecha ad-hoc */
.select-arrow {
  position: absolute;
  right: 0.75rem;
  top: 0.65rem;
  font-size: 10px;
  color: #9ca3af;
  pointer-events: none;
}

/* screen-reader only */
.sr-only {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}

/* pequeño ajuste responsive: reducir padding en pantallas pequeñas */
@media (max-width: 420px) {
  .lang-selector-container { top: 1rem; right: 1rem; }
  .lang-select { padding-right: 1.75rem; font-size: 0.7rem; }
  .select-arrow { top: 0.6rem; }
}
</style>