<template>
  
  <div style="padding-top: 20px; height: 80vh">
    <div class="box_row_center" style="position: relative;">
      <luckyVue />
    </div>
    <div class="box_row_center">
      <lotteryLog />
    </div>
  </div>
</template>

<script lang="ts" setup>
import luckyVue from "@/components/lucky/lottery.vue";
import lotteryLog from "@/components/lucky/lottery_log.vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const _router = useRouter();
const _route = useRoute();


const setUserInfo = ()=>{

}
</script>

<style scoped>
</style>