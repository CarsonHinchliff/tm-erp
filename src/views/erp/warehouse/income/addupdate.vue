<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="入库日期:"
            class="postInfo-container-item required-star"
          >
            <el-date-picker
              :class="{ 'value-required': !income.date && isSaveTriggered }"
              class="full-width"
              v-model="income.date"
              type="date"
              placeholder="订单日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="包号:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !income.bag_num && isSaveTriggered }"
              v-model="income.bag_num"
              placeholder="请输入包号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="款号:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{
                'value-required': !income.clothe_num && isSaveTriggered,
              }"
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
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !income.color && isSaveTriggered }"
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
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !income.amount && isSaveTriggered }"
              v-model="income.amount"
              placeholder="请输入数量"
              type="number"
              @keyup.native="intNumber('amount')"
              @change.native="intNumber('amount')"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getIncome } from "@/api/erp/warehouse";
export default {
  name: "incomeAddUpdate",
  props: {
    incomeId: {
      required: true,
    },
  },
  data() {
    return {
      income: {},
      isSaveTriggered: false,
    };
  },
  created() {
    this.income.id = this.incomeId;
    this.fetchData(this.income.id);
  },
  methods: {
    intNumber(property) {
      this.income[property] = this.limitIntNumber(this.income[property]);
    },
    limitIntNumber(val) {
      if (
        isNaN(val) ||
        undefined == val ||
        null == val ||
        val === 0 ||
        val === "0" ||
        val === ""
      ) {
        return 0;
      } else {
        let value = null;
        value = (val + "")
          .replace(/^(\d+)\.(\d\d).*$/, "$1")
          .replace(/\.$/, "");
        var valueNum = Number(value);
        return valueNum >= 2147483647 ? 2147483647 : valueNum;
      }
    },
    fetchData(incomeId) {
      if (!incomeId) return;

      getIncome(incomeId).then((res) => {
        this.listLoading = true;
        this.income = Object.assign({}, this.income, res.data);
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
  },
};
</script>

<style scoped>
</style>