/**
 * 返回的数据结构如下
 * {
 *      code: 200  // 业务状态码，目前200表示成功
 *      success: true/false // 表示请求是否成功/失败
 *      data: []/{}     // 后台返回的数据集
 *      message: ''     // 后台返回的信息(错误时会使用该字段进行提示)
 * }
 */

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

export default [
    // 登录
    {
        url: '/vue-admin-template/user/login',
        type: 'post',
        response: config => {
            const { username } = config.body
            const token = tokens[username]

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect.'
                }
            }

            return {
                code: 200,
                data: token
            }
        }
    },

    // 获取用户信息
    {
        url: '/vue-admin-template/user/info.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: info
            }
        }
    },

    // 退出登录
    {
        url: '/vue-admin-template/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 200,
                data: 'success'
            }
        }
    }
]
