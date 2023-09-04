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
          <el-form
            label-position="right"
            label-width="70px"
            :model="formLabelAlign"
            style="max-width: 460px"
          >
            <el-form-item label="邮箱">
              <el-input
                v-model="formLabelAlign.email"
                placeholder="用于找回密码"
              />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input
                v-model="formLabelAlign.username"
                placeholder="登录用户名"
              />
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input v-model="formLabelAlign.password" placeholder="密码" />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="formLabelAlign.cpassword"
                placeholder="确认密码"
              />
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button
                  class="button"
                  type="success"
                  style="width: 100%; margin-bottom: 10px"
                  @click="register"
                  >注册</el-button
                >
              </el-col>
              <el-col :span="24">
                <el-button
                  class="button"
                  type="primary"
                  style="width: 100%"
                  @click="goLogin"
                  >返回登录</el-button
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
import req from "../utils/req";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
const _router = useRouter();
const formLabelAlign = reactive({
  username: "",
  password: "",
  cpassword: "",
  email: "",
});

const register = () => {
  if (formLabelAlign.password == formLabelAlign.cpassword) {
    req
      .post("/user/api/register", formLabelAlign)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }else{
    ElMessage.error('两次输入的密码不一致');
  }
};

const goLogin = () => {
  _router.push({
    path: "login",
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