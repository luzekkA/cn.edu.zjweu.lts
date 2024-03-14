<template>
    <el-container class="container">
      <el-header id="header">
        <Navbar />
      </el-header>
      <el-container>
        <el-aside width="200px">
        <Aside />
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
</template>
<script setup lang='ts'>
import Aside from "./components/Aside.vue"
import Navbar from "./components/Navbar.vue"
</script>
<style>
#header{
  padding: 0px;
  height: 80px;
}
.container{
  width: 100%;
  height: 100%;
  margin:0px;
  padding: 0px;
  border: 0px;
}

</style>
