<template>
  <div class="app-container">
    <div>
      <el-form class="form-container">
        <el-row>
          <el-col :span="8">
            <el-form-item
              label-width="45px"
              label="姓名:"
              class="postInfo-container-item"
            >
              <el-input
                v-model="filter.name"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
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

          <el-col :span="6"> </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Address">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Phone" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
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
  </div>
</template>

<script>
import { fetchList } from "@/api/erp/customer";
export default {
  data() {
    return {
      filter: { name: "", address: "" },
      list: null,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      listLoading: true,
      autoWidth: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchList().then((response) => {
        this.list = response.data.results;
        this.total = response.data.count;
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style>
</style>
