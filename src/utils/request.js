import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { singleMessage, getFileName } from './tools'

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
        if (res.code !== 200) {
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

class BaseRequest {
    constructor(baseURL = '', config = {}) {
        this.baseAxios = service
        this.baseURL = baseURL
        this.config = config
        this.optionsObj = {
            globalLoading: false, // 全局loading
            showToast: true // 提示信息(业务状态码不正确时弹出)
        }
    }

    // 基类方法
    sendRequest(config, options) {
        const url = this.baseURL + config.url
        const baseconfig = Object.assign({}, this.config, config, { url })

        const finalOpt = { ...this.optionsObj, ...options }

        // 是否显示全局loading
        let globalLoadingIns = null
        if (finalOpt.globalLoading) {
            globalLoadingIns = Loading.service()
        }

        return new Promise((resolve, reject) => {
            this.baseAxios
                .request(baseconfig)
                .then(res => {
                    // 成功的请求，但是业务状态码不对
                    if (!res.success && finalOpt.showToast) {
                        singleMessage.showMessage('业务状态码不对')
                        console.log('error code')
                    }
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
                .finally(_ => {
                    if (globalLoadingIns) {
                        loadingInstance.close()
                    }
                })
        })
    }

    get(url, params, options, config = {}) {
        return this.sendRequest(
            {
                method: 'GET',
                url,
                params,
                ...config
            },
            options
        )
    }

    post(url, data, options, config = {}) {
        return this.sendRequest(
            {
                method: 'POST',
                url,
                data,
                ...config
            },
            options
        )
    }

    // 表单提交
    postForm(url, data, options, config = {}) {
        return this.sendRequest(
            {
                method: 'POST',
                url,
                data: qs.stringify(data),
                ...config
            },
            options
        )
    }

    put(url, data, options, config = {}) {
        return this.sendRequest(
            {
                method: 'PUT',
                url,
                data,
                ...config
            },
            options
        )
    }

    delete(url, data, options, config = {}) {
        return this.sendRequest(
            {
                method: 'DELETE',
                url,
                data,
                ...config
            },
            options
        )
    }

    // 下载文件
    getFile(url, data) {
        const requestParmams = {
            url: url,
            method: 'get',
            params: data,
            data: { getFile: true },
            headers: { 'content-type': 'application/json' },
            responseType: 'blob'
        }
        this.sendRequest(requestParmams)
            .then(res => {
                // 如果是二进制的，则进行下载
                const fileContent = new Blob([res.data])
                const link = document.createElement('a') // a标签下载
                link.href = window.URL.createObjectURL(fileContent)
                const fileName = getFileName(res.headers['content-disposition'])
                link.download = `${fileName}`
                link.click()
                window.URL.revokeObjectURL(link.href)
                Message({
                    message: '导出成功',
                    type: 'success',
                    duration: 5 * 1000
                })
            })
            .catch(err => {
                console.log('下载文件失败：', err)
                Message({
                    message: '导出失败',
                    type: 'error',
                    duration: 5 * 1000
                })
            })
    }
}

export { BaseRequest }
