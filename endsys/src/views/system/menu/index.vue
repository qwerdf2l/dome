<template>
  <el-container class="box">

    <el-row class='col-box'>
      <!-- 搜索组 -->
      <el-col :span="3">
        <el-input v-model="menusTab.blurry" placeholder="模糊搜索" size="mini"></el-input>
      </el-col>
      <!-- 时间组 -->
      <el-col :span="6">
        <el-date-picker
        size="mini"
        style="width:100%"
        v-model="dates" 
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeDate">
        </el-date-picker>
      </el-col>
      <!-- 按钮组 -->
      <el-col :span="4" class="bnt">
        <el-button type="success" size="mini" @click="sech"><i class="el-icon-search" ></i> 搜索</el-button>
        <el-button type="primary" size="mini"><i class="el-icon-plus"></i> 新增</el-button>
        <el-button type="warning" size="mini"><i class="el-icon-download"></i> 导出</el-button>
      </el-col>

    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col :span="24">
        <template>
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
              prop="name"
              label="姓名">
              
            </el-table-column>
            <el-table-column
              prop=""
              label="图标"
              width="70px">
              <template scope="scope">
                <i :class="'el-icon-'+ scope.row.icon"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="sort"
              label="排序"
              width="70px">
            </el-table-column>
            <el-table-column
              prop="path"
              label="路由地址">
            </el-table-column>
            <el-table-column
              prop="permission"
              label="权限标识"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="component"
              label="组件路径"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="iframe"
              label="外链"
              width="60px">
            </el-table-column>
            <el-table-column
              prop="cache"
              label="缓存"
              width="60px">
            </el-table-column>
            <el-table-column
              prop="hidden"
              label="可见"
              width="60px">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import {assignMenu} from '@/api/menu'
export default {
  name:'myMneu',
  data() {
    return {
      dates:[],
      loading:false,
      //按条件查找
      icon:'',
      menusTab:{
        page: 0,
        size: 10,
        sort: "id,desc",
        blurry:undefined,       //搜索
        startTime:undefined,   //日期1
        endTime:undefined      //日期2  
      },
      //menus数据数组
      tableData: []
    }
  },
  methods: {
    //编辑
    handleClick(row) {
      console.log(row);
    },
    //按条件搜索
    sech(){
      this.loading=true
      assignMenu(this.menusTab).then(res=>{
        this.loading=false
        this.tableData=res.content;
        this.tableData.map(item => {
          if(!item.iframe){
            item.iframe='否'
          }else{
            item.iframe='是'
          }
          if(!item.cache){
            item.cache='否'
          }else{
            item.cache='是'
          }
          if(!item.hidden){
            item.hidden='否'
          }else{
            item.hidden='是'
          }
        });
        console.log(this.menusTab);
      })
    },
    //事件转换与回写
    changeDate(e){
      console.log(e);
      this.menusTab.startTime=e[0].toLocaleString().replace(/\//g,'-');
      this.menusTab.endTime=e[1].toLocaleString().replace(/\//g,'-');
    }
  },
  created() {
    this.sech()
  },
}
</script>

<style lang="less" scoped>
.box{
  display: block;
}
.col-box{
  display: flex;
  margin:15px 0px;
  width: 100%;
  .el-col{
    margin-right: 10px;
  }
  .bnt{
    display: flex;
    text-align: left;
    align-items: center;
    .el-button{
      margin-left: 5px;
    }
  }
}

</style>