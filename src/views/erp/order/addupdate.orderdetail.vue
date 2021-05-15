<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label="款号:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="detail.clothe_num"
              placeholder="请输入款号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label="数量:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="detail.amount"
              placeholder="请输入数量"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label="颜色:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="detail.color"
              placeholder="请输入颜色"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label="单价:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="detail.price"
              placeholder="请输入单价"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "orderDetailAddUpdate",
  props: {
    detail: {
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    test() {
      console.log(this.detail.name);
    },
  },
};
</script>

<style scoped>
</style>