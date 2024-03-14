<template>
    <el-container class="container">
        <el-header id="header">
            <el-page-header @back="$router.back()">
                <template #content>
                    <span class="text-large font-600 mr-3"> 人工校对页面 </span>
                </template>
            </el-page-header>

        </el-header>
        <el-main class="center"
            style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
            <el-select v-model="competition" placeholder="请选择赛事" @change="handleCompetitionChange">
                <el-option v-for="item in competitionList" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
            </el-select>
            <el-table :data="userList" stripe style="width: 100% ;margin-top: 50px;" :row-style="{ height: '60px' }">
                <el-table-column prop="user" label="人员" />
                <el-table-column prop="type" label="组别" />
                <el-table-column prop="pay" label="是否支付" />
                <el-table-column label="支付截图">

                    <template #default="scope">
                        <el-image :src="scope.row.payment" fit="cover"></el-image>
                    </template>
                </el-table-column>

                <el-table-column label="操作">

                    <template #default="scope">
                        <el-button class="thirdparty-button" type="primary" @click="handleButtonClick(scope.row.user,scope.row.team,scope.row.competition)">
                            确认
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { getCompetition, getPeople } from '../../api/competition'
import { sure } from '../../api/user.ts'
import { ElMessage } from 'element-plus'
let competition = ref("")
const competitionList: any = ref([])
onMounted(() => {
    getCompetition().then(data => {
        competitionList.value = data.data
        console.log(competitionList.value, "this is competitionList")
    }).catch(error => {
        console.error('Failed to get role list:', error);
    });
})

const userList: any = ref([])
const handleCompetitionChange = () => {
    getPeople(competition.value).then(data => {
        userList.value = data.data
        console.log(userList.value, "this is userList")
    }).catch(error => {
        console.error('Failed to get user list:', error);
    });

}
const handleButtonClick = (user:string,team:string,competition:string) => {
    sure(user,team,competition).then((res) => {
        //@ts-ignore
        if (res.code == 20000) {
          ElMessage({
            message: '确认成功',
            type: 'success',
          })
          window.location.reload();
        }
        else {
          ElMessage({
            message: '确认失败',
            type: 'error'
          })
        }
      })
    
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