<template>
    <div class="upload-container">
        <el-button :style="{ background: color, borderColor: color }" icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible = true">
            上传图片
        </el-button>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
            <el-upload
                name="file"
                :multiple="true"
                :file-list="fileList"
                :show-file-list="true"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="beforeUpload"
                class="editor-slide-upload"
                action="/basic/file/upload"
                :data="{ fileSource: 'A' }"
                :headers="headers"
                list-type="picture-card"
            >
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确认</el-button>
        </el-dialog>
    </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { getToken } from '@/utils/auth'

export default {
    name: 'EditorSlideUpload',
    props: {
        color: {
            type: String,
            default: '#1890ff'
        }
    },
    data() {
        return {
            dialogVisible: false,
            listObj: {},
            fileList: [],
            headers: { Authorization: 'Bearer ' + getToken() }
        }
    },
    methods: {
        checkAllSuccess() {
            return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
        },

        handleSubmit() {
            // const arr = Object.keys(this.listObj).map(v => this.listObj[v])
            const arr = Object.keys(this.listObj).reduce((arr, item) => {
                if (this.listObj[item].hasSuccess) {
                    arr.push(this.listObj[item])
                }
                return arr
            }, [])
            // if (!this.checkAllSuccess()) {
            //   // this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
            //   this.$message('图片正在上传中，请稍等...')
            //   return
            // }
            this.$emit('successCBK', arr)
            this.listObj = {}
            this.fileList = []
            this.dialogVisible = false
        },

        // 上传失败回调函数
        handleError(response) {
            console.log(response)
            this.$message.error('上传失败')
        },

        // 图片上传成功回调函数
        handleSuccess(response, file) {
            console.log(response, file)
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            console.log(objKeyArr)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = response.data.url
                    this.listObj[objKeyArr[i]].hasSuccess = true
                    console.log(this.listObj)
                    return
                }
            }
        },

        // 移除图片回调函数
        handleRemove(file) {
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    delete this.listObj[objKeyArr[i]]
                    return
                }
            }
        },

        // 上传前回调函数
        beforeUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('图片大小不能超过 5MB!')
                return false
            }
            const _self = this
            const _URL = window.URL || window.webkitURL
            const fileName = file.uid
            this.listObj[fileName] = {}
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.src = _URL.createObjectURL(file)
                img.onload = function () {
                    _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
                }
                resolve(true)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
    margin-bottom: 20px;
    ::v-deep .el-upload--picture-card {
        width: 100%;
    }
}
</style>
