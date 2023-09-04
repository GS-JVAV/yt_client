<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "hotList",
  props: {
    data: {},
  },
  components: {},

  setup(props, context) {
    const _router = useRouter();
    const _route = useRoute();
    return {};
  },
});
</script>
<style scoped>
</style>