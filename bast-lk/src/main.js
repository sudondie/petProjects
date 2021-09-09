import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import './theme.css'
import quasarUserOptions from './quasar-user-options'
createApp(App).use(Quasar, quasarUserOptions).mount('#app')
