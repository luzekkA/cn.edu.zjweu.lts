<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;margin-top: 20px;">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
    @close="handleClose">
    <div v-for="(route, index) in list">

      <el-sub-menu v-if="(route.children && route.children.length > 1)" :index="`${index}`">
        <template v-if="!isCollapse" #title>
          <el-icon>
            <location />
          </el-icon>
          <span @click="handleClick(route)">{{ route?.meta?.name }}</span>
        </template>

        <el-menu-item v-for="(children, childrenIndex) in route.children" :index="`${index}-${childrenIndex}`" @click="handleInnerClick(route,children)">
          {{ children.name }}
        </el-menu-item>

      </el-sub-menu>
      <el-menu-item v-if="(route.children && route.children.length == 1)" :index="`${index}`"  @click="handleInnerClick(route,route.children[0])">
        <!-- 有1children -->
        <el-icon>
          <icon-menu />
        </el-icon>
        <template #title>
          {{ route.children[0].name }}
        </template>
      </el-menu-item>
      <el-menu-item v-if="(!route.children)" :index="`${index}`" @click="handleClick(route)">
        <!-- 没有children -->
        <el-icon>
          <icon-menu />
        </el-icon>
        <template #title >
          {{ route.name }}
        </template>
      </el-menu-item>
    </div>
  </el-menu>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'
import { useRoutesStore } from '../../../store/useRoutesStore.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const routesStore = useRoutesStore()
let list = routesStore.routesList;
console.log(list, "this is list")
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClick = (route:any) => {
  console.log(route,"this is aside route")
  router.push(route.path)
}
const handleInnerClick = (faterRoute:any,route:any) => {
  let temp =faterRoute.path as string +'/'+route.path as string
  console.log(temp)
  router.push(temp)
}
</script>
  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
  