<template>
  <div class="box_row_center text_bold" v-if="tableData.length < 0">
    暂无提现记录
  </div>
  <div class="box_row_center" v-else>
    <div v-if="isPc">
      <el-table :data="tableData" style="width: 100%" height="300px">
        <el-table-column prop="createTime" label="提现时间" width="160" />
        <el-table-column label="提现地址" width="160">
          <template #default="scope">
            <el-tooltip
              :content="scope.row.account"
              raw-content
              placement="top-start"
              v-if="scope.row.account"
            >
              <span v-if="scope.row.account && scope.row.account.length <= 15">
                {{ scope.row.account }}
              </span>
              <span v-if="scope.row.account && scope.row.account.length > 15">
                {{ scope.row.account.substr(0, 15) + "..." }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="提现姓名" width="120" />
        <el-table-column prop="amount" label="提现积分" width="80" />
        <el-table-column prop="state" label="提现状态" width="80" />
        <!-- <el-table-column prop="updateTime" label="到账时间" width="160" /> -->
        <el-table-column label="备注" width="160">
          <template #default="scope">
            <el-tooltip
              :content="scope.row.tips"
              raw-content
              placement="top-start"
              v-if="scope.row.tips"
            >
              <span v-if="scope.row.tips && scope.row.tips.length <= 15">
                {{ scope.row.tips }}
              </span>
              <span v-if="scope.row.tips && scope.row.tips.length > 15">
                {{ scope.row.tips.substr(0, 15) + "..." }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <div class="text_little_bold">详细信息请在电脑查看</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="提现时间" width="160" />
        <el-table-column prop="amount" label="积分" width="70" />
        <el-table-column prop="state" label="状态" width="70" />
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";
import userApi from "@/api/userApi";
export default defineComponent({
  name: "withdrawLog",
  props: {
    data: {},
    isPc: Boolean,
  },
  components: {},

  setup(props, context) {
    const tableData = ref([]);
    const _router = useRouter();
    const _route = useRoute();

    userApi.getWithDrawLog().then((res) => {
      console.log(res.data);
      tableData.value = res.data.data;
    });

    return { tableData };
  },
});
</script>
<style scoped>
</style>