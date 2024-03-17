<template>
    <div class="Competition">
        <!-- 文件上传 -->
        <file-upload
            v-if="userStore.userRolesList && (userStore.userRolesList.includes('admin'))"
            style="margin-top: 20px; margin-left: 20px;"></file-upload>
        <!-- 表格下载 -->
        <el-input
            v-if="userStore.userRolesList && (userStore.userRolesList.includes('admin'))"
            style="width: 200px; margin-left: 0px; margin-top:20px;" v-model="input" placeholder="请输入比赛名称"></el-input>
        <el-button
            v-if="userStore.userRolesList && (userStore.userRolesList.includes('admin'))"
            style=" margin-left: 20px; margin-top:20px;" @click="getExcel()">下载比赛内所有人员Excel</el-button>
        <el-button
            v-if="userStore.userRolesList && (userStore.userRolesList.includes('admin'))"
            style=" margin-left: 20px; margin-top:20px;" @click="getExcel3()">武术套路导出抽签检录Excel</el-button>
        <el-input
            v-if="userStore.userRolesList && (userStore.userRolesList.includes('admin'))"
            style="width: 200px; margin-left: 20px; margin-top:20px;" v-model="input2" placeholder="请输入队伍id"></el-input>
        <el-button
            v-if="userStore.userRolesList && (userStore.userRolesList.includes('admin'))"
            style=" margin-left: 20px; margin-top:20px;" @click="getExcel2()">下载队伍Excel</el-button>

        <el-table :data="list" stripe style="width: 100% ;margin-top: 50px;" :row-style="{ height: '60px' }">
            <el-table-column prop="category" label="比赛类型" />
            <el-table-column prop="name" label="比赛名称" />

            <el-table-column label="操作">

                <template #default="scope">
                    <el-button @click="openLink(scope.row.information)">比赛文件</el-button>
                </template>
            </el-table-column>

            <el-table-column prop="state" label="是否进行" />
        </el-table>

    </div>
</template>

<script setup lang="ts">
import { getCompetition } from '../../api/competition';
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { saveAs } from 'file-saver';
import FileUpload from './components/FileUpload.vue';
import { useUserStore } from '../../store/useUserStore';
import { ElMessage } from 'element-plus'
let input = ref('')
let input2 = ref('')
let list = ref([])
const userStore = useUserStore()
onMounted(() => {
    getCompetition().then(res => {
        list.value = res.data
    })
})

const openLink = (information: any) => {
    window.open(information, '_blank');
}
const getExcel = () => {

    if (!(input.value == "")) {
        axios({
            url: 'http://121.40.35.81:8085/competition/download',
            method: 'GET',
            responseType: 'blob', // Important
            params: {
                competition: input.value
            }
        }).then((response) => {
            const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            saveAs(blob, `${input.value}.xlsx`);
        });
    } else {
        ElMessage({
            message: '请输入赛事名',
            type: 'error',
        })
    }
}

const getExcel3 = () => {
    // getExcel(this.input).then((response) => {
    //     const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
    //     saveAs(blob, `${this.input}.xlsx`);
    // });
    if (!(input.value == "")) {
        axios({
            url: 'http://121.40.35.81:8085/competition/exportSheet',
            method: 'GET',
            responseType: 'blob', // Important
            params: {
                competition: input.value
            }
        }).then((response) => {
            const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            saveAs(blob, `${input.value}.xlsx`);
        });
    } else {
        ElMessage({
            message: '请输入赛事名',
            type: 'error',
        })
    }
}
const getExcel2 = () => {
    // getExcel(this.input).then((response) => {
    //     const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
    //     saveAs(blob, `${this.input}.xlsx`);
    // });
    if (!(input2.value == "")) {
        axios({
            url: 'http://121.40.35.81/team/download',
            method: 'GET',
            responseType: 'blob', // Important
            params: {
                team: input2.value
            }
        }).then((response) => {
            const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            saveAs(blob, `${input2.value}.xlsx`);
        });
    }
    else {
        ElMessage({
            message: '请输入队伍id',
            type: 'error',
        })
    }
}
</script>

<!-- scss -->

<style lang="scss" scoped>
.Competition {
    padding: 20px;
    box-sizing: border-box;
}
</style>