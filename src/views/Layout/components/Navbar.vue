<template>
    <div class="navbar">
        <el-button @click="logout" style=" height: 40px; margin-top: 20px; margin-right: 30px; float: right">
            退出登录
        </el-button>
        <el-avatar style=" margin-top: 15px; margin-right: 30px; float: right;" shape="square" :size="50" :src="userStore.avatar" />
    </div>
</template>
  
<script lang="ts" setup>
import router from "../../../router/index.ts"
import {useUserStore} from "../../../store/useUserStore.ts"
const userStore = useUserStore()
const logout = async () => {
    await userStore.logout()
    router.push('/')
}

</script>
  
<style lang="scss" scoped>
.navbar {
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
  