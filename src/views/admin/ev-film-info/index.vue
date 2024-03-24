
<template>
    <BasicLayout>
        <template #wrapper>
            <el-card class="box-card">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="电影名" prop="name"><el-input v-model="queryParams.name" placeholder="请输入电影名" clearable
                                              size="small" @keyup.enter.native="handleQuery"/>
                            </el-form-item>
                        <el-form-item label="国家" prop="country"><el-select v-model="queryParams.country"
                                               placeholder="电影信息国家" clearable size="small">
                                        <el-option
                                                v-for="dict in countryOptions"
                                                :key="dict.value"
                                                :label="dict.label"
                                                :value="dict.value"
                                        />
                                    </el-select>
                            </el-form-item>
                        <el-form-item label="电影类型" prop="type"><el-select v-model="queryParams.type"
                                               placeholder="电影信息电影类型" clearable size="small">
                                        <el-option
                                                v-for="dict in typeOptions"
                                                :key="dict.value"
                                                :label="dict.label"
                                                :value="dict.value"
                                        />
                                    </el-select>
                            </el-form-item>
                        <el-form-item label="状态" prop="status"><el-select v-model="queryParams.status"
                                               placeholder="电影信息状态" clearable size="small">
                                        <el-option
                                                v-for="dict in statusOptions"
                                                :key="dict.value"
                                                :label="dict.label"
                                                :value="dict.value"
                                        />
                                    </el-select>
                            </el-form-item>
                        <el-form-item label="语言" prop="language"><el-select v-model="queryParams.language"
                                               placeholder="电影信息语言" clearable size="small">
                                        <el-option
                                                v-for="dict in languageOptions"
                                                :key="dict.value"
                                                :label="dict.label"
                                                :value="dict.value"
                                        />
                                    </el-select>
                            </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:evFilmInfo:add']"
                                type="primary"
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增
                        </el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                v-permisaction="['admin:evFilmInfo:edit']"
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
                                v-permisaction="['admin:evFilmInfo:remove']"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除
                        </el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="evFilmInfoList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" align="center"/><el-table-column label="电影名" align="center" prop="name"
                                                 :show-overflow-tooltip="true"/><el-table-column label="别名" align="center" prop="alias"
                                                 :show-overflow-tooltip="true"/><el-table-column label="上映时间" align="center" prop="releaseTime"
                                                 :show-overflow-tooltip="true">
                                    <template slot-scope="scope">
                                    <span>{{ parseTime(scope.row.releaseTime) }}</span>
                                    </template>
                                </el-table-column><el-table-column label="国家" align="center" prop="country"
                                                 :formatter="countryFormat" width="100">
                                    <template slot-scope="scope">
                                        {{ countryFormat(scope.row) }}
                                    </template>
                                </el-table-column><el-table-column label="电影类型" align="center" prop="type"
                                                 :formatter="typeFormat" width="100">
                                    <template slot-scope="scope">
                                        {{ typeFormat(scope.row) }}
                                    </template>
                                </el-table-column><el-table-column label="状态" align="center" prop="status"
                                                 :formatter="statusFormat" width="100">
                                    <template slot-scope="scope">
                                        {{ statusFormat(scope.row) }}
                                    </template>
                                </el-table-column><el-table-column label="语言" align="center" prop="language"
                                                 :formatter="languageFormat" width="100">
                                    <template slot-scope="scope">
                                        {{ languageFormat(scope.row) }}
                                    </template>
                                </el-table-column><el-table-column label="片长" align="center" prop="filmLength"
                                                 :show-overflow-tooltip="true"/><el-table-column label="总票房" align="center" prop="totalBoxOffice"
                                                 :show-overflow-tooltip="true"/><el-table-column label="口碑" align="center" prop="wordOfMouth"
                                                 :show-overflow-tooltip="true"/><el-table-column label="评分" align="center" prop="score"
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
                             v-permisaction="['admin:evFilmInfo:edit']"
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
                              v-permisaction="['admin:evFilmInfo:remove']"
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

                                    <el-form-item label="电影名" prop="name">
                                        <el-input v-model="form.name" placeholder="电影名"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="别名" prop="alias">
                                        <el-input v-model="form.alias" placeholder="别名"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="主演" prop="leadActor">
                                        <el-input v-model="form.leadActor" placeholder="主演"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="导演" prop="director">
                                        <el-input v-model="form.director" placeholder="导演"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="简介" prop="briefIntroduction">
                                        <el-input v-model="form.briefIntroduction" placeholder="简介"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="封面" prop="cover">
                                        <el-input v-model="form.cover" placeholder="封面"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="上映时间" prop="releaseTime">
                                        <el-date-picker
                                                    v-model="form.releaseTime"
                                                    type="datetime"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="上映地区" prop="releaseRelease">
                                        <el-select v-model="form.releaseRelease"
                                                       placeholder="请选择" >
                                                <el-option
                                                        v-for="dict in releaseReleaseOptions"
                                                        :key="dict.value"
                                                        :label="dict.label"
                                                        :value="dict.value"
                                                />
                                            </el-select>
                                    </el-form-item>
                                    <el-form-item label="国家" prop="country">
                                        <el-select v-model="form.country"
                                                       placeholder="请选择" >
                                                <el-option
                                                        v-for="dict in countryOptions"
                                                        :key="dict.value"
                                                        :label="dict.label"
                                                        :value="dict.value"
                                                />
                                            </el-select>
                                    </el-form-item>
                                    <el-form-item label="电影类型" prop="type">
                                        <el-select v-model="form.type"
                                                       placeholder="请选择" >
                                                <el-option
                                                        v-for="dict in typeOptions"
                                                        :key="dict.value"
                                                        :label="dict.label"
                                                        :value="dict.value"
                                                />
                                            </el-select>
                                    </el-form-item>
                                    <el-form-item label="状态" prop="status">
                                        <el-select v-model="form.status"
                                                       placeholder="请选择" >
                                                <el-option
                                                        v-for="dict in statusOptions"
                                                        :key="dict.value"
                                                        :label="dict.label"
                                                        :value="dict.value"
                                                />
                                            </el-select>
                                    </el-form-item>
                                    <el-form-item label="语言" prop="language">
                                        <el-select v-model="form.language"
                                                       placeholder="请选择" >
                                                <el-option
                                                        v-for="dict in languageOptions"
                                                        :key="dict.value"
                                                        :label="dict.label"
                                                        :value="dict.value"
                                                />
                                            </el-select>
                                    </el-form-item>
                                    <el-form-item label="片长" prop="filmLength">
                                        <el-input v-model="form.filmLength" placeholder="片长"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="淘票票想看数" prop="tppNum">
                                        <el-input v-model="form.tppNum" placeholder="淘票票想看数"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="猫眼想看数" prop="myNum">
                                        <el-input v-model="form.myNum" placeholder="猫眼想看数"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="豆瓣想看数" prop="dbNum">
                                        <el-input v-model="form.dbNum" placeholder="豆瓣想看数"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="美团想看数" prop="mtNum">
                                        <el-input v-model="form.mtNum" placeholder="美团想看数"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="累计上映天数" prop="accReleaseDays">
                                        <el-input v-model="form.accReleaseDays" placeholder="累计上映天数"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="上映场次" prop="releaseVenne">
                                        <el-input v-model="form.releaseVenne" placeholder="上映场次"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="上映人次" prop="releaseNumPeople">
                                        <el-input v-model="form.releaseNumPeople" placeholder="上映人次"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="上座率" prop="occupancyRate">
                                        <el-input v-model="form.occupancyRate" placeholder="上座率"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="总票房" prop="totalBoxOffice">
                                        <el-input v-model="form.totalBoxOffice" placeholder="总票房"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="当前票房" prop="boxOffice">
                                        <el-input v-model="form.boxOffice" placeholder="当前票房"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="点映票房" prop="dianyBoxOffice">
                                        <el-input v-model="form.dianyBoxOffice" placeholder="点映票房"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="首日票房" prop="firstDayeBoxOffice">
                                        <el-input v-model="form.firstDayeBoxOffice" placeholder="首日票房"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="首周票房" prop="firstWeekBoxOffice">
                                        <el-input v-model="form.firstWeekBoxOffice" placeholder="首周票房"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="第二周票房" prop="twoWeekBoxOffice">
                                        <el-input v-model="form.twoWeekBoxOffice" placeholder="第二周票房"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="口碑" prop="wordOfMouth">
                                        <el-input v-model="form.wordOfMouth" placeholder="口碑"
                                                      />
                                    </el-form-item>
                                    <el-form-item label="评分" prop="score">
                                        <el-input v-model="form.score" placeholder="评分"
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
    import {addEvFilmInfo, delEvFilmInfo, getEvFilmInfo, listEvFilmInfo, updateEvFilmInfo} from '@/api/admin/ev-film-info'

    export default {
        name: 'EvFilmInfo',
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
                evFilmInfoList: [],
                releaseReleaseOptions: [],countryOptions: [],typeOptions: [],statusOptions: [],languageOptions: [],
                // 关系表类型

                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,
                    name:undefined,
                    releaseTime:undefined,
                    country:undefined,
                    type:undefined,
                    status:undefined,
                    language:undefined,

                },
                // 表单参数
                form: {
                },
                // 表单校验
                rules: {name:  [ {required: true, message: '电影名不能为空', trigger: 'blur'} ],
                country:  [ {required: true, message: '国家不能为空', trigger: 'blur'} ],
                type:  [ {required: true, message: '电影类型不能为空', trigger: 'blur'} ],
                status:  [ {required: true, message: '状态不能为空', trigger: 'blur'} ],
                language:  [ {required: true, message: '语言不能为空', trigger: 'blur'} ],
                }
        }
        },
        created() {
            this.getList()
            this.getDicts('sys_contry').then(response => {
                this.releaseReleaseOptions = response.data
            })
            this.getDicts('sys_contry').then(response => {
                this.countryOptions = response.data
            })
            this.getDicts('sys_film_type').then(response => {
                this.typeOptions = response.data
            })
            this.getDicts('sys_film_status').then(response => {
                this.statusOptions = response.data
            })
            this.getDicts('sys_lanuguaue').then(response => {
                this.languageOptions = response.data
            })
            },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listEvFilmInfo(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.evFilmInfoList = response.data.list
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
                alias: undefined,
                leadActor: undefined,
                director: undefined,
                briefIntroduction: undefined,
                cover: undefined,
                releaseTime: undefined,
                releaseRelease: undefined,
                country: undefined,
                type: undefined,
                status: undefined,
                language: undefined,
                filmLength: undefined,
                tppNum: undefined,
                myNum: undefined,
                dbNum: undefined,
                mtNum: undefined,
                accReleaseDays: undefined,
                releaseVenne: undefined,
                releaseNumPeople: undefined,
                occupancyRate: undefined,
                totalBoxOffice: undefined,
                boxOffice: undefined,
                dianyBoxOffice: undefined,
                firstDayeBoxOffice: undefined,
                firstWeekBoxOffice: undefined,
                twoWeekBoxOffice: undefined,
                wordOfMouth: undefined,
                score: undefined,
            }
                this.resetForm('form')
            },
            getImgList: function() {
              this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
            },
            fileClose: function() {
              this.fileOpen = false
            },
            releaseReleaseFormat(row) {
                return this.selectDictLabel(this.releaseReleaseOptions, row.releaseRelease)
            },
            countryFormat(row) {
                return this.selectDictLabel(this.countryOptions, row.country)
            },
            typeFormat(row) {
                return this.selectDictLabel(this.typeOptions, row.type)
            },
            statusFormat(row) {
                return this.selectDictLabel(this.statusOptions, row.status)
            },
            languageFormat(row) {
                return this.selectDictLabel(this.languageOptions, row.language)
            },
            // 关系
            // 文件
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageIndex = 1
                this.getListgetList()
            },// eslint-disable-line no-dupe-keys
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
                this.title = '添加电影信息'
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
                getEvFilmInfo(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改电影信息'
                    this.isEdit = true
                })
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateEvFilmInfo(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess(response.msg)
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addEvFilmInfo(this.form).then(response => {
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
                      return delEvFilmInfo( { 'ids': Ids })
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
