import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import VueCookies from "vue3-cookies";
// import VueLuckyDraw from '@lucky-canvas/vue';
const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(VueCookies)
// app.use(VueLuckyDraw)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')



