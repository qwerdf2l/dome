<template>
  <el-container class="box1">
    <el-row class="head-box1" :gutter="20">
      <el-col :span="4" style="margin-top: 20px">
        <el-input
          placeholder="请输入部门"
          prefix-icon="el-icon-search"
          witdh="200"
          v-model="deptName"
          @input="dept"
          clearable
        >
        </el-input>
        <el-tree
          :data="dataDept"
          :props="defaultProps"
          @node-click="dianji"
          style="margin-top: 20px"
          :default-expand-all="true"
        ></el-tree>
      </el-col>

      <el-col :span="19">
          <!-- //表单 -->
          <el-form ref="form" :model="form" label-width="80px" :inline="true" style="margin-top:20px;text-align: left">
  <el-form-item>
    <el-input v-model="form.blurry" placeholder="请输入名称或邮箱" style="width:145px"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width:200px"
      @change="changeTime"
      >
    </el-date-picker>
    
  </el-form-item>
  <el-form-item>
    <el-select v-model="form.enabled" clearable placeholder="请选择" style="width:110px">
    <el-option
      label="激活"
      :value="true">
    </el-option>
    <el-option
      label="锁定"
      :value="false">
    </el-option>
  </el-select>
  </el-form-item>
 
      <!-- //按钮 -->
  <el-form-item>
    <el-button type="success" icon="el-icon-search" @click="serach">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus">新增</el-button>
    <el-button type="warning" icon="el-icon-download">导出</el-button>
  </el-form-item>
</el-form>
<!-- //表格 -->
 <el-table
    :data="tableData"
    border
    style="width: 100%"
    v-loading="loding"
    >
    <el-table-column
      prop="username"
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      >
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      >
    </el-table-column>
    <el-table-column
      label="岗位"  
      #default="obj"
      >
        <template>
            {{obj.row.dept.name}}
        </template>
    </el-table-column>
    <el-table-column
      label="状态"
       #default="obj"
     >
     <template>
            <el-switch
        v-model="obj.row.enabled"
        active-color="#13ce66"
        inactive-color="#ff4949">
        </el-switch>
        </template>
    </el-table-column>
    <el-table-column
       #default="obj"
        label="创建日期"
     >
        <template>
           {{ chnageDate(obj.row.createTime)}}
        </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template>
        <el-button type="primary" size="small" icon="el-icon-edit"></el-button>
        <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
      <el-row>
        <el-col :span="24" style="margin-top:20px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
        </el-col>
      </el-row>
     


      </el-col>
    </el-row>
  </el-container>
</template>

<script>
 import {getDept} from '@/api/dept'
 import {getUser} from '@/api/user'
export default {
  name: "myUser",
  data() {
    return {
      date:'',
      deptName:'',
      defaultProps: {
        label: "label",
        children: "children",
      },
      //部门列表
      dataDept: [],
        //加载用户数据
      tableData:[],
      //圈圈加载
      loding:true,

      form:{
        page: 0,
        size: 5,
        sort: 'id,desc',
        blurry: '',
        startTime: undefined,
        endTime: undefined,
        enabled:undefined,
      },
      //当前多少页
      currentPage:0,
      //每页多少条
      pageSize:5,
      //总数
      total:0,
    };
  },
  created(){
    this.dept()
    this.serach()
  },
  methods: {
    dianji(e) {
      console.log(e);
    },
    //请求部门
    dept(){
      const data={ name: this.deptName,sort:'id,desc'}
      getDept(data).then(res=>{
          this.dataDept = res.content
      })
    },
    //选择日期
    changeTime(e){
      console.log(e)
      this.form.startTime = e[0].toLocaleString().replace(/\//g, "-");
      this.form.endTime=e[1].toLocaleString().replace(/\//g,"-")
    },
    //时间转换
    chnageDate(time){
        var d = new Date();
        d.setTime(time);
        var local = d.toLocaleString().replace(/\//g, "-");
        return local.substr(0, 9);
    },
    //搜索 
    serach(){
      this.loding=true
        getUser(this.form).then(res=>{
          console.log(res)
          this.loding=false
          this.tableData=res.content

          this.total=res.totalElements
        })
    },
     //修改每页多少条
    handleSizeChange(e) {
      console.log(e);
      this.pageSize = e;
      this.form.size = e;
     this.serach()
    },
    //修改当前页
    handleCurrentChange(e) {
      console.log(e);
      this.form.page = e - 1;
      this.currentPage = e;
      this.serach()
    },

    

  },
};
</script>

<style lang="less" scoped>
.box1 {
  .head-box1 {
    width: 100%;
  }
}
</style>