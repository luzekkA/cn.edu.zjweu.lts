<template>

    <el-col :span="1" :offset="0">
        <el-input v-model="keyword" style="width: 240px; margin-bottom: 10px; margin-top:5px;" size="large"
            placeholder="请输入要查询的题目" :prefix-icon="'Search'" />
    </el-col>



    <el-table :data="topicList" style="width: 100%">
        <el-table-column prop="Id" label="Id"  />
        <el-table-column prop="Title" label="标题"  />
        <el-table-column label="操作">
            <template #default="scope">
                <RouterLink :to="{ path: '/editTopic/detail', query: { topicId: scope.row.Id } }">
                    <el-button link type="primary" size="large" @click="">
                        详情
                    </el-button>
                </RouterLink>
            </template>
        </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center; position: fixed; bottom: 50px; width: 100%; left: 0; ">
        <el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :page-count="total"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'
import { getTopics, getAllTopics } from '../../../api/admin';
import { devLog } from '../../../utils/devLog';
let keyword = ref('')
let topicList = ref([])


//分页用
const currentPage = ref(1)
const total = ref(1)

onMounted(() => {
    getAllTopics(currentPage.value).then(data => {
        topicList.value = data.data.data.Items
        total.value = data.data.data.TotalPages
        devLog("this is topicList", topicList.value)
        if (total.value == 0) {
            total.value = 1
        }
    }).catch(error => {
        console.error('获取题目列表失败', error);
    });
})
const change = () => {
    currentPage.value = 1
    if (keyword.value == '') {
        getAllTopics(currentPage.value).then(data => {
            topicList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is topicList", topicList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取题目列表失败', error);
        });
    }
    else {
        getTopics(keyword.value, currentPage.value).then(data => {
            topicList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is topicList", topicList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取题目列表失败', error);
        });
    }
}

watch(keyword, () => {
    change();
})


const handleCurrentChange = () => {
    if (keyword.value == '') {
        getAllTopics(currentPage.value).then(data => {
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
    else {
        getTopics(keyword.value, currentPage.value).then(data => {
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
}
</script>
<style></style>