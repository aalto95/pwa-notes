import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import './registerServiceWorker'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
