import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import routerFactory from '@/routers/index.js'
import i18nFactory from '@/utils/i18n/index.js'
import { VueRecaptchaPlugin } from 'vue-recaptcha/head'
import CKEditor from '@ckeditor/ckeditor5-vue'
import VuePlyr from 'vue-plyr'
import '@/assets/styles/main.scss'
import 'ant-design-vue/dist/reset.css'
import 'vue-plyr/dist/vue-plyr.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

const i18n = i18nFactory()

app.use(routerFactory(i18n.global))
app.use(i18n)
app.use(VueRecaptchaPlugin, {
  v3SiteKey: import.meta.env.VITE_APP_RECAPTCHA_V3_SITE_KEY
})
app.use(CKEditor)
app.use(VuePlyr, {
  plyr: {}
})
app.mount('#app')
