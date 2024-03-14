<template>
  <el-select :model-value="value" placeholder="请选择" @change="$emit('update:value', $event)">
    <el-option v-for="item in roleList" :key="item" :label="item" :value="item">
    </el-option>
  </el-select>
</template>

<script>
import { getRoleList } from "../../../api/user.ts"
export default {
  name: 'RoleSelect',
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  emits: ['update:value'],
  data() {
    return {
      roleList:[]
    }
  },
  created() {
    getRoleList().then(data => {
      this.roleList = data.data
    }).catch(error => {
      console.error('Failed to get role list:', error);
    });
  },
  methods: {
    updateValue(value) {
      this.$emit('update:value', value);
    },
  }
}
</script>
