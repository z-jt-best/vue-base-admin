import { tableModule } from './index'

// export function getList(params) {
//     return request({
//         url: '/vue-admin-template/table/list',
//         method: 'get',
//         params
//     })
// }

const tableApi = {
    // 当前页面的混入增删改查接口
    cud: {
        getData: data => tableModule.get('/vue-admin-template/table/list', data),
        create: data => tableModule.post('/vue-admin-template/table/add', data),
        update: data => tableModule.put('/vue-admin-template/table/edit', data),
        delete: id => tableModule.delete(`/vue-admin-template/table/del/${id}`),
        mulDel: data => tableModule.delete('/activity/admin/distribution/rules/basic/settingsadd', data)
    }
}

export { tableApi }
