<template>
  <div class="box_row_left">
    <el-form label-width="120px">
      <el-form-item label="(必 填)原 密 码：">
        <el-input v-model="resetPass.oldPass" />
      </el-form-item>
      <el-form-item label="(必 填)新 密 码：">
        <el-input v-model="resetPass.newPass" />
      </el-form-item>
      <el-form-item label="(必填)确认密码：">
        <el-input v-model="resetPass.checkPass" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="reset"
          >确定修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
import userApi from "@/api/userApi";
import store from "@/store";
import util from "@/utils/util";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "reset",
  props: {
    data: {},
  },
  setup(props, context) {
    const _router = useRouter();
    const _route = useRoute();
    // 数据暂存器
    const resetPass = ref({
      oldPass: "",
      newPass: "",
      checkPass: "",
    });

    // 修改密码
    const reset = () => {
      if (
        !resetPass.value.newPass ||
        !resetPass.value.oldPass ||
        !resetPass.value.checkPass
      ) {
        ElMessage.error("必填项不能为空");
        return;
      }
      if (resetPass.value.newPass !== resetPass.value.checkPass) {
        ElMessage.error("两次新密码不一致");
        return;
      }
      console.log(resetPass.value);
      userApi.reset(resetPass.value).then((res) => {
        userApi.logout().then((res) => {
        store.commit("removeUserInfo");
        util.redirect("index");
        console.log("退出登录");
      });
      });
    };
    return { resetPass, reset };
  },
});
</script>
<style scoped>
</style>