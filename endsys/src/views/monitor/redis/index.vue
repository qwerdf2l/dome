<template>
  <el-container class="container">
    <el-row>
      <el-col :span="24">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          inline
          style="text-align: left"
        >
          <el-form-item>
            <el-input
              v-model="form.name"
              placeholder="请输入关键词搜索"
              @change="change"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="clearKey"
              >清空</el-button
            >
            <el-button type="warning" icon="el-icon-download" size="mini"
              >导出</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%" >
          <el-table-column prop="key" label="Key">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value"
            width="374"
            class="table-column"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-popover
                placement="top"
                v-model="visible"
                :ref="scope.row.key"
              >
                <p>确定删除本条数据吗？</p>
                <div style="text-align: center; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="$refs[scope.row.key].doClose()"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="$refs[scope.row.key].doClose(), delKey(scope.row)"
                    >确定</el-button
                  >
                </div>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { getRedis, delRedis, delAllRedis } from "@/api/redis";
export default {
  name: "redisVue",
  data() {
    return {
      input: "",
      tableData: [],
      pageSizes: [10, 20, 30, 40, 50, 100],
      pageSize: 10,
      total: 0,
      currentPage: "1",
      form: {
        name: "",
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.search();
    },
    search() {
      const params = {
        page: this.currentPage - 1,
        size: this.pageSize,
        key: this.form.name,
      };
      getRedis(params).then((res) => {
        console.log(res);
        this.total = res.totalElements;
        this.tableData = res.content;
      });
    },
    delKey(row) {
      console.log(row);
      const data = { key: row.key };
      delRedis(data).then((res) => {
        console.log(`delRedisres`, res);
      });
      this.search();
    },
    clearKey() {
      this.$confirm("你确定要清空缓存数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delAllRedis().then((res) => {
            console.log(res);
          });
          this.search();
          this.$message({
            type: "success",
            message: "成功清除系统缓存数据!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清除系统缓存数据",
          });
        });
    },
  },
  created() {
    this.search();
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
    text-align: left;
  }
  /deep/ .el-input__inner {
    height: 34px;
    line-height: 34px;
  }
  .table-column {
    text-overflow: clip;
  }
  /deep/ .el-table td.el-table__cell div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>