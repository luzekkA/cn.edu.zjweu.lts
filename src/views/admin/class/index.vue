<template>
    <el-row>
        <el-col :span="10" style="text-align: left;">
            <el-input v-model="keyword" style="width: 240px; margin-bottom: 10px; margin-top:5px;" size="large"
                placeholder="请输入要查询的班级" :prefix-icon="'Search'" />
        </el-col>
        <!-- <el-col :span="6" style="text-align: left;">
            <el-button @click="rightPart = true">批量导入班级</el-button>
        </el-col> -->
    </el-row>
    <!-- <el-drawer v-model="rightPart" title="批量导入班级" direction="rtl" size="50%">
        <el-upload class="upload-demo" :headers="{ 'Authorization': mytoken }" drag
            :action="uploadClassURL" multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    Excel files with a size less than 500kb
                </div>
            </template>
</el-upload>
</el-drawer> -->
    <el-table :data="classList" style="width: 100%">
        <el-table-column prop="Id" label="Id" />
        <el-table-column prop="Name" label="班级名称" />
        <!-- <el-table-column label="操作">
            <template #default="scope">
                <RouterLink :to="{ path: '//detail', query: { TopicId: scope.row.Id } }">
                    <el-button link type="primary" size="large" @click="">
                        详情
                    </el-button>
                </RouterLink>
            </template>
        </el-table-column> -->
    </el-table>
    <div style="display: flex; justify-content: center; position: fixed; bottom: 50px; width: 100%; left: 0; ">
        <el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :page-count="total"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'
import { getClass, getAllClass } from '../../../api/admin';
import { devLog } from '../../../utils/devLog';
import { useUserStore } from '../../../store/useUserStore';
const userStore = useUserStore()
let keyword = ref('')
let classList = ref([])
let mytoken = ref('')

//分页用
const currentPage = ref(1)
const total = ref(1)

mytoken.value = userStore.token
onMounted(() => {
    getAllClass(currentPage.value).then(data => {
        classList.value = data.data.data.Items
        total.value = data.data.data.TotalPages
        devLog("this is classList", classList.value)
        if (total.value == 0) {
            total.value = 1
        }
    }).catch(error => {
        console.error('获取班级列表失败', error);
    });
})
const change = () => {
    currentPage.value = 1
    if (keyword.value == '') {
        getAllClass(currentPage.value).then(data => {
            classList.value = data.data
            total.value = data.data.TotalPages
            devLog("this is classList", classList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取班级列表失败', error);
        });
    }
    else {
        getClass(keyword.value, currentPage.value).then(data => {
            classList.value = data.data.Items
            total.value = data.data.TotalPages
            devLog("this is classList", classList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取班级列表失败', error);
        });
    }
}

watch(keyword, () => {
    change();
})

const handleCurrentChange = () => {
    if (keyword.value == '') {
        getAllClass(currentPage.value).then(data => {
            classList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is classList", classList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取班级失败', error);
        });
    }
    else {
        getClass(keyword.value, currentPage.value).then(data => {
            classList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is classList", classList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取班级失败', error);
        });
    }
}
</script>
<style></style>