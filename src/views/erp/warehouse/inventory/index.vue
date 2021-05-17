<template>
  <div class="app-container flex-container">
    <div v-mouse-enter-trigger="fetchData">
      <el-form class="form-container">
        <el-row>
          <el-col :span="5">
            <el-form-item
              label-width="85PX"
              label="出库日期:"
              class="postInfo-container-item"
            >
              <el-date-picker
                class="full-width"
                v-model="filter.date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5" class="pl-12">
            <el-form-item
              label-width="85px"
              label="款号:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.number"
                placeholder="请输入款号"
                clearable
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="5" class="pl-12">
            <el-form-item
              label-width="85px"
              label="颜色:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.color"
                placeholder="请输入颜色"
                clearable
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </div>
    <div><hr class="light-bg-hr" /></div>
    <div>
      <div class="fr">
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
      </div>
    </div>
    <div><hr class="light-bg-hr" /></div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      style="height: 100%"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="款号">
        <template slot-scope="scope">
          {{ scope.row.clothe_num }}
        </template>
      </el-table-column>
      <el-table-column label="颜色">
        <template slot-scope="scope">
          {{ scope.row.color }}
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="135" align="center">
        <template slot-scope="scope">
          <div class="el-row">
            <el-button
              @click="clickEditFn(scope.row)"
              class="el-button el-button--primary el-button--mini is-plain operation-small-button"
              ><i class="el-icon-edit">编辑</i
            ></el-button>
            <el-button
              @click="clickDeleteFn(scope.row)"
              class="el-button el-button--danger el-button--mini is-plain operation-small-button"
              ><i class="el-icon-delete">删除</i
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination no-top-border">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="gridPageArray"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog :visible.sync="addupdateFormVisible" v-mouse-enter-trigger="clickSaveFn">
      <template slot="title">
        <div class="form-title">{{ addUpdateTitle }}<span></span></div>
      </template>
      <inventoryAddUpdate :inventory-id="currentEditInventory.id" ref="detailRef" :key="detailRefKey"></inventoryAddUpdate>
      <div slot="footer" class="dialog-footer">
        <div><hr class="light-bg-hr" /></div>
        <el-button @click="addupdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSaveFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchInventoryList, saveInventory, deleteInventory } from "@/api/erp/warehouse";
import inventoryAddUpdate from "./addupdate";
import { Message } from "element-ui";
import { gridPageArray, getPageParam } from "../../common/grid.page";
export default {
  components: { inventoryAddUpdate },
  data() {
    return {
      detailRefKey: "",
      filter: { date: "", number: "", color: "" },
      list: null,
      currentPage: 1,
      pagesize: gridPageArray[0],
      total: 0,
      listLoading: true,
      autoWidth: true,
      addupdateFormVisible: false,
      addUpdateMode: "",
      currentEditInventory: {},
      gridPageArray: gridPageArray,
    };
  },
  watch: {
      currentEditInventory :function(){
          this.detailRefKey = new Date().getTime();
      }
  },
  created() {
    this.fetchData();
  },
  computed: {
    addUpdateTitle: function () {
      return (
        (!!this.addUpdateMode && this.addUpdateMode == "new"
          ? "新建"
          : "编辑") + "出库信息"
      );
    },
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchInventoryList(getPageParam(this.pagesize, this.currentPage, this.filter)).then(
        (response) => {
          this.list = response.data.results;
          this.total = response.data.count;
          this.listLoading = false;
        }
      );
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    clickEditFn(item) {
      this.addUpdateMode = "edit";
      this.currentEditInventory = {id: item.id};
      this.addupdateFormVisible = true;
    },
    clickDeleteFn(item) {
      var deleteHandler = (cb) => deleteInventory(item.id).then(
        (res) => {
          this.addupdateFormVisible = false;
          cb();
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
      this.$confirm('此操作将删除该出库信息, 是否继续?', '提示', {
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
    clickAddFn() {
      this.addUpdateMode = "new";
      this.currentEditInventory = {
        name: "",
        phone: "",
        address: "",
      };
      this.addupdateFormVisible = true;
    },
    clickSaveFn() {
      if(!this.$refs.detailRef.dlgSave()) return;

      saveInventory(this.$refs.detailRef.inventory).then(
        (res) => {
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
    },
  },
};
</script>

<style>
</style>
