<template>
  <div class="center-content" style="margin: 0px;padding:0px ; width:800px; justify-content: center; ">
    <el-header style="margin-top:-200px">
      <h1>
        用户登录
      </h1>
    </el-header>
    <el-main>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" size="large" label-width="120px"
        class="demo-loginForm">
        <el-form-item label="UserID" prop="id">
          <el-input v-model="loginForm.id" type="input" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
          <el-button @click="goToRegister()">注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { validid } from '../utils/validate';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/useUserStore'
const loginFormRef = ref<FormInstance>()
const userStore = useUserStore()
const checkId = (rule: any, value: any, callback: any) => {
  rule
  if (!value) {
    return callback(new Error('请输入ID'))
  }
  if (validid(value)) {
    callback()
  }
  else {
    callback(new Error('请输入正确的ID'))
  }
}

const checkPass = (rule: any, value: any, callback: any) => {
  rule
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}


const loginForm = reactive({
  password: '',
  id: '',
})

const rules = reactive<FormRules<typeof loginForm>>({
  password: [{ validator: checkPass, trigger: 'blur' }],
  id: [{ validator: checkId, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('用户密码格式ok')
      userStore.login(loginForm)
        .then(() => {
          console.log(userStore.token)
          //重定向到主页
          router.push('/index')
        })
        .catch(error => {
          // 处理错误
          console.error(error);
        });
    } else {
      console.log('用户密码格式no')
      return false
    }
  })
}


const router = useRouter()

const goToRegister = () => {
  router.push('/register') // '/register' 是你在 Vue Router 中定义的注册页面的路由
}

</script>
<style scoped>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Adjust as needed */
}
</style>