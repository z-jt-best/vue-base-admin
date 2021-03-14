import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { singleMessage } from './tools'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// request拦截器
service.interceptors.request.use(
    config => {
        // 设置请求头
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log('请求错误：', error) // for debug
        return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        // 如果业务状态码不等于20000，都报错
        if (res.code !== 20000) {
            singleMessage.showMessage(res.msg)

            // 如果状态码不对，则清除token退出登录
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('您已经退出登录，你可以点击取消留在该页面，或者返回登录页面重新登录', '退出登录', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('response错误了：' + error) // for debug
        singleMessage.showMessage(error.response.data.msg || '网络请求异常, 请检查您的网络设置后刷新重试!')
        return Promise.reject(error)
    }
)

export default service
