<template>
  <div class="about">
    <!-- <Notice :msg="data.notice"></Notice> -->
    <!-- <PostList :data="40"></PostList> -->
    <el-card :body-style="{ padding: '0px' }">
      <template #header>
        <div class="detail_header">
          <el-row>
            <el-col :span="24">
              <div class="box_row_left">
                <postTitleTag
                  :isTop="post_detail.isTop"
                  :weight="post_detail.weight"
                />
                <div
                  class="detail_header_title"
                  :class="post_class[post_detail.isTop]"
                  v-html="post_detail.title"
                ></div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="content_author">
                <el-button
                  plain
                  link
                  @click="goBlankPage('userInfo?uid=' + post_detail.uid)"
                  >{{ post_detail.nickname }}</el-button
                ><span class="content_desc"
                  >发布于{{ post_detail.createTime }}</span
                >
              </div></el-col
            >
          </el-row>
        </div>
      </template>
      <div class="detail_header_content">
        <div class="content_text">
          <!-- <time class="time">{{ currentDate }}</time> -->
          <div style="white-space: pre-wrap" v-html="post_detail.comment"></div>
        </div>
      </div>
      <div class="detail_header_content" v-if="postDetailCommentUrlLength != 0">
        <div
          class="content_button"
          v-for="(item, index) in post_detail.commentUrl"
          :key="index"
        >
          <!-- <time class="time">{{ currentDate }}</time> -->
          <el-button
            class="button"
            type="primary"
            @click="goBlankPage(item.url)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </div>
      <div class="detail_header_content">
        <div v-for="(item, index) in post_detail['jpg']" :key="index">
          <el-image
            class="image"
            :src="item"
            fit="contain"
            :preview-src-list="post_detail['jpg']"
          />
        </div>
      </div>
    </el-card>

    <div class="statementBox">
      <statement />
    </div>
    <el-button
      class="post_detail_back_button"
      @click="goBack"
      v-if="store.getters.getDeviceType != 1"
      >返回</el-button
    >
  </div>
  <Reply :pid="pid" />
</template>

  <script lang="ts" setup>
import { onBeforeUpdate, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import api from "../api/postApi";
import util from "../utils/util";
import store from "@/store";

import Notice from "@/components/Notice.vue";
import PostList from "@/components/PostList.vue";
import router from "@/router";
import Reply from "@/components/Reply.vue";
import postTitleTag from "@/components/post/postTitleTag.vue";
import statement from "@/components/post/statement.vue";

let post_detail = ref({} as any);
const postDetailCommentUrlLength = ref(0);

const _route = useRoute();
const pid = parseInt(_route.query.pid as string) | 0;
const post_class = ref(store.getters.getPost.title_class);

const currentDate = ref(new Date());

const getPostList = async () => {
  await api.postService
    .getPostListById(pid)
    .then((res) => {
      console.log(res);
      post_detail.value = res.data.data[0];
      post_detail.value.comment = util.n2entry(post_detail.value.comment);
      post_detail.value.commentUrl = util.string2json(
        post_detail.value.commentUrl
      );
      postDetailCommentUrlLength.value = post_detail.value.commentUrl.length;
      post_detail.value.jpg = util.i2a(post_detail.value.jpg);
      post_detail.value.createTime = post_detail.value.createTime.split(" ")[0];

      console.log(post_detail.value.jpg);
      window.document.title =
        post_detail.value.title + "-" + window.document.title;
    })
    .catch((err) => {
      console.log(err);
    });
};

const goBlankPage = (url: string) => {
  window.open(url, "_blank");
};

const goBack = () => {
  window.open("index?from=all", "_self");
  // router.back();
};

getPostList();
</script>
  
  <style scoped>
.content_desc {
  font-size: 12px;
  color: #999;
}

.bottom {
  /* margin-top: 13px; */
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
  width: 100%;
}

.detail_header {
  text-align: left;
}

.detail_header_title {
  font-size: 21px;
  font-weight: bolder;
  margin-bottom: 5px;
}
.detail_header_content {
  padding: 14px;
  border-bottom: 1px solid var(--el-card-border-color);
}
.detail_header_content .content_text {
  /* margin-top: 13px; */
  /* line-height: 12px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail_header_content .content_button {
  margin-bottom: 10px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail_header_content .content_author {
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.post_detail_back_button {
  margin-top: 15px;
  width: 100%;
  background-color: var(--default__color);
  color: var(--white);
}

.statementBox {
  padding: 20px 0;
}
</style>