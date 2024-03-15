<template>
    <el-container class="container">
        <el-header id="header">
            <el-page-header @back="$router.back()">
                <template #content>
                    <span class="text-large font-600 mr-3"> 用户个人信息 </span>
                </template>
            </el-page-header>

        </el-header>
        <el-main class="center">
            <div id="img" style="margin-top:-150px; margin-right:100px;"></div>
            <el-form ref="ruleFormRef" style="width: 500px" :model="ruleForm" :rules="rules" label-width="auto" class=""
                :size="formSize" status-icon>
                <el-form-item label="身份证号" prop="id">
                    <el-input v-model="ruleForm.id" />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="ruleForm.phone" />
                </el-form-item>
                <el-form-item label="用户身份" prop="role">
                    <!-- <RoleSelect v-model="ruleForm.role" /> -->

                    <el-select v-model="ruleForm.role" placeholder="请选择角色">
                        <el-option v-for="item in ruleForm.roleList" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="上传一寸照" prop="photo">
                    <file-upload style=""></file-upload>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 200px;" type="primary" @click="submitForm(ruleFormRef)">
                        提交更改
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
// import RoleSelect from './components/RoleSelect.vue'
import FileUpload from './components/FileUpload.vue'
import { getInfo, edit } from '../../api/user.ts'
import router from '../../router';
import { useUserStore } from '../../store/useUserStore.ts'
import { getRoleList } from "../../api/user.ts"
const userStore = useUserStore()
interface RuleForm {
    id: string,
    name: string,
    phone: string,
    role: string,
    imageURL: string,
    roleList: string[]
}

const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    id: "",
    name: "",
    phone: "",
    role: "",
    imageURL: "",
    roleList: []
})

const rules = reactive<FormRules<RuleForm>>({
    id: [
        { required: true, message: "请输入身份证号", trigger: "blur" },
        {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证信息",
            trigger: "blur",
        },
    ],
    // 对name这个字段进行校验
    name: [
        { required: true, message: "请输入姓名", trigger: "blur" },
    ],
    phone: [
        { required: true, message: "请输入电话", trigger: "blur" },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的电话号码",
            trigger: "blur",
        },
    ],
    role: [
        { required: true, message: "请选择角色", trigger: "change" },
    ]
})
onMounted(() => {
    getRoleList().then(data => {
        ruleForm.roleList = data.data
    }).catch(error => {
        console.error('Failed to get role list:', error);
    });
    getInfo(userStore.token).then(res => {
        console.log(res, 'this is res')
        console.log(res.data.roles[0], 'this is role')
        ruleForm.id = res.data.id
        ruleForm.name = res.data.username
        ruleForm.phone = res.data.phone
        ruleForm.role = res.data.roles[0]
        ruleForm.imageURL = res.data.ico
        // 创建一个新的img元素
        let img = document.createElement('img');
        img.setAttribute('width', '100px');
        img.setAttribute('height', '140px');
        img.setAttribute('alt', 'User Image');
        // 设置img元素的src属性
        img.src = res.data.ico;
        let div = document.getElementById('img');
        // 将img元素添加到DOM中
        if(div)
        div.appendChild(img);
    })

})


const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            let data = { ...ruleForm }
            // const data = ruleForm;
            edit(data).then((res) => {
                //@ts-ignore
                if (res.code == 20000) {
                    ElMessage({
                        message: '用户信息更改成功',
                        type: 'success',
                    })
                    router.back()
                }
                else {
                    ElMessage({
                        message: '用户更改失败',
                        type: 'error'
                    })
                }
            })

        } else {
            ElMessage({
                message: '请正确输入表内信息',
                type: 'error'
            })
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    window.location.reload()
}

</script>
<style lang="scss" scoped>
#header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    height: 80px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    border: 0px;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>