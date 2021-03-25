import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { size: 'small' })

// 全局跳转方法(建议使用name)
Vue.prototype.$toPage = function (name, query) {
    if (name.indexOf('/') != -1) {
        router.push({ path: name, query })
    } else {
        router.push({ name, query })
    }
}

import Pagination from '@/components/Pagination'
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
