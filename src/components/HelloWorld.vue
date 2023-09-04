<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-col :sm="10" offset="1">
        <el-card class="box-card">
      <template #header>
        <div class="card-header" style="width: 100%">
          <span>板块公告</span>
          <!-- <el-button class="button" text>Operation button</el-button> -->
        </div>
      </template>
      <div class="text item">
        彩虹优质白菜项目发布区 项目仅用作白嫖白已娱乐 项目严禁任何形式的充值
        请遵守各国相关法律规定
      </div>
    </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
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
  width: 480px;
}
</style>