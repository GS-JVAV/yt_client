<template>
  <div>
    <div class="statement_box text_little_bold">
        <div v-html="statementText"></div>
    </div>
  </div>
</template>
  <script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "statement",
  props: {
    data: {},
  },
  components: {},

  setup(props, context) {
    const _router = useRouter();
    const _route = useRoute();
    return {
        statementText:'<p><strong>帖子版权声明</strong> </p><p>本站杜绝一切以<u>赌博等非法获利</u>的存在，所有项目均来自<u>互联网转载</u>。收录内容真实性需自行判断，如出现任何问题<u><strong>本站免责</strong></u>。感谢理解！！！</p><p>投稿反馈联系TG：<a href="https://t.me/st806" target="_blank"><span style="color: rgb(54, 88, 226);">https://t.me/st806</span></a> 白菜社区网址：<a href="https://baicaishequ.com" target="_blank"><span style="color: rgb(54, 88, 226);">https://baicaishequ.com</span></a></p>'
    };
  },
});
</script>
  <style scoped>
.statement_box {
  /* width: 100%; */
  margin: 0 auto;
  border: 2px dashed;
  text-align: center;
  background-color: var(--white);
}
</style>