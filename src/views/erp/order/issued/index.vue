<template>
  <div class="app-container flex-container">
    <div v-mouse-enter-trigger="fetchData">
      <el-form class="form-container">
        <el-row>
          <el-col :span="5">
            <el-form-item
              label-width="85px"
              label="订单日期:"
              class="postInfo-container-item"
            >
              <el-date-picker
                v-model="filter.date"
                class="full-width"
                type="date"
                placeholder="选择日期"
                @change="filterDateChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label-width="98px"
              label="已发货:"
              class="postInfo-container-item"
            >
              <el-switch
                v-model="filter.issued_all"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
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
                v-model="filter.customer"
                placeholder="请输入客户姓名"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :span="5" class="pl-12">
            <el-form-item
              label-width="85px"
              label="客户电话:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.phone"
                placeholder="请输入客户电话"
                clearable
            /> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </div>
    <div><hr class="light-bg-hr" ></div>
    <div>
      <div class="fr">
        <el-button
          type="info"
          @click="resetFilter"
          :disabled="!filterResetBtnEnabled"
        ><span
        ><i class="el-icon-circle-close"/><span class="icon-name">重置</span></span
        ></el-button
        >
        <span/>
        <el-button
          type="primary"
          @click="fetchData"
        ><span
        ><i class="el-icon-search"/><span class="icon-name">查询</span></span
        ></el-button
        >
        <span/>      
      </div>
    </div>
    <div><hr class="light-bg-hr" ></div>
    <el-table
      v-loading="listLoading"
      :data="list"
      :span-method="objectSpanMethod"
      height="400"
      row-key="id"
      element-loading-text="拼命加载中"
      border
      fit
      @row-dblclick="rowdblClickFn"
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.orderId }}
        </template>
      </el-table-column>
      <el-table-column :width="minColumnWidth" label="订单日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderDate }}
        </template>
      </el-table-column>
      <el-table-column :width="minColumnWidth" label="订单号" align="center">
         <template slot-scope="scope">
            <el-tooltip
            placement="top"
            content="点击以编辑发货详情"
            :open-delay="0"
            effect="dark">
              <div class="bold blue-color underline-blue cursor-pointer"
                @click="clickIssuedFn(scope.row)"
                >{{ scope.row.orderNum }}
              </div>
            </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :width="minColumnWidth" label="客户姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderCustomerName }}
        </template>
      </el-table-column>
      <el-table-column :width="minColumnWidth" label="款号" align="center">
        <template slot-scope="scope">
          {{ scope.row["clothe_num"] }}
        </template>
      </el-table-column>
      <el-table-column :width="minColumnWidth" label="颜色" align="center">
        <template slot-scope="scope">
          {{ scope.row.color }}
        </template>
      </el-table-column>
      <el-table-column :width="minColumnWidth" label="数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column :width="minColumnWidth" label="发货数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.issued_num }}
        </template>
      </el-table-column>
      <el-table-column :width="minColumnWidth" label="欠货数量" align="center">
        <template slot-scope="scope">
          {{ scope.row["pending_num"] }}
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
            v-model="scope.row.orderIssuedAll"
            disabled
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
      <el-table-column label="部分发货">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.orderIssuedPartial"
            disabled
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="205" align="center">
        <template slot-scope="scope">
          <div class="el-row">
            <el-button
              class="el-button el-button--primary el-button--mini is-plain operation-small-button"
              @click="clickIssuedFn(scope.row)"
            ><i class="el-icon-document"/>发货</el-button>
            <el-button
              class="el-button el-button--danger el-button--mini is-plain operation-small-button"
              @click="clickDeleteFn(scope.row)"
            ><i class="el-icon-delete"/>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination no-top-border">
      <el-pagination
        :page-sizes="gridPageArray"
        :page-size="pagesize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="addupdateFormVisible">
      <template slot="title">
        <div class="form-title">{{ addUpdateTitle }}<span/></div>
      </template>
      <issuedAddUpdate ref="issuedRef" :order-id="currentEditIssued.orderId" :key="issuedRefKey"/>
      <div slot="footer" class="dialog-footer">
        <div><hr class="light-bg-hr" ></div>
        <el-button @click="addupdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSaveFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchIssuedList, deleteIssued, saveIssued, putIssued } from '@/api/erp/order'
import issuedAddUpdate from './addupdate'
import { Message } from 'element-ui'
import { gridPageArray, getPageParam } from "@/views/erp/common/grid.page";
export default {
  components: { issuedAddUpdate },
  data() {
    return {
      issuedRefKey: '',
      filter: {
        customer: '',
        phone: '',
        date: '',
        issued_all: false
      },
      minColumnWidth: 150,
      list: null,
      currentPage: 1,
      pagesize: gridPageArray[0],
      total: 0,
      gridPageArray: gridPageArray,
      listLoading: true,
      autoWidth: true,
      addupdateFormVisible: false,
      addUpdateMode: '',
      currentEditIssued: {},
      mergedColumnLabels: [
        'ID',
        '订单日期',
        '订单号',
        '客户姓名',
        '电话',
        '已发货',
        '部分发货',
        '操作'
      ],
      spanArr: [], // 遍历数据时，根据相同的标识去存储记录
      posForMerge: 0 // 二维数组的索引
    }
  },
  computed: {
    addUpdateTitle: function() {
      return '编辑发货';
    },
    filterResetBtnEnabled: function(){
      return Object.entries(this.filter).filter(entry => {
        return entry[1] !== "" && entry[1] !== null && entry[1] !== false;
      }).length > 0;
    }
  },
  created() {
    this.fetchData()
  },
  mounted: function() {},
  watch: {
      currentEditIssued :function(){
          this.issuedRefKey=new Date().getTime();
      }
   },
  methods: {
    resetFilter(){
      this.filter = {}
    },
    filterDateChange(value){
      if(null == value){
        this.$nextTick(() => {
          this.fetchData();
        })    
      }
    },
    rowdblClickFn(row, column){
      this.clickIssuedFn(row);
    },
    fetchData() {
      this.listLoading = true
      fetchIssuedList(getPageParam(this.pagesize, this.currentPage, this.filter)).then(
        (response) => {
          this.list = this.transMergedResult(response.data.results)
          this.getSpanArr(this.list)
          this.total = response.data.count
          this.listLoading = false
        }
      )
    },
    getSpanArr(data) {
      const that = this
      // 页面展示的数据，不一定是全部的数据，所以每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
      that.spanArr = []
      that.posForMerge = 0
      // 遍历数据
      data.forEach((item, index) => {
        // 判断是否是第一项
        if (index === 0) {
          this.spanArr.push(1)
          this.posForMerge = 0
        } else {
          // 不是第一项时，就根据标识去存储
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
    },
    // 列表方法
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
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
        // 不可以return {rowspan：0， colspan: 0} 会造成数据不渲染， 也可以不写else，eslint过不了的话就返回false
      } else {
        return false
      }
    },
    transMergedResult(results) {
      var orderDetailsResult = [];
      (results || []).forEach((result) => {
        var orderDetails = result['order_detail'] || []
        if (orderDetails.length > 0) {
          orderDetails.forEach((detail) => {
            detail.orderId = result.id
            detail.orderAddress = result.address
            detail.orderCustomerName = result.name
            detail.orderDate = result['order_date'],
            detail.orderNum = result['order_num'],
            detail.orderIssuedAll = result['issued_all'],
            detail.orderIssuedPartial = result['issued_partial'],
            detail.orderCustomerPhone = result.phone
          })

          orderDetailsResult.push(...orderDetails)
        }
      })

      return orderDetailsResult
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    clickIssuedFn(item) {
      this.addUpdateMode = 'edit'
      this.currentEditIssued = { orderId: item.orderId }
      this.addupdateFormVisible = true
    },
    clickDeleteFn(item) {
      var deleteHandler = (cb) => deleteIssued(item.orderId).then(
        (res) => {
          this.addupdateFormVisible = false;
          cb();
          this.fetchData();
        },
        (error) => {
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      );
      this.$confirm('此操作将删除该发货信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteHandler(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    clickSaveFn() {
      if (!this.$refs.issuedRef.dlgSave()) return;

      var issued = this.$refs.issuedRef.issued;
      var savePromise = this.addUpdateMode == 'edit' ?
        putIssued(
          issued.id,
          issued) :
        saveIssued(issued);

      savePromise.then(
        (res) => {
          this.addupdateFormVisible = false
          this.fetchData()
        },
        (response) => {
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      )
    }
  }
}
</script>

<style>
</style>
