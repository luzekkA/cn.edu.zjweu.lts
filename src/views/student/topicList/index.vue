<template>
  <el-table :data="topicList" style="width: 100%">
    <el-table-column prop="Id" label="Id" width="50px" />
    <el-table-column prop="Title" label="标题" width="300px"/>
    <el-table-column label="开始日期">
      <template #default="scope">
        {{ scope.row.info && scope.row.info.length > 0 ? scope.row.info[0].StartTime : 'N/A' }}
      </template>
    </el-table-column>
    <el-table-column label="截止日期">
      <template #default="scope">
        {{ scope.row.info && scope.row.info.length > 0 ? scope.row.info[0].Deadline : 'N/A' }}
      </template>
    </el-table-column>
    <el-table-column label="是否截止">
      <template #default="scope">
        {{ isDeadlinePassed(scope.row.info && scope.row.info.length > 0 ? scope.row.info[0].Deadline : null) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <router-link :to="{ path: '/Student/TopicDetail', query: { TopicId: scope.row.Id } }">
          <el-button link type="primary" size="large" @click="">
            详情
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
  <div style="display: flex; justify-content: center; position: fixed; bottom: 50px; width: 100%; left: 0; ">
    <el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :page-count="total"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { getCourseTopic } from '../../../api/student'
import { devLog } from '../../../utils/devLog';
import { useRoute } from 'vue-router'
let topicList = ref([])
const route = useRoute()
const CourseId = route.query.CourseId

//分页用
const currentPage = ref(1)
const total = ref(1)
onMounted(() => {

  getCourseTopic(CourseId,currentPage.value).then(data => {
    topicList.value = data.data.data.Items
    total.value = data.data.data.TotalPages
    devLog("this is topicList", topicList.value)
  }).catch(error => {
    console.error('获取题目列表失败', error);
  });
})

const isDeadlinePassed = (deadline: any) => {
  if (!deadline) {
    return 'N/A';
  }

  const now = new Date();
  const deadlineDate = new Date(deadline);

  return now >= deadlineDate ? '已截止' : '未截止';
}



const handleCurrentChange = () => {
  getCourseTopic(CourseId, currentPage.value).then(data => {
    topicList.value = data.data.data.Items
    total.value = data.data.data.TotalPages
    devLog("this is userList", topicList.value)
    if (total.value == 0) {
      total.value = 1
    }
  }).catch(error => {
    console.error('获取用户失败', error);
  });
}

</script>
<style></style>