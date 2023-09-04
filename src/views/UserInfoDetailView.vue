<template>
  <div class="info_box">
    <div class="info_top_box">
      <el-image
        :src="userInfoData.jpg"
        style="width: 100px; height: 100px; border-radius: 90%"
      />
      <div>
        <el-badge :value="'UID:' + userInfoData.id" class="item" type="success"></el-badge>
        <el-badge
          :value="userInfoData.roleName + '组'"
          class="item"
          type="warning"
        ></el-badge>
        <el-badge
          :value="userInfoData.levelName"
          class="item"
          type="danger"
        ></el-badge>
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
          <div
            style="
              margin-top: 5px;
              padding-top: 10px;
              border-top: 1px solid var(--gray);
            "
          ></div>
        </div>
        <div class="box_row_left">
          <info v-if="showModule == 0" :info="userInfoData" />
          <selfPost v-if="showModule == 1" :data="selfPostList" :is-self="false"/>
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
import userApi from "@/api/userApi";
import { useRoute } from "vue-router";

const _route = useRoute();

let uid = parseInt(_route.query["uid"] as string);

const getInfoRightBoxClass = computed(() => {
  return store.getters.getDeviceType == 1
    ? "info_right_box_pc"
    : "info_right_box_mobile";
});

const isPc = computed(() => {
  return store.getters.getDeviceType == 1 ? true : false;
});

const showModule = ref(0);
const showModuleStyle = ref(["button-active", ""]);
const checkShowModule = (index: number) => {
  showModule.value = index;
  showModuleStyle.value = ["", ""];
  showModuleStyle.value[index] = "button-active";
};

const userInfo = ref({});
const userInfoData = ref({
  postCount: 0,
  id: -1,
  roleName: "",
  levelName:"",
  jpg: "",
});
const selfPostList = ref({});
userApi.getUserInfoByUid(uid).then((res) => {
  document.title = `${res.data.data.userInfo.nickname}的个人中心`;
  userInfoData.value = res.data.data.userInfo;
  userInfoData.value["postCount"] = res.data.data.selfPost.length;
  selfPostList.value = res.data.data.selfPost;
});
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
  width: 48%;
}
.info_right_box_mobile {
  width: 100%;
  padding: 10px;
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
</style>