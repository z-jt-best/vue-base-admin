import Layout from '@/layout'

const ModuleMarket = [
    {
        path: '/ModuleMarket',
        name: 'ModuleMarket',
        component: Layout,
        redirect: '/ModuleMarket/questionManage',
        meta: {
            title: '市场营销',
            icon: 'nested'
        },
        children: [
            {
                path: 'questionManage',
                name: 'questionManage',
                component: () => import('@/views/ModuleMarket/questionManage'),
                meta: { title: '调查问卷' }
            },
            {
                path: 'questionOperate',
                name: 'questionOperate',
                hidden: true,
                component: () => import('@/views/ModuleMarket/questionManage/questionOperate'),
                meta: { title: '编辑问卷' }
            }
        ]
    }
]

export default ModuleMarket
