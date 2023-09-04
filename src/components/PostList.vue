<template>
  <div style="padding-top: 20px; position: relative; min-height: 52vh">
    <div v-if="showBox">
      <RightInfoBox :nowPlate="nowPlate" />
    </div>
    <div class="tips">
      <div class="item_active">最新</div>
    </div>
    <div v-for="(item, index) in data" :key="index">
      <div class="post_list_item">
        <div style="display: flex; flex-direction: row">
          <div class="avatar-box">
            <el-avatar
              style="width: 48px; height: 48px"
              src="https://ch33.cc/upload/avatar/000/8521.png?1686625820"
            >
              <!-- {{ item.nickname }} -->
            </el-avatar>
          </div>
          <div style="display: flex; flex-direction: column">
            <div
              class="post_title_pc text-one-line"
              :class="item.class"
              @click="goDetail(item.id)"
              v-if="store.getters.getDeviceType == 1"
            >
              <postTitleTag :isTop="item.isTop" :weight="item.weight" />
              <a href="#">{{ item.title }}</a>
            </div>

            <div
              class="post_title_mobile text-one-line"
              :class="item.class"
              @click="goDetail(item.id)"
              v-else
            >
              <postTitleTag :isTop="item.isTop" :weight="item.weight" />
              <a href="#">{{ item.title }}</a>
            </div>

            <div class="post_list_item_user_desc">
              <a href="#" @click="goBlankPage('userInfo?uid=' + item.uid)"
                >{{ item.nickname }}&nbsp;&nbsp;</a
              >

              <span
                v-if="item.replyCount != 0"
                class="post_list_item_user_desc_time"
                >{{ item.replyVisualTime }}</span
              >
              <span v-else class="post_list_item_user_desc_time">{{
                item.visualTime
              }}</span>
              <!-- {{ item.createTime.split(" ")[0] }} -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="box_row_center" style="margin-top: 15px">
    <el-row>
      <el-col :span="24">
        <el-config-provider :locale="locale">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="custom-el-pagination"
          />
        </el-config-provider>
      </el-col>
    </el-row>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../store";
import zhCn from "element-plus/lib/locale/lang/zh-cn.js";
import api from "../api/postApi";
import { AxiosResponse } from "axios";
import util from "@/utils/util";
import RightInfoBox from "./RightInfoBox.vue";
import postTitleTag from "@/components/post/postTitleTag.vue";
export default defineComponent({
  name: "PostList",
  props: {},
  components: {
    RightInfoBox,
    postTitleTag,
  },
  setup() {
    interface MyResponse {
      data: any;
      total: number;
    }
    let data = ref({} as any);

    const _router = useRouter();
    const _route = useRoute();

    const post_class = ref(store.getters.getPost.title_class);
    const nowPlate = ref(store.getters.getNowPlate);

    const currentPage = ref(1);
    const pageSize = ref(10);
    const small = ref(false);
    const background = ref(true);
    const disabled = ref(false);
    const total = ref(0);
    const thisPage =
      store.getters.getThisPage == ""
        ? (_route.query.from as string)
        : store.getters.getThisPage;
    // console.log(thisPage);
    const locale = zhCn;
    const handleSizeChange = (val: number) => {
      // console.log(`${val} items per page`);
      getPostList();
    };
    const handleCurrentChange = (val: number) => {
      // console.log(`current page: ${val}`);
      getPostList();
    };
    const getPostList = async () => {
      await api.postService
        .getPostListByType(thisPage || "all", currentPage.value, pageSize.value)
        .then((res: AxiosResponse<MyResponse>) => {
          console.log(res);
          if (Array.isArray(res.data.data)) {
            res.data.data.forEach((item: any) => {
              item.visualTime =
                "发布于" + util.time2visualTime(item.createTime);
              item.replyVisualTime =
                "最新回复" + util.time2visualTime(item.updateTime);
              // 精帖
              if (item.weight > 0 && item.weight <= 5 && item.isTop != 1) {
                item.isTop = 2;
              }
              // 热帖
              if (item.weight > 5 && item.isTop != 1) {
                item.isTop = 3;
              }
              item.class = post_class.value[item.isTop];
            });
          }
          console.log(res.data);
          data.value = res.data.data;
          total.value = res.data.total;
          // total.value = 100;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPostList();

    const goDetail = (pid: string) => {
      const showRightBox = false;
      sessionStorage.setItem("showRightBox", JSON.stringify(showRightBox));
      store.commit("setShowRightBox", showRightBox);
      if (store.getters.getDeviceType == 1) {
        window.open(`/detail?pid=${pid}`, "_blank");
      } else {
        window.open(`/detail?pid=${pid}`, "_self");
      }
    };
    // let showBox = _route.fullPath.includes("thream") ;
    // 如果含有index，表示为主页，则展示主页的数据
    if (_route.fullPath.includes("index")) {
      store.commit("setNowPlate", store.getters.getNav.plate["index"]);
      nowPlate.value = store.getters.getNowPlate;
    }
    const goBlankPage = (url: string) => {
      window.open(`/${url}`, "_blank");
    };

    const searchText = ref("");
    const search = () => {
      goBlankPage("search?from=" + searchText.value);
    };

    return {
      goDetail,
      goBlankPage,
      currentPage,
      pageSize,
      small,
      background,
      disabled,
      total,
      handleSizeChange,
      handleCurrentChange,
      locale,
      data,
      store,
      searchText,
      search,
      nowPlate,
      showBox: true,
    };
  },
});
</script>
  
  <style scoped>
.tips {
  /* height: 30px; */
  display: flex;
  border-bottom: 1px solid #dee2e6;
  /* margin-bottom: 8px; */
}
.post_list_item {
  /* height: 50px; */
  padding: 0.7rem 0;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid #e9ecef;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #6b6d71 !important;
}
</style>