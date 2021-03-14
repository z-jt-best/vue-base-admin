<template>
    <div class="app-container">
        <!-- 查询 -->
        <div class="search">
            <el-form :inline="true" :model="searchFilters" size="small">
                <el-form-item label="标题：">
                    <el-input v-model="searchFilters.name" placeholder="标题：" />
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="date"
                        style="width: 250px"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="changeDate"
                    />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchFilters.status" placeholder="请选择" clearable>
                        <el-option label="上线" :value="1" />
                        <el-option label="下线" :value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item label="是否推荐">
                    <el-select v-model="searchFilters.recommendFlag" placeholder="请选择" clearable>
                        <el-option label="是" :value="1" />
                        <el-option label="否" :value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" @click.stop="dbnSearch">搜索</el-button>
                    <el-button size="small" @click.stop="dbnResetSearch">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 操作 -->
        <el-row class="my-20">
            <el-button type="primary" @click="handleCreate">新增</el-button>
        </el-row>

        <!-- 表格 -->
        <div class="table">
            <el-table v-loading="tableListLoading" :data="tableList" element-loading-text="Loading" border fit>
                <el-table-column align="center" label="ID" width="95">
                    <template slot-scope="scope">
                        {{ scope.$index }}
                    </template>
                </el-table-column>
                <el-table-column label="Title">
                    <template slot-scope="scope">
                        {{ scope.row.title }}
                    </template>
                </el-table-column>
                <el-table-column label="Author" width="110" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Pageviews" width="110" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.pageviews }}
                    </template>
                </el-table-column>
                <el-table-column class-name="status-col" label="Status" width="110" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="Display_time" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time" />
                        <span>{{ scope.row.displayTime }}</span>
                    </template>
                </el-table-column>

                <!-- 混入相关方法 -->
                <el-table-column align="center" prop="created_at" label="操作" width="200">
                    <template slot-scope="scope">
                        <span class="table__action">
                            <el-link :underline="false" type="primary" @click="handleCreate()">新增</el-link>
                            <el-link :underline="false" type="primary" @click.stop="handleEdit(scope.row, scope.column, scope.$index)">编辑</el-link>
                            <el-link
                                v-if="!scope.deleteFlag"
                                :underline="false"
                                type="primary"
                                @click.stop="handleDel(scope.row, scope.column, scope.$index)"
                            >
                                删除
                            </el-link>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <el-row type="flex" justify="end">
            <Pagination
                :current-page="page.curPageNo"
                :limit="page.pageSize"
                :total="tableTotal"
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
            />
        </el-row>

        <!-- 混入 => 新增/编辑 -->
        <el-dialog :title="dialogForm.title" custom-class="dialog-form" width="800px" :visible.sync="dialogForm.isVisible">
            <el-form ref="myForm" :model="dialogForm.formData" :rules="dialogForm.formRule" label-width="95px" label-position="right" size="small">
                <el-form-item label="标题" prop="title">
                    <el-input
                        v-model="dialogForm.formData.title"
                        placeholder="请输入标题"
                        :autosize="{ minRows: 3 }"
                        maxlength="200"
                        type="textarea"
                        show-word-limit
                        clearable
                    />
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model="dialogForm.formData.author" clearable placeholder="请输入作者" maxlength="20" show-word-limit />
                </el-form-item>
                <el-form-item label="发布时间" prop="displayTime">
                    <el-date-picker v-model="dialogForm.formData.displayTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="文章状态" v-if="dialogForm.formData.status">
                    <el-tag :type="dialogForm.formData.status | statusFilter">{{ dialogForm.formData.status }}</el-tag>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="dialogForm.isVisible = false">取 消</el-button>
                <el-button type="primary" @click.stop="debounceSubmit('myForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tableApi } from '@/api/table'
import common from '@/mixins/pages/commom'
import cud from '@/mixins/pages/cud.js'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'

export default {
    components: { Pagination },
    mixins: [common, cud],
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'gray',
                deleted: 'danger'
            }
            return statusMap[status]
        }
    },
    data() {
        return {
            searchFilters: { name: '', status: '', recommendFlag: '', beginTime: '', endTime: '' },
            date: '',
            url: tableApi, // 混入相关增删改查
            // 混入表单数据和校验
            dialogForm: {
                formData: {},
                formRule: {
                    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                    author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
                    displayTime: [{ required: true, message: '请选择时间', trigger: 'blur' }]
                }
            }
        }
    },
    created() {},
    methods: {
        // 改变日期
        changeDate() {
            if (this.date) {
                this.$set(this.searchFilters, 'beginTime', parseTime(this.date[0], '{y}-{m}-{d}'))
                this.$set(this.searchFilters, 'endTime', parseTime(this.date[1], '{y}-{m}-{d}'))
            } else {
                this.$set(this.searchFilters, 'beginTime', '')
                this.$set(this.searchFilters, 'endTime', '')
            }
        }
    }
}
</script>
