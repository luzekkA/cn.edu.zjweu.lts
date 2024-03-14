<template>
  <el-container class="container">
    <el-header id="header">
      <el-page-header @back="$router.back()">
        <template #content>
          <span class="text-large font-600 mr-3"> 注册页面 </span>
        </template>
      </el-page-header>

    </el-header>
    <el-main class="center">

      <el-form ref="ruleFormRef" style="width: 500px" :model="ruleForm" :rules="rules" label-width="auto" class=""
        :size="formSize" status-icon>

        <el-form-item label="身份证号" prop="id">
          <el-input v-model="ruleForm.id" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmpassword">
          <el-input v-model="ruleForm.confirmpassword" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="请选择身份" prop="role">
          <RoleSelect v-model="ruleForm.role" />
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 200px;" type="primary" @click="submitForm(ruleFormRef)">
            Create
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import RoleSelect from './components/RoleSelect.vue'
import { register } from '../../api/user.ts'
import router from '../../router';
interface RuleForm {
  id: string,
  name: string,
  password: string,
  phone: string,
  confirmpassword: string,
  role: string,
}

const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  id: "",
  name: "",
  password: "",
  phone: "",
  confirmpassword: "",
  role: "",
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
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "密码要求6~20个字符",
      trigger: "blur",
    },
  ],
  confirmpassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "密码要求6~20个字符",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        rule
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }

  ],
  role: [
    { required: true, message: "请选择角色", trigger: "change" },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // let data = { ...ruleForm }
      const { confirmpassword, ...data } = ruleForm;
      register(data).then((res) => {
        if (res.data.code == 20000) {
          ElMessage({
            message: '用户注册成功',
            type: 'success',
          })
          router.back()
        }
        else {
          ElMessage({
            message: '用户注册失败',
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
  formEl.resetFields()
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