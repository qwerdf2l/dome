<template>
  <div>
    <div class="user_title">
      <el-input v-model="logData.blurry" placeholder="请输入你要搜索的内容"></el-input>
      <el-date-picker v-model="formDate" type="daterange" range-separator=":" start-placeholder="开始日期"
        end-placeholder="结束日期" @change="changeDate">
      </el-date-picker>&nbsp;
      <el-button class="selectBtn" type="primary" icon="el-icon-search" @click="selectClick">搜索</el-button>
      <el-button class="exportBtn" type="primary" icon="el-icon-download" @click="exportClick">导出</el-button>
    </div>

    <el-table :data="logTable.content" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="请求方法">
              <span>{{ props.row.method }}</span>
            </el-form-item><br />
            <el-form-item label="请求参数">
              <span>{{ props.row.params }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username">
      </el-table-column>
      <el-table-column label="IP" prop="requestIp">
      </el-table-column>
      <el-table-column label="IP来源" prop="address">
      </el-table-column>
      <el-table-column label="描述" prop="description">
      </el-table-column>
      <el-table-column label="浏览器" prop="browser">
      </el-table-column>
      <el-table-column label="请求耗时" prop="time">
        <template slot-scope="scope">
          <p>{{ scope.row.time + 'ms' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" prop="createTime">
        <template slot-scope="scope">
          {{ getDate(scope.row.createTime) }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, prev, pager, next, sizes" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getLog } from '@/api/monitor'
export default {
  name: 'myLog',
  data() {
    return {
      // 表单日期数据
      formDate: '',
      logData: {
        page: 0,
        size: 10,
        sort: 'id,desc',
        blurry: '',
        logType: 'INFO',
        startTime: undefined,
        endTime: undefined
      },
      logTable: [],
      currentPage: 0,
      pageSize: 10,
      total: 0,
    }
  },
  created(){
    this.selectClick()
  },
  methods: {
    // 选择日期
    changeDate(data) {
      this.logData.startTime = this.getDate(data[0]);
      this.logData.endTime = this.getDate(data[1]);
    },
    // 搜索日志
    selectClick() {
      // page: 0
      // size: 10
      // sort: id,desc
      // blurry: a
      // logType: ERROR
      getLog(this.logData).then(res => {
        console.log(res);
        this.logTable = res
        this.total = res.totalElements
      })
    },
    // 导出日志
    exportClick() {

    },
    getDate(date) {
      if (/^\d+$/.test(date)) {
        var d = new Date(date);
        return d.toLocaleString().replace(/\//g, "-");
      }
      return date.toLocaleString().replace(/\//g, "-");
    },
    // 选择每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.logData.size = val;
      this.selectClick();
    },
    // 选择页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.logData.page = val - 1;
      this.selectClick();
    }
  }
}
</script>

<style lang="less" scoped>
.user_title {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  .el-input {
    width: 200px;
    margin-right: 10px;
  }

  .el-date-editor {
    width: 230px;
  }

  .selectBtn {
    background-color: #42d885;
    border-color: #42d885;
  }

  .insertBtn {
    background-color: #1890ff;
    border-color: #1890ff;
  }

  .exportBtn {
    background-color: #FFBA00;
    border-color: #FFBA00;
  }
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
  width: 100%;

  /deep/ .el-form-item__label {
    width: 70px;
    color: #99a9bf;
  }
}

/deep/ .el-table__cell {
  padding: 5px;
  font-size: 12px;
}

/deep/ .cell p {
  width: 80px;
  color: #1890ff;
  background-color: #e8f4ff;
  border: 1px solid #d1e9ff;
  border-radius: 4px;
  text-align: center;
  padding: 5px 0px;
}

.el-pagination{
    margin-top: 10px;
    text-align: left;
}
</style>