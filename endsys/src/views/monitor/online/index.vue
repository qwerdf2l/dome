<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
    :inline="true"
    class="form-box"
    :data="tableData"
  >
    <div class="top">
      <el-form-item>
        <el-input v-model="form.search" placeholder="全表模糊搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="setOnline"
          >搜索</el-button
        >
        <el-button type="warning" icon="el-icon-download">导出</el-button>
      </el-form-item>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="userName"
          label="用户名"
          width="180"
        ></el-table-column>

        <el-table-column prop="job" label="岗位" width="180"></el-table-column>

        <el-table-column prop="ip" label="登录lP"> </el-table-column>

        <el-table-column prop="address" label="登录地点"> </el-table-column>

        <el-table-column prop="browser" label="浏览器"> </el-table-column>

        <el-table-column prop="loginTime" label="登录时间">
          <template #default="scope">
            {{ getdata(scope.row.loginTime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" class="but">
          <template #default="scope">
            <el-button type="text" @click="tisroKuo(scope.row)">
              踢出</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="down">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </el-form>
</template>

<script>
import { getOnline, delOnline } from "@/api/online";
export default {
  name: "myOnline",
  data() {
    return {
      currentPage: 1,
      form: {
        search: "",
      },
      //获取删除索引
      ssrking: {
        page: 0,
        size: 10,
      },
      tableData: [],
      //表单数据
      forms: {
        address: "",
        browser: "",
        ip: "",
        job: "",
        loginTime: "",
        userName: "",
      },
    };
  },
  created() {
    this.setOnline();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    setOnline() {
      // eslint-disable-next-line no-undef
      getOnline({ page: this.currentPage - 1, size: 10 }).then((res) => {
        console.log(res);
        this.tableData = res.content;
        console.log(this.tableData);
      });
    },
    getdata(time) {
      var d = new Date();
      d.setTime(time);
      var local = d.toLocaleString().replace(/\//g, "-");
      return local.substr();
    },
    tisroKuo(index) {
      console.log(index);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          delOnline(index.key).then((res) => {
            console.log(res);
          });
          this.setOnline()
          // felOnline({...this.ssrking}).then(res=>{
          //   console.log(res);
          // })
          
              this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
        })
        .catch(() => {
           this.$notify.error({
          title: '取消',
          message: '已取消删除'
        });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.form-box {
  .top {
    margin: 20px 0 10px 5px;
    height: 50px;
    line-height: 50px;
    text-align: left;
  }
  .down {
    margin-top: 10px;
    text-align: left;
  }
}
</style>