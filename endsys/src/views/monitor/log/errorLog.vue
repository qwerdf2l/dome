
<template>
  <div class="errorlog">
    <el-row class="search">
      <el-col>
        <el-input
          placeholder="请输入你要搜索的内容"
          v-model="blurry"
          size="mini"
          style="width:200px"
          clearable
        ></el-input>
      </el-col>
      <el-col>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator=":"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          @change="dateChange"
        ></el-date-picker>
      </el-col>
      <el-col>
        <el-button icon="el-icon-search" size="mini" type="success" @click="Search">搜索</el-button>
      </el-col>
      <el-col>
        <el-button type="warning" size="mini" icon="el-icon-download">导出</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="请求参数">
                <span>{{ props.row.params }}</span>
              </el-form-item>
              <el-form-item label="请求方法">
                <span>{{ props.row.method }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="IP" prop="requestIp"></el-table-column>
        <el-table-column label="IP来源" prop="address"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="浏览器" prop="browser"></el-table-column>
        <el-table-column label="创建日期">
          <template #default="scope">
            <div>{{getDateByTime(scope.row.createTime)}}</div>
            <div></div>
          </template>
        </el-table-column>
        <el-table-column label="异常详情" prop="yalid">
          <template #default="scope">
            <div @click="off(scope.row.id)">查看详情</div>
            
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  <errorDiaLog ref="Log" :dialogErrorVisible.sync="showFlag" @cancel:dialogErrorVisible="getFlag" ></errorDiaLog> 
  </div>
   
</template>

<script>
import { getLogError } from "@/api/log";
import errorDiaLog from "@/components/errorDiaLog";
export default {
  
  name: "errorLog",
  data() {
    return {
      date:"",
      blurry: undefined,
      createDate: undefined || '',
      endDate: undefined || '',
      showFlag:false,
      tableData: []
    };
  },
 
  methods: {
    Search() {
      getLogError({
        page: 0,
        size: 10,
        sort: "id,desc",
        logType: "ERROR",
        blurry: this.blurry,
        startTime: this.createDate,
        endTime: this.endDate
      }).then(res => {
        this.tableData = res.content;
      });
    },
    getDateByTime(time) {
      var d = new Date();
      d.setTime(time);
      var local = d
        .toLocaleDateString()
        .replace(/\//g, "-")
        .replace(" 上午", " ");
      return local;
    },
    dateChange(e) {
      console.log(e);
      this.createDate = e[0]
        .toLocaleString()
        .replace(/\//g, "-")
        .replace(" 上午", " ");
      this.endDate = e[1]
        .toLocaleString()
        .replace(/\//g, "-")
        .replace(" 上午", " ");
    },
    getFlag(flag){
      this.showFlag = flag
    },
    off(index){
      this.showFlag = true;
      console.log(this.$refs["Log"]);
      this.$refs["Log"].outputError(index)
    }
  },
  created() {
    getLogError({ page: 0, size: 10, sort: "id,desc", logType: "ERROR" }).then(
      res => {
        this.tableData = res.content;
      }
    );
  },
  components:{
    errorDiaLog
  }
};
</script>

<style lang="less" >
.errorlog {
  width: 100%;
  .search {
    display: flex;
    margin-top: 10px;
    &:el-col {
      margin: 10px;
    }
  }
  .table {
    display: flex;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>