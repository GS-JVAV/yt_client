<template>
  <div v-if="store.getters.getDeviceType == 1">
    <div class="right_box">
      <div
        class="send_post_box box_row_col_center"
        v-if="store.getters.getLoginStatus"
        @click="goBlankPage('sendPost', 'sendPost')"
      >
        <el-button class="send_post_box_button"
          ><el-icon><Edit size="28px" /></el-icon> 发布新帖</el-button
        >
      </div>

      <el-card class="box-card">
        <div>
          <el-avatar
            style="width: 50px; height: 50px"
            :src="nowPlate?.jpg"
          ></el-avatar>
        </div>
        <div style="font-size: 20px; font-weight: bold">
          {{ nowPlate?.name }}
        </div>
        <div
          class="post_list_item_user_desc"
          style="display: block"
          v-if="isIndex"
        >
          版主:{{ nowPlate?.nickname }}
        </div>
        <div class="post_list_item_user_desc" style="display: block" v-else>
          {{ nowPlate?.nickname }}
        </div>
        <el-divider />
        <div style="display: flex; flex-direction: row">
          <div style="display: flex; flex-direction: column; width: 80px">
            <div
              class="post_list_item_user_desc"
              style="display: block"
              v-if="isIndex"
            >
              板块帖子
            </div>
            <div class="post_list_item_user_desc" style="display: block" v-else>
              全站帖子
            </div>
            <div style="font-size: 18px; font-weight: bold">
              {{ nowPlate?.postCount }}
            </div>
          </div>
          <el-divider direction="vertical" />
          <div style="display: flex; flex-direction: column; width: 80px">
            <div class="post_list_item_user_desc" style="display: block">
              今日新增
            </div>
            <div style="font-size: 18px; font-weight: bold">
              {{ nowPlate?.todayCount }}
            </div>
          </div>
        </div>
      </el-card>
      <div class="search_post_box box_row_col_center">
        <el-input
          style="width: 140px"
          v-model="searchText"
          placeholder="关键词"
        ></el-input>
        <el-button
          style="
            width: 60px;
            border-radius: 0;
            background-color: var(--primary);
            color: var(--white);
          "
          @click="search"
          ><el-icon><Search /></el-icon>搜索</el-button
        >
        <div class="days_option_box_pc box_row_col_center">
          <el-tooltip content="每日签到可获得1金币及5经验!">
            <el-button
              class="days_option_button_pc"
              type="success"
              v-if="!checkIn"
              @click="toDayCheckIn"
              ><el-icon><Calendar /></el-icon>今日签到</el-button
            >

            <el-button
              class="days_option_button_pc"
              type="danger"
              disabled
              v-else
              ><el-icon><Calendar /></el-icon>今日已签到</el-button
            >
          </el-tooltip>

          <el-button
            class="days_option_button_pc"
            type="primary"
            @click="goBlankPage('lottery', 'lottery')"
            ><el-icon><Present /></el-icon>抽奖</el-button
          >
        </div>
      </div>
      <!-- <div class="post_hot_box box_row_col_center text_bolder">热榜</div> -->
    </div>
  </div>
  <div v-else>
    <div class="top_box">
      <el-card class="box-card">
        <div style="display: flex; flex-direction: row">
          <div>
            <div>
              <el-avatar
                style="width: 50px; height: 50px"
                :src="nowPlate?.jpg"
              ></el-avatar>
            </div>
            <div style="font-size: 20px; font-weight: bold">
              {{ nowPlate?.name }}
            </div>
            <div
              class="post_list_item_user_desc"
              style="display: block"
              v-if="isIndex"
            >
              版主:{{ nowPlate?.nickname }}
            </div>
            <div class="post_list_item_user_desc" style="display: block" v-else>
              爱党 爱国 爱人民
            </div>
          </div>
          <el-divider direction="vertical" />
          <div>
            <div style="display: flex; flex-direction: row">
              <div style="display: flex; flex-direction: column; width: 80px">
                <div
                  class="post_list_item_user_desc"
                  style="display: block"
                  v-if="isIndex"
                >
                  板块帖子
                </div>
                <div
                  class="post_list_item_user_desc"
                  style="display: block"
                  v-else
                >
                  全站帖子
                </div>
                <div style="font-size: 18px; font-weight: bold">
                  {{ nowPlate?.postCount }}
                </div>
              </div>
              <el-divider direction="vertical" />
              <div style="display: flex; flex-direction: column; width: 80px">
                <div class="post_list_item_user_desc" style="display: block">
                  今日新增
                </div>
                <div style="font-size: 18px; font-weight: bold">
                  {{ nowPlate?.todayCount }}
                </div>
              </div>
              <div
                class="search_post_box box_row_col_center"
                style="margin-top: 60px"
              >
                <el-input
                  style="width: 140px"
                  v-model="searchText"
                  placeholder="关键词"
                ></el-input>
                <el-button
                  style="
                    width: 60px;
                    border-radius: 0;
                    background-color: var(--primary);
                    color: var(--white);
                  "
                  @click="search"
                  >搜索</el-button
                >
                <div class="days_option_box_mobile box_row_col_center">
                  <el-button
                    class="days_option_button_mobile"
                    type="success"
                    v-if="!checkIn"
                    @click="toDayCheckIn"
                    ><el-icon><Calendar /></el-icon>今日签到</el-button
                  >
                  <el-button
                    class="days_option_button_mobile"
                    type="danger"
                    disabled
                    v-else
                    ><el-icon><Calendar /></el-icon>已签到</el-button
                  >
                  <el-button
                    class="days_option_button_mobile"
                    type="primary"
                    @click="goBlankPage('lottery', 'lottery')"
                    ><el-icon><Present /></el-icon>抽奖</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import store from "../store";
import { defineComponent, onMounted, PropType, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import userApi from "@/api/userApi";
import { ElMessage } from "element-plus";
import { AxiosResponse } from "axios";
import auth from "@/utils/auth";

export default defineComponent({
  name: "RightInfoBox",
  props: {
    nowPlate: Object,
  },

  setup(c, x) {
    const _router = useRouter();
    const _route = useRoute();
    const goBlankPage = (url: string, from: any) => {
      if (_route.query.from === from) {
        console.log("same");
      } else {
        // store.commit("setThisPage", from);
        // window.location.href = `/${url}?from=${from}`;
        window.open(`/${url}?from=${from}`, "_blank");
        // _router.push({
        //   path: url,
        //   query: {
        //     from: from,
        //   },
        // });
      }
    };

    const searchText = ref("");
    const search = () => {
      goBlankPage("search", searchText.value);
    };

    let isIndex = _route.fullPath.includes("thream");
    const checkIn = ref(JSON.parse(auth.getCookieAndName("checkIn")));

    interface _res extends AxiosResponse {
      code: number;
      msg: string;
    }

    const toDayCheckIn = () => {
      userApi.todayCheckIn().then((res: AxiosResponse<any, any>) => {
        auth.setCookieAndNameAndTime("checkIn", res.data.data);
        checkIn.value = res.data.data;
        console.log(res);
        if (res.data.code === 200) {
          ElMessage.success(res.data.msg);
        } else {
          ElMessage.error(res.data.msg);
        }
      });
    };

    return {
      store,
      checkIn,
      goBlankPage,
      searchText,
      search,
      isIndex,
      toDayCheckIn,
    };
  },
});
</script>

<style scoped>
.right_box {
  position: absolute;
  right: -210px;
  top: 50px;
  width: 200px;
}
.send_post_box {
  position: absolute;
  /* right: -100px; */
  /* top:20px; */
  /* margin-top: 10px; */
  top: -45px;
  width: 200px;
  height: 38px;
  background-color: var(--custom-self-color-notice);
  color: var(--gray);
  /* border-radius: 5px; */
}
.send_post_box_button {
  background-color: transparent !important;
  border: 0 !important;
  color: var(--gray) !important;
}
.search_post_box {
  position: absolute;
  /* right: -100px; */
  /* top:20px; */
  width: 200px;
  height: 38px;
  /* background-color: var(--custom-self-color-notice); */
  color: var(--gray);
  /* border-radius: 30px; */
}
.days_option_box_pc {
  position: absolute;
  width: 200px;
  height: 38px;
  top: 42px;
}
.days_option_box_mobile {
  position: absolute;
  width: 180px;
  height: 38px;
  top: 75px;
  right: -10px;
}

.days_option_button_pc {
  width: 90px;
}
.days_option_button_mobile {
  width: 75px;
  height: 28px;
}
.post_hot_box {
  position: absolute;
  /* right: -100px; */
  /* top:20px; */
  margin-top: 78px;
  width: 200px;
  height: 38px;
  /* background-color: var(--custom-self-color-notice); */
  /* color: var(--gray); */
}
.lottery-icon {
  width: 100px;
  height: 100px;
  background-color: #ffcc00;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}
</style>