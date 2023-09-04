<template>
    <div class="footer">
        <el-row>
            <el-col :span="6">
                友情链接:
            </el-col>
            <el-col :offset="12" :span="6" style="text-align:end;">
                <el-button type="primary" link >自助上链</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="1" :span="23">
                <el-button link>暗处</el-button>
                <el-button link>着迷</el-button>
                <el-button link>可惜</el-button>
            </el-col>
        </el-row>
    </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  name: "Footer",
  setup() {
    return {store};
  },
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  width: 100%;
  /* height: 100px; */
  text-align: left;
  font-weight:bolder;
  /* padding: 20px 0; */
  /* margin:20px 0; */
}
</style>