<template>
  <div class="about">
    <el-row> </el-row>
    <div class="carousel">
      <el-carousel
        :interval="config.carousel.interval"
        height="300px"
        :direction="config.carousel.direction"
        :autoplay="config.carousel.autoplay"
      >
        <el-carousel-item v-for="item in 4" :key="item">
          <!-- <h3 text="2xl" justify="center"> -->
            <el-image
              style="width: 100%; height: 300px;"
              :src="config.image.src"
              :fit="config.image.fit"
              @click="
                goPage(
                  'https://element-plus.org/zh-CN/component/icon.html#icon-collection',
                  null
                )
              "
            />
          <!-- </h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-if="store.getters.getDeviceType == 1" style="width:870px">
      <PostList />
    </div>
    <div v-else style="margin-top: 150px">
      <PostList />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import MobileNav from "@/components/MobileNav.vue";
import PCNav from "@/components/PCNav.vue";
import Footer from "@/components/Footer.vue";
import store from "../store";
import { useRouter, useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
components: {
  Footer;
  MobileNav;
  PCNav;
  PostList;
}
const config = {
  carousel: {
    interval: 5000,
    direction: "horizontal",//vertical horizontal
    autoplay: true,
  },
  image: {
    src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    fit: "contain",
  },
};
const _router = useRouter();
const _route = useRoute();
const goPage = (url: string, from: any) => {
  window.open(url, "_blank");
};


</script>

<style scoped>
.carousel{

}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>