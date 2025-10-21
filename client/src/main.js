// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia' // Importa createPinia

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const pinia = createPinia() // Crea la instància de Pinia
const app = createApp(App)

registerPlugins(app)

app.use(pinia) // Fes servir Pinia a l'app
app.mount('#app')