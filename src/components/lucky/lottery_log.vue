<template>
  <div v-if="store.getters.getDeviceType == 1">
    <div class="log_box_pc">
      <div class="tips">
        <el-badge value="中奖记录" class="item"> </el-badge>
      </div>
      <div
        style="width: 300px; margin: auto; overflow: hidden"
        class="box_row_center"
      >
        <div class="log_list_pc">
          <template v-for="(item, index) in log" :key="index">
            <div class="log_item box_row_left text_little_bold">
              <div>{{ item.visualTime }}</div>
              <span class="span_left_margin_10"></span>
              <div class="lottery_winner">{{ item.nickname }}</div>
              <span class="span_left_margin_10">抽中&nbsp;&nbsp;</span>
              <div class="lottery_prizeText">{{ item.prizeText }}</div>
            </div>
          </template>
        </div>
      </div>
      <div
        style="padding-bottom: 20px; padding-top: 5px;"
        class="text_little_bold"
      >
        抽奖记录每5分钟刷新
      </div>
    </div>
    <div class="box_row_center text_little_bold lottery_rule_pc">
      <div class="tips">
        <el-badge value="抽奖规则" class="item"> </el-badge>
      </div>
      <div v-html="rule"></div>
    </div>
  </div>
  <div v-else>
    <div class="log_box_mobile">
      <div class="box_row_center">
        <div class="tips">
          <el-badge value="中奖记录" class="item"> </el-badge>
        </div>
        <div class="log_list_mobile">
          <template v-for="(item, index) in log" :key="index">
            <div class="log_item box_row_left text_little_bold">
              <div>{{ item.visualTime }}</div>
              <span class="span_left_margin_10"></span>
              <div class="lottery_winner">{{ item.nickname }}</div>
              <span class="span_left_margin_10">抽中&nbsp;&nbsp;</span>
              <div class="lottery_prizeText">{{ item.prizeText }}</div>
            </div>
          </template>
        </div>
      </div>
      <div
        style="padding-bottom: 20px; padding-top: 5px;"
        class="text_little_bold"
      >
        抽奖记录每5分钟刷新
      </div>
    </div>
    <div class="box_row_center text_little_bold">
      <div class="lottery_rule_mobile">
        <div class="tips">
          <el-badge value="抽奖规则" class="item"> </el-badge>
        </div>
        <div class="lottery_rule" v-html="rule"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";
import luckyApi from "@/api/luckyApi";
import util from "@/utils/util";
export default defineComponent({
  name: "lottery_log",
  props: {
    data: {},
  },
  components: {},

  setup(props, context) {
    const _router = useRouter();
    const _route = useRoute();
    const log = ref([]);
    const rule = ref(
      "1.全新奖品等你来拿 综合中奖率50% 无门槛兑换 欢迎撸友坚持参与\n2.兑换现金请前往【个人中心】—【积分】—【提现】提现审核后到帐\n3.论坛每次抽奖要10金币 论坛金币通过签到+1 发帖+1 回帖+1 获取\n4.本论坛把最真挚的福利送给大家 希望大家能多多分享论坛 感谢有你\n"
    );
    luckyApi.getLotteryLogInfo().then((res) => {
      let _data = res.data.data;
      _data.forEach((item: any) => {
        item.visualTime = util.time2visualTime(item.regtime);
      });
      log.value = _data;
      console.log(log.value);
    });
    return { store, log, rule };
  },
});
</script>
<style scoped>
.log_box_pc {
  /* width: 300px; */
  position: relative;
  padding-top: 25px;
  /* padding-bottom: 20px; */
  background-color: var(--lightBlue);
  margin-bottom: 30px;
}
.log_list_pc {
  width: 90%;
  height: 200px;
}

.lottery_rule {
  /* width: 90%; */
}
.tips {
  position: absolute;
  top: 2px;
  left: -9px;
}
.lottery_winner {
  color: var(--darkRed);
}
.lottery_prizeText {
  color: var(--darkRed);
}
.lottery_rule_pc {
  width: 400px;
  white-space: pre-wrap;
  text-align: left;
  padding-top: 25px;
  position: relative;
  background-color: var(--lightBlue);
  padding: 25px 100px 25px 100px;
}

.log_box_mobile {
  /* width: 300px; */
  position: relative;
  padding-top: 25px;
  padding-bottom: 20px;
  background-color: var(--lightBlue);
  margin-bottom: 30px;
}
.log_list_mobile {
  width: 270px;
  height: 160px;
  overflow: hidden;
}
.lottery_rule_mobile {
  width: 100%;
  white-space: pre-wrap;
  text-align: left;
  padding-top: 25px;
  padding: 25px 10px 10px 10px;
  position: relative;
  background-color: var(--lightBlue);
}

/* 滚动动画效果 */
.log_item {
  animation: scroll-up 2.8s linear infinite; /* 应用动画效果 */
}

@keyframes scroll-up {
  0% {
    transform: translateY(0); /* 初始位置 */
  }
  100% {
    transform: translateY(-100%); /* 最终位置 */
  }
}
</style>