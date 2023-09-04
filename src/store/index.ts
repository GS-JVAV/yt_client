import { ElMessage } from 'element-plus';
import { createStore } from 'vuex'
import auth from "../utils/auth"

export default createStore({
  state: {
    deviceType: 1,
    notice: "",
    token: auth.getCookie() || "",
    userInfo: JSON.parse(JSON.parse(decodeURIComponent(auth.getCookieAndName("userInfo") as string))) ||JSON.parse(sessionStorage.getItem("userInfo") as string) ||  {},
    nav: {
      navItem: {
        1: { name: "首页", url: "index", from: "all", children: {} },
        3: { name: "白菜", url: "thream", from: "bc", children: {} },
        4: { name: "首存", url: "thream", from: "sc", children: {} },
        5: { name: "交流", url: "thream", from: "jl", children: {} },
        6: { name: "工具", url: "thream", from: "gj", children: {} },
        7: { name: "合集", url: "thream", from: "hj", children: { 1: { name: "羊毛", url: "thream", from: "ym" } } }
      },
      plate: {},
      dark: true,
      plain: false,
    },
    nowPlate: {jpg:""},
    thisPage: "",
    loginStatus: !(!auth.getCookieAndName("userInfo")),
    toPath: "",
    showRightBox: JSON.parse(sessionStorage.getItem("showRightBox") as string) || false, //是否显示右边box
    post:{
      title_class:["post_plain","post_top","post_good","post_hot"]
    }
  },
  getters: {
    getDeviceType: (state) => state.deviceType,
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
    getNav: (state) => state.nav,
    getNowPlate: (state) => state.nowPlate,
    getThisPage: (state) => state.thisPage,
    getToPath: (state) => state.toPath,
    getLoginStatus: (state) => state.loginStatus,
    getShowRightBox: (state) => state.showRightBox,
    getPost:(state)=>state.post
  },
  mutations: {
    setNowPlate(state, value) {
      state.nowPlate = value;
    },
    setNavItem(state, value) {
      state.nav.navItem = value;
    },
    setPlate(state, value) {
      state.nav.plate = value;
    },
    setShowRightBox(state, showRightBox) {
      state.showRightBox = showRightBox;
    },
    setToPath(state, toPath) {
      state.toPath = toPath;
    },
    setThisPage(state, page) {
      state.thisPage = page;
    },
    updateDeviceType(state, type) {
      state.deviceType = type;
    },
    // 设置token到store和cookie
    setToken(state, token) {
      state.token = token;
      auth.setCookie(token);
    },
    // 设置登录用户数据到store
    setUserInfo(state, info) {
      state.userInfo = info;
      auth.setCookieAndName("userInfo", JSON.stringify(JSON.stringify(info)));
      state.loginStatus = true;
    },
    // 登录用户退出登录
    removeUserInfo(state) {
      state.loginStatus = false;
      state.userInfo = {};
      state.token = '';
      sessionStorage.removeItem("userInfo");
      auth.removeCookieAndName("userInfo");
      auth.removeCookie();
      ElMessage.error("注销成功");
    }

  },
  actions: {
  },
  modules: {
  }
})
