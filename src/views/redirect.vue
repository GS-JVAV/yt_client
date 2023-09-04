<script lang="ts">
import { useRouter, useRoute } from "vue-router";
import store from "../store";

export default {
  setup() {
    const _router = useRouter();
    const _route = useRoute();
    _router.push(store.getters.getToPath);
    return {
      _router
    }
  },
};
</script>