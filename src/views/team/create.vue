<template>
  <el-container class="container">
    <el-header id="header">
      <el-page-header @back="$router.back()">
        <template #content>
          <span class="text-large font-600 mr-3"> 创建队伍 </span>
        </template>
      </el-page-header>

    </el-header>
    <el-main class="center"
      style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
      <el-form ref="ruleFormRef" style="width: 500px" :model="ruleForm" :rules="rules" label-width="auto" class=""
        :size="formSize" status-icon>
        <el-form-item label="队伍名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="领队" prop="leader">
          <el-input v-model="ruleForm.leader" />
        </el-form-item>
        <el-form-item label="选择赛事" prop="competition">
          <!-- <RoleSelect v-model="ruleForm.role" /> -->

          <el-select v-model="ruleForm.competition" placeholder="请选择赛事">
            <el-option v-for="item in competitionList.value" :key="item.name" :label="item.name" :value="item.name">
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
import { getCompetition, } from '../../api/competition.ts'
import { createTeam, joinCompetition } from '../../api/team.ts'
interface RuleForm {
  id: string,
  name: string,
  leader: string,
  invitation: string,
  competition: ""
}
const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  id: "",
  name: "",
  leader: "",
  invitation: "",
  competition: ""
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "请输入队伍名", trigger: "blur" },
  ],
  leader: [
    { required: true, message: "请输入教练名", trigger: "blur" },
  ],
  competition: [
    { required: true, message: "请选择赛事", trigger: "change" },
  ]
})
let competitionList: any = reactive([])
onMounted(() => {
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
      let data = { ...ruleForm }
      // const data = ruleForm;
      createTeam(data).then((res) => {
        //@ts-ignore
        if (res.code == 20000) {

          joinCompetition({team:res.data, competition:ruleForm.competition}).then((res2) => {
            //@ts-ignore
            if (res2.code == 20000) {
              ElMessage({
                message: '队伍创建成功',
                type: 'success',
              })
              router.back()
            }
            else {
              ElMessage({
                message: '队伍创建失败',
                type: 'error'
              })
            }

          })
        }
        else {
          ElMessage({
            message: '队伍创建失败',
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