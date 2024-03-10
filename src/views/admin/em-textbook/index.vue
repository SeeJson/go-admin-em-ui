
<template>
    <BasicLayout>
        <template #wrapper>
            <el-card class="box-card">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="教材名" prop="name"><el-input v-model="queryParams.name" placeholder="请输入教材名" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="教材供应商" prop="sup"><el-select v-model="queryParams.sup"
                                           placeholder="请选择" clearable size="small" >
                                    <el-option
                                            v-for="dict in supOptions"
                                            :key="dict.key"
                                            :label="dict.value"
                                            :value="dict.key"
                                    />
                                </el-select>
                            </el-form-item>
                        <el-form-item label="出版日期" prop="proData"><el-input v-model="queryParams.proData" placeholder="请输入出版日期" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="出版作者" prop="author"><el-input v-model="queryParams.author" placeholder="请输入出版作者" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="出版社" prop="press"><el-input v-model="queryParams.press" placeholder="请输入出版社" clearable
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
                                v-permisaction="['admin:emTextbook:add']"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:emTextbook:edit']"
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
                                v-permisaction="['admin:emTextbook:remove']"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除
                        </el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="emTextbookList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"/><el-table-column label="教材名" align="center" prop="name"
                                                 :show-overflow-tooltip="true"/><el-table-column label="价格" align="center" prop="price"
                                                 :show-overflow-tooltip="true"/><el-table-column label="教材供应商" align="center" prop="sup" :formatter="supFormat" width="100">
                                <template slot-scope="scope">
                                    {{ supFormat(scope.row) }}
                                </template>
                            </el-table-column><el-table-column label="出版日期" align="center" prop="proData"
                                                 :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                    <span>{{ parseTime(scope.row.proData) }}</span>
                                    </template>
                                </el-table-column><el-table-column label="出版作者" align="center" prop="author"
                                                 :show-overflow-tooltip="true"/><el-table-column label="出版社" align="center" prop="press"
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
                             v-permisaction="['admin:emTextbook:edit']"
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
                              v-permisaction="['admin:emTextbook:remove']"
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
                        
                                    <el-form-item label="教材名" prop="name">
                                        <el-input v-model="form.name" placeholder="教材名"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="价格" prop="price">
                                        <el-input v-model="form.price" placeholder="价格"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="教材供应商" prop="sup">
                                        <el-select v-model="form.sup"
                                                       placeholder="请选择" >
                                                <el-option
                                                        v-for="dict in supOptions"
                                                        :key="dict.key"
                                                        :label="dict.value"
                                                        :value="dict.key"
                                                />
                                            </el-select>
                                    </el-form-item>
                                    <el-form-item label="出版日期" prop="proData">
                                        <el-date-picker
                                                    v-model="form.proData"
                                                    type="datetime"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="出版作者" prop="author">
                                        <el-input v-model="form.author" placeholder="出版作者"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="出版社" prop="press">
                                        <el-input v-model="form.press" placeholder="出版社"
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
    import {addEmTextbook, delEmTextbook, getEmTextbook, listEmTextbook, updateEmTextbook} from '@/api/admin/em-textbook'
    
    import {listEmTextbookSup } from '@/api/admin/em-textbook-sup'
    export default {
        name: 'EmTextbook',
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
                emTextbookList: [],
                
                // 关系表类型
                supOptions :[],
                
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
                    name:undefined,
                    sup:undefined,
                    proData:undefined,
                    author:undefined,
                    press:undefined,
                    
                },
                // 表单参数
                form: {
                },
                // 表单校验
                rules: {name:  [ {required: true, message: '教材名不能为空', trigger: 'blur'} ],
                sup:  [ {required: true, message: '教材供应商不能为空', trigger: 'blur'} ],
                proData:  [ {required: true, message: '出版日期不能为空', trigger: 'blur'} ],
                author:  [ {required: true, message: '出版作者不能为空', trigger: 'blur'} ],
                press:  [ {required: true, message: '出版社不能为空', trigger: 'blur'} ],
                }
        }
        },
        created() {
            this.getList()
            this.getEmTextbookSupItems()
            },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listEmTextbook(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.emTextbookList = response.data.list
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
                name: undefined,
                price: undefined,
                sup: undefined,
                proData: undefined,
                author: undefined,
                press: undefined,
            }
                this.resetForm('form')
            },
            getImgList: function() {
              this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
            },
            fileClose: function() {
              this.fileOpen = false
            },
            supFormat(row) {
                return this.selectItemsLabel(this.supOptions, row.sup)
            },
            // 关系
            getEmTextbookSupItems() {
               this.getItems(listEmTextbookSup, undefined).then(res => {
                   this.supOptions = this.setItems(res, 'id', 'name')
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
                this.title = '添加教材信息'
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
                getEmTextbook(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改教材信息'
                    this.isEdit = true
                })
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateEmTextbook(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess(response.msg)
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addEmTextbook(this.form).then(response => {
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
                      return delEmTextbook( { 'ids': Ids })
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
