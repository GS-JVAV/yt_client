<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-upload
        v-model:file-list="fileList"
        class="upload"
        action="/upload"
        accept="image/*"
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :on-progress="handleUploadProgress"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :auto-upload="false"
        :limit="limit"
        list-type="picture-card"
        multiple
      >
        <!-- <el-button
          style="width: 100px; position: absolute; top: 80px; right: 240px"
          ><el-icon><FolderOpened /></el-icon>上传附件</el-button
        > -->
        <el-icon><Plus /></el-icon>
      </el-upload>
      <div v-if="uploadProgress > 0 && uploadProgress < 100">
        上传进度：{{ uploadProgress }}%
      </div>
    </div>
    <el-button
      type="success"
      @click="uploadFileList"
      :disabled="!fileList.length"
      >上传</el-button
    >
    <el-button type="danger" @click="clearFileList" :disabled="!fileList.length"
      >清空</el-button
    >
  </div>
  <div v-if="havingJpg != ''">
    <div>
      <div class="having_image_list">
        <template v-for="(item, index) in havingJpg" :key="index">
          <div class="having_image_item">
            <el-image
              style="width: 100%"
              :src="item"
              :zoom-rate="1.2"
              :preview-src-list="havingJpg"
              :initial-index="4"
              fit="cover"
              :preview-teleported="true"
            />
            <div class="container">
              <el-button type="danger" @click="delHavingJPG(index)"
                >删除</el-button
              >
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
      
  
  <script lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
// import store from "../store";
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Upload",
  props: ["havingJpg"],
  setup(props, context) {
    const limit = ref(1);
    const uploadProgress = ref(0);
    const fileList = ref([]);
    const beforeUpload = (file: File) => {
      // 校验图片大小、类型等
      console.log(file);
    };
    console.log(props.havingJpg);

    const handleUploadSuccess = (response: any, file: File) => {
      // 处理上传成功的回调
      // 可以在这里获取上传成功后的图片地址，并将其插入到回复内容中
    };

    const handleUploadError = (error: any, file: File) => {
      // 处理上传失败的回调
    };

    const handleUploadProgress = (
      event: ProgressEvent,
      file: File,
      fileList: File[]
    ) => {
      // 处理上传进度的回调
      uploadProgress.value = Math.round((event.loaded / event.total) * 100);
    };

    const handleExceed = (files: File[], uploadFiles: any) => {
      // 检验文件选中数量
      ElMessage.error("文件数量大于" + limit.value + "个");
    };
    const handleChange = (uploadFile: any, uploadFiles: any) => {
      console.log(uploadFile);
      let maxSize = 1 * 1024 * 1024; //1MB
      if (uploadFile.size > maxSize) {
        ElMessage.error("大于1MB的文件无法上传");
        let index = fileList.value.findIndex(
          (obj: any) => obj.uid === uploadFile.uid
        );
        console.log(index);
        fileList.value.splice(index, 1);
        return;
      }
      if (uploadFile.raw.type.split("/")[0] != "image") {
        ElMessage.error("文件类型错误");
        let index = fileList.value.findIndex((obj) => console.log(obj));
        fileList.value.splice(index, 1);
        return;
      }
      fileList.value = uploadFiles;
    };
    const clearFileList = () => {
      fileList.value = [];
    };
    const uploadFileList = () => {
      console.log(fileList.value);
      context.emit("uploadFileName", "123456");
    };

    const delHavingJPG = (index: number) => {
      props.havingJpg.splice(index, 1);
      context.emit("delHavingJPG", props.havingJpg);
    };

    return {
      uploadProgress,
      beforeUpload,
      handleUploadSuccess,
      handleUploadError,
      handleUploadProgress,
      handleExceed,
      handleChange,
      fileList,
      clearFileList,
      uploadFileList,
      limit,
      delHavingJPG,
    };
  },
});
</script> 
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
.having_image_list {
  display: flex;
  flex-direction: row;
}
.having_image_item {
  width: 180px;
  padding: 20px;
}
</style>