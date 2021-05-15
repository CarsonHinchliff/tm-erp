<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="姓名:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !customer.name && isSaveTriggered }"
              v-model="customer.name"
              placeholder="请输入姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="电话:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !customer.phone && isSaveTriggered }"
              v-model="customer.phone"
              placeholder="请输入电话"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="地址:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{
                'value-required': !customer.address && isSaveTriggered,
              }"
              v-model="customer.address"
              placeholder="请输入地址"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getCustomer } from '@/api/erp/customer';
export default {
  name: "customerAddUpdate",
  props: {
    customer: {
      required: true,
    },
  },
  data() {
    return {
      isSaveTriggered: false,
    };
  },
  created() {
    this.fetchData(this.customer.id);
  },
  watch: {
    customer: function (newVal, oldVal) {
      this.isSaveTriggered = false;
      if (newVal) {
        this.fetchData(newVal.id);
      }
    },
  },
  methods: {
    fetchData(customerId) {
      if (!customerId) return;

      getCustomer(customerId).then((res) => {
        this.listLoading = true;
        Object.assign(this.customer, res.data);
        this.$forceUpdate();
        this.listLoading = false;
      });
    },
    dlgSave() {
      this.isSaveTriggered = true;
      var isAllRequiredFieldFilled = true;
      (this.$el.querySelectorAll(".required-star input") || []).forEach(
        (element) => {
          if (element.value == "") {
            isAllRequiredFieldFilled = false;
          }
        }
      );

      return isAllRequiredFieldFilled;
    },
  }
};
</script>

<style scoped>
</style>