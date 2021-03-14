/**
 * 返回的数据结构如下
 * {
 *      code: 200  // 业务状态码，目前200表示成功
 *      success: true/false // 表示请求是否成功/失败
 *      data: []/{}     // 后台返回的数据集
 *      message: ''     // 后台返回的信息(错误时会使用该字段进行提示)
 * }
 */

import Mock from 'mockjs'

const data = Mock.mock({
    'items|30': [
        {
            id: '@id',
            title: '@sentence(10, 20)',
            'status|1': ['published', 'draft', 'deleted'],
            author: 'name',
            displayTime: '@datetime',
            pageviews: '@integer(300, 5000)'
        }
    ]
})

const tableId = Mock.mock({
    id: '@id'
})

export default [
    // 表格数据
    {
        url: '/vue-admin-template/table/list',
        type: 'get',
        response: config => {
            const items = data.items
            return {
                code: 200,
                success: true,
                data: {
                    total: items.length,
                    resultList: items
                },
                message: ''
            }
        }
    },

    {
        url: '/vue-admin-template/table/add',
        type: 'post',
        response: config => {
            return {
                code: 200,
                success: true,
                data: null,
                message: ''
            }
        }
    },

    {
        url: '/vue-admin-template/table/edit',
        type: 'put',
        response: config => {
            return {
                code: 200,
                success: true,
                data: null,
                message: ''
            }
        }
    },

    {
        url: `/vue-admin-template/table/del/${tableId}`,
        type: 'delete',
        response: config => {
            return {
                code: 200,
                success: true,
                data: null,
                message: ''
            }
        }
    }
]
