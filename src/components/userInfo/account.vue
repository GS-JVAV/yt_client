<template>
  <div class="">
    <div class="text_bolder">提现说明</div>
    <div
      class="account_rule box_row_center text_little_bold"
      v-html="rule"
    ></div>
  </div>
  <div class="box_row_center">
    <el-form label-width="120px">
      <el-form-item label="(必填)提现账号：">
        <el-input
          class="account_input"
          v-model="account.account"
          placeholder="支付宝账号或USDT地址"
        />
      </el-form-item>
      <el-form-item label="(必填)提现姓名：">
        <el-input
          class="account_input"
          v-model="account.name"
          placeholder="请输入提现姓名"
          maxlength="8"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="(必填)提现金额：">
        <el-input
          class="account_input"
          v-model="account.amount"
          placeholder="请输入提现金额"
        />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="setAccount"
          >提现</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
  <script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
import userApi from "@/api/userApi";

export default defineComponent({
  name: "account",
  props: {
    data: {},
  },
  setup(props, context) {
    const rule = `<p><span style="color: rgb(44, 62, 80); background-color: rgb(255, 255, 255);">积分兑人民币为1比1 最低提现金额为10元!<br>支付宝提现手续费1% USDT提现手续费为1U!<br>手续费是交易所收取 USDT填写</span><span style="color: rgb(225, 60, 57); background-color: rgb(255, 255, 255);">USDT-TRC</span><span style="color: rgb(44, 62, 80); background-color: rgb(255, 255, 255);">地址!<br>提现后24小时内到帐 有问题找客服!<br>一个月只能提现一次 请合理规划好!</span></p>`;
    // 数据暂存器
    const account = ref({
      account: "",
      name: "",
      amount: null,
    });

    // 设置提现账号
    const setAccount = () => {
      if (
        !account.value.account ||
        !account.value.name ||
        !account.value.amount
      ) {
        ElMessage.error("必填项不能为空!");
        return;
      }
      if (account.value.amount < 10) {
        ElMessage.error("提现金额最少为10元!");
        return;
      }
      userApi.withdraw(account.value).then((res: any) => {
        if (res.data.code === 200) {
          ElMessage.success(res.data.msg);
        }
        console.log(res.data);
      });
    };
    return { account, setAccount, rule };
  },
});
</script>
  <style scoped>
.account_rule {
  white-space: normal;
  text-align: left;
  padding: 10px 20px;
}
</style>