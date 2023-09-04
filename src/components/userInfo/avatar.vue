<template>
  <div class="box_row_left">
    <upload @uploadFileName="getUploadFileName" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import upload from "@/components/Upload.vue";
export default defineComponent({
  name: "avatar",
  props: {
    data: {},
  },
  components: {
    upload,
  },

  setup(props, context) {
    const getUploadFileName = (name: string) => {
      console.log(name);
    };
    return { getUploadFileName };
  },
});
</script>
<style scoped>
</style>