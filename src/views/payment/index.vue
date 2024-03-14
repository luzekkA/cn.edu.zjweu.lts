<template>
    <el-container class="container">
        <el-header id="header">
            <el-page-header @back="$router.back()">
                <template #content>
                    <span class="text-large font-600 mr-3"> 提交缴费凭证 </span>
                </template>
            </el-page-header>

        </el-header>
        <el-main class="center">
            <div id="img" style="margin-top:-150px; margin-right:100px;"></div>
            <el-form ref="ruleFormRef" style="width: 500px" label-width="auto" class="" status-icon>
                <el-form-item label="上传缴费截图" prop="photo">
                    <file-upload style=""></file-upload>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
  
<script lang="ts" setup>

// import RoleSelect from './components/RoleSelect.vue'
import FileUpload from './components/FileUpload.vue'
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
}
</style>