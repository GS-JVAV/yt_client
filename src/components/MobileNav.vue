<template >
  <div
    class="mobile"
    v-show="!(store.getters.getDeviceType == 1 ? true : false)"
  >
    <el-container>
      <el-header style="padding: 0; height: auto">
        <el-affix :offset="0">
          <div style="background-color: #6b6d71; width: 100%">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              :ellipsis="false"
              background-color="#6b6d71"
              text-color="#fff"
              active-text-color="#fff"
              @select="handleSelect"
            >
              <el-menu-item index="0">
                <div>
                  <el-icon size="28px"
                    ><Menu @click="drawerVisible = true"
                  /></el-icon>
                </div>
              </el-menu-item>
              <div class="flex-grow" />
              <div v-if="token">
                <!-- <el-sub-menu index="3">
                  <template #title>{{ userInfo.nickname }}</template>
                  <el-menu-item index="2-3" @click="logout"
                    ><el-icon><Avatar /></el-icon>个人信息</el-menu-item
                  >
                  <el-menu-item index="2-4" @click="logout"
                    ><el-icon><Close /></el-icon>退出登录</el-menu-item
                  >
                </el-sub-menu> -->
                <!-- 发帖 -->
                <el-menu-item @click="goBlankPage('sendPost', 'sendPost')">
                  <el-icon><Edit size="28px" /></el-icon>
                </el-menu-item>
              </div>
              <div v-else>
                <el-menu-item index="3">
                  <div>
                    <el-icon><Avatar @click="goPage('login', 1)" /></el-icon>
                  </div>
                </el-menu-item>
                <!-- <el-sub-menu index="3">
                <template #title
                  ><el-icon><Avatar /></el-icon
                ></template>
                <el-menu-item index="2-1" @click="goPage('login', null)"
                  ><el-icon><Select /></el-icon>登录</el-menu-item
                >
                <el-menu-item index="2-2" @click="goPage('register', null)"
                  ><el-icon><Plus /></el-icon>注册</el-menu-item
                >
              </el-sub-menu> -->
              </div>
            </el-menu>
          </div>
          <!-- <div class="top_box" style="" v-if="showRightBox.showRightBox">
            <el-card class="box-card">
              <div style="display: flex; flex-direction: row">
                <div>
                  <div>
                    <el-avatar
                      style="width: 50px; height: 50px"
                      src="https://ch33.cc/upload/avatar/000/8521.png?1686625820"
                    ></el-avatar>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">白菜</div>
                  <div class="post_list_item_user_desc" style="display: block">
                    论坛版主:孤殇
                  </div>
                </div>
                <el-divider direction="vertical" />
                <div>
                  <div style="display: flex; flex-direction: row">
                    <div
                      style="display: flex; flex-direction: column; width: 80px"
                    >
                      <div
                        class="post_list_item_user_desc"
                        style="display: block"
                      >
                        板块帖子
                      </div>
                      <div style="font-size: 18px; font-weight: bold">1000</div>
                    </div>
                    <el-divider direction="vertical" />
                    <div
                      style="display: flex; flex-direction: column; width: 80px"
                    >
                      <div
                        class="post_list_item_user_desc"
                        style="display: block"
                      >
                        今日新增
                      </div>
                      <div style="font-size: 18px; font-weight: bold">1000</div>
                    </div>
                    <div class="search_post_box box_row_col_center">
                      <el-input
                        style="width: 140px"
                        v-model="searchText"
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
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div> -->
        </el-affix>
        <div
          class="box_row_left"
          style="padding-left: 10px; padding-top: 5px"
          v-if="showClass"
        >
          <div v-for="(item, index) in nav_1.navItem" :key="index">
            <!--  
              v-if="index != 1"
            -->
            <el-button
              style="margin-right: 5px"
              :class="isActive(item.from)"
              @click="goPage(item.url, item.from)"
            >
              {{ item.name }}
            </el-button>
          </div>
        </div>
      </el-header>
      <!-- <div style="padding: 0">
        <el-row>
          <template v-for="(item, index) in nav_1.navItem" :key="index">
            <el-col :span="12">
              <el-button
                v-if="index != 1 && Object.keys(item.children).length == 0"
                @click="goPage(item.url, item.from)"
                style="margin-right: 5px"
                >{{ item.name }}</el-button
              >
              <el-button
                v-else-if="index != 1 && Object.keys(item.children).length != 0"
                @click="dialogClassButton(item)"
                style="margin-right: 5px"
                >{{ item.name }}</el-button
              >
            </el-col>
          </template>
        </el-row>
      </div> -->
      <el-container>
        <!-- <el-aside width="200px"></el-aside> -->
        <el-container>
          <el-main style="padding: 3px 0; height: auto">
            <div style="margin-top: 0px; background-color: #fff; padding: 10px">
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

  <el-dialog v-model="dialogVisible" title="分类" width="80%">
    <span>
      <el-row>
        <div v-for="(item, index) in nav_1.navItem" :key="index">
          <el-col :span="8" v-if="index != 1">
            <el-button @click="goPage(item.url, item.from)" size="large">{{
              item.name
            }}</el-button>
          </el-col>
        </div>
      </el-row>
    </span>
  </el-dialog>

  <el-dialog v-model="dialogVisible1" :title="dialogClass.title" width="80%">
    <span>
      <el-row>
        <div v-for="(item, index) in dialogClass.navItem" :key="index">
          <el-col :span="8">
            <el-button @click="goPage(item.url, item.from)" size="large">{{
              item.name
            }}</el-button>
          </el-col>
        </div>
      </el-row>
    </span>
  </el-dialog>

  <el-drawer
    v-model="drawerVisible"
    direction="ttb"
    size="80%"
    style="background-color: var(--custom-self-theme-color)"
    class="custom_drawer"
  >
    <template #header>
      <div style="color: var(--gray)">
        <h4>阴天论坛</h4>
        <div @click="kawai">{{ hitokoto.value }} -- {{ hitokoto.from }}</div>
      </div>
    </template>
    <template #default>
      <div>
        <el-card class="custom-box-card" shadow="never">
          <div class="card-header">导航</div>
          <el-divider />

          <el-row>
            <template v-for="(item, index) in nav_1.navItem" :key="index">
              <el-col :span="12" v-if="index == 1">
                <el-button
                  @click="goPage(item.url, item.from)"
                  size="large"
                  class="card-button"
                  style="width: 80%; margin: 3px 0"
                  >{{ item.name }}</el-button
                >
              </el-col>
            </template>
            <el-col :span="12">
              <el-button
                @click="goBlankPage('search', '')"
                size="large"
                class="card-button"
                style="width: 80%; margin: 3px 0"
                >搜索</el-button
              >
            </el-col>
            <el-col :span="12">
              <el-button
                @click="goBlankPage('search', '')"
                size="large"
                class="card-button"
                style="width: 80%; margin: 3px 0"
                ><el-icon><PhoneFilled /></el-icon>广告合作</el-button
              >
            </el-col>
          </el-row>
        </el-card>

        <el-card class="custom-box-card" shadow="never">
          <div class="card-header">分类</div>
          <el-divider />

          <el-row>
            <template v-for="(item, index) in nav_1.navItem" :key="index">
              <el-col :span="12" v-if="index != 1">
                <el-button
                  @click="goPage(item.url, item.from)"
                  size="large"
                  class="card-button"
                  >{{ item.name }}</el-button
                >
              </el-col>
            </template>
          </el-row>
        </el-card>
        <el-card class="custom-box-card" shadow="never">
          <div class="card-header">工具</div>
          <el-divider />
          <el-row>
            <template v-for="(item, index) in nav_1.navItem" :key="index">
              <el-col :span="12" v-if="index != 1">
                <el-button
                  @click="goPage(item.url, item.from)"
                  size="large"
                  class="card-button"
                  >{{ item.name }}</el-button
                >
              </el-col>
            </template>
          </el-row>
        </el-card>
      </div>
    </template>

    <template #footer v-if="!store.getters.getLoginStatus">
      <div style="display: flex; flex: auto; justify-content: center">
        <el-row>
          <el-col :span="12">
            <el-button
              @click="goPage('login', 1)"
              style="width: 130px; margin: 0 20px"
              ><el-icon><Select /></el-icon>登录</el-button
            >
          </el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              @click="goPage('register', 2)"
              style="width: 130px"
              ><el-icon><Plus /></el-icon>注册</el-button
            >
          </el-col>
        </el-row>
      </div>
    </template>
    <template #footer v-else>
      <div style="display: flex; flex: auto; justify-content: center">
        <el-row>
          <el-col :span="12">
            <el-button
              style="width: 140px; margin: 0 20px"
              @click="goUserInfoPage('info')"
              ><el-avatar
                style="width: 18px; height: 18px"
                src="https://ch33.cc/upload/avatar/000/8521.png?1686625820"
              ></el-avatar
              >{{ userInfo.nickname }}</el-button
            >
          </el-col>
          <el-col :span="12">
            <el-button type="danger" @click="logout" style="width: 140px"
              ><el-icon><Close /></el-icon>退出登录</el-button
            >
          </el-col>
        </el-row>
      </div>
    </template>
  </el-drawer>
</template>


<script lang="ts">
import { defineComponent, ref, inject, reactive, watch } from "vue";
import store from "../store";
import { ElMessageBox } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import Footer from "@/components/Footer.vue";
import util from "../utils/util";
import axios from "axios";
import userApi from "@/api/userApi";

export default defineComponent({
  name: "MobileNav",
  components: {
    Footer,
  },

  setup() {
    // const searchText = ref("");

    let activeIndex = ref("1");
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const nav_1 = store.getters.getNav;
    const _router = useRouter();
    const _route = useRoute();

    const dialogVisible = ref(false);
    const dialogVisible1 = ref(false);
    const drawerVisible = ref(false);
    const dialogClass = reactive({
      title: "",
      navItem: {} as any,
    });

    const dialogClassButton = (data: any) => {
      dialogClass.title = data.name;
      dialogClass.navItem = data.children;
      dialogVisible1.value = true;
    };
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
    watch(
      () => _route.fullPath,
      (newValue) => {
        drawerVisible.value = false;
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
          drawerVisible.value = false;
          reload();
        } else {
          window.location.href = `${url}?from=${from}`;
        }
      }
    };
    // 新打开页面
    const goBlankPage = (url: string, from: any) => {
      if (_route.query.from === from) {
        console.log("same");
      } else {
        window.open(`/${url}?from=${from}`, "_blank");
      }
    };

    // 单独前往个人中心
    const goUserInfoPage = (url: string) => {
      _router.push({
        path: url,
      });
    };

    const logout = () => {
      userApi.logout().then((res) => {
        store.commit("removeUserInfo");
        util.redirect(_router.currentRoute.value.fullPath);
        console.log("退出登录");
      });
    };

    // console.log(_router.currentRoute.value.fullPath);

    const token = ref(false);
    token.value = store.getters.getToken == "" ? false : true;
    const userInfo = ref(store.getters.getUserInfo);

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

    const isActive = (name: string) => {
      if (_route.query.from == name) {
        return "button-active";
      }
    };

    let showClass =
      _route.fullPath.includes("thream") || _route.fullPath.includes("index");

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
      dialogVisible1,
      drawerVisible,
      dialogClass,
      dialogClassButton,
      token,
      userInfo,
      // searchText,
      // search,
      showRightBox,
      goBlankPage,
      hitokoto,
      kawai,
      isActive,
      showClass,
      goUserInfoPage,
    };
  },
});
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

.custom-box-card {
  width: 100%;
  border: 0px;
  background-color: var(--custom-self-theme-color) !important;
  color: var(--gray) !important;
  border: 0 !important;
}
.card-button {
  width: 80%;
  margin: 3px 0;
  background-color: var(--custom-self-color-notice) !important;
  color: var(--gray) !important;
  border: 0 !important;
}
/* .is_active {
  background-color: var(--custom-self-color-notice) !important;
  color: var(--gray) !important;
  border: 0 !important;
} */
.card-header {
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.top_box {
  position: absolute;
  /* right: -200px; */
  top: 0px;
  /* width: 200px;
   */
  top: -140px;
  width: 100%;
  height: 150px;
}
.custom_drawer :deep(.el-drawer__header) {
  margin-bottom: 0;
}
</style>
