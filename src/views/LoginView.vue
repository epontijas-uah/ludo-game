<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="login-container">
        
        <div class="lang-selector-container">
          <div class="relative">
            <select v-model="language" class="lang-select">
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            <span class="select-arrow">▼</span>
          </div>
        </div>

        <div class="header-container">
          <div class="logo-box">
            <img src="/Logotipo_Blanco.png" alt="LudoGame Logo" class="logo-img">
          </div>
          <h1 class="main-title">LudoGame</h1>
          <p class="text-gray-400 mt-1.5 text-sm font-medium">Tu biblioteca de videojuegos</p>
        </div>

        <div class="login-card">
          <h2 class="card-title">Iniciar sesión</h2>
          <p class="text-gray-400 text-center text-sm mb-10">Ingresa tus credenciales para acceder</p>
          
          <form @submit.prevent="handleLogin" class="form-spacing">
            <div>
              <label class="input-label">Correo electrónico</label>
              <input type="email" v-model="email" placeholder="usuario@correo.com" class="form-input">
            </div>
            
            <div>
              <label class="input-label">Contraseña</label>
              <input type="password" v-model="password" placeholder="••••••••" class="form-input">
            </div>

            <div class="forgot-container">
              <a href="#" class="forgot-link">Recuperar contraseña</a>
            </div>

            <button type="submit" class="submit-btn">
              Iniciar sesión
            </button>
          </form>

          <div class="divider-container">
            <div class="divider-line"></div>
            <span class="divider-text">O continúa con</span>
            <div class="divider-line"></div>
          </div>

          <div class="social-grid">
            <button @click="loginWithProvider('Google')" class="social-btn">Google</button>
            <button @click="loginWithProvider('GitHub')" class="social-btn">GitHub</button>
          </div>

          <p class="text-center text-sm text-gray-400 mt-10">
            ¿No tienes una cuenta? 
            <a href="#" class="text-brandgreen font-bold hover:underline ml-1">Regístrate</a>
          </p>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import { ref } from 'vue';

const language = ref('es');
const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Login:', email.value, password.value);
};

const loginWithProvider = (provider) => {
  console.log('Social:', provider);
};
</script>

<style scoped>
/* Estilos directos garantizados */
ion-content {
  --background: #333333 !important;
}

.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  background-color: #333333;
  font-family: sans-serif;
}

.lang-selector-container {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}

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
  transition: color 0.2s;
}

.lang-select:focus {
  border-color: #00E676;
}

.select-arrow {
  position: absolute;
  right: 0.75rem;
  top: 0.65rem;
  font-size: 10px;
  color: #9ca3af;
  pointer-events: none;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;
}

.logo-box {
  margin-bottom: 0.75rem;
}

.logo-img {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}

.main-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #ffffff;
  margin: 0;
}

.login-card {
  background-color: #222222;
  border: 1px solid #4a4a4a;
  padding: 2rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-spacing > * + * {
  margin-top: 1rem;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  background-color: #333333;
  border: 1px solid #4a4a4a;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #00E676;
}

.form-input::placeholder {
  color: #4b5563;
}

.forgot-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.forgot-link {
  font-size: 0.875rem;
  color: #B8860B;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #facc15;
}

.submit-btn {
  width: 100%;
  background-color: #00E676;
  color: #000000;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background-color: #4ade80;
}

.divider-container {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.divider-line {
  height: 1px;
  background-color: #4a4a4a;
  flex: 1;
}

.divider-text {
  font-size: 0.75rem;
  color: #9ca3af;
  /* font-medium: 500; */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.social-grid {
  margin-top: 1.5rem;
  display: grid;
  /* grid-cols: 1fr 1fr; */
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #333333;
  border: 1px solid #4a4a4a;
  padding: 0.625rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #d1d5db;
  cursor: pointer;
  transition: background-color 0.2s;
}

.social-btn:hover {
  background-color: #374151;
}
</style>