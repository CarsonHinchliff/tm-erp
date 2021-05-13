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
              v-model="customer.name"
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
              v-model="customer.phone"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label="地址:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="customer.address"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "customerAddUpdate",
  props: {
    customer: {
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    test() {
      console.log(this.customer.name);
    },
  },
};
</script>

<style scoped>
</style>