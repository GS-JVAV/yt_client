<template>
  <div style="position: relative">
    <div style="display: flex; margin-bottom: 10px">
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
        :limit="5"
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

    <el-input
      type="textarea"
      v-model="replyContent"
      placeholder="请输入回复内容(100字以内)"
      maxlength="100"
      show-word-limit
      :autosize="{ minRows: 7, maxRows: 10 }"
    ></el-input>
    <el-button
      style="width: 160px; margin-top: 20px"
      type="primary"
      @click="submitReply"
      ><el-icon><Position /></el-icon>发送</el-button
    >
  </div>
</template>
  
  <script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
// import { ElInput, ElButton, ElUpload } from "element-plus";
import replyApi from "@/api/replyApi";
export default defineComponent({
  name: "replyInput",
  props: {
    data: { type: Object as () => Record<string, any>, required: true },
  },
  setup(props, ctx) {
    const replyData1 = ref(props.data);
    const replyData2 = ref({
      pid: replyData1.value.pid,
      prid: replyData1.value.prid,
      prid2: replyData1.value.prid2,
      comment: "",
    });
    const replyContent = ref("");
    const uploadProgress = ref(0);
    const fileList = ref([]);
    const beforeUpload = (file: File) => {
      // 校验图片大小、类型等
      console.log(file);
    };

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
      ElMessage.error("文件数量大于5个");
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
      // let _sameIndex = fileList.value.findIndex(
      //   (obj: any) => obj.name === uploadFile.name
      // );
      // console.log(fileList.value);
      // console.log(uploadFiles);
      // if (_sameIndex != -1) {
      //   fileList.value.splice(_sameIndex, 1);
      //   console.log(fileList.value);
      //   return;
      // }
    };

    const submitReply = () => {
      let text = replyContent.value.trim();
      for (let i = 0; i < fileList.value.length; i++) {
        for (let j = i + 1; j < fileList.value.length; j++) {
          if (fileList.value[i]["name"] == fileList.value[j]["name"]) {
            fileList.value.splice(j, 1);
          }
        }
      }
      console.log(fileList.value);
      replyData2.value["comment"] = text;
      console.log(replyData2.value);
      console.log(text);
      // return;
      // 提交回复内容
      replyApi
        .createReply(replyData2.value)
        .then((res) => {
          console.log(res);
          ElMessage.success(res.data.msg);
          ctx.emit("SumbitReply",true);
        })
        .catch((err) => {
          console.log(err);
          // ctx.emit("SumbitReply",true);
        });
    };

    return {
      replyContent,
      uploadProgress,
      beforeUpload,
      handleUploadSuccess,
      handleUploadError,
      handleUploadProgress,
      handleExceed,
      handleChange,
      submitReply,
      fileList,
    };
  },
});
</script>
  
<style scoped>
.upload :deep(.el-upload--picture-card) {
  /* margin-top: 4%; */
  height: 60px;
  width: 60px;
  line-height: 80px;
}
.upload .el-upload-list--picture-card :deep(.el-upload-list__item) {
  /* margin-top: 4%; */
  height: 60px;
  width: 60px;
  line-height: 80px;
}
</style>