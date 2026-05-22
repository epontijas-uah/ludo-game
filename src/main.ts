import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* Importación obligatoria del plugin de Ionic */
import { IonicVue } from '@ionic/vue'

/* Estilos estructurales de Ionic (imprescindibles para que se vea el contenido) */
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

import './main.css'

const app = createApp(App)
  .use(IonicVue) // Instancia el contexto global de Ionic
  .use(router)

// Es buena práctica esperar a que el router esté listo en Ionic antes de montar
router.isReady().then(() => {
  app.mount('#app')
})