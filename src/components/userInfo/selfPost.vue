<template>
  <div style="width: 100%">
    <div style="padding-top: 0px">
      <div class="tips">
        <div class="item_active">帖子列表</div>
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
              </el-avatar>
            </div>
            <div style="display: flex; flex-direction: column">
              <div
                class="post_title_pc post_plain text-one-line"
                v-if="store.getters.getDeviceType == 1"
              >
                <a href="#" @click="goBlankDetail(item.id)">{{ item.title }}</a>
              </div>
              <div class="post_title_mobile post_plain text-one-line" v-else>
                <a href="#" @click="goBlankDetail(item.id)">{{ item.title }}</a>
              </div>

              <div class="post_list_item_user_desc">
                {{ item.nickname }}&nbsp;&nbsp;<span
                  class="post_list_item_user_desc_time"
                  >发布于{{ item.createTime.split(" ")[0] }}</span
                >
                <!-- {{ item.createTime.split(" ")[0] }} -->
              </div>
            </div>
          </div>
          <div
            class="post_item_option"
            v-if="store.getters.getDeviceType == 1 && isSelf"
          >
            <el-row class="block-col-2">
              <el-col :span="24">
                <span class="demonstration"> </span>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<el-icon><More /></el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item><el-icon><CloseBold /></el-icon>删除帖子</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";

export default defineComponent({
  name: "selfPost",
  props: {
    data: Object,
    isSelf: Boolean,
  },

  setup(props, context) {
    const _router = useRouter();
    const _route = useRoute();
    const goBlankDetail = (pid: string) => {
      const showRightBox = false;
      sessionStorage.setItem("showRightBox", JSON.stringify(showRightBox));
      store.commit("setShowRightBox", showRightBox);
      window.open(`/detail?pid=${pid}`, "_blank");
    };
    return {
      store,
      goBlankDetail,
    };
  },
});
</script>
<style scoped>
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
  position: relative;
}
.post_item_option {
  position: absolute;
  bottom: 5px;
  right: 20px;
  z-index: 10;
  width: 50px;
}
</style>