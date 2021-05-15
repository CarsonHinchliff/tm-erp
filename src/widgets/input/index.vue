<template>
<div class="input-container">
  <el-input
    model="model"
    :placeholder="placeholder"
  ></el-input>
</div>
</template>

<script>
export default {
  model: {
    prop: "model",
    event: "change",
  },
  props: {
    model: String,
    placeholder: String
  },
  watch: {
    model(val) {
      this.$emit("change", val);
    },
  },
};
</script>

<style>
</style>