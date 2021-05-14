<template>
  <div class="app-container flex-container">
    <div>
      <el-form class="form-container">
        <el-row>
          <el-col :span="5">
            <el-form-item
              label-width="65PX"
              label="姓名:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.name"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" class="pl-12">
            <el-form-item
              label-width="65px"
              label="地址:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.address"
                placeholder="请输入内容"
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
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row  style="height:100%"
    >
      <el-table-column align="center" label="Id" width="95">
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
    <el-dialog :title="addUpdateTitle" :visible.sync="addupdateFormVisible">
      <customerAddUpdate :customer="currentEditCustomer"></customerAddUpdate>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addupdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSaveFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, saveCustomer, deleteCustomer } from "@/api/erp/customer";
import customerAddUpdate from "./addupdate";
import { Message } from 'element-ui';
import { gridPageArray, getPageParam } from '../common/grid.page';
export default {
  components: { customerAddUpdate },
  data() {
    return {
      filter: { name: "", address: "" },
      list: null,
      currentPage: 1,
      pagesize: gridPageArray[0],
      total: 0,
      listLoading: true,
      autoWidth: true,
      addupdateFormVisible: false,
      addUpdateMode: "",
      currentEditCustomer: null,
      gridPageArray: gridPageArray
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
      fetchList(getPageParam(this.pagesize, this.currentPage)).then((response) => {
        this.list = response.data.results;
        this.total = response.data.count;
        this.listLoading = false;
      });
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
      console.log(item.name);
      this.addUpdateMode = "edit";
      this.currentEditCustomer = item;
      this.addupdateFormVisible = true;
    },
    clickDeleteFn(item) {
      console.log(item);
      deleteCustomer(item.id).then(
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
      this.currentEditCustomer = {
        name: "",
        phone: "",
        address: "",
      };
      this.addupdateFormVisible = true;
    },
    clickSaveFn() {
      saveCustomer(this.currentEditCustomer).then(
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
    },
  },
};
</script>

<style>
</style>
