
<template>
  <el-row>
    <el-form :model="form" :inline="true">
      <el-form-item>
        <el-input
          v-model="form.blurry"
          clearable
          size="small"
          placeholder="输入部门名称搜索"
          style="width: 200px; margin-right: 10px;"
          class="filter-item"
          @input="searchInput"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          style="width: 200px; margin-right: 10px;"
          v-model="formTiem"
          type="daterange"
          range-separator=":"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form.enabled"
          placeholder="状态"
          style="width:90px;margin: 0px 10px;"
          @input="enabledInput"
        >
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-search" @click="searchClick">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addUserList">新增</el-button>
        <el-button type="warning" icon="el-icon-download">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="deptList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="姓名" hidden="20" width="300px"></el-table-column>
      <el-table-column prop="enabled" label="状态" width="180">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="日期">
        <template slot-scope="scope">
          <span>{{endTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="revise(scope.row)"></el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="onDelete(scope.row.id)">
            <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
import { mygetMenu } from "@/api/user";
import { publicTime } from "@/utils/common";
export default {
  name: "myVue",
  data() {
    return {
      deptList: [], //部门列表
      // 表单数据
      form: {
        page: 0, //页码
        size: 10, //每页条数
        sort: "id,desc", //排序方式
        blurry: undefined,
        enabled: undefined,
        startTime: undefined,
        endTime: undefined
      },
      formTiem: "", //时间段
      //状态下拉框数据
      selectOptions: [
        {
          value: "true",
          label: "启用"
        },
        {
          value: "false",
          label: "禁用"
        }
      ],
      //tree默认属性
      defaultProps: {
        children: "children",
        label: "label"
      },
      //dept部门请求参数
      deptParams: {
        page: 0, //页码
        size: 10, //每页条数
        sort: "id,desc" //排序方式
      }
    };
  },
  created() {
    mygetMenu(this.deptParams).then(res => {
      this.deptList = res.content;
    });
    // this.searchClick();
  },
  methods: {
    // 时间戳转换
    endTime(tiem) {
      return publicTime(tiem);
    },
    // 搜索框
    searchInput() {},
    // 日期框
    changeTime(tiem) {
      this.form.startTime = publicTime(tiem[0]);
      this.form.endTime = publicTime(tiem[1]);
    },
    // 状态下拉框
    enabledInput() {},
    searchClick() {
      mygetMenu(this.form).then(res => {
        this.deptList = res.content;
        console.log(res.content);
      });
    },
    addUserList() {}
  }
};
</script>
<style scoped>
</style>