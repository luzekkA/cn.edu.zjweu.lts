<template>
  <!-- <div v-if="ruleForm.type == 'Teacher'">
    <el-table :data="ruleForm.courses" style="width: 100%">
      <el-table-column prop="CourseId" label="课程Id" />
      <el-table-column prop="CourseName" label="课程名" />
      <el-table-column label="参与班级">
        <template #default="scope">
          <el-table :data="scope.row.CourseClasses">
            <el-table-column prop="ClassId" label="班级Id" />
            <el-table-column prop="ClassName" label="班级名" />
          </el-table>
        </template>
</el-table-column>
<el-table-column label="操作">
  <template #default>
          添加/删除班级
        </template>
</el-table-column>
</el-table>
</div> -->
  <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
    class="demo-ruleForm">
    <el-form-item label="用户Id" prop="id">
      <el-input v-model="ruleForm.id" autocomplete="off" disabled="true" />
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" autocomplete="off" />
    </el-form-item>
    <el-form-item label="用户类型" prop="type">
      <el-input v-model="ruleForm.type" autocomplete="off" disabled="true" />
    </el-form-item>
    <div v-if="ruleForm.type == 'Student'">
      <el-form-item label="用户班级" prop="type">
        <!-- <el-input v-model="ruleForm.className" autocomplete="off" /> -->
        <el-select v-model="ruleForm.classId" :text="ruleForm.className" filterable :placeholder="ruleForm.className"
          size="large" style="width: 240px"><el-option v-for="item in classList" :key="item.Name" :label="item.Name"
            :value="item.Id" />
        </el-select>
      </el-form-item>
    </div>
    <el-form-item>
      <div v-if="ruleForm.type == 'Teacher'">
        <el-table :data="ruleForm.courses" style="width: 1200px">
          <el-table-column prop="CourseId" label="课程Id" width="100px" />
          <el-table-column prop="CourseName" label="课程名" width="250px" />
          <el-table-column label="参与班级">
            <template #default="scope">
              <el-table :data="scope.row.CourseClasses">
                <el-table-column prop="ClassId" label="班级Id" />
                <el-table-column prop="ClassName" label="班级名" />
                <!-- <el-table-column label="操作">
                  <template #default>
                    <el-button type="primary" @click="">
                      移除该班级
                    </el-button>
                  </template>
        </el-table-column> -->
              </el-table>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template #default>
              添加/删除班级
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        提交更改
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { getAllClass, getUserInfo, updateStudentInfo, updateTeacherInfo } from '../../../api/admin'
import { onMounted, ref, reactive } from 'vue'
import { devLog } from '../../../utils/devLog';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus';
const ruleFormRef = ref<FormInstance>()
const classList = ref<any[]>([])
interface RuleForm {
  id: string
  name: string
  type: string
  className: string
  classId: number
  courses: []
}
const ruleForm = reactive({
  id: '',
  name: '',
  type: '',
  className: '',
  classId: null,
  courses: []
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  id: [
    { required: true, message: '请输入Id', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请输入用户类型', trigger: 'blur' },
  ]
})


onMounted(() => {
  const route = useRoute()
  const userId = route.query.userId
  getUserInfo(userId).then(data => {
    ruleForm.id = data.data.data.Id
    ruleForm.name = data.data.data.UserName
    ruleForm.type = data.data.data.Type
    if (ruleForm.type == 'Student') {
      ruleForm.className = data.data.data.ClassName
      ruleForm.classId = data.data.data.ClassId
    }
    if (ruleForm.type == 'Teacher') {
      ruleForm.courses = data.data.data.Courses
    }
    devLog("this is user id", ruleForm.id)
    devLog("this is user name", ruleForm.name)
    if (ruleForm.type == 'Student') {
      let total = 0;
      getAllClass(1).then(data => {
        classList.value = data.data.data.Items
        total = data.data.data.TotalPages
        getAllClass(1, total * 10).then(data => {
          classList.value = data.data.data.Items
        }).catch(error => {
          console.error('获取班级列表失败', error);
        });
      }).catch(error => {
        console.error('获取班级列表失败', error);
      });

    }
  }).catch(error => {
    console.error('获取用户失败', error);
  });


})

// interface StudentInfo{
//   id:string,
//   userName:string,
//   classId:number
// }
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (ruleForm.type == "Student") {
        let studentInfo = {
          id: ruleForm.id,
          userName: ruleForm.name,
          classId: ruleForm.classId

        }
        devLog("this is StudentInfo", studentInfo)
        updateStudentInfo(studentInfo).then(() => {
          ElMessage.success('修改成功')
        }).catch(error => {
          ElMessage.error('修改失败')
          console.error('修改用户信息失败', error);
        });
      }
      if (ruleForm.type == "Teacher") {
        let teacherInfo = {
          teacherId: ruleForm.id,
          teacherName: ruleForm.name,
          courses: ruleForm.courses.map((course:any) => ({
            courseID: course.CourseId,
            classes: course.CourseClasses.map((cls:any) => ({ classId: cls.ClassId }))
          }))
        }
        devLog("this is StudentInfo", teacherInfo)
        updateTeacherInfo(teacherInfo).then(() => {
          ElMessage.success('修改成功')
        }).catch(error => {
          ElMessage.error('修改失败')
          console.error('修改用户信息失败', error);
        });
      }


      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  window.location.reload();
}
</script>
<style></style>