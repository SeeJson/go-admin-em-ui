
<template>
    <BasicLayout>
        <template #wrapper>
            <el-card class="box-card">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="姓名" prop="name"><el-input v-model="queryParams.name" placeholder="请输入姓名" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="学号" prop="number"><el-input v-model="queryParams.number" placeholder="请输入学号" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="班级名" prop="className"><el-input v-model="queryParams.className" placeholder="请输入班级名" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="专业名" prop="major"><el-input v-model="queryParams.major" placeholder="请输入专业名" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="学院名" prop="collegeName"><el-input v-model="queryParams.collegeName" placeholder="请输入学院名" clearable
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
                                v-permisaction="['admin:emStudent:add']"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:emStudent:edit']"
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
                                v-permisaction="['admin:emStudent:remove']"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除
                        </el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="emStudentList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"/><el-table-column label="性别" align="center" prop="sex"
                                                 :formatter="sexFormat" width="100">
                                    <template slot-scope="scope">
                                        {{ sexFormat(scope.row) }}
                                    </template>
                                </el-table-column><el-table-column label="姓名" align="center" prop="name"
                                                 :show-overflow-tooltip="true"/><el-table-column label="学号" align="center" prop="number"
                                                 :show-overflow-tooltip="true"/><el-table-column label="班级名" align="center" prop="className"
                                                 :show-overflow-tooltip="true"/><el-table-column label="专业名" align="center" prop="major"
                                                 :show-overflow-tooltip="true"/><el-table-column label="学院名" align="center" prop="collegeName"
                                                 :show-overflow-tooltip="true"/><el-table-column label="手机号" align="center" prop="phone"
                                                 :show-overflow-tooltip="true"/><el-table-column label="邮箱" align="center" prop="email"
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
                             v-permisaction="['admin:emStudent:edit']"
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
                              v-permisaction="['admin:emStudent:remove']"
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
                        
                                    <el-form-item label="性别" prop="sex">
                                        <el-radio-group v-model="form.sex">
                                                <el-radio
                                                        v-for="dict in sexOptions"
                                                        :key="dict.value"
                                                        :label="dict.value"
                                                >{{ dict.label }}</el-radio>
                                            </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="姓名" prop="name">
                                        <el-input v-model="form.name" placeholder="姓名"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="学号" prop="number">
                                        <el-input v-model="form.number" placeholder="学号"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="班级名" prop="className">
                                        <el-input v-model="form.className" placeholder="班级名"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="专业名" prop="major">
                                        <el-input v-model="form.major" placeholder="专业名"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="学院名" prop="collegeName">
                                        <el-input v-model="form.collegeName" placeholder="学院名"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="手机号" prop="phone">
                                        <el-input v-model="form.phone" placeholder="手机号"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input v-model="form.email" placeholder="邮箱"
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
    import {addEmStudent, delEmStudent, getEmStudent, listEmStudent, updateEmStudent} from '@/api/admin/em-student'
    
    export default {
        name: 'EmStudent',
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
                emStudentList: [],
                sexOptions: [],
                // 关系表类型
                
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
                    sex:undefined,
                    name:undefined,
                    number:undefined,
                    className:undefined,
                    major:undefined,
                    collegeName:undefined,
                    
                },
                // 表单参数
                form: {
                },
                // 表单校验
                rules: {name:  [ {required: true, message: '姓名不能为空', trigger: 'blur'} ],
                number:  [ {required: true, message: '学号不能为空', trigger: 'blur'} ],
                className:  [ {required: true, message: '班级名不能为空', trigger: 'blur'} ],
                major:  [ {required: true, message: '专业名不能为空', trigger: 'blur'} ],
                collegeName:  [ {required: true, message: '学院名不能为空', trigger: 'blur'} ],
                }
        }
        },
        created() {
            this.getList()
            this.getDicts('sys_user_sex').then(response => {
                this.sexOptions = response.data
            })
            },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listEmStudent(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.emStudentList = response.data.list
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
                sex: undefined,
                name: undefined,
                number: undefined,
                className: undefined,
                major: undefined,
                collegeName: undefined,
                phone: undefined,
                email: undefined,
            }
                this.resetForm('form')
            },
            getImgList: function() {
              this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
            },
            fileClose: function() {
              this.fileOpen = false
            },
            sexFormat(row) {
                return this.selectDictLabel(this.sexOptions, row.sex)
            },
            // 关系
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
                this.title = '添加学生信息'
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
                getEmStudent(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改学生信息'
                    this.isEdit = true
                })
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateEmStudent(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess(response.msg)
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addEmStudent(this.form).then(response => {
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
                      return delEmStudent( { 'ids': Ids })
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
