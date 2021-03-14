import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo, tagsView } = defaultSettings

// settings配置项里面的数据，存放在vuex中，方便动态改变
const state = {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    tagsView: tagsView
}

const mutations = {
    // 修改settings配置项
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    // 修改settings配置项
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
