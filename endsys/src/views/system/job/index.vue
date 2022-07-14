<template>
  <el-container >
    <el-row>
      <el-form :inline="true">
        <!-- 岗位搜索 -->
        <el-form-item style="width:200px">
          <el-input v-model="form.name" placeholder="输入岗位名称搜索"></el-input>
        </el-form-item>

        <!-- 时间选择 -->
        <el-form-item >
          <el-date-picker
        style="width:220px"
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateChange"
          ></el-date-picker>
        </el-form-item>

        <!--  状态-->
        <el-form-item >
          <el-select v-model="form.enabled" placeholder="请选择" style="width:90px">
            <el-option label="正常" :value="true"></el-option>

            <el-option label="禁用" :value="false"></el-option>
          </el-select>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="Search">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="xinzeng">新增</el-button>
          <el-button type="warning" icon="el-icon-download">导出</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column prop="name" label="名称"></el-table-column>

        <el-table-column prop="dept" label="所属部门">
          <template #default="scpoe">{{scpoe.row.deptSuperiorName}}/{{scpoe.row.dept.name}}</template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>

        <el-table-column label="状态">
          <template #default="scper">
            <el-switch v-model="scper.row.enabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>

         <el-table-column  label="时间">
           <template #default="scoper">
             {{getDate(scoper.row.createTime)}}
           </template>
         </el-table-column>

         <el-table-column  label="操作">
           <template #default="scope">
             <el-button type="primary" icon="el-icon-edit" @click="xiugai(scope.row)"></el-button>
             <el-button type="danger" icon="el-icon-delete"></el-button>
           </template>
         </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话提示框 -->
      <jobForm :dialogVisible.sync="dialogVisible" :bianji="bianji" ref="deptdate"></jobForm>
    </el-row>
  </el-container>
</template>

<script>
import { getJob } from "@/api/job";
import jobForm from "./jobForm.vue";

export default {
  name: "myJob",
  data() {
    return {
      // 表单
      form: {
        page: 0,
        size: 5,
        sort: "sort,asc",
        name: undefined,
        startTime: undefined,
        endTime: undefined,
        enabled: true
      },
      date: "", //时间
      // 表格
      tableData: [],      
      total:0,         //总页数
      currentPage:0,   //当前页数
      pageSize:5,     //每页显示多少条

      dialogVisible:false,  //是否显示对话框
      bianji:false        //  新增和编辑的显示
    };
  },

  //组件引入库
  components:{
    jobForm
  },

  //生命周期
  created() {
    this.Search()
  },

  // 点击事件
  methods: {
    //搜索
    Search() {
      getJob(this.form).then(res => {
        console.log(res);
        this.tableData = res.content
        this.total = res.totalElements
      });
    },

    //时间
    dateChange(e) {
      this.form.endTime = e[0].toLocaleString().replace(/\//g, "-");
      this.form.startTime = e[1].toLocaleString().replace(/\//g, "-");
      console.log(this.form);
      console.log(e);
    },

    // 时间戳
    getDate(time){
      var b = new Date()
      b.setTime(time)
      let dates = b.toLocaleString().replace(/\//g,'-')
      return dates
    },

    //每页条数
    handleSizeChange(e){
      this.pageSize = e;
      this.form.size = e
      this.Search()
    },

    //当前页，改变时触发
    handleCurrentChange(e){
      this.currentPage = e
      this.form.page = e-1
      this.Search()
    },

    //修改
    xiugai(row){
       this.dialogVisible = true;
      this.bianji = true;
      console.log(row);
    },
    //新增
    xinzeng(){
      this.bianji = false;
      this.dialogVisible = true;
      console.log(this.$refs['deptdate']);
      this.$refs['deptdate'].deptSearch();
      
    }
  }
};
</script>

<style lang="less" scoped>
.el-row{
  width: 100%;
  text-align: left;
}
.el-pagination {
  margin-top: 20px;
  text-align: left;
}
</style>