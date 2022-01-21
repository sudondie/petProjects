import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/store"
import router from './router/index'
import '../index.css' //tailwindCSS
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')