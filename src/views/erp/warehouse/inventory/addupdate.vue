<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="款号:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="income.clothe_num"
              placeholder="请输入款号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="颜色:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="income.color"
              placeholder="请输入颜色"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="数量:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="income.amount"
              placeholder="请输入数量"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "incomeAddUpdate",
  props: {
    income: {
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    test() {
      console.log(this.income.name);
    },
  },
};
</script>

<style scoped>
</style>