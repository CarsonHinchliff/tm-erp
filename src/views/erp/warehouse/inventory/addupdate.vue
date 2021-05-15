<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="款号:"
            class="postInfo-container-item required-star"
          >
            <el-input :class="{ 'value-required': !inventory.clothe_num && isSaveTriggered }"
              v-model="inventory.clothe_num"
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
            <el-input :class="{ 'value-required': !inventory.color && isSaveTriggered }"
              v-model="inventory.color"
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
              :class="{ 'value-required': !inventory.amount && isSaveTriggered }"
              v-model="inventory.amount"
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
import { getInventory } from "@/api/erp/warehouse";
export default {
  name: "inventoryAddUpdate",
  props: {
    inventory: {
      required: true,
    },
  },
  data() {
    return {
      isSaveTriggered: false,
    };
  },
  created() {
    this.fetchData(this.inventory.id);
  },
  watch: {
    inventory: function (newVal, oldVal) {
      if (newVal && newVal != oldVal) {
        this.isSaveTriggered = false;
        this.fetchData(newVal.id);
      }
    },
  },
methods: {
    intNumber(property) {
      this.inventory[property] = this.limitIntNumber(this.inventory[property]);
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
    fetchData(inventoryId) {
      if (!inventoryId) return;

      getInventory(inventoryId).then((res) => {
        this.listLoading = true;
        Object.assign(this.inventory, res.data);
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
    }
  }    
};
</script>

<style scoped>
</style>