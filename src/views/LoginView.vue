<template>
  <div class="app">
    <div class="login_box">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>用户登录</span>
            <!-- <el-button class="button" text>X</el-button> -->
          </div>
        </template>
        <div style="white-space: pre-wrap">
          <div class="">
            <el-form
              label-position="right"
              label-width="60px"
              :model="formLabelAlign"
            >
              <el-form-item label="用户名">
                <el-input
                  v-model="formLabelAlign.username"
                  placeholder="登录用户名"
                />
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  v-model="formLabelAlign.password"
                  placeholder="登录密码"
                />
              </el-form-item>
            </el-form>
          </div>

          <div style="text-align: center">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button
                  class="button"
                  type="success"
                  style="width: 100%; margin-bottom: 10px"
                  @click="login"
                  >登录</el-button
                >
              </el-col>
              <el-col :span="12">
                <el-button
                  class="button"
                  type="primary"
                  style="width: 100%"
                  @click="goRegister"
                  >去注册</el-button
                >
              </el-col>
              <el-col :span="12">
                <el-button
                  class="button"
                  type="danger"
                  style="width: 100%"
                  @click="rePassword"
                  >忘记密码</el-button
                >
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
  <script lang="ts" setup>
import store from "@/store";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter,useRoute } from "vue-router";

import req from "../utils/req";
const _router = useRouter();
const _route = useRoute();

const formLabelAlign = reactive({
  username: "1",
  password: "1",
});

const login = () => {
  if (!formLabelAlign.password || !formLabelAlign.username) {
    ElMessage.error("账号密码不能为空!");
    return;
  }
  console.log(formLabelAlign);
  // store.commit("setToPath",_route.fullPath);
  // console.log(_router.getRoutes())
  req
    .post("/user/api/login", formLabelAlign)
    .then((res) => {
      ElMessage.success("登录成功!");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const goRegister = () => {
  _router.push({
    path: "register",
  });
};

const rePassword = () => {
  _router.push({
    path: "rePassword",
  });
};
</script>
  
  <style scoped>
.app {
  width: 100%;
}
.login_box {
  width: 300px;
  padding: 20px;
  margin: 0 auto;
  text-align: left;
  height: 78vh;
}
</style>