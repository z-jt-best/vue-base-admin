<!--
    * Time    : 2021-03-15 20:11:41
    * Author  : zhangTj
    * Desc    : 调查问卷列表页
-->

<template>
    <div class="app-container">
        <!-- 查询 -->
        <div class="search">
            <el-form :inline="true" :model="searchFilters" size="small">
                <el-form-item label="问卷标题：">
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
                <el-form-item>
                    <el-button size="small" @click.stop="dbnSearch">搜索</el-button>
                    <el-button size="small" @click.stop="dbnResetSearch">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 操作 -->
        <el-row class="my-20">
            <el-button type="primary" @click="$toPage('questionOperate')">新增</el-button>
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
                        <el-tag type="primary">{{ scope.row.status }}</el-tag>
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
    </div>
</template>

<script>
import common from '@/mixins/pages/commom'
import { tableApi } from '@/api/table'

export default {
    name: 'questionManage',
    components: {},
    mixins: [common],
    data() {
        return {
            searchFilters: { name: '', status: '', recommendFlag: '', beginTime: '', endTime: '' },
            date: '',
            url: tableApi // 混入相关增删改查
        }
    },
    computed: {},
    watch: {},
    created() {},
    destroyed() {},
    mounted() {},
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

<style lang="scss" scoped></style>
