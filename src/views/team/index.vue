<template>
    <el-container class="container">
        <el-header id="header">
            <el-page-header @back="$router.back()">
                <template #content>
                    <span class="text-large font-600 mr-3"> 我的队伍 </span>
                </template>
            </el-page-header>

        </el-header>
        <el-main class="center"
            style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
            <div>
                <el-input v-model="joinTeamViewModel.invitation" style="width:500px;" placeholder="请输入队伍邀请码"></el-input>
                <el-button type="primary" style="margin-left: 20px"
                    @click="handleJoin(joinTeamViewModel)">加入队伍</el-button>
            </div>

            <el-table :data="teamList" stripe style="width: 100% ;margin-top: 50px;" :row-style="{ height: '60px' }">
                <el-table-column prop="id" label="队伍ID" />
                <el-table-column prop="name" label="队名" />
                <el-table-column prop="leader" label="教练员" />
                <el-table-column prop="invitation" label="邀请码" />
                <el-table-column label="操作">

                    <template #default="scope">
                        <router-link :to="{ path: '/team/info', query: { teamId: scope.row.id } }"  @click.native="setCurrentTeamId(scope.row.id)">
                            <el-button class="thirdparty-button" type="primary">
                                队伍详情
                            </el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>



        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import { getTeam, joinTeam } from '../../api/team.ts'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../store/useUserStore.ts'
const userStore = useUserStore()
let teamList = ref([])

onMounted(() => {
    getTeam().then(data => {
        teamList.value = data.data
        console.log(teamList, "this is competitionList")
    }).catch(error => {
        console.error('Failed to get role list:', error);
    });
})
let joinTeamViewModel = reactive({
    userId: userStore.id,
    invitation: ""
});

const handleJoin = (joinTeamViewModel: any) => {
    joinTeam(joinTeamViewModel).then(res => {
        //@ts-ignore
        if (res.code != 2000) {
            ElMessage({
                message: '队伍加入成功',
                type: 'success',
            })
            location.reload();
        }
        else {
            ElMessage({
                message: '队伍加入失败',
                type: 'error',
            })
            location.reload();
        }
    })
}
const setCurrentTeamId=(teamid:any)=>{
    userStore.temp_teamId = teamid
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