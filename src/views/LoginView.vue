<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="login-container">
        
        <LangSelector v-model="language" />

        <div class="header-container">
          <div class="logo-box">
            <img src="/Logotipo_Blanco.png" alt="LudoGame Logo" class="logo-img">
          </div>
          <h1 class="main-title">LudoGame</h1>
          <p class="gray-text">Tu biblioteca de videojuegos</p>
        </div>

        <div class="login-card">
          <h2 class="card-title">Iniciar sesión</h2>
          <p class="gray-text">Ingresa tus credenciales para acceder</p>
          
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

          <div class="register-div">
            <p>
              ¿No tienes una cuenta? 
              <a href="#" class="register-btn">Regístrate</a>
            </p>
          </div>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import { ref } from 'vue';
import LangSelector from '@/components/LangSelector.vue';

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
  gap: 1.5rem;
}

/* CABECERA - TITULO E ICONO ------------------- */
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-img {
  height: 3.5rem;
  object-fit: contain;
}

.main-title {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-top: 1rem;
}

.gray-text{
  color: #9ca3af;
  margin: 0;
  font-size: 14px;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* TARJETA LOGIN -------------------------- */
.login-card {
  background-color: #222222;
  border: 1px solid #4a4a4a;
  padding: 2rem 2rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  position: relative;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 0;
  text-align: center;
}

/* FORMULARIO */
.form-spacing > * + * {
  margin-top: 1.1rem;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: bold;
  color: #c5c5c5;
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

/* PW OLVIDADA */
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
  margin: 1rem 0;
}

.forgot-link:hover {
  color: #facc15;
}

/* INICIAR SESION BOTON */
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

/* SEPARACION LOGIN */
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
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* BOTONES REDES */
.social-grid {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem; /* espacio para que no quede pegado al texto absoluto */
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

.register-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.95rem;
  color: #9ca3af;
}

.register-btn{
  font-weight: bold;
  text-decoration: none;
  color: #00E676;
}

</style>