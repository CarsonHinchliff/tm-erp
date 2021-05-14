<template>
  <div class="app-container flex-container">
    <div>
      <el-form class="form-container">
        <el-row>
          <el-col :span="5">
            <el-form-item
              label-width="85px"
              label="订单日期:"
              class="postInfo-container-item"
            >
              <el-date-picker
                class="full-width"
                v-model="filter.orderDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label-width="98px"
              label="已发货:"
              class="postInfo-container-item"
            >
              <el-switch
                v-model="filter.orderIssued"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item
              label-width="85px"
              label="客户姓名:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.customerName"
                placeholder="请输入客户姓名"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" class="pl-12">
            <el-form-item
              label-width="85px"
              label="客户电话:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.customerPhone"
                placeholder="请输入客户电话"
              ></el-input> </el-form-item
          ></el-col>

          <el-col :span="6">
            <el-form-item
              label-width="45px"
              label=""
              class="postInfo-container-item"
            >
              <el-button @click="fetchData" type="primary"
                ><span
                  ><i class="el-icon-search"></i
                  ><span class="icon-name">查询</span></span
                ></el-button
              >
              <span></span>
              <el-button @click="clickAddFn" type="success"
                ><span
                  ><i class="el-icon-circle-plus"></i
                  ><span class="icon-name">新增</span></span
                ></el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      row-key="id"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      :span-method="objectSpanMethod"
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.row.orderId }}
        </template>
      </el-table-column>
      <el-table-column label="订单日期" :width="minColumnWidth" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderDate }}
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" :width="minColumnWidth" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderCustomerName }}
        </template>
      </el-table-column>
      <el-table-column label="款号" :width="minColumnWidth" align="center">
        <template slot-scope="scope">
          {{ scope.row['clothe_num'] }}
        </template>
      </el-table-column>
      <el-table-column label="颜色" :width="minColumnWidth" align="center">
        <template slot-scope="scope">
          {{ scope.row.color }}
        </template>
      </el-table-column>
      <el-table-column label="数量" :width="minColumnWidth" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="单价" :width="minColumnWidth" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="总价" :width="minColumnWidth" align="center">
        <template slot-scope="scope">
          {{ scope.row['total_price'] }}
        </template>
      </el-table-column>
      <el-table-column label="电话" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderCustomerPhone }}
        </template>
      </el-table-column>
      <el-table-column label="已发货">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.orderIssuedAll"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
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
    <div class="pagination no-top-border">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog :title="addUpdateTitle" :visible.sync="addupdateFormVisible">
      <orderAddUpdate :order="currentEditOrder"></orderAddUpdate>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addupdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSaveFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, saveOrder, deleteOrder } from "@/api/erp/order";
import orderAddUpdate from "./addupdate";
import { Message } from "element-ui";
export default {
  components: { orderAddUpdate },
  data() {
    return {
      filter: {
        customerName: "",
        customerPhone: "",
        orderDate: "",
        orderIssued: false,
      },
      minColumnWidth: 180,
      list: null,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      listLoading: true,
      autoWidth: true,
      addupdateFormVisible: false,
      addUpdateMode: "",
      currentEditOrder: {},
      mergedColumnLabels: ['Id', '订单日期', '客户姓名', '电话', '已发货', '总价', '操作'],
      spanArr: [], //遍历数据时，根据相同的标识去存储记录
      posForMerge: 0 // 二维数组的索引
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    addUpdateTitle: function () {
      return (
        (!!this.addUpdateMode && this.addUpdateMode == "new"
          ? "新建"
          : "编辑") + "订单"
      );
    },
  },
  mounted: function () {

  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchList().then((response) => {
        this.list = this.transMergedResult(response.data.results);
        this.getSpanArr(this.list);
        this.total = response.data.count;
        this.listLoading = false;
      });
    },
    getSpanArr(data) {
      let that = this
      //页面展示的数据，不一定是全部的数据，所以每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
      that.spanArr = []
      that.posForMerge = 0
      //遍历数据
      data.forEach((item, index) => {
        //判断是否是第一项
        if (index === 0) {
          this.spanArr.push(1)
          this.posForMerge = 0
        } else {
          //不是第一项时，就根据标识去存储
          if (data[index].orderId === data[index - 1].orderId) {
            // 查找到符合条件的数据时每次要把之前存储的数据+1
            this.spanArr[this.posForMerge] += 1
            this.spanArr.push(0)
          } else {
            // 没有符合的数据时，要记住当前的index
            this.spanArr.push(1)
            this.posForMerge = index
          }
        }
      })
      console.log(this.spanArr, this.posForMerge)
    },
    // 列表方法
    objectSpanMethod({row, column, rowIndex, columnIndex}) {
      // 页面列表上 表格合并行 -> 第几列(从0开始)
      // 需要合并多个单元格时 依次增加判断条件即可
      if (this.mergedColumnLabels.indexOf(column.label) != -1) {
        // 二维数组存储的数据 取出
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
        //不可以return {rowspan：0， colspan: 0} 会造成数据不渲染， 也可以不写else，eslint过不了的话就返回false
      } else {
        return false
      }
    },
    transMergedResult(results){
      var orderDetailsResult = [];
      (results || []).forEach(result => {
        var orderDetails = result['order_detail'] || [];
        if (orderDetails.length > 0){
          orderDetails.forEach(detail => {
            detail.orderId = result.id;
            detail.orderAddress = result.address;
            detail.orderCustomerName = result.name;
            detail.orderDate = result['order_date'];
            detail.orderIssuedAll = result['issued_all'];
            detail.orderCustomerPhone = result.phone;
          })

          orderDetailsResult.push(...orderDetails);
        }
      })

      console.log(orderDetailsResult);
      return orderDetailsResult;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    clickEditFn(item) {
      this.addUpdateMode = "edit";
      this.currentEditOrder = {};
      this.currentEditOrder.orderId = item.orderId;
      this.addupdateFormVisible = true;
    },
    clickDeleteFn(item) {
      console.log(item);
      deleteOrder(item.orderId).then(
        (res) => {
          console.log(res);
          this.addupdateFormVisible = false;
          this.fetchData();
        },
        (error) => {
          Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000,
          });
        }
      );
    },
    clickAddFn() {
      console.log("add");
      this.addUpdateMode = "new";
      this.currentEditOrder = {
        name: "",
        phone: "",
        address: "",
      };
      this.addupdateFormVisible = true;
    },
    clickSaveFn() {
      saveOrder(this.currentEditOrder).then(
        (res) => {
          console.log(res);
          this.addupdateFormVisible = false;
          this.fetchData();
        },
        (response) => {
          Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000,
          });
        }
      );
    }
  }
};
</script>

<style>
</style>
