<template>
  <div class="app-container flex-container" >
    <div v-mouse-enter-trigger="fetchData">
      <el-form class="form-container">
        <el-row>
          <el-col :span="5">
            <el-form-item
              label-width="85PX"
              label="姓名:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.name"
                placeholder="请输入姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" class="pl-12">
            <el-form-item
              label-width="85px"
              label="地址:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.address"
                placeholder="请输入地址"
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
      <el-table-column label="姓名" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="电话" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
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
      <customerAddUpdate :customer="currentEditCustomer" ref="detailRef"></customerAddUpdate>
      <div slot="footer" class="dialog-footer">
        <div><hr class="light-bg-hr" /></div>
        <el-button @click="addupdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSaveFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, saveCustomer, deleteCustomer } from "@/api/erp/customer";
import customerAddUpdate from "./addupdate";
import { Message } from "element-ui";
import { gridPageArray, getPageParam } from "../common/grid.page";
export default {
  components: { customerAddUpdate },
  data() {
    return {
      filter: { name: "", address: "", phone: "" },
      list: null,
      currentPage: 1,
      pagesize: gridPageArray[0],
      total: 0,
      listLoading: true,
      autoWidth: true,
      addupdateFormVisible: false,
      addUpdateMode: "",
      currentEditCustomer: null,
      gridPageArray: gridPageArray,
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
          : "编辑") + "客户信息"
      );
    },
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchList(getPageParam(this.pagesize, this.currentPage, this.filter)).then(
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
      this.currentEditCustomer = {id: item.id};
      this.addupdateFormVisible = true;
    },
    clickDeleteFn(item) {
      deleteCustomer(item.id).then(
        (res) => {
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
      this.addUpdateMode = "new";
      this.currentEditCustomer = {
        name: "",
        phone: "",
        address: "",
      };
      this.addupdateFormVisible = true;
    },
    clickSaveFn() {
      if(!this.$refs.detailRef.dlgSave()) return;

      saveCustomer(this.currentEditCustomer).then(
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
