/*
 * @Description: 
 * @Author: tengkai
 * @Date: 2025-03-31 12:59:22
 * @LastEditors: tengkai
 * @LastEditTime: 2025-04-14 14:20:09
 */
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './style.css'
import './styles/common.scss'
import App from './App.vue'
import router from './router'
// 引入 Vant
import Vant from 'vant'
import 'vant/lib/index.css'

// import VConsole from 'vconsole'

// if (process.env.NODE_ENV === 'development') {
//     new VConsole()
// }
const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Vant) // 使用 Vant

app.mount('#app')
