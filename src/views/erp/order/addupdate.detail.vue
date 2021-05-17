<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="款号:"
            class="postInfo-container-item required-star"
          >
            <el-input :class="{'value-required': !detail.clothe_num && isSaveTriggered}"
              v-model="detail.clothe_num"
              placeholder="请输入款号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="数量:"
            class="postInfo-container-item required-star"
          >
            <el-input :class="{'value-required': !detail.amount && detail.amount != 0 && isSaveTriggered}"
              v-model="detail.amount"
              placeholder="请输入数量"
              type="number"
              @keyup.native="intNumber('amount')"
              @change.native="intNumber('amount')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="颜色:"
            class="postInfo-container-item required-star"
          >
            <el-input :class="{'value-required': !detail.color && isSaveTriggered}"
              v-model="detail.color"
              placeholder="请输入颜色"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="单价:"
            type="number"
            class="postInfo-container-item required-star"
          >
            <el-input :class="{'value-required': !detail.price && detail.price != 0 && isSaveTriggered}"
              v-model="detail.price"
              placeholder="请输入单价"
              type="number"
              @keyup.native="intNumber('price')"
              @change.native="intNumber('price')"
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
  name: "orderDetailAddUpdate",
  props: {
    detail: {
      required: true,
    },
  },
  data() {
    return {
      isSaveTriggered: false
    };
  },
  watch: {
    detail: function(oldVal, newVal){
      this.isSaveTriggered = false;
    }
  },
  methods: {
    intNumber(property){
      this.detail[property] = this.limitIntNumber(this.detail[property]);
    },
    limitIntNumber(val){
      if (isNaN(val) || undefined == val || null == val || val === 0 || val === '0' || val === '') {
        return 0;
      } else {
        let value = null;
        value = (val + '').replace(/^(\d+)\.(\d\d).*$/, '$1').replace(/\.$/, '');
        return Number(value);
      }
    },
    dlgSave(){
      this.isSaveTriggered = true;
      var isAllRequiredFieldFilled = true;
      (this.$el.querySelectorAll('.required-star input') || []).forEach(element => {
        if(element.value == '') {
          isAllRequiredFieldFilled = false;
        }
      });

      return isAllRequiredFieldFilled;
    }
  },
};
</script>

<style scoped>
</style>