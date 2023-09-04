<template>
  <div>
    <div
      class="box_row_left"
      style="border-bottom: 1px solid var(--gray); margin: 5px 0 10px 0"
    >
      <!-- <div
        class="text_little_bold"
        style="padding: 10px 20px"
        :class="top_options_item_active[0]"
        @click="checkOption(0)"
      >
        详情
      </div> -->
      <div
        class="text_little_bold"
        style="padding: 10px 20px"
        :class="top_options_item_active[1]"
        @click="checkOption(1)"
      >
        提现
      </div>
      <!-- <div
        class="text_little_bold"
        style="padding: 10px 20px"
        :class="top_options_item_active[2]"
        @click="checkOption(2)"
      >
        账户
      </div> -->
      <div
        class="text_little_bold"
        style="padding: 10px 20px"
        :class="top_options_item_active[3]"
        @click="checkOption(3)"
      >
        记录
      </div>
    </div>

    <account v-if="showModule == 1" />
    <withdrawLog v-if="showModule == 3" :isPc="isPc"/>

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";

import account from "./account.vue";
import withdrawLog from "./withdrawLog.vue";
export default defineComponent({
  name: "redeemingPoints",
  props: {
    data: {},
    isPc:Boolean
  },
  components: { account,withdrawLog },

  setup(props, context) {
    const _router = useRouter();
    const _route = useRoute();
    const top_options_item_active = ref([
      "",
      "top_options_item_active",
      "",
      "",
      "",
    ]);
    const showModule = ref(1);
    const checkOption = (index: number) => {
      showModule.value = index;
      top_options_item_active.value = ["", "", "", "", ""];
      top_options_item_active.value[index] = "top_options_item_active";
    };
    return { showModule, checkOption, top_options_item_active };
  },
});
</script>
<style scoped>
.top_options_item_active {
  box-shadow: 0px 2px 0px 0px var(--primary); /* 设置阴影的偏移量和颜色 */
}
</style>