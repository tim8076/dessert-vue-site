import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'swiper/css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// vee-validate
import { Form, Field, ErrorMessage,  } from 'vee-validate'
import { defineRule, configure } from 'vee-validate'
import * as rules from '@vee-validate/rules'
import { localize, loadLocaleFromURL, setLocale } from '@vee-validate/i18n'

configure({
  generateMessage: localize({
    zh_TW: loadLocaleFromURL('/zh_TW.json')
  }),
  validateOnInput: true
})
// 啟用語言
setLocale('zh_TW')

// 把所有 rules 自動註冊
Object.keys(rules).forEach(rule => {
  if (typeof rules[rule] === 'function') {
    defineRule(rule, rules[rule])
  }
})

// 全域註冊（Options API 比較方便）
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('LoadingComponent', Loading);
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
