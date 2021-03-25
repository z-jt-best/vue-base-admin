<!--
    * Time    : 2021-03-15 20:11:27
    * Author  : zhangTj
    * Desc    : 调查问卷新增/编辑
-->

<template>
    <div class="app-container" style="width: 1190px">
        <div class="d-flex position-relative ml-80">
            <div style="width: 377px">
                <div @click="basic" class="bg-000 text-center" style="height: 52px; line-height: 52px; border-radius: 26px 26px 0px 0px">
                    <span class="font-18 text-fff">调研标题</span>
                </div>
                <div class="border border-000" style="min-height: 567px">
                    <div class="bg-f8" style="min-height: 150px"></div>
                    <div class="font-14 px-10">
                        <p>添加内容</p>
                        <div class="d-flex flex-wrap">
                            <span
                                class="border-dashed-ccc flex-center bg-f9 mr-5 mb-5 cursor-pointer floor"
                                style="width: 67px; height: 40px"
                                v-for="floor in floorList"
                                :key="floor.id"
                            >
                                {{ floor.label }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="bg-000" style="height: 52px; border-radius: 0px 0px 26px 26px"></div>
            </div>

            <div
                class="border border-e4 bg-f8 ml-20 font-14 p-20 h-100 position-relative"
                style="width: 478px"
                :style="{ marginTop: dialogTop + 'px' }"
            >
                <div class="arrow"></div>
                <div style="max-height: 700px; height: auto" class="overflow-y-auto overflow-x-h">
                    <el-form :model="basicForm" :rules="formRules" label-width="140px">
                        <el-form-item label="页面标题：" prop="title">
                            <el-input v-model="basicForm.title" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="有效期：" prop="date">
                            <el-date-picker
                                v-model="basicForm.date"
                                type="daterange"
                                style="width: 100%"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="登录状态：">
                            <el-radio-group v-model="basicForm.anonymousFlag">
                                <div style="margin-top: 9px">
                                    <el-radio :label="1">允许匿名参与</el-radio>
                                </div>
                                <div class="mt-5">
                                    <el-radio :label="0">必须登录参与</el-radio>
                                </div>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="调研结果：">
                            <el-checkbox v-model="basicForm.resultShowFlag">调查完成后显示结果</el-checkbox>
                        </el-form-item>
                        <el-form-item label="可参与次数：">
                            <el-radio-group v-model="basicForm.participateManyFlag">
                                <div style="margin-top: 9px">
                                    <el-radio :label="0">可参与单次</el-radio>
                                </div>
                                <div class="mt-5">
                                    <el-radio :label="1">可参与多次（结果取最后一次）</el-radio>
                                </div>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="参与成为分销员：">
                            <el-radio-group v-model="basicForm.becomeShareSaleFlag">
                                <div style="margin-top: 9px">
                                    <el-radio :label="1">开启</el-radio>
                                </div>
                                <div class="mt-5">
                                    <el-radio :label="0">关闭</el-radio>
                                </div>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { componentsDict, floorList } from './components/operate/floorData'

export default {
    name: 'questionOperate',
    components: {},
    provide() {
        return {
            question: this
        }
    },
    data() {
        return {
            basicForm: Object.assign({}, componentsDict['basic']),
            formRules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                date: [{ required: true, message: '请选择时间', trigger: 'blur' }]
            },
            dialogTop: 0
        }
    },
    computed: {
        floorList() {
            return floorList
        }
    },
    watch: {},
    created() {},
    destroyed() {},
    mounted() {},
    methods: {
        basic() {
            this.dialogTop = 0
        }
    }
}
</script>

<style lang="scss" scoped>
.floor {
    &:nth-child(5n) {
        margin-right: 0;
        margin-bottom: 0;
    }
}

.arrow {
    // 实际显示的三角颜色，需要和边框颜色一样
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 7px 6px 0;
    border-color: transparent #e4e4e4 transparent transparent;
    position: absolute;
    left: -8px;
    top: 19px;
    // 伪类用于遮住瑕疵，需要和背景色一样
    &::after {
        content: '';
        border-right-color: #f8f8f8;
        left: 2px;
        top: -6px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 7px 6px 0;
        border-color: transparent #f8f8f8 transparent transparent;
        position: absolute;
    }
}
</style>
