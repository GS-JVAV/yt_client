<template>
  <div class="lottery_user_box">
    <div class="lottery_user_info text_little_bold">
      <div>
        <el-icon><Coin /></el-icon>金币:<span class="text_bold">{{
          coin
        }}</span>
      </div>
      <div>
        <el-icon><PriceTag /></el-icon>积分:<span class="text_bold">{{
          points
        }}</span>
      </div>
      <el-button type="warning" link @click="util.goBlankPage('info')"
        >去提现-></el-button
      >
    </div>
  </div>

  <div>
    <LuckyWheel
      ref="myLucky"
      width="300"
      height="300"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
    />
    <div
      style="padding-bottom: 20px; padding-top: 5px"
      class="text_little_bold"
    >
      每次消耗10金币,获得5经验
    </div>
  </div>
</template>
  <script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";
import { LuckyWheel } from "@lucky-canvas/vue";

import luckyApi from "@/api/luckyApi";
import userApi from "@/api/userApi";

import util from "@/utils/util";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "lucky",
  props: {
    data: {},
  },
  components: {
    LuckyWheel,
  },
  setup(props, context) {
    const fontColor = "#e4370e";
    const fontTop = "20";
    const fontWeight = "bold";
    const oddPrizeBG = "#e9e8fe";
    const evenPrizeBG = "#b8c5f2";
    const buttonText = ref("开始");
    const _router = useRouter();
    const _route = useRoute();
    const myLucky = ref<{
      play: () => void;
      stop: (index?: number | undefined) => void;
    } | null>(null);
    const blocks = ref([{ padding: "10px", background: "#869cfa" }]);
    interface _prize {
      background: string;
      range: any;
      fonts: {
        text: any;
        top: string;
        fontColor: string;
        fontWeight: string;
      }[];
      id: any;
    }
    const prizes = ref([{} as _prize]);

    const coin = ref(0);
    const points = ref(0);

    const getUserInfo = () => {
      userApi.getUserInfo().then((res) => {
        coin.value = res.data.data.coin;
        points.value = res.data.data.money;
      });
    };
    getUserInfo();

    const winnerMsg = ref("");
    luckyApi.getPrizeInfo().then((res) => {
      prizes.value = [];
      if (Array.isArray(res.data.data)) {
        res.data.data.forEach((item: any) => {
          let prize = {
            background: item.prizePoint % 2 == 0 ? evenPrizeBG : oddPrizeBG,
            range: item.prizeRange,
            fonts: [
              {
                text: item.prizeText,
                top: fontTop,
                fontColor: fontColor,
                fontWeight: fontWeight,
              },
            ],
            id: item.id,
          };
          prizes.value.push(prize);
        });
      }
      console.log(res);
    });

    const buttons = ref([
      { radius: "40%", background: "#617df2" },
      { radius: "35%", background: "#afc8ff" },
      {
        radius: "30%",
        background: "#869cfa",
        pointer: true,
        fonts: [{ text: buttonText, top: "-10px" }],
      },
    ]);

    const startCallback = () => {
      if (coin.value < 10) {
        ElMessage.error("金币不足10个!");
        return;
      }
      if (myLucky.value == null) {
        return;
      }
      // coin.value-=10;
      myLucky.value.play();
      userApi.lottery().then((res) => {
        console.log(res.data);
        setTimeout(() => {
          myLucky.value?.stop(res.data.data.prizePoint);
          winnerMsg.value = res.data.msg;
          getUserInfo();
        }, 3000);
      });
      // setTimeout(() => {
      //   // const index = 0;
      // }, 3000);
    };

    const endCallback = (prize: _prize) => {
      // console.log(prize.id, prize.fonts[0].text);
      // ElMessage.success(prize.fonts[0].text);
      ElMessage.success(winnerMsg.value);
    };
    return {
      myLucky,
      blocks,
      prizes,
      buttons,
      startCallback,
      endCallback,
      coin,
      points,
      util,
    };
  },
});
</script>
  <style scoped>
.lottery_user_box {
  /* position: relative; */
  display: block;
}
.lottery_user_info {
  position: absolute;
  top: -30px;
  right: 10px;
  text-align: left;
}
</style>