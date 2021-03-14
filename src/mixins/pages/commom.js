import * as formFn from './formFn.js'
import { debounce } from '@/utils/tools.js'
export default {
    data() {
        return {
            searchFilters: {}, // 搜索参数
            fixFilters: {}, //固定搜索参数
            tableList: [], // 表格数据数组
            tableListLoading: false, // 表格请求loading
            tableTotal: 0, // 表格列表总数
            page: {
                // 表格页码
                pageSize: 10,
                curPage: 1
            },
            orderBy: {
                // 排序
                prop: '',
                order: ''
            }
        }
    },
    methods: {
        getRowKeys(row) {
            return row.id
        },
        /**
         *  获取表格列表
         */
        getData() {
            const param = {
                ...this.fixFilters,
                ...this.searchFilters,
                ...this.page,
                ...this.orderBy
            }
            formFn.getDataFn.apply(this, [this.url.cud.getData, param])
        },
        /**
         * 搜索列表加防抖
         */
        dbnSearch: debounce(function () {
            this.page.curPage = 1
            this.getData()
        }),

        /**
         * 搜索列表
         */
        doSearch() {
            this.page.curPage = 1
            this.getData()
        },

        /**
         *  重置搜素参数加防抖
         */
        dbnResetSearch: debounce(function () {
            let whiteList = arguments[0]
            if (!(whiteList instanceof Array)) {
                whiteList = []
            }
            for (const key in this.searchFilters) {
                if (whiteList.length != 0) {
                    for (const item of whiteList) {
                        if (key !== item) {
                            this.searchFilters[key] = ''
                        }
                    }
                } else {
                    this.searchFilters[key] = ''
                }
            }
            this.date = '' // 这里做一处时间兼容，date字段并没有放在searchFilters对象中，而是放在外面
            this.page.curPage = 1
            this.getData()
        }),

        /**
         *  页码改变
         */
        currentPageChange(p) {
            this.page.curPage = p
            this.getData()
        },

        /**
         *  页数改变
         */
        pageSizeChange(size) {
            this.page.pageSize = size
            this.getData()
        },

        /**
         *  排序改变
         */
        changeSort(val) {
            console.log(val)
            this.orderBy.prop = val.prop
            this.orderBy.order = val.order

            if (val.order == 'ascending') {
                this.orderBy.order = 'asc'
            } else if (val.order == 'descending') {
                this.orderBy.order = 'desc'
            } else {
                this.orderBy.order = val.order
            }
            this.getData()
        },

        indexMethod(idx) {
            return (this.page.curPage - 1) * this.page.pageSize + (idx + 1)
        }
    },

    mounted() {
        this.getData()
    },

    created() {}
}
