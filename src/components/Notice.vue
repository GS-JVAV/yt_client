<template>
  <div style="text-align: left; font-size: 18px">
    <el-card
      class="box-card"
      body-style="background-color:var(--custom-self-color-notice);color:var(--gray);"
    >
      <template #header>
        <div class="card-header">
          <span
            ><el-icon><Bell /></el-icon>板块公告</span
          >
          <!-- <el-button class="button" text>X</el-button> -->
        </div>
      </template>
      <div style="white-space: pre-wrap">
        <div v-html="msg"></div>
        <!-- {{ msg }} -->
      </div>
    </el-card>
  </div>
</template>

  
<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store"
export default defineComponent({
  name: "Notice",
  props: {
    msg: String,
  },
  setup() {
    return;
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
</style>