<template>
  <div class="app" style="height: 83vh">
    <div style="display: flex; height: 40px; overflow: hidden; padding: 0">
      <el-input placeholder="关键词" v-model="search['searchText']"></el-input>
      <el-button class="custom_button_middle" @click="searchPost"
        >搜索</el-button
      >
    </div>
    <div v-if="hasPostList">
      <div style="padding-top: 20px">
        <div class="tips">
          <div class="item_active">帖子列表({{ postCount }})</div>
        </div>
        <div v-for="(item, index) in data" :key="index">
          <div class="post_list_item">
            <div style="display: flex; flex-direction: row">
              <div
                style="
                  width: 61px;
                  height: 61px;
                  margin: 0 5px 0 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <el-avatar
                  style="width: 34px; height: 34px"
                  src="https://ch33.cc/upload/avatar/000/8521.png?1686625820"
                >
                  <!-- {{ item.nickname }} -->
                </el-avatar>
              </div>
              <div style="display: flex; flex-direction: column">
                <div
                  class="post_title_pc post_plain text-one-line"
                  @click="goBlankDetail(item.id)"
                  v-if="store.getters.getDeviceType == 1"
                >
                  <a href="#">{{ item.title }}</a>
                </div>
                <div
                  class="post_title_mobile post_plain text-one-line"
                  @click="goBlankDetail(item.id)"
                  v-else
                >
                  <a href="#">{{ item.title }}</a>
                </div>
                <div class="post_list_item_user_desc">
                  {{ item.nickname }}&nbsp;&nbsp;<span
                    class="post_list_item_user_desc_time"
                    >发布于{{ item.visualTime }}</span
                  >
                  <!-- {{ item.createTime.split(" ")[0] }} -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      <script lang="ts" setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import req from "../utils/req";
import store from "@/store";
import util from "@/utils/util";

const _router = useRouter();
const _route = useRoute();

const search = reactive({
  searchText: _route.query.from,
});
let data = ref({});
let hasPostList = ref(false);
let postCount = ref(0);
const searchPost = () => {
  if (!search.searchText) {
    ElMessage.error("关键词不能为空!");
    return;
  }
  if (search.searchText.length < 2) {
    ElMessage.error("关键词数量过少!");
    return;
  }
  // window.location.href = _route.fullPath+search.searchText;
  history.pushState(
    null,
    `全站搜索含有【${search.searchText}】的帖子`,
    `/search?from=${search.searchText}`
  );
  document.title = `全站搜索含有【${search.searchText}】的帖子`;
  req
    .get("/post/api/search/" + search.searchText)
    .then((res) => {
      //   ElMessage.success("搜索成功!");
      console.log(res);
      if (Array.isArray(res.data.data)) {
        res.data.data.forEach((item:any) => {
          item.visualTime = util.time2visualTime(item.createTime);
        });
      }
      data.value = res.data.data;
      hasPostList.value = true;
      postCount.value = data.value.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

if (!!search.searchText) {
  searchPost();
}

const goBlankDetail = (pid: string) => {
  const showRightBox = false;
  sessionStorage.setItem("showRightBox", JSON.stringify(showRightBox));
  store.commit("setShowRightBox", showRightBox);
  window.open(`/detail?pid=${pid}`, "_blank");
  // _router.push({
  //   path: "detail",
  //   query: {
  //     pid: pid,
  //   },
  // });
};
</script>
      
      <style scoped>
/* .app {
  width: 100%;
} */
.custom_button_middle {
  /* margin-top: 10px; */
  width: 100px;
  height: 100%;
  background-color: var(--custom-self-color-notice);
  color: var(--gray);
}

.tips {
  /* height: 30px; */
  display: flex;
  border-bottom: 1px solid #dee2e6;
  /* margin-bottom: 8px; */
}
.post_list_item {
  height: 50px;
  padding: 0.7rem 0;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid #e9ecef;
}

.post_title {
  padding: 0 0 10px 0;
}
</style>