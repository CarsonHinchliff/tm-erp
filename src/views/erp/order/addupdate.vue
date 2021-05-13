<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label="姓名:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="order.name"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label="电话:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="order.phone"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getOrder } from '@/api/erp/order'
export default {
  name: "orderAddUpdate",
  props: {
    order: {
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    this.fetchData(this.order.orderId);
  },
  watch: {
    order(newVal, oldVal) {
      if (newVal) {
        this.fetchData(newVal.orderId);
      }
    }
  },
  mounted(){

  },
  methods: {
    fetchData(orderId){
      if (!orderId) return;

      getOrder(orderId).then((res) => {
        Object.assign(this.order, res.data);
        console.log(this.order);
        this.$forceUpdate();
      });
    }
  },
};
</script>

<style scoped>
</style>