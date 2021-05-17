<template>
  <div>
    <el-form class="form-container">
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="订单号:"
            class="postInfo-container-item required-star"
          >
            <el-input disabled
              :class="{ 'value-required': !issued.order_num && isSaveTriggered }"
              v-model="issued.order_num"
              placeholder="请输入订单号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="姓名:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !issued.order_date && isSaveTriggered }"
              v-model="issued.order_date"
              placeholder="请输入订单日期"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="电话:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !issued.name && isSaveTriggered }"
              v-model="issued.name"
              placeholder="请输入客户姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="65px"
            label="地址:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{
                'value-required': !issued.address && isSaveTriggered,
              }"
              v-model="issued.address"
              placeholder="请输入地址"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div><hr class="light-bg-hr" ></div>
      <el-row>
        <el-col>
          <el-form-item
            label-width="45px"
            label=""
            class="postInfo-container-item fr"
            style="margin-bottom: 2px"
          >
            <el-button
              type="success"
              class=""
              @click="clickAddFn"
            ><span
            ><i class="el-icon-circle-plus"/><span class="icon-name">新增</span></span
            ></el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      <div><hr class="light-bg-hr" ></div>
      <el-row>
        <el-table
          v-loading="listLoading"
          ref="orderDetailTableRef"
          :class="{
            'value-required':
              issued.order_detail &&
              issued.order_detail.length == 0 &&
              isSaveTriggered,
          }"
          :data="issued.order_detail"
          height="250"
          row-key="id"
          element-loading-text="拼命加载中"
          border
          fit
        >
          <el-table-column
            label="序号"
            width="auto"
            align="center"
            type="index"
          />
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
          <el-table-column label="数量" width="auto" align="center">
            <template slot-scope="scope">
              {{ scope.row.amount }}
            </template>
          </el-table-column>
           <el-table-column label="发货" width="auto" align="center">
            <template slot-scope="scope">
              {{ scope.row.order_header }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="135" align="center">
            <template slot-scope="scope">
              <div class="el-row">
                <el-button
                  class="el-button el-button--primary el-button--mini is-plain operation-small-button"
                  @click="clickEditFn(scope.row)"
                ><i class="el-icon-edit"/>编辑</el-button>
                <el-button
                  class="el-button el-button--danger el-button--mini is-plain operation-small-button"
                  @click="clickDeleteFn(scope.row)"
                ><i class="el-icon-delete"/>删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="addupdateFormVisible" append-to-body>
      <template slot="title">
        <div class="form-title">编辑发货明细<span/></div>
      </template>
      <issuedDetailAddUpdate
        ref="issuedDetailRef"
        :detail="currentEditIssuedDetail"
      />
      <div slot="footer" class="dialog-footer">
        <div><hr class="light-bg-hr" ></div>
        <el-button @click="addupdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSaveFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getIssued } from '@/api/erp/order';
import issuedDetailAddUpdate from './addupdate.issueddetail';
export default {
  name: "orderIssueAddUpdate",
  components: { issuedDetailAddUpdate },
  props: {
    orderId: {
      required: true,
    },
  },
  data() {
    return {
      listLoading: false,
      addUpdateMode: '',
      addupdateFormVisible: false,
      currentEditIssuedDetail: {},
      isSaveTriggered: false,
      issued: {}
    };
  },
  created() {
    this.issued.id = this.orderId
    this.fetchData(this.issued.id);
  },
  methods: {
    fetchData(orderId) {
      if (!orderId) return;

      getIssued(orderId).then((res) => {
        this.listLoading = true;
        this.issued = Object.assign({}, this.issued, res.data);
        this.listLoading = false;
      });
    },
    clickEditFn(item) {
      this.addUpdateMode = 'edit'
      this.currentEditIssuedDetail = item
      this.addupdateFormVisible = true
    },
    clickDeleteFn(item) {
      var array = this.issued.order_detail || []
      array.splice(array.indexOf(item), 1)
    },
    clickAddFn() {
      this.addUpdateMode = 'new'
      this.currentEditIssuedDetail = {}
      this.addupdateFormVisible = true
    },
    clickSaveFn() {
      if (!this.$refs.issuedDetailRef.dlgSave()) {
        return
      }

      if (this.issued.order_detail.indexOf(this.currentEditIssuedDetail) == -1) {
        this.issued.order_detail.push(this.currentEditIssuedDetail)
      }
      this.addupdateFormVisible = false
    },
    dlgSave() {
      this.isSaveTriggered = true
      var isAllRequiredFieldFilled = true;
      (this.$el.querySelectorAll('.required-star input') || []).forEach(
        (element) => {
          if (element.value == '') {
            isAllRequiredFieldFilled = false
          }
        }
      )

      var tableRef = this.$refs.orderDetailTableRef
      var isAnyDetailRecord = tableRef.data.length > 0

      return isAllRequiredFieldFilled && isAnyDetailRecord
    }
  }
};
</script>

<style scoped>
</style>