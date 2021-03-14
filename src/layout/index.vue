<!--
  主要的布局组件，使用到的子组件：
  1. Siedbar：侧边栏
  2. Navbar：顶部导航栏
  3. TagsView：顶部导航栏内的一部分，面包屑导航栏
  4. AppMain：主要的内容展示部分，所有页面组件都是在这里展示的
 -->
<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container" />
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <navbar />
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
        </div>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { mapState } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain,
        TagsView
    },
    mixins: [ResizeMixin],
    computed: {
        // 需要使用到的公共状态
        ...mapState({
            sidebar: state => state.app.sidebar,
            device: state => state.app.device,
            needTagsView: state => state.settings.tagsView,
            fixedHeader: state => state.settings.fixedHeader
        }),

        // 样式对象(动态控制)
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    methods: {
        // 关闭sideBar
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}
</style>
