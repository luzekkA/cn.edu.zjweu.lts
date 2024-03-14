<template>
  <el-container class="container">
    <el-header id="header">
      <el-page-header @back="$router.back()">
        <template #content>
          <span class="text-large font-600 mr-3"> 选择组别/选择比赛小项 </span>
        </template>
      </el-page-header>

    </el-header>
    <el-main class="center"
      style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
      <el-form ref="ruleFormRef" style="width: 500px" :model="ruleForm" :rules="rules" label-width="auto" class=""
        :size="formSize" status-icon>
        <el-form-item label="选择比赛名称" prop="competition">
          <!-- <RoleSelect v-model="ruleForm.role" /> -->

          <el-select v-model="ruleForm.competition" placeholder="请选择比赛名称">
            <el-option v-for="item in competitionList.value" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="选择组别" prop="group">
          <!-- <RoleSelect v-model="ruleForm.role" /> -->

          <el-select v-model="ruleForm.group" placeholder="请选择组别">
            <el-option v-for="item in groupList.value" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="选择比赛小项" prop="type">
          <!-- <RoleSelect v-model="ruleForm.role" /> -->

          <el-select v-model="ruleForm.type" placeholder="请选择比赛小项">
            <el-option v-for="item in typeList.value" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item>
            <el-button style="margin-left: 200px;" type="primary" @click="submitForm(ruleFormRef)">
              下一步
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
import { getCompetition } from '../../api/competition.ts'
// import { select } from '../../api/team.ts'
import { useUserStore } from '../../store/useUserStore.ts'
import { useTeamStore } from '../../store/useTeamStore.ts'
import {useRouter} from 'vue-router'
const router  = useRouter()
const teamStore = useTeamStore()
const userStore = useUserStore()
interface RuleForm {
  team: string,
  competition: string,
  type: string,
  group: string
}
const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  team: '',
  //比赛名称
  competition: '',
  //比赛小项
  type: '',
  //比赛组别
  group: ''
})

const rules = reactive<FormRules<RuleForm>>({
  group: [
    { required: true, message: "请选择比赛组别", trigger: "change" },
  ],
  type: [
    { required: true, message: "请选择比赛小项", trigger: "change" },
  ],
  competition: [
    { required: true, message: "请选择参加的赛事", trigger: "change" },
  ]
})
let groupList: any = reactive([])
let typeList: any = reactive([])
let competitionList: any = reactive([])
onMounted(() => {
  //初始化队伍id
  ruleForm.team = userStore.temp_teamId
  if(ruleForm.team == ''){
    router.push({
        path: '/team/info', // 下一个页面的路由名称
      })
  }
  console.log(ruleForm.team, "this is team id")
  //初始化组别
  groupList.value = ['甲', '乙', '丙', '丁']
  //初始化比赛小项
  typeList.value = ['长拳', '剑术', '刀术', '枪术', '棍术', '南拳', '南刀', '南棍', '太极拳', '太极剑']
  //初始化比赛列表
  getCompetition().then(data => {
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
      // let data = { ...ruleForm }
      // // const data = ruleForm;
      // select(data).then((res) => {
      //   if (res.data.code == 20000) {
      //     ElMessage({
      //       message: '用户选择成功',
      //       type: 'success',
      //     })
      //     router.back()
      //   }
      //   else {
      //     ElMessage({
      //       message: '用户选择失败',
      //       type: 'error'
      //     })
      //   }
      // })
      teamStore.select.competition = ruleForm.competition
      teamStore.select.group = ruleForm.group
      teamStore.select.team = ruleForm.team
      teamStore.select.type = ruleForm.type
      router.push({
        path: '/team/form', // 下一个页面的路由名称
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
  // if (!formEl) return
  // formEl.resetFields()
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