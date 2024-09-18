<template>
    <el-row>
        <el-col :span="10" style="text-align: left;">
            <el-input v-model="keyword" style="width: 240px; margin-bottom: 10px; margin-top:5px;" size="large"
                placeholder="请输入要查询的课程" :prefix-icon="'Search'" />
        </el-col>
        <el-col :span="6" style="text-align: left;">
            <el-button @click="rightPart = true">批量导入学生</el-button>
        </el-col>
    </el-row>
    <el-drawer v-model="rightPart" title="批量导入学生" direction="rtl" size="50%">
        <!-- <el-upload class="upload-demo" :headers="{ 'Authorization': mytoken }" drag :action="uploadStudentURL"
                multiple name="excel"> -->
        <el-upload class="upload-demo" drag :http-request="upload" multiple name="excel">
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
    </el-drawer>
    <el-table v-model="rightPart" :data="userList" style="width: 100%">
        <el-table-column prop="Id" label="Id" />
        <el-table-column prop="UserName" label="用户名" />
        <el-table-column label="操作">
            <template #default="scope">
                <!-- <RouterLink :to="'/editUser/detail'" > -->
                <RouterLink :to="{ path: '/editUser/detail', query: { userId: scope.row.Id } }">
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
import { getUser, getAllUsers, upLoadStudent } from '../../../api/admin';
import { devLog } from '../../../utils/devLog';
import { useUserStore } from '../../../store/useUserStore';
import { ElMessage } from 'element-plus';
const userStore = useUserStore()
let rightPart = ref(false)
let keyword = ref('')
let userList = ref([])
let mytoken = ref('')
//分页用
const currentPage = ref(1)
const total = ref(1)

mytoken.value = userStore.token

onMounted(() => {
    getAllUsers(currentPage.value).then(data => {
        devLog("this is data ", data.data)
        userList.value = data.data.data.Items
        devLog("this is userList", userList.value)
        devLog("this is totalPage", data.data.data.TotalPages)
        total.value = data.data.data.TotalPages
        if (total.value == 0) {
            total.value = 1
        }
        devLog("this is userList", userList.value)
    }).catch(error => {
        console.error('获取用户失败', error);
    });
})
const change = () => {
    currentPage.value = 1
    if (keyword.value == '') {
        getAllUsers(currentPage.value).then(data => {
            userList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            if (total.value == 0) {
                total.value = 1
            }
            devLog("this is userList", userList.value)

        }).catch(error => {
            console.error('获取用户失败', error);
        });
    }
    else {
        getUser(keyword.value, currentPage.value).then(data => {
            userList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            if (total.value == 0) {
                total.value = 1
            }
            devLog("this is userList", userList.value)
        }).catch(error => {
            console.error('获取用户失败', error);
        });
    }
}

watch(keyword, () => {
    change();
})

const upload = (uploadInfo: any) => {
    const { file } = uploadInfo;
    let formData = new FormData();
    formData.append("excel", file);
    upLoadStudent(formData).then(data => {
        devLog("this is data", data)

        if (data.data.code == 200) {
            ElMessage.success('上传成功')
        }
        else {
            ElMessage.error('上传失败')
        }
    }
    ).catch(error => {
        ElMessage.error('上传失败')
        console.error('上传失败', error);
    });
}

const handleCurrentChange = () => {
    if (keyword.value == '') {
        getAllUsers(currentPage.value).then(data => {
            userList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is userList", userList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取用户失败', error);
        });
    }
    else {
        getUser(keyword.value, currentPage.value).then(data => {
            userList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            if (total.value == 0) {
                total.value = 1
            }
            devLog("this is userList", userList.value)
        }).catch(error => {
            console.error('获取用户失败', error);
        });
    }
}
</script>
<style></style>