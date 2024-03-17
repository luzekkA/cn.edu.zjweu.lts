<template>
    <el-container class="container">
        <el-header id="header">
            <el-page-header @back="$router.back()">
                <template #content>
                    <span class="text-large font-600 mr-3"> 队伍详情 </span>
                </template>
            </el-page-header>
        </el-header>
        <el-main class="center"
            style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
            <div>
                <el-button type="danger" @click="handleQuit()">退出此队伍</el-button>
                <router-link :to="{ path: '/team/entourage' }"
                    v-if="userStore.userRolesList && (userStore.userRolesList.includes('admin') || userStore.userRolesList.includes('leader') || userStore.userRolesList.includes('coach'))">
                    <el-button class="thirdparty-button" type="primary" style="margin-left: 20px;">
                        添加随行人员
                    </el-button>
                </router-link>
                <router-link :to="{ path: '/team/select' }">
                    <el-button class="thirdparty-button" type="primary" style="margin-left: 20px;">
                        选择组别/选择比赛小项
                    </el-button>
                </router-link>
                <el-select placeholder="查看已填写的难度报表" size="large" style="width: 240px;margin-left: 20px;">
                    
                    <el-option v-for="item in formList" :key="//@ts-ignore
                    item.competition" :label="item.competition" :value="item.competition" @click="handleCheckForm(//@ts-ignore
                item)" />
                </el-select>
            </div>
            <el-table :data="memberList" stripe style="width: 100% ;margin-top: 50px;" :row-style="{ height: '60px' }">
                <el-table-column prop="user" label="队员姓名" />
                <el-table-column prop="role" label="队员身份" />
                <el-table-column prop="phone" label="队员电话" />
                <el-table-column label="操作"
                    v-if="userStore.userRolesList && (userStore.userRolesList.includes('admin') || userStore.userRolesList.includes('leader') || userStore.userRolesList.includes('coach'))">

                    <template #default="scope">
                        <el-button type="danger" @click="handleGamerQuit(scope.row.id)">退出队伍</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="entourageList" stripe style="width: 100% ;margin-top: 50px;"
                :row-style="{ height: '60px' }">
                <el-table-column prop="name" label="随行人员姓名" />
                <el-table-column prop="role" label="随行人员身份" />
                <el-table-column prop="phone" label="随行人员电话" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="danger" @click="handleOtherQuit(scope.row.phone)">退出队伍</el-button>
                    </template>
                </el-table-column>
            </el-table>


        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { getTeamMember, getEntourage, quitTeam, quitTeamByPhone, quitTeamById, showAll } from '../../api/team.ts'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../store/useUserStore.ts'
import { useRoute, useRouter } from 'vue-router';
import { useTeamStore } from '../../store/useTeamStore'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const teamStore = useTeamStore()
let memberList = ref([])
let entourageList = ref([])
let teamId = ref('init')
const formList = ref([])
console.log(teamId.value, "this is current team id")
onMounted(() => {
    if (route.query.teamId) {
        teamId.value = route.query.teamId as string
        getTeamMember(teamId.value).then(res => {
            memberList.value = res.data
            console.log(memberList.value, "this is memberList")
        })
        getEntourage(teamId.value).then(res => {
            entourageList.value = res.data
            console.log(entourageList.value, "this is entourageList")
        })
        showAll(userStore.id, teamId.value).then(res => {
            formList.value = res.data
        })
    }
    else {
        router.push({
            path: '/team/index', // 下一个页面的路由名称
        })
    }


})

const handleQuit = () => {
    quitTeam(teamId.value).then(res => {
        //@ts-ignore
        if (res.code == 20000) {
            ElMessage({
                message: '队伍退出成功',
                type: 'success',
            })
            router.push('/team/index')
            location.reload();
        }
        else {
            ElMessage({
                message: '队伍退出失败',
                type: 'error',
            })
            location.reload();
        }
    })
}
const handleOtherQuit = (phone: string) => {
    console.log(phone, "this is phone")
    quitTeamByPhone(teamId.value, phone).then(res => {
        //@ts-ignore
        if (res.code == 20000) {
            ElMessage({
                message: '队伍退出成功',
                type: 'success',
            })
            location.reload();
        }
        else {
            ElMessage({
                message: '队伍退出失败',
                type: 'error',
            })
        }
    })
}
const handleGamerQuit = (id: any) => {
    console.log(id);
    quitTeamById(teamId.value, id).then(res => {
        //@ts-ignore
        if (res.code == 2000) {
            ElMessage({
                message: '队伍退出成功',
                type: 'success',
            })
            location.reload();
        }
        else {
            ElMessage({
                message: '队伍退出失败',
                type: 'success',
            })
            location.reload();
        }
    })
}
const handleCheckForm = (item: any) => {
    teamStore.select.competition = item.competition;
    teamStore.select.group = item.group;
    teamStore.select.team = item.team;
    teamStore.select.type = item.type;
    router.push('/team/form')


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
    width: 100%;
}
</style>