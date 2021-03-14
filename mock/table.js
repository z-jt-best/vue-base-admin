import Mock from 'mockjs'

/**
 * 返回的数据结构如下
 * {
 *      code: 200  // 业务状态码，目前200表示成功
 *      success: true/false // 表示请求是否成功/失败
 *      data: []/{}     // 后台返回的数据集
 *      message: ''     // 后台返回的信息(错误时会使用该字段进行提示)
 * }
 */

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

export default [
    {
        url: '/vue-admin-template/table/list',
        type: 'get',
        response: config => {
            const items = data.items
            return {
                code: 200,
                success: true, // 请求是否成功
                data: {
                    total: items.length,
                    resultList: items
                },
                message: ''
            }
        }
    }
]
