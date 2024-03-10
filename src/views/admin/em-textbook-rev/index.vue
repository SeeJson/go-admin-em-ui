
<template>
    <BasicLayout>
        <template #wrapper>
            <el-card class="box-card">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="领取日期" prop="revTime"><el-input v-model="queryParams.revTime" placeholder="请输入领取日期" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="班级名" prop="classId"><el-input v-model="queryParams.classId" placeholder="请输入班级名" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="教材名" prop="textbookId"><el-select v-model="queryParams.textbookId"
                                           placeholder="请选择" clearable size="small" >
                                    <el-option
                                            v-for="dict in textbookIdOptions"
                                            :key="dict.key"
                                            :label="dict.value"
                                            :value="dict.key"
                                    />
                                </el-select>
                            </el-form-item>
                        <el-form-item label="班级负责人" prop="classLeader"><el-input v-model="queryParams.classLeader" placeholder="请输入班级负责人" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:emTextbookRev:add']"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:emTextbookRev:edit']"
                                type="success"
                                icon="el-icon-edit"
                                size="mini"
                                :disabled="single"
                                @click="handleUpdate"
                        >修改
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:emTextbookRev:remove']"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除
                        </el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="emTextbookRevList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"/><el-table-column label="领取日期" align="center" prop="revTime"
                                                 :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                    <span>{{ parseTime(scope.row.revTime) }}</span>
                                    </template>
                                </el-table-column><el-table-column label="班级名" align="center" prop="classId"
                                                 :show-overflow-tooltip="true"/><el-table-column label="教材名" align="center" prop="textbookId" :formatter="textbookIdFormat" width="100">
                                <template slot-scope="scope">
                                    {{ textbookIdFormat(scope.row) }}
                                </template>
                            </el-table-column><el-table-column label="数量" align="center" prop="num"
                                                 :show-overflow-tooltip="true"/><el-table-column label="班级负责人" align="center" prop="classLeader"
                                                 :show-overflow-tooltip="true"/><el-table-column label="负责人电话" align="center" prop="classLeaderPhone"
                                                 :show-overflow-tooltip="true"/>
                    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                         <el-popconfirm
                           class="delete-popconfirm"
                           title="确认要修改吗?"
                           confirm-button-text="修改"
                           @confirm="handleUpdate(scope.row)"
                         >
                           <el-button
                             slot="reference"
                             v-permisaction="['admin:emTextbookRev:edit']"
                             size="mini"
                             type="text"
                             icon="el-icon-edit"
                           >修改
                           </el-button>
                         </el-popconfirm>
                         <el-popconfirm
                            class="delete-popconfirm"
                            title="确认要删除吗?"
                            confirm-button-text="删除"
                            @confirm="handleDelete(scope.row)"
                         >
                            <el-button
                              slot="reference"
                              v-permisaction="['admin:emTextbookRev:remove']"
                              size="mini"
                              type="text"
                              icon="el-icon-delete"
                            >删除
                            </el-button>
                         </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination
                        v-show="total>0"
                        :total="total"
                        :page.sync="queryParams.pageIndex"
                        :limit.sync="queryParams.pageSize"
                        @pagination="getList"
                />

                <!-- 添加或修改对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        
                                    <el-form-item label="领取日期" prop="revTime">
                                        <el-date-picker
                                                    v-model="form.revTime"
                                                    type="datetime"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="班级名" prop="classId">
                                        <el-input v-model="form.classId" placeholder="班级名"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="教材名" prop="textbookId">
                                        <el-select v-model="form.textbookId"
                                                       placeholder="请选择" >
                                                <el-option
                                                        v-for="dict in textbookIdOptions"
                                                        :key="dict.key"
                                                        :label="dict.value"
                                                        :value="dict.key"
                                                />
                                            </el-select>
                                    </el-form-item>
                                    <el-form-item label="数量" prop="num">
                                        <el-input v-model="form.num" placeholder="数量"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="班级负责人" prop="classLeader">
                                        <el-input v-model="form.classLeader" placeholder="班级负责人"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="负责人电话" prop="classLeaderPhone">
                                        <el-input v-model="form.classLeaderPhone" placeholder="负责人电话"
                                                      />
                                    </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm">确 定</el-button>
                        <el-button @click="cancel">取 消</el-button>
                    </div>
                </el-dialog>
            </el-card>
        </template>
    </BasicLayout>
</template>

<script>
    import {addEmTextbookRev, delEmTextbookRev, getEmTextbookRev, listEmTextbookRev, updateEmTextbookRev} from '@/api/admin/em-textbook-rev'
    
    import {listEmTextbook } from '@/api/admin/em-textbook'
    export default {
        name: 'EmTextbookRev',
        components: {
        },
        data() {
            return {
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 总条数
                total: 0,
                // 弹出层标题
                title: '',
                // 是否显示弹出层
                open: false,
                isEdit: false,
                // 类型数据字典
                typeOptions: [],
                emTextbookRevList: [],
                
                // 关系表类型
                textbookIdOptions :[],
                
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
                    revTime:undefined,
                    classId:undefined,
                    textbookId:undefined,
                    classLeader:undefined,
                    
                },
                // 表单参数
                form: {
                },
                // 表单校验
                rules: {revTime:  [ {required: true, message: '领取日期不能为空', trigger: 'blur'} ],
                classId:  [ {required: true, message: '班级名不能为空', trigger: 'blur'} ],
                textbookId:  [ {required: true, message: '教材名不能为空', trigger: 'blur'} ],
                classLeader:  [ {required: true, message: '班级负责人不能为空', trigger: 'blur'} ],
                }
        }
        },
        created() {
            this.getList()
            this.getEmTextbookItems()
            },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listEmTextbookRev(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.emTextbookRevList = response.data.list
                        this.total = response.data.count
                        this.loading = false
                    }
                )
            },
            // 取消按钮
            cancel() {
                this.open = false
                this.reset()
            },
            // 表单重置
            reset() {
                this.form = {
                
                id: undefined,
                revTime: undefined,
                classId: undefined,
                textbookId: undefined,
                num: undefined,
                classLeader: undefined,
                classLeaderPhone: undefined,
            }
                this.resetForm('form')
            },
            getImgList: function() {
              this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
            },
            fileClose: function() {
              this.fileOpen = false
            },
            textbookIdFormat(row) {
                return this.selectItemsLabel(this.textbookIdOptions, row.textbookId)
            },
            // 关系
            getEmTextbookItems() {
               this.getItems(listEmTextbook, undefined).then(res => {
                   this.textbookIdOptions = this.setItems(res, 'id', 'name')
               })
            },
            // 文件
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageIndex = 1
                this.getList()
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = []
                this.resetForm('queryForm')
                this.handleQuery()
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset()
                this.open = true
                this.title = '添加教材班级领取信息'
                this.isEdit = false
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const id =
                row.id || this.ids
                getEmTextbookRev(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改教材班级领取信息'
                    this.isEdit = true
                })
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateEmTextbookRev(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess(response.msg)
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addEmTextbookRev(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess(response.msg)
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        }
                    }
                })
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                var Ids = (row.id && [row.id]) || this.ids

                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                      return delEmTextbookRev( { 'ids': Ids })
                }).then((response) => {
                   if (response.code === 200) {
                     this.msgSuccess(response.msg)
                     this.open = false
                     this.getList()
                   } else {
                     this.msgError(response.msg)
                   }
                }).catch(function () {
                })
            }
        }
    }
</script>
