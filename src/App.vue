<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">关于</router-link>|
    <router-link to="/view-2">白菜</router-link>|
    <router-link to="/view-3">交流</router-link>|
  </nav> -->
  <!-- <nav>
  <el-tabs type="border-card">
    <el-tab-pane label="User">User    </el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>
</nav> -->
  <div id="yt_app" style="background-color: #f5f5f5; height: 100%">
    <el-scrollbar :height="Device.window.height">
      <router-view v-if="viewIsReload" />
    </el-scrollbar>
    <!-- <RouterView/> -->
  </div>
</template>

<script lang="ts" setup>
import useStore from "vuex";
import { nextTick, onMounted, provide } from "vue";
import { ref } from "vue";
import store from "./store";
import { useRoute, useRouter } from "vue-router";
import { RouterView } from "vue-router";
import auth from "./utils/auth";
import { ElMessageBox } from "element-plus";

import menusApi from "@/api/menusApi";
import stateApi from "@/api/stateApi";

const Device = { pc: 1, mobile: 2 ,window:{width:window.innerWidth,height:window.innerHeight}};

function setDeviceClass() {
  store.commit(
    "updateDeviceType",
    window.innerWidth >= 768 ? Device.pc : Device.mobile
  );
}

// const deviceType = ref(useStore().deviceClass);
onMounted(() => {
  setDeviceClass();
  window.addEventListener("resize", () => {
    // console.log(store.getters.getDeviceType);
    setDeviceClass();
  });
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem(
      "userInfo",
      JSON.stringify(store.getters.getUserInfo)
    );
  });
});

const _route = useRoute();
const _router = useRouter();

const viewIsReload = ref(true);
const reload = () => {
  viewIsReload.value = false;
  nextTick(() => {
    viewIsReload.value = true;
  });
};

provide("reload", reload);

menusApi
  .getMenus()
  .then((res) => {
    store.commit("setNavItem", res);
  })
  .catch((err) => {
    console.log(err);
  });

menusApi
  .getPlate()
  .then((res) => {
    store.commit("setPlate", res);
    // console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
// console.log(sessionStorage.getItem("isShowMessageBox"));
// console.log(_route.fullPath);

// if (_route.fullPath == "/") {
//   _router.push("/index");
// }
if (!sessionStorage.getItem("isShowMessageBox")) {
  ElMessageBox.confirm("QQ群3838438", "通知", {
    confirmButtonText: "一键加群",
    cancelButtonText: "知道了",
    type: "warning",
  })
    .then(() => {
      // ElMessage({
      //   type: 'success',
      //   message: 'Delete completed',
      // })
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Delete canceled',
      // })
    });
  // 弹窗是否已展示
  sessionStorage.setItem("isShowMessageBox", "true");
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;

}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

/* nav {
  padding: 30px;
} */
</style>
