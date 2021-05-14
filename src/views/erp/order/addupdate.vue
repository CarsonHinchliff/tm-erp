<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="订单号:"
            class="postInfo-container-item"
          >
            <el-input
              disabled
              v-model="order.order_num"
              placeholder="请输入订单号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="订单日期:"
            class="postInfo-container-item"
          >
            <el-date-picker
              class="full-width"
              v-model="order.order_date"
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
            label="已发货:"
            class="postInfo-container-item"
          >
            <el-switch
              v-model="order.issued_all"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="客户姓名:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="order.name"
              placeholder="请输入客户姓名"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="客户电话:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="order.phone"
              placeholder="请输入客户电话"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="客户地址:"
            class="postInfo-container-item"
          >
            <el-input
              v-model="order.address"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label=""
            class="postInfo-container-item fr"
            style="margin-bottom: 2px"
          >
            <el-button
              @click="clickAddFn"
              type="success"
              class="el-button--mini"
              ><span
                ><i class="el-icon-circle-plus"></i
                ><span class="icon-name">新增</span></span
              ></el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          v-loading="listLoading"
          :data="order.order_detail"
          row-key="id"
          element-loading-text="拼命加载中"
          border
          fit
        >
          <el-table-column label="款号" width="auto" align="center">
            <template slot-scope="scope">
              {{ scope.row.clothe_num }}
            </template>
          </el-table-column>
          <el-table-column label="颜色" width="auto" align="center">
            <template slot-scope="scope">
              {{ scope.row.color }}
            </template>
          </el-table-column>
          <el-table-column label="单价" width="auto" align="center">
            <template slot-scope="scope">
              {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column label="数量" width="auto" align="center">
            <template slot-scope="scope">
              {{ scope.row.amount }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="115" align="center">
            <template slot-scope="scope">
              <div class="el-row">
                <el-button
                  @click="clickEditFn(scope.row)"
                  class="el-button el-button--primary el-button--mini is-plain is-circle"
                  ><i class="el-icon-edit"></i
                ></el-button>
                <el-button
                  @click="clickDeleteFn(scope.row)"
                  class="el-button el-button--danger el-button--mini is-plain is-circle"
                  ><i class="el-icon-delete"></i
                ></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <el-dialog
      title="编辑订单明细"
      :visible.sync="addupdateFormVisible"
      append-to-body
    >
      <orderDetailAddUpdate
        :detail="currentEditOrderDetail"
      ></orderDetailAddUpdate>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addupdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSaveFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrder } from "@/api/erp/order";
import orderDetailAddUpdate from "./addupdate.orderdetail";
export default {
  name: "orderAddUpdate",
  components: { orderDetailAddUpdate },
  props: {
    order: {
      required: true,
    },
  },
  data() {
    return {
      listLoading: false,
      addUpdateMode: "",
      addupdateFormVisible: false,
      currentEditOrderDetail: {},
    };
  },
  created() {
    this.fetchData(this.order.orderId);
  },
  watch: {
    order(newVal, oldVal) {
      if (newVal) {
        this.fetchData(newVal.orderId);
      }
    },
  },
  mounted() {},
  methods: {
    fetchData(orderId) {
      if (!orderId) return;

      getOrder(orderId).then((res) => {
        this.listLoading = true;
        Object.assign(this.order, res.data);
        console.log(this.order);
        this.$forceUpdate();
        this.listLoading = false;
      });
    },
    clickEditFn(item) {
      this.addUpdateMode = "edit";
      this.currentEditOrderDetail = item;
      this.addupdateFormVisible = true;
    },
    clickDeleteFn(item) {
      var array = this.order.order_detail || [];
      array.splice(array.indexOf(item), 1);
    },
    clickAddFn() {
      this.addUpdateMode = "new";
      this.currentEditOrderDetail = {
        clothe_num: "",
        amount: "",
        color: "",
        price: "",
      };
      this.addupdateFormVisible = true;
    },
    clickSaveFn() {
      if (
        (this.order.order_detail || []).indexOf(this.currentEditOrderDetail) ==
        -1
      ) {
        (this.order.order_detail || []).push(this.currentEditOrderDetail);
      }
      this.addupdateFormVisible = false;
    },
  },
};
</script>

<style scoped>
</style>