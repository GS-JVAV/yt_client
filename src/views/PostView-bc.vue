

<script lang="ts" setup>
import { onBeforeUpdate, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import store from "../store";

import Notice from "@/components/Notice.vue";
import PostList from "@/components/PostList.vue";
components: {
  Notice;
  PostList;
}
const _route = useRoute();

const thisPage =
  store.getters.getThisPage == ""
    ? (_route.query.from as string)
    : store.getters.getThisPage;
store.commit("setNowPlate", store.getters.getNav.plate[thisPage]);
const nowPlate = store.getters.getNowPlate || null;
// console.log(nowPlate.name);
// onBeforeUpdate(() => {
//   document.title = `${nowPlate.name}`;
// });
const data = {
  notice: nowPlate["notice"].replaceAll("<p>", "").replaceAll("</p>", "\n") || {
    jpg: "",
    name: "阴天论坛",
    nickname: "阴天论坛",
    postCount: "99+",
    todayCount: "99+",
  },
};
</script>
<template>
  <Notice :msg="data.notice"></Notice>
  <div v-if="store.getters.getDeviceType == 1" style="width: 870px">
    <PostList />
  </div>
  <div v-else style="margin-top: 150px">
    <PostList />
  </div>
</template>

<style scoped>
</style>