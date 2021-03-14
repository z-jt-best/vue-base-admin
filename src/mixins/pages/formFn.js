import { deepClone } from '@/utils/tools.js'

/**
 * 新增
 * @param {Object} obj 为表单默认要显示的默认值，如果无，就不填写，可选
 */
export function createFn(obj) {
    if (obj && obj.type != 'click') {
        this.dialogForm.formData = Object.assign({}, deepClone(obj))
    }
    this.dialogForm.isEdit = false
    this.dialogForm.title = '新增'
    this.$nextTick(() => {
        this.dialogForm.isVisible = true
    })
}

// 编辑
export function editFn(row = {}) {
    this.dialogForm.isEdit = true
    this.dialogForm.title = '编辑'
    this.dialogForm.isVisible = true

    this.$nextTick(() => {
        this.dialogForm.formData = Object.assign({}, deepClone(row))
    })
}

// 删除
export function delFn(row, func) {
    this.$confirm('确认删除该数据吗?', '提示', {
        type: 'warning'
    })
        .then(() => {
            func(row.id)
                .then(res => {
                    if (!res.code) {
                        this.$message.warning(res.msg)
                        return
                    }
                    this.$message.success('删除成功')
                    this.getData()
                })
                .catch(err => {
                    console.log('delete err', err)
                })
        })
        .catch(() => {
            this.$message.info('取消删除')
        })
}

// dialog 编辑/新增
export function submitFn(formName, func, isEdit) {
    const title = isEdit ? '编辑' : '添加'
    this.$refs[formName].validate(valid => {
        if (valid) {
            func(this.dialogForm.formData)
                .then(res => {
                    if (!res.code) {
                        this.$message.warning(res.msg)
                        return
                    }
                    this.$message.success(`${title}成功`)
                    this.getData()
                    this.dialogForm.isVisible = false
                })
                .catch(err => {
                    console.log(`${isEdit ? '编辑' : '新增'}报错了${err}`)
                })
        } else {
            console.error('Error submit ----- Form invalid !')
            return false
        }
    })
}

// 获取表格数据
export function getDataFn(func, params = {}) {
    this.tableListLoading = true

    func(params)
        .then(res => {
            this.tableListLoading = false
            this.tableTotal = res.data.total
            this.tableList = res.data.resultList || []
        })
        .catch(e => {
            console.log('getData error', e)
            this.tableListLoading = false
        })
        .finally(_ => {
            this.tableListLoading = false
        })
}

// TODO => 多选删除需要根据业务改造，现在暂未改造
export function mulDelFn(func) {
    if (!this.mulSels.length) {
        this.$alert('请选择要删除的数据', '提示')
        return
    }
    this.$confirm('确认删除该数据吗?', '提示', {
        type: 'warning'
    })
        .then(() => {
            func({
                ids: this.mulSels
            })
                .then(res => {
                    if (!res.code) {
                        this.$message.warning(res.msg)
                        return
                    }
                    this.$message.success('删除成功')
                    this.getData()
                })
                .catch(err => {
                    console.log('mulDelete error', err)
                })
        })
        .catch(() => {
            this.$message.info('取消删除')
        })
}

function catchUrl(e, url, detail) {
    console.group(`Error found in doPost(${url})`)
    if (detail) console.info(`--${detail}--报错！`)
    console.error(e)
    console.groupEnd()
}

function catchFn(e, fn) {
    console.group(`Error found in method (${fn.name})`)
    console.error(e)
    console.groupEnd()
}
