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
        update: data => tableModule.put('/activity/admin/distribution/rules/basic/settingsedit', data),
        delete: id => tableModule.delete(`/activity/admin/distribution/rules/basic/settings/${id}`),
        create: data => tableModule.post('/activity/admin/distribution/rules/basic/settingsadd', data),
        mulDel: data => tableModule.delete('/activity/admin/distribution/rules/basic/settingsadd', data)
    }
}

export { tableApi }
