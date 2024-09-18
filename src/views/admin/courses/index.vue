<template>
    <el-row>
        <el-col :span="10" style="text-align: left;">
            <el-input v-model="keyword" style="width: 240px; margin-bottom: 10px; margin-top:5px;" size="large"
                placeholder="请输入要查询的课程" :prefix-icon="'Search'" />
        </el-col>
        <el-col :span="6" style="text-align: left;">
            <el-button @click="rightPart = true">批量导入课程</el-button>
        </el-col>
    </el-row>
    <el-drawer v-model="rightPart" title="批量导入课程" direction="rtl" size="50%">
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
    <el-table :data="coursesList" style="width: 100%">
        <el-table-column prop="Id" label="Id"  />
        <el-table-column prop="Name" label="课程名称" />
    </el-table>
    <div style="display: flex; justify-content: center; position: fixed; bottom: 50px; width: 100%; left: 0; ">
        <el-pagination v-model:current-page="currentPage" background layout="prev, pager, next" :page-count="total"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'
import { getCourses, getAllCourses, upLoadCourses } from '../../../api/admin';
import { devLog } from '../../../utils/devLog';
import { ElMessage } from 'element-plus';
let rightPart = ref(false)
let keyword = ref('')
let coursesList = ref([])

//分页用
const currentPage = ref(1)
const total = ref(1)

const upload = (uploadInfo: any) => {
    const { file } = uploadInfo;
    let formData = new FormData();
    formData.append("excel", file);
    upLoadCourses(formData).then(data => {
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


onMounted(() => {
    getAllCourses(currentPage.value).then(data => {
        coursesList.value = data.data.data.Items
        total.value = data.data.data.TotalPages
        devLog("this is coursesList", coursesList.value)
        if(total.value == 0){
                total.value =1
            }
            
    }).catch(error => {
        console.error('获取课程列表失败', error);
    });
})
const change = () => {
    currentPage.value = 1
    if (keyword.value == '') {
        getAllCourses(currentPage.value).then(data => {
            coursesList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is coursesList", coursesList.value)
            if(total.value == 0){
                total.value =1
            }
        }).catch(error => {
            console.error('获取课程列表失败', error);
        });
    }
    else {
        getCourses(keyword.value, currentPage.value).then(data => {
            coursesList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is classList", coursesList.value)
            if(total.value == 0){
                total.value =1
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
        getAllCourses(currentPage.value).then(data => {
            coursesList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is coursesList", coursesList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取课程失败', error);
        });
    }
    else {
        getCourses(keyword.value, currentPage.value).then(data => {
            coursesList.value = data.data.data.Items
            total.value = data.data.data.TotalPages
            devLog("this is coursesList", coursesList.value)
            if (total.value == 0) {
                total.value = 1
            }
        }).catch(error => {
            console.error('获取课程失败', error);
        });
    }
}
</script>
<style></style>