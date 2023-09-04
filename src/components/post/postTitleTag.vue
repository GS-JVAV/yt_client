<template>
  <span class="post_item_tag">
    <el-tag type="success" class="mx-1" effect="dark" v-if="isTop == 1"
      >置顶</el-tag
    >
  </span>
  <span class="post_item_tag" v-if="weight > 0 && weight <=5">
    <el-tag type="warning" class="mx-1" effect="dark">精帖</el-tag>

  </span>
  <span class="post_item_tag" v-else-if="weight > 5">
    <el-tag type="danger" class="mx-1" effect="dark">热帖</el-tag>
  </span>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "postTitleTag",
  props: {
    isTop: Number,
    weight: Number,
  },
  setup(props, context) {
    return {};
  },
});
</script>
<style scoped>
.post_item_tag {
  margin-right: 5px;
}
</style>