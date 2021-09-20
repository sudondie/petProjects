import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import './theme.css'
import store from './store'
import quasarUserOptions from './quasar-user-options'
createApp(App).use(Quasar, quasarUserOptions).use(store).mount('#app')
