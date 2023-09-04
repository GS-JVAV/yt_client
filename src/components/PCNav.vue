<template >
  <div
    class="pc"
    style="margin: 0 auto"
    v-show="store.getters.getDeviceType == 1 ? true : false"
  >
    <el-container>
      <el-header style="padding: 0">
        <el-affix :offset="0">
          <div
            style="
              background-color: var(--custom-self-theme-color);
              position: relative;
            "
          >
            <!-- <div @click="kawai" style="position:absolute;z-index:100;right:0;left:0;top:15px;color:var(--gray)" class="post_list_item_user_desc_time">{{ hitokoto.value }} -- {{ hitokoto.from }}</div> -->
            <el-row>
              <el-col :span="21">
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  background-color="var(--custom-self-theme-color)"
                  text-color="#fff"
                  active-text-color="#fff"
                  @select="handleSelect"
                >
                  <div v-for="(item, index) in nav_1.navItem" :key="index">
                    <el-menu-item
                      v-if="Object.keys(item.children).length == 0"
                      :index="'/' + item.url"
                      @click="goPage(item.url, item.from)"
                      >{{ item.name }}</el-menu-item
                    >
                    <el-sub-menu v-else :index="'/' + item.url">
                      <template #title>{{ item.name }}</template>
                      <div
                        v-for="(item1, index1) in item.children"
                        :key="index1"
                      >
                        <el-menu-item
                          :index="'/' + item.url"
                          @click="goPage(item1.url, item1.from)"
                          >{{ item1.name }}</el-menu-item
                        >
                      </div>
                    </el-sub-menu>
                  </div>
                </el-menu>
              </el-col>

              <el-col
                :span="3"
                style="
                  background-color: var(--custom-self-theme-color);
                  border-bottom: solid 1px var(--el-menu-border-color);
                  display: flex;
                  text-align: end;
                  align-items: center;
                  justify-items: center;
                "
              >
                <div v-if="token">
                  <el-dropdown style="color: #fff" split-button type="info">
                    <span>
                      {{ userInfo.nickname }}
                      <!-- <el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon> -->
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="goUserInfoPage('info')"
                          >个人信息</el-dropdown-item
                        >
                        <el-dropdown-item divided @click="logout"
                          >退出登录</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div v-else>
                  <el-button
                    @click="goPage('login', 1)"
                    style="margin-right: 5px"
                    size="small"
                    dark
                    plain
                    >登录</el-button
                  >
                  <el-button
                    @click="goPage('register', 2)"
                    style="margin-right: 5px"
                    size="small"
                    dark
                    plain
                    >注册</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </div>
        </el-affix>
      </el-header>
      <el-container>
        <!-- <el-aside width="200px"></el-aside> -->
        <el-container>
          <el-main style="padding: 3px 0; height: auto">
            <div style="background-color: #fff; padding: 10px">
              <router-view></router-view>
            </div>
          </el-main>
          <el-footer style="padding: 20px 0; margin-bottom: 20px">
            <!-- <el-affix position="bottom" :offset="0"> -->
            <!-- <Footer></Footer> -->
            <!-- </el-affix> -->
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  watch,
  watchEffect,
} from "vue";
import { ref, inject } from "vue";
import store from "../store";
import { ElMessageBox } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import Footer from "@/components/Footer.vue";
import { ArrowDown } from "@element-plus/icons-vue";
import util from "../utils/util";
import axios from "axios";
import userApi from "@/api/userApi";

export default defineComponent({
  name: "PCNav",
  components: {
    Footer,
  },

  setup() {
    // const searchText = ref("");
    let activeIndex = ref(useRoute().path);
    const _router = useRouter();
    const _route = useRoute();
    watchEffect(() => {
      activeIndex.value = _route.path;
    });
    const handleSelect = (key: string, keyPath: string[]) => {
      // console.log(key, keyPath);
    };
    const nav_1 = store.getters.getNav;

    console.log(Object.keys(nav_1.navItem["1"].children).length);

    const dialogVisible = ref(false);

    const reload = inject("reload", Function);
    const showRightBox = reactive({
      showRightBox: store.getters.getShowRightBox,
    });
    watch(
      () => store.getters.getShowRightBox,
      (newValue) => {
        showRightBox.showRightBox = newValue;
        console.log("发生变化", newValue);
      }
    );
    const goPage = (url: string, from: any) => {
      if (_route.query.from === from) {
        console.log("same");
      } else {
        store.commit("setThisPage", from);
        const showRightBox = url.includes("thream");
        sessionStorage.setItem("showRightBox", JSON.stringify(showRightBox));
        store.commit("setShowRightBox", showRightBox);
        if (url.includes("thream")) {
          _router.push({
            path: url,
            query: {
              from: from,
            },
          });
          reload();
        } else {
          window.location.href = `${url}?from=${from}`;
        }
      }
    };
    // 单独前往个人中心
    const goUserInfoPage = (url: string) => {
      window.open(`${url}`, "_blank");
      // _router.push(url);
    };

    const logout = () => {
      userApi.logout().then((res) => {
        store.commit("removeUserInfo");
        util.redirect(_router.currentRoute.value.fullPath);
        console.log("退出登录");
      });
      // _router.go(0);
      // window.location.reload;
      // _router.push("/");
      // util.redirect(_route.path);
    };

    const token = store.getters.getToken == "" ? false : true;
    const userInfo = store.getters.getUserInfo;
    // const userInfo = sessionStorage.getItem("userInfo") || null;
    // console.log("PC token:" + store.getters.getToken);
    // console.log(store.getters.getUserInfo);

    // const search = () => {
    //   goPage("search", searchText.value);
    // };

    let hitokoto = ref({
      value: "",
      from: "",
    });
    let kawai = () => {
      axios
        .get("https://v1.hitokoto.cn/?encode=json&lang=cn")
        .then((res: any) => {
          // ElMessage.info(res.data.hitokoto);
          hitokoto.value.value = res.data.hitokoto;
          hitokoto.value.from = res.data.from;
          return;
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    };
    kawai();
    return {
      store,
      handleSelect,
      _router,
      _route,
      activeIndex,
      nav_1,
      goPage,
      logout,
      dialogVisible,
      token,
      userInfo,
      // searchText,
      // search,
      showRightBox,
      hitokoto,
      kawai,
      goUserInfoPage,
    };
  },
});
</script>

<style scope>
.flex-grow {
  flex-grow: 1;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  /* color: var(--el-color-primary); */
  color: #fff;
  display: flex;
  align-items: center;
}
</style>
