import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import config from "../utils/config"
import store from "../store"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: ["/index", "/home"],
    name: 'home',
    component: HomeView,
    meta: { title: "阴天论坛【富强，文明，民主，和谐】" },
    redirect: "/index?from=all",
    beforeEnter: (to, from, next) => {
      if (from.path === "/index") {
        console.log("this");
        next("/index?from=all");
      } else {
        next();
      }
    },
    children: [{
      path: "thream",//子路由前不需要加斜杠 /
      name: "postList-bc",
      component: () => import('../views/PostView-bc.vue'),
      props: true,
      meta: { title: "帖子列表" }
    }, {
      path: "index",//子路由前不需要加斜杠 /
      name: "index",
      component: () => import('../views/IndexView.vue'),
      props: true,
      meta: { title: "首页" }
    }, {
      path: "/login",//子路由前不需要加斜杠 /
      name: "login",
      component: () => import('../views/LoginView.vue'),
      props: true,
      meta: { title: "用户登录" }
    }, {
      path: "register",//子路由前不需要加斜杠 /
      name: "register",
      component: () => import('../views/RegisterView.vue'),
      props: true,
      meta: { title: "创建用户" }
    }, {
      path: "detail",//子路由前不需要加斜杠 /
      name: "detail",
      component: () => import('../views/PostDetail.vue'),
      props: true,
      meta: { title: "帖子详情" }
    }, {
      path: "sendPost",//子路由前不需要加斜杠 /
      name: "sendPost",
      component: () => import('../views/SendPost.vue'),
      props: true,
      meta: { title: "发布新帖" }
    },
    {
      path: "search",//子路由前不需要加斜杠 /
      name: "search",
      component: () => import('../views/SearchView.vue'),
      props: true,
      meta: { title: "全站搜索" }
    }, {
      path: "info",//子路由前不需要加斜杠 /
      name: "userInfo",
      component: () => import('../views/UserInfoView.vue'),
      props: true,
      meta: { title: "个人中心" },
    }, {
      path: "userInfo",//子路由前不需要加斜杠 /
      name: "userInfoDetail",
      component: () => import('../views/UserInfoDetailView.vue'),
      props: true,
      meta: { title: "用户详情" },
    }, {
      path: "lottery",//子路由前不需要加斜杠 /
      name: "lottery",
      component: () => import('../views/LotteryView.vue'),
      props: true,
      meta: { title: "抽奖中心" },
    }]
  },
  { path: '/:catchAll(.*)', redirect: '/error' },
  {
    path: '/error',
    name: 'error',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ErrorView.vue')
  },
  {
    path: '/redirect',
    name: 'redirect',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/redirect.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  let title = to.meta.title ? `${to.meta.title} - ${config.baseTitle}` : config.baseTitle;
  window.document.title = title as string;
  next()

})
export default router
