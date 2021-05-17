<template>
  <div>
    <el-form class="form-container">
      <el-row v-if="!!order.orderId">
        <el-col>
          <el-form-item
            label-width="85px"
            label="订单号:"
            class="postInfo-container-item bold-form-element blue-color-form-element"
          >
            <el-input
              v-model="order.order_num"
              disabled
              placeholder="请输入订单号"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="订单日期:"
            class="postInfo-container-item required-star"
          >
            <el-date-picker
              :class="{
                'value-required': !order.order_date && isSaveTriggered,
              }"
              v-model="order.order_date"
              class="full-width"
              type="date"
              placeholder="订单日期"
            />
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
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="客户姓名:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !order.name && isSaveTriggered }"
              v-model="order.name"
              placeholder="请输入客户姓名"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="客户电话:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !order.phone && isSaveTriggered || !checkPhone(order.phone) }"
              v-model="order.phone"
              placeholder="请输入客户电话"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label-width="85px"
            label="客户地址:"
            class="postInfo-container-item required-star"
          >
            <el-input
              :class="{ 'value-required': !order.address && isSaveTriggered }"
              v-model="order.address"
              placeholder="请输入地址"
              clearable
            />
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
              order.order_detail &&
              order.order_detail.length == 0 &&
              isSaveTriggered,
          }"
          :data="order.order_detail"
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
        <div class="form-title">编辑订单明细<span/></div>
      </template>
      <orderDetailAddUpdate
        ref="orderDetailRef"
        :detail="currentEditOrderDetail"
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
import { isNullOrEmpty } from '@/views/erp/common/common';
import { checkPhoneFormat } from '@/views/erp/common/phone.number';
import { getOrder } from '@/api/erp/order'
import orderDetailAddUpdate from './addupdate.detail'
export default {
  name: 'OrderAddUpdate',
  components: { orderDetailAddUpdate },
  props: {
    orderId: {
      required: true
    }
  },
  data() {
    return {
      listLoading: false,
      addUpdateMode: '',
      addupdateFormVisible: false,
      currentEditOrderDetail: {},
      isSaveTriggered: false,
      order: {order_date: new Date()}
    }
  },
  created() {
    this.order.orderId = this.orderId
    this.fetchData(this.order.orderId)
  },
  beforeDestroy() {
    console.log('destroyed...');
  },
  mounted() {
    this.ensureOrderEntity()
  },
  methods: {
    checkPhone(phone){
      return isNullOrEmpty(phone) || checkPhoneFormat(phone);
    },
    ensureOrderEntity() {
      if (!this.order.order_detail) {
        this.order.order_detail = []
      }
    },
    fetchData(orderId) {
      if (!orderId) return

      getOrder(orderId).then((res) => {
        this.listLoading = true
        this.order = Object.assign({}, this.order, res.data);
        this.listLoading = false
      })
    },
    clickEditFn(item) {
      this.addUpdateMode = 'edit'
      this.currentEditOrderDetail = item
      this.addupdateFormVisible = true
    },
    clickDeleteFn(item) {
      var array = this.order.order_detail || []
      array.splice(array.indexOf(item), 1)
    },
    clickAddFn() {
      this.addUpdateMode = 'new'
      this.currentEditOrderDetail = {
        clothe_num: '',
        amount: 0,
        color: '',
        price: 0
      }
      this.addupdateFormVisible = true
    },
    clickSaveFn() {
      if (!this.$refs.orderDetailRef.dlgSave()) {
        return;
      }

      if (this.order.order_detail.indexOf(this.currentEditOrderDetail) == -1) {
        this.order.order_detail.push(this.currentEditOrderDetail)
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

      var tableRef = this.$refs.orderDetailTableRef;
      var isAnyDetailRecord = tableRef.data.length > 0;

      var isPhoneCorrect = this.checkPhone(this.order.phone);

      return isAllRequiredFieldFilled && isAnyDetailRecord && isPhoneCorrect;
    }
  }
}
</script>

<style scoped>
</style>
