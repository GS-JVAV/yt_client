<template>
  <div class="app" style="height: 83vh">
    <div style="display: flex; margin-bottom: 10px">
      <el-select
        v-model="postContent['type']"
        class="m-2"
        placeholder="白菜"
        size="large"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-input
      placeholder="标题"
      v-model="postContent['title']"
      maxlength="32"
      show-word-limit
    ></el-input>
    <WangEditor @getSendPostContent="getSendPostContentFromEditor" />
    <el-button
      :class="sendPostCount == 0 ? 'send_button_disable' : 'send_button'"
      @click="sendPost"
      :disabled="sendPostCount == 0"
      >{{sendPostCount == 0?"发帖次数不足":"发帖"}}</el-button
    >
  </div>
</template>
    <script lang="ts" setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import WangEditor from "@/components/WangEditor.vue";
import store from "@/store";

import postApi from "@/api/postApi";

const postContent = reactive({
  comment: "",
  type: "bc",
  title: "",
  uid: store.getters.getUserInfo["id"],
});
const sendPostCount = store.getters.getUserInfo["sendPostCount"] || 0;
const options = ref([]);

const navItem = store.getters.getNav.navItem;

for (let i in navItem) {
  let optionItem = { value: "", label: "" };
  if (!navItem[i].url.includes("index")) {
    optionItem.value = navItem[i].from;
    optionItem.label = navItem[i].name;
    options.value.push(optionItem);
  }
}

const _router = useRouter();

// const sendPostContent = ref("");
const getSendPostContentFromEditor = (value: any) => {
  console.log(value);
  // sendPostContent.value=value;
  postContent["comment"] = value;
};
const sendPost = async () => {
  if (postContent.title == "") {
    ElMessage.error(`帖子标题不能为空!`);
    return;
  }

  let _text = postContent["comment"].replace(/(<([^>]+)>)/gi, "");
  if (_text.length < 10) {
    ElMessage.error(`帖子内容字数不得少于20字!`);
    return;
  }
  if (_text.length > 300) {
    ElMessage.error(`内容长度为${_text.length},超过300字限制`);
    return;
  }
  console.log(postContent);
  await postApi.postService.createPost(postContent);
};
</script>
    
    <style scoped>
.app {
  width: 100%;
}
.send_button {
  margin-top: 10px;
  width: 200px;
  height: 38px;
  background-color: var(--custom-self-color-notice);
  color: var(--gray);
}
.send_button_disable {
  margin-top: 10px;
  width: 200px;
  height: 38px;
  background-color: var(--custom-self-color-desc-text);
  color: var(--gray);
}
</style>