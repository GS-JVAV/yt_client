<template>
  <!-- <div
    style="height: 20px; background-color: var(--custom-self-theme-bg-color)"
  ></div>

  <div class="box_row_left" style="border-bottom: 2px solid var(--gray)">
    <div
      class="text_little_bold"
      style="padding: 10px 20px"
      :class="top_options_item_active[3]"
      @click="checkOption(3)"
    >
      头像修改
    </div>
    <div
      class="text_little_bold"
      style="padding: 10px 20px"
      :class="top_options_item_active[4]"
      @click="checkOption(4)"
    >
      密码修改
    </div>
  </div> -->
  <div class="info_right_box_left">
    <div class="info_item">
      <div class="info_item_label">用户名：</div>
      <div class="text_bold box_col_center">{{ info.username }}</div>
    </div>
    <div class="info_item">
      <div class="info_item_label">昵称：</div>
      <div class="text_bold box_col_center">{{ info.nickname }}</div>
    </div>

    <div class="info_item">
      <div class="info_item_label">Email：</div>
      <div class="text_bold box_col_center">{{ info.email }}</div>
    </div>
    <!-- <div class="info_item"><span class="text_bold">用户组:</span>V1</div> -->
    <div class="info_item">
      <div class="info_item_label">注册时间：</div>
      <div class="text_bold box_col_center">
        {{ info.createTime ? info.createTime.split(" ")[0] : "" }}
      </div>
    </div>

    <div class="info_item">
      <div class="info_item_label">帖子数：</div>
      <div class="text_bold box_col_center">{{ info.postCount }}</div>
    </div>
    <!-- <div class="info_item">
      <div class="info_item_label">金币：</div>
      <div class="text_bold box_col_center">{{ info.coin }}</div>
    </div>
    <div class="info_item">
      <div class="info_item_label">积分：</div>
      <div class="text_bold box_col_center">{{ info.money }}</div>
    </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "info",
  props: {
    info: {},
  },

  setup(props, context) {
    const top_options_item_active = ref(["","","","top_options_item_active", ""]);
    const checkOption = (index: number) => {
      // showModule.value = index;
      top_options_item_active.value = ["","","","", ""];
      top_options_item_active.value[index] = "top_options_item_active";
      context.emit("getCheckShowModule",index);
    };
    return { top_options_item_active, checkOption };
  },
});
</script>
<style scoped>
.info_item {
  padding: 5px;
  display: flex;
}
.info_item_label {
  width: 80px;
  text-align: justify;
  text-align-last: justify;
}

.top_options_item_active {
  box-shadow: 0px 2px 0px 0px var(--primary); /* 设置阴影的偏移量和颜色 */
}
</style>