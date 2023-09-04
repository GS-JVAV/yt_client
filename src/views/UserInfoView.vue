<template>
  <div class="info_box">
    <div class="info_top_box">
      <div class="lottery_user_box">
        <div class="lottery_user_info text_little_bold">
          <div>
            <el-icon><Coin /></el-icon>金币:<span class="text_bold">{{
              userInfoData.coin
            }}</span>
          </div>
          <div>
            <el-icon><PriceTag /></el-icon>积分:<span class="text_bold">{{
              userInfoData.money
            }}</span>
          </div>
          <el-tooltip content="每月1号更新提现次数">
            <div>
              <el-icon><Key /></el-icon>提现次数:<span class="text_bold">{{
                userInfoData.withdrawCount
              }}</span>
            </div>
          </el-tooltip>

          <el-tooltip content="每日凌晨3点更新发帖次数">
            <div>
              <el-icon><Edit /></el-icon>发帖次数:<span class="text_bold">{{
                userInfoData.sendPostCount
              }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
      <el-image
        :src="userInfoData.jpg"
        style="width: 100px; height: 100px; border-radius: 90%"
      />
      <div>
        <el-badge
          :value="'UID:' + userInfoData.id"
          class="item"
          type="success"
        ></el-badge>
        <el-badge
          :value="userInfoData.roleName + '组'"
          class="item"
          type="warning"
        ></el-badge>
        <el-tooltip
          :content="
            '达到下一等级还需' +
            (userInfoData.nextLevelExperience - userInfoData.experience) +
            '经验'
          "
        >
          <el-badge
            :value="userInfoData.levelName"
            class="item"
            type="danger"
          ></el-badge>
        </el-tooltip>
      </div>
      <!-- <div>{{ userInfo.username }}</div> -->
    </div>
    <div class="info_bottom_box box_row_left">
      <div class="info_left_box" v-if="isPc">
        <div>
          <el-button
            class="info_left_box_button_pc"
            :class="showModuleStyle[0]"
            @click="checkShowModule(0)"
            >基本信息<el-icon><ArrowRightBold /></el-icon
          ></el-button>
        </div>
        <div>
          <el-button
            class="info_left_box_button_pc"
            :class="showModuleStyle[1]"
            @click="checkShowModule(1)"
            >个人发帖<el-icon><ArrowRightBold /></el-icon
          ></el-button>
        </div>
        <div>
          <el-button
            class="info_left_box_button_pc"
            :class="showModuleStyle[2]"
            @click="checkShowModule(2)"
            >积分提现<el-icon><ArrowRightBold /></el-icon
          ></el-button>
        </div>
        <!-- <div>
          <el-button
            class="info_left_box_button_pc"
            :class="showModuleStyle[3]"
            @click="checkShowModule(3)"
            >头像修改<el-icon><ArrowRightBold /></el-icon
          ></el-button>
        </div>
        <div>
          <el-button
            class="info_left_box_button_pc"
            :class="showModuleStyle[4]"
            @click="checkShowModule(4)"
            >密码修改<el-icon><ArrowRightBold /></el-icon
          ></el-button>
        </div> -->
      </div>

      <div :class="getInfoRightBoxClass">
        <div v-if="!isPc">
          <el-button
            class="info_left_box_button_mobile"
            :class="showModuleStyle[0]"
            @click="checkShowModule(0)"
            >基本信息</el-button
          >
          <el-button
            class="info_left_box_button_mobile"
            :class="showModuleStyle[1]"
            @click="checkShowModule(1)"
            >个人发帖</el-button
          >
          <el-button
            class="info_left_box_button_mobile"
            :class="showModuleStyle[2]"
            @click="checkShowModule(2)"
            >积分提现</el-button
          >
          <!-- <el-button
            class="info_left_box_button_mobile"
            :class="showModuleStyle[3]"
            @click="checkShowModule(3)"
            >头像修改</el-button
          >
          <el-button
            class="info_left_box_button_mobile"
            :class="showModuleStyle[4]"
            @click="checkShowModule(4)"
            >密码修改</el-button
          > -->
        </div>
        <div class="view_box">
          <div v-if="true">
            <div v-if="showModule == 0 || showModule == 3 || showModule == 4">
              <div
                class="box_row_left"
                style="
                  border-bottom: 1px solid var(--gray);
                  margin: 5px 0 10px 0;
                "
              >
                <div
                  class="text_little_bold"
                  style="padding: 10px 20px"
                  :class="top_options_item_active[0]"
                  @click="checkOption(0)"
                >
                  个人信息
                </div>
                <div
                  class="text_little_bold"
                  style="padding: 10px 20px"
                  :class="top_options_item_active[3]"
                  @click="checkOption(3)"
                >
                  头像修改
                </div>
                <div
                  class="text_little_bold"
                  style="padding: 10px 20px"
                  :class="top_options_item_active[4]"
                  @click="checkOption(4)"
                >
                  密码修改
                </div>
              </div>
            </div>
          </div>

          <info v-if="showModule == 0" :info="userInfoData" />
          <selfPost v-if="showModule == 1" :data="selfPostList" :is-self="true"/>
          <redeemingPoints v-else-if="showModule == 2" :isPc="isPc" />
          <avatar v-else-if="showModule == 3" />
          <reset v-else-if="showModule == 4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import store from "../store";
import { computed, ref, onBeforeMount } from "vue";
import info from "@/components/userInfo/info.vue";
import reset from "@/components/userInfo/reset.vue";
import selfPost from "@/components/userInfo/selfPost.vue";
import avatar from "@/components/userInfo/avatar.vue";
import redeemingPoints from "@/components/userInfo/redeemingPoints.vue";

import userApi from "@/api/userApi";
const getInfoRightBoxClass = computed(() => {
  return store.getters.getDeviceType == 1
    ? "info_right_box_pc"
    : "info_right_box_mobile";
});

const isPc = computed(() => {
  return store.getters.getDeviceType == 1 ? true : false;
});

const showModule = ref(0);
const showModuleStyle = ref(["button-active", "", "", "", ""]);
const checkShowModule = (index: number) => {
  showModule.value = index;
  showModuleStyle.value = ["", "", "", "", ""];
  showModuleStyle.value[index] = "button-active";
};

const userInfo = store.getters.getUserInfo;
const userInfoData = ref({
  postCount: 0,
  id: -1,
  roleName: "",
  levelName: "",
  experience: 0,
  nextLevelExperience: 99999,
  jpg: "",
  coin: 0,
  money: 0,
  withdrawCount: 0,
  sendPostCount:0
});
const selfPostList = ref({});
// console.log("userInfo",userInfo);

console.log(userInfoData.value);
userApi.getUserInfoDetail().then((res) => {
  userInfoData.value = res.data.data.userInfo;
  userInfoData.value["postCount"] = res.data.data.selfPost.length;
  selfPostList.value = res.data.data.selfPost;
});

const top_options_item_active = ref([
  "top_options_item_active",
  "",
  "",
  "",
  "",
]);
const checkOption = (index: number) => {
  // showModule.value = index;
  checkShowModule(index);
  top_options_item_active.value = ["", "", "", "", ""];
  top_options_item_active.value[index] = "top_options_item_active";
  showModuleStyle.value[0] = "button-active";
};
</script>

<style scoped>
.info_box {
  min-height: 80vh;
  background-color: var(--custom-self-theme-bg-color);
  margin: -10px;
  padding: 20px;
}
.info_top_box {
  height: 150px;
  /* border: 1px solid #000; */
  background-color: var(--white);
  padding: 20px 0 0 0;
}
.info_bottom_box {
  margin-top: 20px;
}
.info_left_box {
  width: 200px;
  /* padding: 10px; */
  /* border: 1px solid #000; */
  /* background-color: var(--white); */
}
.info_right_box_left {
  text-align: left;
  width: 100%;
}
.info_left_box_button_pc {
  border: 0;
  width: 100%;
  border-radius: 0;
  padding: 20px;
}
.info_left_box_button_mobile {
  margin: 0;
  padding: 5px;
  border-radius: 0;
  width: 32%;
}
.info_right_box_mobile {
  width: 100%;
  padding: 5px;
  /* border: 1px solid #000; */
  background-color: var(--white);
  /* margin-left: 20px; */
}
.info_right_box_pc {
  width: 80%;
  padding: 10px;
  /* border: 1px solid #000; */
  background-color: var(--white);
  margin-left: 20px;
}

.el-button:hover {
  background-color: var(--gray);
  color: var(--white);
}

.view_box {
  background-color: var(--white);
}

.top_options_item_active {
  box-shadow: 0px 2px 0px 0px var(--primary); /* 设置阴影的偏移量和颜色 */
}

.lottery_user_box {
  position: relative;
  display: block;
}
.lottery_user_info {
  position: absolute;
  /* top: -30px; */
  right: 10px;
  text-align: left;
}
</style>