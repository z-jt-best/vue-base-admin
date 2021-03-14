import * as formFn from './formFn'
import { debounce } from '@/utils/tools.js'
export default {
    data() {
        return {
            dialogForm: {
                // 弹窗表单
                isEdit: false, // 是否修改
                isVisible: false, // 是否显示
                title: '', // 弹窗标题
                formData: {}, // 弹窗表单
                formRule: {} // 弹窗表单验证规则
            },
            fillerOption: {
                //禁止状态 fillerOption:{status:'1,-1,-2'}
            },
            mulSels: [], // 选中列，主要用于批量删除
            checkList: [], // 自定义选中列
            customCheck: false // 自定义全选
        }
    },

    computed: {
        checkAll: {
            get() {
                let tablelist = this.tableList.filter(item => {
                    let flag = true
                    for (let optionItem in this.fillerOption) {
                        if (this.fillerOption[optionItem] && String(this.fillerOption[optionItem]).indexOf(item[optionItem]) != -1) {
                            flag = false
                            break
                        }
                    }
                    return flag
                })

                let tableIds = tablelist.map(item => item.id)
                return tableIds && tableIds.length && tableIds.every(item => this.mulSels.includes(item))
            },
            set(val) {
                return val
            }
        }
    },
    watch: {
        'dialogForm.isVisible': {
            handler(newV) {
                if (newV === false) {
                    this.$refs.myForm && this.$refs.myForm.resetFields()
                }
            }
        },
        /**
         * 自定义表格全选按钮选择
         */
        checkList() {
            if (this.checkList.length === this.tableList.length) {
                this.customCheck = true
            } else {
                this.customCheck = false
            }
        }
    },
    methods: {
        // 选中checkbox
        isShowIcon(row) {
            if (row.opStatus == -1 || row.status == 1 || row.status == 2) {
                return false
            }
            return true
        },

        //筛选复选框
        selectable(row, index) {
            let flag = true
            for (let optionItem in this.fillerOption) {
                if (this.fillerOption[optionItem] && String(this.fillerOption[optionItem]).indexOf(row[optionItem]) != -1) {
                    flag = false
                    break
                }
            }
            return flag
        },

        /**
         * 表单创建（添加功能）
         */
        handleCreate(objValue) {
            formFn.createFn.apply(this, [objValue])
        },

        /**
         *  表单修改（表单修改）
         */
        handleEdit(row, col, idx) {
            formFn.editFn.apply(this, [row])
        },

        /**
         *  删除某一项列表
         */
        handleDel(row, col, idx) {
            formFn.delFn.apply(this, [row, this.url.cud.delete])
        },

        /**
         *  删除多选列表
         */
        handleMulDel(param, message) {
            if (this.url.cud && this.url.cud.mulDel) {
                formFn.mulDelFn.call(this, this.url.cud.mulDel, param, message)
            } else {
                console.log('多选删除失败：获取不到删除地址')
            }
        },

        /**
         *  普通用户自定义表格批量删除
         */
        handleCustomMulDel() {
            if (this.url.cud && this.url.cud.mulDel) {
                formFn.customMulDelFn.call(this, this.url.cud.mulDel)
            } else {
                console.log('多选删除失败：获取不到删除地址')
            }
        },

        /**
         * @param {String} formName //表单名字
         */
        debounceSubmit(formName) {
            this.DSubmitFn(formName)
        },

        /**
         * @param {type} formName  // 表单提交表单名字
         */
        doSubmitForm(formName) {
            /* 分别是“修改”和“新增”的url */
            const _func = this.dialogForm.isEdit ? this.url.cud.update : this.url.cud.create
            formFn.submitFn.apply(this, [formName, _func, this.dialogForm.isEdit])
        },

        resetForm(formName) {
            this.$refs[formName].resetFields()
        },

        /**
         * 表单新增/编辑+表单重置
         */
        handleBeforeClose() {
            this.$refs['myForm'].resetFields()
            this.dialogForm.isVisible = false
        },

        /**
         *  批量选择-删除start
         */
        handleSelectionChange(val) {
            if (val.length < this.tableList.length && val.length >= 0) {
                // this.checkAll = false
            } else if (val.length === this.tableList.length) {
                // this.checkAll = true
            }
            this.mulSels = val.map(item => item.id)
        },

        /**
         *  全选
         */
        selAll() {
            this.$refs.multipleTable.toggleAllSelection()
        },

        /**
         *  自定义全选
         */
        customSelect(e) {
            if (e) {
                this.checkList = this.tableList.map(item => {
                    return item.id
                })
            } else {
                this.checkList = []
            }
        }
    },

    created() {
        this.DSubmitFn = debounce(v => this.doSubmitForm(v))
    }
}
