/**
 * 项目配置文件
 * 一般配置项目的请求路径和服务器相关路径
 */

let env = process.env.ENV // 本地环境
// let env = 'development' // 本地环境
// let env = 'test' // 测试环境 (预生产环境)
// let env = 'production' // 生产环境

// 基本配置
const baseConfig = {
    server: '', // 服务端地址
    photoServer: '', // 图片服务器前缀
    staticServer: '', // 静态服务器前缀
    website: '' // 网站地址
}

const configs = {
    development: {
        ...baseConfig
    },

    test: {
        ...baseConfig
    },

    production: {
        ...baseConfig
    }
}

const config = configs[env]

export default config
