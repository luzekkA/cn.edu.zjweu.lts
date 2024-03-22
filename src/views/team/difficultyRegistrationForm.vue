<template>
    <div>
        <table id="myTable" style="border: 1px solid grey; border-collapse: collapse; margin-top: 20px;">
            <tr>
                <td class="td" style="width: 125px; height: 50px;" colspan="9">
                    动作难度和链接登记
                    <div>项目：{{ teamStore.select.type }}</div>
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;" rowspan="3">
                    第一段
                </td>
                <td class="td" style="width: 125px;">
                    难度内容
                </td>
                <td v-for="item in phase1" class="td">
                    <el-autocomplete v-model="item.content" :fetch-suggestions="querySearch" class="input"
                        placeholder="" @select="handleSelect" />
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;">
                    难度分值
                </td>
                <td v-for="item in phase1" class="td">
                    <input v-model="item.value" class="input" @change="refreshTotalValue" />
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;">
                    必选动作
                </td>
                <td v-for="item in phase1" class="td">
                    <input v-model="item.action" class="input" />
                </td>
            </tr>



            <tr>
                <td class="td" style="width: 125px;" rowspan="3">
                    第二段
                </td>
                <td class="td" style="width: 125px;">
                    难度内容
                </td>
                <td v-for="item in phase2" class="td">
                    <el-autocomplete v-model="item.content" :fetch-suggestions="querySearch" class="input"
                        placeholder="" @select="handleSelect" />
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;">
                    难度分值
                </td>
                <td v-for="item in phase2" class="td">
                    <input v-model="item.value" class="input" @change="refreshTotalValue" />
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;">
                    必选动作
                </td>
                <td v-for="item in phase2" class="td">
                    <input v-model="item.action" class="input" />
                </td>
            </tr>

            <tr>
                <td class="td" style="width: 125px;" rowspan="3">
                    第三段
                </td>
                <td class="td" style="width: 125px;">
                    难度内容
                </td>
                <td v-for="item in phase3" class="td">
                    <el-autocomplete v-model="item.content" :fetch-suggestions="querySearch" class="input"
                        placeholder="" @select="handleSelect" />
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;">
                    难度分值
                </td>
                <td v-for="item in phase3" class="td">
                    <input v-model="item.value" class="input" @change="refreshTotalValue" />
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;">
                    必选动作
                </td>
                <td v-for="item in phase3" class="td">
                    <input v-model="item.action" class="input" />
                </td>
            </tr>

            <tr>
                <td class="td" style="width: 125px;" rowspan="3">
                    第四段
                </td>
                <td class="td" style="width: 125px;">
                    难度内容
                </td>
                <td v-for="item in phase4" class="td">
                    <el-autocomplete v-model="item.content" :fetch-suggestions="querySearch" class="input"
                        placeholder="" @select="handleSelect" />
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;">
                    难度分值
                </td>
                <td v-for="item in phase4" class="td">
                    <input v-model="item.value" class="input" @change="refreshTotalValue" />
                </td>
            </tr>
            <tr>
                <td class="td" style="width: 125px;">
                    必选动作
                </td>
                <td v-for="item in phase4" class="td">
                    <input v-model="item.action" class="input" />
                </td>
            </tr>

            <tr>
                <td colspan="4" class="td">
                    难度登记统计
                </td>
                <td colspan="5" class="td">
                    现场评定统计
                </td>
            </tr>

            <tr>
                <td colspan="2" class="td">
                    动作难度
                </td>

                <td class="td" colspan="2">
                    <input v-model="difficultyCount.actionDifficulty" class="input" />
                </td>
                <td colspan="3" class="td">
                    动作难度
                </td>

                <td class="td" colspan="2">

                </td>
            </tr>

            <tr>
                <td colspan="2" class="td">
                    链接难度
                </td>

                <td class="td" colspan="2">
                    <input v-model="difficultyCount.connectDifficulty" class="input" />
                </td>
                <td colspan="3" class="td">
                    链接难度
                </td>

                <td class="td" colspan="2">

                </td>
            </tr>

            <tr>
                <td colspan="2" class="td">
                    创新动作
                </td>

                <td class="td" colspan="2">
                    <input v-model="difficultyCount.innovationAction" class="input" />
                </td>
                <td colspan="3" class="td">
                    创新动作
                </td>

                <td class="td" colspan="2">

                </td>
            </tr>

            <tr>
                <td colspan="2" class="td">
                    累计难度
                </td>

                <td class="td" colspan="2">
                    <input v-model="difficultyCount.totalDifficulty" class="input" />
                </td>
                <td colspan="3" class="td">
                    累计难度
                </td>

                <td class="td" colspan="2">

                </td>
            </tr>
        </table>
        <el-button type="primary" style="margin-top: 20px;" @click="submitPhaseData">提交</el-button>
        <el-button type="danger" style="margin-top: 20px;" @click="clearPhaseData">清除</el-button>
        <el-button v-if="isDidFlag" type="primary" style="margin-top: 20px;" @click="downloadPageAsPDF">下载表格</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { difficultyForm, getDifficultyForm } from '../../api/user';
import { select, isDid } from '../../api/team'
import { ElMessage } from 'element-plus'
import { useTeamStore } from '../../store/useTeamStore'
import { useRouter } from 'vue-router';
const router = useRouter()
// @ts-ignore
import html2pdf from 'html2pdf.js';
//标志是否填写过表
let isDidFlag = ref(true)
const teamStore = useTeamStore()
let phase1 = ref([
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' }]);

let phase2 = ref([
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' }]);

let phase3 = ref([
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' }]);

let phase4 = ref([
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' },
    { content: '', value: '', action: '' }]);

const difficultyCount = ref({
    actionDifficulty: '', connectDifficulty: '', innovationAction: '', totalDifficulty: 0
});

function refreshTotalValue(){
    let totalValue = 0;
    totalValue += phase1.value.reduce((sum, item) => sum + Number(item.value), 0);
    totalValue += phase2.value.reduce((sum, item) => sum + Number(item.value), 0);
    totalValue += phase3.value.reduce((sum, item) => sum + Number(item.value), 0);
    totalValue += phase4.value.reduce((sum, item) => sum + Number(item.value), 0);
    difficultyCount.value.totalDifficulty = totalValue;
}



function submitPhaseData() {
    if (levelACount() <= 3) {
        if (difficultyCount.value.totalDifficulty <= 2) {
            const data = {
                team: teamStore.select.team,
                type: teamStore.select.type,
                competition: teamStore.select.competition,
                groupp: teamStore.select.group
            }

            select(data).then((res) => {
                //@ts-ignore
                if (res.code == 20000) {
                    ElMessage({
                        message: '用户选择成功',
                        type: 'success',
                    })
                }
                else {
                    ElMessage({
                        message: '用户选择失败',
                        type: 'error'
                    })
                }
            })
            difficultyForm(teamStore.select.competition, teamStore.select.team, {
                phase1: phase1.value,
                phase2: phase2.value,
                phase3: phase3.value,
                phase4: phase4.value,
                difficultyCount: difficultyCount.value
            }).then(res => {
                //@ts-ignore
                if (res.code == 20000) {
                    ElMessage({
                        message: '报表提交成功',
                        type: 'success',
                    })
                    // location.reload();
                }
                else {
                    ElMessage({
                        message: '报表提交失败',
                        type: 'error',
                    })
                }
            })
        }
        else {
            ElMessage({
                message: '动作难度总分需要小于等于2',
                type: 'error',
            })
        }
    }
    else {
        ElMessage({
            message: 'A组动作需小于等于3个',
            type: 'error',
        })
    }

}

function clearPhaseData() {
    // location.reload();
    phase1.value = [
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' }];

    phase2.value = [
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' }];

    phase3.value = [
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' }];

    phase4.value = [
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' },
        { content: '', value: '', action: '' }];
};

interface RestaurantItem {
    value: string,
    level: string
}

const actions = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? actions.value.filter(createFilter(queryString))
        : actions.value
    // call callback function to return suggestions
    cb(results)
}
const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}
const loadAll = () => {
    const type = teamStore.select.type
    if (type == '长拳' || type == '剑术' || type == '刀术' || type == '枪术' || type == '棍术') {
        return code1
    }
    if (type == '南拳' || type == '南刀' || type == '南棍') {
        return code2
    }
    if (type == '太极拳' || type == '太极剑') {
        return code3
    }
    return code1
}

//长拳/剑术/刀术/枪术/棍术
const code1 = [{ value: '111A', level: 'A' }, { value: '112A', level: 'A' }, { value: '123A', level: 'A' }, { value: '153A', level: 'A' },
{ value: '163A', level: 'A' }, { value: '244A', level: 'A' }, { value: '312A', level: 'A' }, { value: '323A', level: 'A' },
{ value: '324A', level: 'A' }, { value: '333A', level: 'A' }, { value: '335A', level: 'A' },
{ value: '133B', level: 'B' }, { value: '224B', level: 'B' }, { value: '312B', level: 'B' }, { value: '323B', level: 'B' },
{ value: '324B', level: 'B' }, { value: '353B', level: 'B' }, { value: '355B', level: 'B' },
{ value: '112C', level: 'C' }, { value: '323C', level: 'C' }, { value: '324C', level: 'C' }, { value: '353C', level: 'C' }]
//南拳/南刀/南棍
const code2 = [{ value: '244A', level: 'A' }, { value: '312A', level: 'A' }, { value: '323A', level: 'A' }, { value: '324A', level: 'A' },
{ value: '335A', level: 'A' }, { value: '346A', level: 'A' }, { value: '415A', level: 'A' }, { value: '423A', level: 'A' },
{ value: '447A', level: 'A' },
{ value: '244B', level: 'B' }, { value: '323B', level: 'B' }, { value: '324B', level: 'B' }, { value: '346B', level: 'B' },
{ value: '323C', level: 'C' }, { value: '324C', level: 'C' }]
//太极拳/太极剑
const code3 = [{ value: '142A', level: 'A' }, { value: '143A', level: 'A' }, { value: '212A', level: 'A' }, { value: '312A', level: 'A' },
{ value: '323A', level: 'A' },
{ value: '143B', level: 'B' }, { value: '312B', level: 'B' }, { value: '323B', level: 'B' }, { value: '324B', level: 'B' },
{ value: '323C', level: 'C' }, { value: '324C', level: 'C' }]
const handleSelect = (item: RestaurantItem) => {
    console.log(item)
}

const levelACount = () => {
    let count = 0;
    count += phase1.value.filter(item => item.content.includes('A')).length;
    count += phase2.value.filter(item => item.content.includes('A')).length;
    count += phase3.value.filter(item => item.content.includes('A')).length;
    count += phase4.value.filter(item => item.content.includes('A')).length;
    return count;
}

const downloadPageAsPDF = () => {
    const element = document.getElementById('myTable');; // 获取要导出的元素
    const opt = {
        margin: 1,
        filename: '难度报表.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
onMounted(() => {
    if (teamStore.select.competition == '') {
        router.push({
            path: '/team/index', // 下一个页面的路由名称
        })
    }
    else {
        isDid(teamStore.select.competition).then((res) => {
            //@ts-ignore
            if (res.code == 20000 && res.data == '已填写') {
                ElMessage({
                    message: '用户已填写过报表',
                    type: 'success',
                    //这里添加获取数据的逻辑
                })
                isDidFlag.value = true;
                getDifficultyForm(teamStore.select.competition, teamStore.select.team).then((res) => {
                    //@ts-ignore
                    if (res.code == 20000) {
                        ElMessage({
                            message: '获取用户报表成功',
                            type: 'success',
                            //这里添加获取数据的逻辑
                        })
                        isDidFlag.value = true;
                        console.log(res.data, "this is data ")
                        let str: string = res.data
                        // 替换非法字符

                        phase1.value = JSON.parse(str).phase1
                        phase2.value = JSON.parse(str).phase2
                        phase3.value = JSON.parse(str).phase3
                        phase4.value = JSON.parse(str).phase4
                        difficultyCount.value = JSON.parse(str).difficultyCount
                    }
                    else {
                        ElMessage({
                            message: '获取用户报表失败',
                            type: 'success'
                        })
                        isDidFlag.value = false;
                    }
                })
            }
            else {
                ElMessage({
                    message: '请填写此表',
                    type: 'success'
                })
                isDidFlag.value = false;
            }
        })

        actions.value = loadAll()
    }
})
</script>
<style lang="scss" scoped>
.input {
    width: 97%;
    height: 30px;
    border: none
}

.td {
    border: 2px solid lightgrey;
}
</style>