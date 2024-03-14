import { createApp } from 'vue'
import '@/assets/styles/main.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import routerFactory from '@/routers/index.js'
import i18nFactory from '@/utils/i18n/index.js'
import '@/assets/styles/main.scss'
import 'ant-design-vue/dist/reset.css'
import { VueRecaptchaPlugin } from 'vue-recaptcha/head'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

const i18n = i18nFactory()

app.use(routerFactory(i18n.global))
app.use(i18n)
app.use(VueRecaptchaPlugin, {
  v3SiteKey: import.meta.env.VITE_APP_RECAPTCHA_V3_SITE_KEY
})

app.mount('#app')
