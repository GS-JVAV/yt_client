<template >
  <div class="">
    <div v-if="store.getters.getDeviceType == 1">
      <PCNav></PCNav>
    </div>
    <MobileNav v-else></MobileNav>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import store from "../store";
import { useRouter, useRoute } from "vue-router";
import Footer from "@/components/Footer.vue";
import MobileNav from "@/components/MobileNav.vue";
import PCNav from "@/components/PCNav.vue";

components: {
  Footer;
  MobileNav;
  PCNav;
}
const _router = useRouter();
const _route = useRoute();

// if (_route.query.from == undefined) {
//   _router.push({
//     path: "index",
//     query: {
//       from: "index",
//     },
//   });
// }
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
