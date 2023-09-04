<template>
  <div>
    <div
      class="reply_box_button box_row_col_center"
      @click="reply({ nickname: '', prid: 0, prid2: 0, id: 0 })"
      v-if="store.getters.getLoginStatus"
    >
      回帖
    </div>
    <div class="reply_top_title">
      <span>最新回复({{ replyCount }})</span>
      <div class="reply_box box_row_center"></div>
    </div>
    <template v-for="(item, index) in replyDataList" :key="index">
      <div class="reply_item">
        <div class="reply_item_icon">
          <el-avatar
            style="width: 41px; height: 41px"
            src="https://ch33.cc/upload/avatar/000/8521.png?1686625820"
            @click="util.goUserInfoView(item.uid)"
          >
            <!-- {{ item.nickname }} -->
          </el-avatar>
        </div>
        <div class="reply_item_content">
          <div
            class="reply_item_content_info box_col_center post_list_item_user_desc"
          >
            <div>
              @{{ item.nickname }}&nbsp;&nbsp;<span
                class="post_list_item_user_desc_time"
                >{{ item.visualTime }}</span
              >
            </div>
          </div>
          <!-- <div class="reply_item_content_info post_list_item_user_desc_time">
            {{ item.visualTime }}
          </div> -->
          <div
            class="reply_item_content_info_floor post_list_item_user_desc_time"
          >
            {{ item.replyLevel }}楼
          </div>
          <div class="reply_item_content_content">
            <div style="width: 100%" v-html="item.comment"></div>
          </div>
          <div
            class="reply_item_image_scroll_pc"
            v-if="store.getters.getDeviceType == 1"
          >
            <el-row>
              <template
                v-for="(item1, index) in item['visualJpg']"
                :key="index"
              >
                <el-col :span="6">
                  <el-image
                    class="image"
                    :src="item1"
                    fit="contain"
                    :preview-src-list="item.visualJpg"
                  />
                </el-col>
                <el-col v-if="(index + 1) % 3 == 0" :span="6"></el-col>
              </template>
            </el-row>
          </div>
          <div v-else>
            <div
              class="reply_item_image_scroll_mobile"
              v-if="item['visualJpg'] != null"
            >
              <el-scrollbar>
                <div class="reply_item_image_scroll_flex_content">
                  <div
                    v-for="(item1, index) in item['visualJpg']"
                    :key="index"
                    class="reply_item_image_scrollbar_item"
                  >
                    <el-image
                      class="image_reply_mobile"
                      :src="item1"
                      fit="contain"
                      :preview-src-list="item.visualJpg"
                    />
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>

          <div style="margin-top: 20px; height: 30px">
            <div
              class="reply_item_button reply_item_button_like"
              v-if="store.getters.getLoginStatus"
            >
              <el-icon><CaretTop /></el-icon>99赞同
            </div>
            <div class="reply_item_button reply_item_button_like" v-else>
              未登录
            </div>
            <div
              class="reply_item_button reply_item_button_msg"
              @click="openReplyList(index, item.id)"
              :class="
                activeCollapseName.indexOf(item.id) != -1
                  ? 'reply_item_button_msg_active'
                  : null
              "
            >
              <el-icon><ChatSquare /></el-icon>{{ item.replyCount }}条
            </div>
            <div
              class="reply_item_button reply_item_button_send"
              @click="
                reply({
                  nickname: item.nickname,
                  id: item.id,
                  prid: item.id,
                  prid2: item.prid2,
                })
              "
              v-if="store.getters.getLoginStatus"
            >
              回复
            </div>
            <div
              class="reply_item_button reply_item_button_send"
              v-else
              @click="util.goBlankPage('login')"
            >
              未登录
            </div>
          </div>
        </div>
      </div>
      <div
        style="margin-top: 20px"
        v-if="activeCollapseName.indexOf(item.id) != -1"
      >
        <el-collapse
          v-model="activeCollapseName"
          accordion
          @change="handleCollapse"
        >
          <el-collapse-item :name="item.id" disabled>
            <template #title>
              <div>
                <span class="reply_2_title">回复</span
                ><span class="reply_2_desc">({{ item.replyCount }})</span>
              </div>
            </template>
            <div v-if="item.replyCount == 0" style="padding: 30px">
              暂无回复!我来<a
                href="#"
                style="color: var(--primary)"
                @click="
                  reply({
                    nickname: item.nickname,
                    id: item.id,
                    prid: item.id,
                    prid2: item.prid2,
                  })
                "
                >回复</a
              >一句吧
            </div>
            <!-- 帖子回复集合 -->
            <div
              style="
                padding-left: 30px;
                margin-top: 15px;
                border-top: 1px solid var(--border__color);
              "
              v-else
            >
              <template v-for="(item1, index1) in item.reply" :key="index1">
                <div class="reply_item">
                  <div class="reply_item_icon">
                    <el-avatar
                      style="width: 41px; height: 41px"
                      src="https://ch33.cc/upload/avatar/000/8521.png?1686625820"
                      @click="util.goUserInfoView(item1.uid)"
                    >
                      <!-- {{ item.nickname }} -->
                    </el-avatar>
                  </div>
                  <div class="reply_item_content">
                    <div
                      class="reply_item_content_info box_col_center post_list_item_user_desc"
                    >
                      <div>
                        @{{ item1.nickname }}&nbsp;&nbsp;<span
                          v-if="item1.prid2 != 0"
                          >回复&nbsp;&nbsp;@{{ item1.rnickname }}</span
                        >&nbsp;&nbsp;<span
                          class="post_list_item_user_desc_time"
                          >{{ item1.visualTime }}</span
                        >
                      </div>

                      <!-- <div>
                        @{{ item1.nickname }}&nbsp;&nbsp;<span
                          v-if="item1.prid2 != 0"
                          >回复&nbsp;&nbsp;@{{ item1.rnickname }}</span
                        >
                      </div> -->
                    </div>
                    <!-- <div
                      class="reply_item_content_info post_list_item_user_desc_time"
                    >
                      {{ item.visualTime }}
                    </div> -->
                    <div
                      class="reply_item_content_info_floor post_list_item_user_desc_time"
                    >
                      {{ item1.replyLevel }}楼
                    </div>
                    <div class="reply_item_content_content">
                      <div style="width: 100%" v-html="item1.comment"></div>
                    </div>
                    <div
                      class="reply_item_image_scroll_pc"
                      v-if="store.getters.getDeviceType == 1"
                    >
                      <el-row>
                        <template
                          v-for="(item2, index) in item1['visualJpg']"
                          :key="index"
                        >
                          <el-col :span="6">
                            <el-image
                              class="image"
                              :src="item2"
                              fit="contain"
                              :preview-src-list="item1['visualJpg']"
                            />
                          </el-col>
                          <el-col
                            v-if="(index + 1) % 3 == 0"
                            :span="6"
                          ></el-col>
                        </template>
                      </el-row>
                    </div>
                    <div v-else>
                      <div
                        class="reply_item_image_scroll_mobile"
                        v-if="item1['visualJpg'] != null"
                      >
                        <el-scrollbar>
                          <div class="reply_item_image_scroll_flex_content">
                            <div
                              v-for="(item2, index) in item1['visualJpg']"
                              :key="index"
                              class="reply_item_image_scrollbar_item"
                            >
                              <el-image
                                class="image_reply_mobile"
                                :src="item2"
                                fit="contain"
                                :preview-src-list="item1['visualJpg']"
                              />
                            </div>
                          </div>
                        </el-scrollbar>
                      </div>
                    </div>

                    <div style="margin-top: 20px; height: 30px">
                      <div
                        class="reply_item_button reply_item_button_like"
                        v-if="store.getters.getLoginStatus"
                      >
                        <el-icon><CaretTop /></el-icon>9赞同
                      </div>
                      <div
                        class="reply_item_button reply_item_button_like"
                        v-else
                      >
                        未登录
                      </div>
                      <!-- <div
                        class="reply_item_button reply_item_button_msg"
                        @click="openReplyList(item.id)"
                        :class="
                          activeCollapseName.indexOf(item.id) != -1
                            ? 'reply_item_button_msg_active'
                            : null
                        "
                      >
                        <el-icon><ChatSquare /></el-icon>99
                      </div> -->
                      <div
                        class="reply_item_button reply_item_button_send"
                        style="left: 100px"
                        @click="
                          reply({
                            nickname: item1.nickname,
                            id: item1.id,
                            prid: item1.prid,
                            prid2: item1.id,
                          })
                        "
                        v-if="store.getters.getLoginStatus"
                      >
                        回复
                      </div>
                      <div
                        class="reply_item_button reply_item_button_send"
                        v-else
                        @click="util.goBlankPage('login')"
                      >
                        未登录
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <el-button link @click="packUpReplyCollapse(item.id)"
              ><el-icon
                ><DArrowRight style="transform: rotate(-90deg)" /></el-icon
              >收起</el-button
            >
          </el-collapse-item></el-collapse
        >
      </div>
    </template>
  </div>

  <el-drawer
    v-if="replyDrawer"
    v-model="replyDrawerVisible"
    direction="btt"
    size="70%"
    style="background-color: var(--custom-self-theme-color)"
    class="custom-drawer"
    @close="closeDrawer"
  >
    <template #header>
      <div style="color: var(--gray)">{{ replyDrawerTitle }}</div>
    </template>
    <template #default>
      <div>
        <ReplyInput :data="replyData" @SumbitReply="sumbitReply" />
      </div>
    </template>

    <!-- <template #footer>
      <div style="display: flex; flex: auto; justify-content: center">
        <el-row>
          <el-col :span="12">
            <el-button
              style="width: 130px; margin: 0 20px"
              ><el-icon><Select /></el-icon>发布</el-button
            >
          </el-col>
        </el-row>
      </div>
    </template> -->
  </el-drawer>
</template>
  
  <script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import store from "../store";
import ReplyInput from "@/components/ReplyInput.vue";
import replyApi from "@/api/replyApi";
import util from "@/utils/util";
export default defineComponent({
  name: "Reply",
  components: {
    ReplyInput,
  },
  props: {
    pid: { type: Number },
  },
  setup(props, ctx) {
    console.log(props.pid);
    const replyDrawerVisible = ref(false);
    const replyDrawerTitle = ref("");
    const replyData = ref({
      pid: props.pid,
      prid: 0,
      prid2: 0,
    });
    const replyDrawer = ref(false);
    const activeCollapseName = ref([0]);
    const replyDataList = ref([
      {} as {
        comment: "";
        createTime: "";
        replyLevel: 0;
        nickname: "";
        visualTime: "";
        jpg: [];
        visualJpg: [];
        uid: 0;
        prid: 0;
        prid2: 0;
        id: 0;
        hasReply: boolean;
        rnickname: "";
        reply: [
          {
            comment: "";
            createTime: "";
            replyLevel: 0;
            nickname: "";
            visualTime: "";
            jpg: [];
            visualJpg: [];
            uid: 0;
            prid: 0;
            prid2: 0;
            id: 0;
            rnickname: "";
          }
        ];
        replyCount: 0;
      },
    ]);
    const replyDataList2 = ref(
      {} as {
        comment: "";
        createTime: "";
        replyLevel: 0;
        nickname: "";
        visualTime: "";
        jpg: [];
        visualJpg: [];
        uid: 0;
        prid: 0;
        prid2: 0;
        id: 0;
        rnickname: "";
      }
    );
    const replyCount = ref(0);

    /**
     *
     * @param nickname 评论的用户名称
     * @param prid 评论的id 为null则表示回复帖子 否则表示回复评论
     */
    const reply = (item: {
      nickname: string;
      prid: number;
      prid2: number;
      id: number;
    }) => {
      console.log(item);
      replyDrawerVisible.value = true;
      replyDrawer.value = true;
      if (!item.prid) {
        replyDrawerTitle.value = "回帖";
      } else {
        replyDrawerTitle.value = "回复@" + item.nickname;
      }
      replyData.value.prid = item.prid;
      replyData.value.prid2 = item.prid2;

      // ElMessage.error("123");
    };
    const closeDrawer = () => {
      replyDrawer.value = false;
    };

    const getReplyList = () => {
      replyApi
        .getReplyList(replyData.value.pid as number)
        .then((res) => {
          console.log(res);
          replyDataList.value = res.data.data;
          replyDataList.value.forEach((item: any) => {
            item.visualTime = util.time2visualTime(item.createTime);
            item.visualJpg = util.i2a(item.jpg);
          });
          console.log(replyDataList.value);
          replyCount.value = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getReplyList();

    const getReplyReplyList = (index: number, prid: number) => {
      return replyApi
        .getReplyReplyList(prid)
        .then((res) => {
          console.log(res);
          res.data.data.forEach((item: any) => {
            item.visualTime = util.time2visualTime(item.createTime);
            item.visualJpg = util.i2a(item.jpg);
            item.hasReply = false;
          });
          // replyDataList2.value = res.data.data;
          replyDataList.value[index].replyCount = res.data.total;
          replyDataList.value[index].reply = res.data.data;
          replyDataList.value[index].hasReply = true;
          console.log(replyDataList.value);
          return Promise.resolve();
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject();
        });
    };

    // 打开评论区
    const openReplyList = (index: number, prid: number) => {
      if (!replyDataList.value[index].hasReply) {
        getReplyReplyList(index, prid)
          .then(() => {
            let _index = activeCollapseName.value.indexOf(prid);
            if (_index != -1) {
              activeCollapseName.value.splice(_index, 1);
            } else {
              activeCollapseName.value.push(prid);
            }
          })
          .catch(() => {});
      } else {
        let _index = activeCollapseName.value.indexOf(prid);
        if (_index != -1) {
          activeCollapseName.value.splice(_index, 1);
        } else {
          activeCollapseName.value.push(prid);
        }
      }
    };
    // 收起评论区
    const packUpReplyCollapse = (prid: number) => {
      let _index = activeCollapseName.value.indexOf(prid);
      if (_index != -1) {
        activeCollapseName.value.splice(_index, 1);
      } else {
        activeCollapseName.value.push(prid);
      }
    };
    const handleCollapse = (val: string) => {
      console.log(val);
      // activeCollapseName.value = 0;
    };
    const sumbitReply = (isTrue: boolean) => {
      replyDrawer.value = false;
    };
    console.log(replyData.value);
    return {
      store,
      reply,
      replyDrawerVisible,
      replyDrawerTitle,
      test: '<p>模拟 Ajax 异步设置内容<img src="1" alt="1" data-href="1" style="width: 144.89px;height: 139.63px;"/></p>',
      replyData,
      replyDrawer,
      closeDrawer,
      replyDataList,
      replyDataList2,
      replyCount,
      util,
      openReplyList,
      activeCollapseName,
      handleCollapse,
      sumbitReply,
      packUpReplyCollapse,
    };
  },
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reply_top_title {
  display: flex;
  position: relative;
  padding: 10px 5px;
  font-weight: bold;
  border-bottom: 1px solid var(--border__color);
}
.reply_item {
  display: flex;
  flex-direction: row;
  /* height: 51px; */
  border-bottom: 1px solid var(--border__color);
  /* width: 100%; */
  position: relative;
  padding: 5px 0;
  margin-bottom: 20px;
}
/* .reply_item:last-child{
  border-bottom: 0;
} */
.reply_item_icon {
  width: 51px;
  height: 51px;
}

.reply_item_button_like {
  /* position: absolute; */
  left: 10px;
}
.reply_item_button_msg {
  /* position: absolute; */
  left: 100px;
}
.reply_item_button_send {
  /* position: absolute; */
  left: 190px;
}
.reply_item_button {
  position: absolute;
  bottom: 10px;
  padding: 0 7px;
  /* background-color: var(--default__color); */
  border-radius: 30px;
  /* color: var(--white); */
  font-size: 15px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 80px;
}
.reply_item_button:hover {
  /* background-color: var(--default__color); */
  color: var(--primary);
}
.reply_item_button_msg_active {
  color: var(--primary);
}
.reply_item_content {
  display: flex;
  flex-direction: column;
}
.reply_item_content_info {
  display: flex;
  height: 20px;
  padding-left: 10px;
  padding-top: 2.5px;
}

.reply_item_content_info_floor {
  position: absolute;
  right: 5px;
}
.reply_item_content_reply {
  /* position: absolute;
  right: 0;
  bottom: 0; */
  position: relative;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  background-color: var(--custom-self-color-reply);
  padding: 10px;
}

.reply_item_content_reply_user {
  display: flex;
}
.reply_item_content_reply_content {
  display: flex;
  padding-left: 20px;
}
.reply_item_content_content {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  /* width: 90%; */
  padding: 15px 10px 0 10px;
}

.reply_box {
  position: absolute;
  /* padding: 10px; */
  right: 0px;
}
.reply_box_button {
  background-color: var(--default__color);
  width: 100%;
  height: 32px;
  border-radius: 5px;
  margin-top: 15px;
  color: var(--white);
}
.reply_box_button:hover {
  background-color: var(--custom-self-color-notice);
}

.reply_item_image_scroll_pc {
  /* width: 100vh; */
  margin-top: 5px;
  /* border-bottom: 1px solid var(--gray); */
  /* margin-bottom: 20px; */
}
.reply_item_image_scroll_mobile {
  width: 270px;
  margin-top: 5px;
  border: 1px solid var(--gray);
  /* margin-bottom: 20px; */
}

.reply_item_image_scroll_flex_content {
  display: flex;
}
.reply_item_image_scrollbar_item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  /* height: 75px; */
  text-align: center;
  border-radius: 4px;
}

:deep .el-collapse {
  --el-collapse-header-height: 0;
  border-top: 0;
}
:deep .el-collapse-item__arrow {
  display: none;
}

.reply_2_title {
  font-size: 1rem;
  color: var(--black);
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
  padding: 5px;
}
.reply_2_desc {
  font-weight: bolder;
  font-size: 0.8rem;
  color: var(--default__color);
}
</style>