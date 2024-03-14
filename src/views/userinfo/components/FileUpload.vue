<!-- FileUpload.vue -->
<!-- 用于上传用户头像 -->
<template class="uploadFile">
  <div>
    <form @submit.prevent="upload" enctype="multipart/form-data">
      <label for="file">选择图片文件:</label>
      <input style="margin-left: 20px;" type="file" id="file" @change="onFileChange" accept=".png, .jpeg, .jpg" required>
      <!-- <label for="competition">竞赛名称:</label>
      <input type="text" v-model="competition" required> -->
      <button type="submit">上传一寸照</button>
    </form>
  </div>
</template>
  
<script setup lang="ts">
import { useUserStore } from '../../../store/useUserStore';
import { uploadFile } from '../../../api/user'
import { ref } from 'vue';
const userStore = useUserStore()
const selectedFile = ref(null);
// 现在你可以使用 store.state.userStore 或 store.getters['userStore'] 来访问 userStore
let uploadResult
// props: ['competition'],
const onFileChange = (e:any) => {
  selectedFile.value = e.target.files[0];
};
const upload = () => {
  if (selectedFile.value) {
    uploadFile(selectedFile.value, userStore.token)
      .then(response => {
        uploadResult = response;
        console.log('上传结果:', uploadResult);

        // 根据后端返回的数据进行处理
        //@ts-ignore
        if (uploadResult.code === 1) {
          // 文件为空，进行相应的提示或处理
          alert(uploadResult.data.message);
        }
        else {
          alert('文件上传成功');
        }
      })
      .catch(error => {
        console.error('上传失败:', error);
        alert('文件上传失败');
        // 处理上传失败的逻辑
      });
  } else {
    alert('请选择文件');
  }
}
</script>
  
<style scoped>
.uploadFile {
  margin-top: 0px;
}

/* 添加样式（可选） */
</style>
  