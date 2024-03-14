<template>
  <el-container class="container">
    <el-header id="header">
      <el-page-header @back="$router.back()">
        <template #content>
          <span class="text-large font-600 mr-3"> 创建比赛 </span>
        </template>
      </el-page-header>

    </el-header>
    <el-main class="center"
      style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
      <el-form ref="ruleFormRef" style="width: 500px" :model="ruleForm" :rules="rules" label-width="auto" class=""
        :size="formSize" status-icon>
        <el-form-item label="比赛名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="赛事简介" prop="leader">
          <el-input v-model="ruleForm.information" />
        </el-form-item>
        <el-form-item label="赛事类型" prop="role">
          <!-- <RoleSelect v-model="ruleForm.role" /> -->

          <el-select v-model="ruleForm.category" placeholder="请选择赛事类型">
            <el-option v-for="item in competitionList.value" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 200px;" type="primary" @click="submitForm(ruleFormRef)">
            创建
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">清空</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import router from '../../router';
import { getType, createCompetition } from '../../api/competition.ts'
// import { createTeam } from '../../api/team.ts'
interface RuleForm {
  name: string,
  information: string,
  state: any,
  category: string
}
const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  information: '',
  state: true,
  category: ''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "请输入赛事名", trigger: "blur" },
  ],
  information: [
    { required: true, message: "请输入赛事简介", trigger: "blur" },
  ],
  category: [
    { required: true, message: "请选择赛事类型", trigger: "change" },
  ]
})
let competitionList: any = reactive([])
onMounted(() => {
  getType().then(data => {
    competitionList.value = data.data
    console.log(competitionList.value, "this is competitionList")
  }).catch(error => {
    console.error('Failed to get role list:', error);
  });
})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      let data = { ...ruleForm }
      // const data = ruleForm;
      createCompetition(data).then((res) => {
        //@ts-ignore
        if (res.code == 20000) {
          ElMessage({
            message: '赛事创建成功',
            type: 'success',
          })
          router.back()
        }
        else {
          ElMessage({
            message: '赛事创建失败',
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
  // if (!formEl) return
  // window.location.reload()
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