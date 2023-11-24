<template>
    <div class="table">
        <div class="container">
            <el-auto-resizer>
                <template #default="{ width, height }">
                    <el-table-v2 ref="data-table" :width="width" :height="height" :columns="columns.map((item: any) =>
                    ({
                        ...item,
                        width: ((width / columns.length) - 1 >= 150) ? (width / columns.length) - 1 : 150,
                        align: 'center'
                    }))" :data="userList" fixed v-loading="loadForm" />
                </template>
            </el-auto-resizer>
            <el-tooltip effect="dark" content="上传Excel" placement="left">
                <el-button class="upload" type="success" :icon="Upload" circle @click="upload = true" />
            </el-tooltip>
            <el-tooltip effect="dark" content="新增用户" placement="left">
                <el-button class="edit" type="primary" :icon="Edit" circle @click="edit = true" />
            </el-tooltip>
        </div>
        <div class="edit-box" v-if="edit">
            <el-form ref="ruleFormRef" :model="editForm" label-width="80px" :rules="rules" :inline="true">
                <p class="title">{{ isNew ? '新增用户' : '修改用户' }}</p>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" placeholder="请输入用户名(长度在 3 到 20 个字符)"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="editForm.pwd" placeholder="请输入密码(长度在 6 到 20 个字符)" type="password"
                        show-password></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="editForm.nickname" placeholder="请输入昵称(长度在 3 到 20 个字符)"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="editForm.birthday" type="date" placeholder="选择日期" :disabled-date="(time: Date) => {
                        return time.getTime() > Date.now();
                    }"></el-date-picker>
                </el-form-item>
                <el-form-item class="selections">
                    <el-button type="primary" @click="editSubmit(ruleFormRef)">提交</el-button>
                    <el-button @click="editCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="upload-box" v-if="upload">
            <div class="upload">
                <div class="titles">
                    <p class="title">上传Excel文件</p>
                    <p class="subtitle">文件格式为.xlsx，需要包含列标题：用户名、密码、昵称、生日</p>
                    <p class="subtitle">生日格式为Excel当中的日期对象即yyyy-MM-dd</p>
                </div>
                <el-upload action="" :auto-upload="false" :show-file-list="true" :drag="true" :limit="1" :file-list="files"
                    :on-exceed="() => this.$message.warning('只能上传一个文件')" @change="uploadCheck">
                    <el-icon><upload-filled /></el-icon>
                    <div slot="tip" class="tip">拖拽到此或点击选择文件</div>
                </el-upload>
                <div class="buttons">
                    <el-button type="primary" @click="uploadSubmit">提交</el-button>
                    <el-button @click="uploadCancel">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.table {
    width: 100%;
    height: 100%;

    .container {
        width: 92%;
        height: 98%;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        margin: 0 auto;

        .edit {
            position: absolute;
            right: 2rem;
            bottom: 2rem;
            font-size: 1.5rem;
            width: 3rem;
            height: 3rem;
        }

        .upload {
            position: absolute;
            right: 2rem;
            bottom: 6rem;
            font-size: 1.5rem;
            width: 3rem;
            height: 3rem;
        }
    }

    .edit-box {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        .el-form {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 2rem;
            border-radius: 5px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            width: 30rem;
            height: 25rem;

            .title {
                font-size: 1.5rem;
                font-weight: bold;
                margin: 2.5rem 0;
            }

            .el-form-item {
                margin-bottom: 2rem;

                .el-input {
                    width: 20rem;
                }

                &.selections {
                    display: flex;
                    justify-content: center;
                    margin-left: 2rem;
                    margin-top: 1rem;

                    .el-button {
                        margin: 0 1rem;
                    }
                }
            }
        }
    }

    .upload-box {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        .upload {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 2rem;
            border-radius: 5px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            width: 30rem;
            height: 25rem;

            .titles {
                margin-bottom: 2rem;

                .title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .subtitle {
                    font-size: 1rem;
                    color: #999;
                }
            }

            .el-upload-dragger {
                width: 25rem;
                height: 10rem;
                margin-bottom: 2rem;

                .el-icon {
                    font-size: 3rem;

                }

                .tip {
                    font-size: 1.5rem;
                }
            }

            .buttons {
                display: flex;
                justify-content: center;
                margin-top: 1rem;

                .el-button {
                    margin: 0 1rem;
                }
            }
        }
    }
}
</style>

<script lang="tsx" setup>
import { ref, Ref, onMounted } from 'vue'
import UserApi from '@/api/UserApi'
import User from '@/types/User'
import { Column, ElMessage, FormInstance, UploadFile } from 'element-plus'
import { Edit, Upload } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { WorkBook, WorkSheet } from 'xlsx'

const columns: Column<any>[] = [
    { dataKey: "username", title: "用户名", width: 150, align: 'center' },
    { dataKey: "nickname", title: "昵称", width: 150, align: 'center' },
    {
        dataKey: "birthday",
        title: "生日",
        width: 150,
        align: 'center',
        cellRenderer: ({ rowData }) => (
            <div>{rowData.birthday ? new Date(rowData.birthday).toLocaleDateString() : ''}</div>
        )
    },
    {
        dataKey: "gmtCreated",
        title: "创建时间",
        width: 150,
        align: 'center',
        cellRenderer: ({ rowData }) => (
            <div>{rowData.gmtCreated ? new Date(rowData.gmtCreated).toLocaleDateString() : ''}</div>
        )
    },
    {
        dataKey: "gmtModified",
        title: "修改时间",
        width: 150,
        align: 'center',
        cellRenderer: ({ rowData }) => (
            <div>{rowData.gmtModified ? new Date(rowData.gmtModified).toLocaleDateString() : ''}</div>
        )
    },
    {
        dataKey: "operation",
        title: "操作",
        width: 150,
        align: 'center',
        cellRenderer: (params) => (
            <div>
                <el-button size="small" type="primary" onClick={() => editClick(params.rowIndex)}> 修改 </el-button>
                <el-popconfirm title="你确定要删除吗"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    onConfirm={() => deleteClick(params.rowIndex)}
                    v-slots={{
                        reference: () => <el-button size="small" type="danger"> 删除 </el-button>
                    }} />
            </div>
        )
    }
]
const userList: Ref<User[]> = ref([])
const loadForm: Ref<boolean> = ref(false)
const edit: Ref<boolean> = ref(false)
const upload: Ref<boolean> = ref(false)
const isNew: Ref<boolean> = ref(true)
const editForm: Ref<User> = ref({
    id: null,
    username: '',
    pwd: '',
    nickname: '',
    avatar: '',
    birthday: null,
    gmtCreated: null,
    gmtModified: null
})
const ruleFormRef: Ref<FormInstance> = ref<FormInstance>();
const rules: Ref<any> = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    pwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    birthday: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ]
})
const files: Ref<any[]> = ref([])


onMounted(async () => {
    await getUserList()
})


/**
 * @discription 用户列表
 */
async function getUserList() {
    loadForm.value = true

    let res: User[] = await UserApi.getUserList()

    if (res) {
        userList.value = res
    } else {
        ElMessage.error('获取用户列表失败')
    }

    loadForm.value = false
}

/**
 * @discription 点击修改按钮
 * @param index 用户列表索引
 */
function editClick(index: number) {
    edit.value = true
    // 初始化表单，设置为选中的用户
    editForm.value = userList.value[index]
    isNew.value = false
}

/**
 * @discription 提交编辑用户
 */
async function editSubmit(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            // 将出生时间转为时间戳，然后覆写GmtModified
            editForm.value.birthday = new Date(editForm.value.birthday).getTime()
            editForm.value.gmtModified = new Date().getTime()
            let res: Boolean = null
            if (isNew.value) {
                // 将创建时间设置为当前时间
                editForm.value.gmtCreated = new Date().getTime()
                res = await UserApi.save(editForm.value)
            } else {
                res = await UserApi.update(editForm.value)
            }
            if (res) {
                ElMessage.success('修改成功')
                editCancel()
                getUserList()
            } else {
                ElMessage.error('修改失败')
            }
        } else {
            ElMessage.error('提交信息有误，请检查后重试')
            return false
        }
    })
}

/**
 * @discription 删除用户
 * @param index 用户列表索引
 */
async function deleteClick(index: number) {
    let res: Boolean = await UserApi.delete(userList.value[index].id)
    if (res) {
        ElMessage.success('删除成功')
        getUserList()
    } else {
        ElMessage.error('删除失败')
    }
}

/**
 * @discription 取消编辑用户
 */
function editCancel() {
    edit.value = false
    // 初始化表单
    editForm.value = {
        id: null,
        username: '',
        pwd: '',
        nickname: '',
        avatar: '',
        birthday: null,
        gmtCreated: null,
        gmtModified: null
    }
    isNew.value = true
}

/**
 * @discription 上传Excel文件前的检查
 * @param uploadFile 文件
 */
async function uploadCheck(uploadFile: UploadFile) {
    const isExcel: Boolean = uploadFile.raw.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    if (!isExcel) {
        ElMessage.error('上传文件只能是 xlsx 格式!')
        // 清空文件列表
        files.value = []
        return
    }

    // 是否包含列标题：用户名、密码、昵称、生日
    let isTitle: Boolean = false

    const promise: Promise<Boolean> = new Promise((resolve, reject) => {
        let reader: FileReader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            let data: string | ArrayBuffer = e.target.result
            let workbook: WorkBook = XLSX.read(data, { type: 'binary' })
            let sheetNames: string[] = workbook.SheetNames
            let worksheet: WorkSheet = workbook.Sheets[sheetNames[0]]
            let title: string[] = ['用户名', '密码', '昵称', '生日']
            let arr: string[] = []
            for (let key in worksheet) {
                // 正则判断是否是一个以上字母加1组合而成的字符串
                if (/^[A-Za-z]+1$/.test(key)) {
                    arr.push(worksheet[key].v)
                }
            }
            if (title.every(item => arr.includes(item))) {
                isTitle = true
            }
            resolve(isTitle)
        }
        reader.onerror = function (err) {
            reject(err)
        }
        reader.readAsBinaryString(uploadFile.raw)
    })

    isTitle = await promise

    if (!isTitle) {
        ElMessage.error('上传文件需要包含列标题：用户名、密码、昵称、生日')
        // 清空文件列表
        files.value = []
        return
    }

    // 将文件列入文件列表
    files.value = [uploadFile]
}

/**
 * @discription 上传Excel文件
 */
async function uploadSubmit() {
    if (files.value.length === 0) {
        ElMessage.error('请选择文件')
        return
    }
    let file: File = files.value[0].raw

    const promise: Promise<User[]> = new Promise((resolve, reject) => {
        let reader: FileReader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            let data: string | ArrayBuffer = e.target.result
            let workbook: WorkBook = XLSX.read(data, { type: 'binary' })
            let sheetNames: string[] = workbook.SheetNames
            let worksheet: WorkSheet = workbook.Sheets[sheetNames[0]]
            let title: string[] = []
            let arr: Array<string | number> = []

            // 先检测列标题顺序，按照顺序读取数据
            for (let key in worksheet) {
                if (/^[A-Za-z]+1$/.test(key)) {
                    title.push(worksheet[key].v)
                } else if (key.toString()[0] !== '!') { // 排除列标题以及worksheet的其他属性
                    arr.push(worksheet[key].v)
                }
            }

            // 如果除列标题外为空，则提示没有数据
            if (arr.length === 0) {
                ElMessage.error('没有数据')
                reject('没有数据')
                return
            }

            // 确定列标题下标
            let usernameIndex: number = title.indexOf('用户名')
            let pwdIndex: number = title.indexOf('密码')
            let nicknameIndex: number = title.indexOf('昵称')
            let birthdayIndex: number = title.indexOf('生日')

            let res: User[] = []
            // 读取数据
            for (let i = 0; i < arr.length / title.length; i++) {
                // 检测生日是否合法
                if (isNaN(arr[i * title.length + birthdayIndex] as number)) {
                    ElMessage.error('生日格式错误')
                    reject('生日格式错误')
                    return
                }
                // 检测是否有空值
                if (arr[i * title.length + usernameIndex] === undefined || arr[i * title.length + pwdIndex] === undefined || arr[i * title.length + nicknameIndex] === undefined || arr[i * title.length + birthdayIndex] === undefined) {
                    ElMessage.error('存在空值')
                    reject('存在空值')
                    return
                }

                let dateCode = arr[i * title.length + birthdayIndex]
                let date = XLSX.SSF.parse_date_code(dateCode)

                let user: User = {
                    id: null,
                    username: arr[i * title.length + usernameIndex] as string,
                    pwd: arr[i * title.length + pwdIndex] as string,
                    nickname: arr[i * title.length + nicknameIndex] as string,
                    avatar: '',
                    birthday: new Date(date.y, date.m - 1, date.d, date.H, date.M, date.S).getTime(),
                    gmtCreated: new Date().getTime(),
                    gmtModified: new Date().getTime()
                }
                res.push(user)
            }
            resolve(res)
        }
        reader.onerror = function (err) {
            reject(err)
        }
        reader.readAsBinaryString(file)
    })

    let res: User[] = await promise

    upload.value = false
    loadForm.value = true

    let success: Boolean = true

    // 项目不上线，所以循环添加用户即可，实际上线项目应该使用批量添加用户接口，因为每次调用接口都需要建立连接，效率低下
    for (let i = 0; i < res.length; i++) {
        success = await UserApi.save(res[i])
        if (!success) {
            ElMessage.error('上传失败')
            break
        }
    }

    if (success) {
        ElMessage.success('上传成功')
        getUserList()
    }

    // 清空文件列表
    files.value = []
}

/**
 * @discription 取消上传Excel文件
 */
function uploadCancel() {
    upload.value = false
    files.value = []
}
</script>