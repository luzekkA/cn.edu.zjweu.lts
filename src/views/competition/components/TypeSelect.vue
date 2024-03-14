<template>
    <el-select :value="value" placeholder="请选择" @change="$emit('input', $event)">
        <el-option v-for="item in typeList" :key="item" :label="item" :value="item">
        </el-option>
    </el-select>
</template>
<script>
import { mapActions, mapState } from "vuex"
export default {
    name: "TypeSelect",
    props: {
        value: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
        };
    },
    created() {
        this.getTypeList();
    },
    computed: {
        ...mapState("competition",['typeList'])
    },
    methods: {
        ...mapActions("competition", ["getTypeList"]),
    }
}
</script>