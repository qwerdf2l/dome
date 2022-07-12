
<template>
  <!-- <el-container class="user_box"> -->
  <el-row class="user_box">
    <!-- 侧边部门 -->
    <el-col :span="5">
      <el-input
        v-model="filterText"
        style="width: 200px; margin-right: 10px;"
        placeholder="请输入部门名称"
        prefix-icon="el-icon-search"
      ></el-input>
      <el-tree
        :data="userMenu.content"
        :props="treeProps"
        :default-expand-all="true"
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleCheck"
      ></el-tree>
    </el-col>
    <!-- 用户数据 -->
    <el-col :span="19">
      <el-form :model="form" :inline="true">
        <el-form-item>
          <el-input
            v-model="form.blurry"
            clearable
            size="small"
            placeholder="输入名称或者邮箱搜索"
            style="width: 200px; margin-right: 10px;"
            class="filter-item"
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
          <el-select v-model="form.enabled" placeholder="状态" style="width:90px;margin: 0px 10px;">
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
      <el-table :data="userData.content" style="width: 100%;height:100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="部门/岗位">
          <template #default="scope">{{scope.row.dept.name}}/{{scope.row.job.name}}</template>
        </el-table-column>
        <el-table-column prop="enabled" label="状态">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
          <template #default="scope">
            <span>{{new Date(scope.row.createTime).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" @click="revise(scope.row)"></el-button>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="onDelete(scope.row.id)">
              <el-button slot="reference" type="danger" icon="el-icon-delete"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 20, 30,]"
        :page-size="pageSize"
        layout="total,prev, pager, next,sizes"
        :total="total"
      ></el-pagination>
    </el-col>
    <!-- 新增 -->
    <add-user
      ref="headerChild"
      :dialogFormVisible.sync="dialogFormVisible"
      :addTitle="addTitle"
      :form="form"
      :setAddForm="setAddForm"
    ></add-user>
  </el-row>

  <!-- </el-container> -->
</template>
<script>
import { mapState } from "vuex";
import { mygetMenu, mygetUserData } from "@/api/user";
import { publicTime, getUser } from "@/utils/common";
import { myDelete } from "@/api/delect";
import addUser from "./addUser";
export default {
  name: "myVue",
  data() {
    return {
      // 部门搜索框
      filterText: "",
      time: "",
      treeProps: {
        children: "children",
        label: "name"
      },
      // form表单
      formTiem: "",
      // form状态按钮
      selectOptions: [
        {
          value: "true",
          label: "激活"
        },
        {
          value: "false",
          label: "锁定"
        }
      ],
      form: {
        page: 0, //当前页码
        size: 10, //每页条数
        sort: "id,desc", //安id排序降序
        blurry: undefined, //
        startTime: undefined, //
        endTime: undefined, //
        enabled: undefined, //
        deptId: undefined // 部门id
      },
      // 修改
      setAddForm: {},
      // 隐藏新增弹窗
      dialogFormVisible: false,
      addTitle: false,
      // 角色
      // roles: [],
      // 当前页
      currentPage: 0,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0
    };
  },
  // 映射
  computed: {
    ...mapState("user", ["userStatus", "userMenu", "userData"])
  },
  // 注册组件
  components: {
    addUser
  },
  created() {
    // 用户管理的状态按钮
    // mygetUserStatus().then(res => console.log(res));
    // 用户管理分类部门的数据
    mygetMenu({sorrt:'id,desc'}).then(res => this.$store.commit("user/setUserMenu", res));
    // 用户管理信息
    // this.searchClick();
    this.searchClick();
  },
  watch: {
    // 节点过滤
    filterText: function(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 部门节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 时间格式化
    changeTime(a) {
      this.form.startTime = publicTime(a[0]);
      this.form.endTime = publicTime(a[1]);
    },
    // 部门点击
    handleCheck(data) {
      this.form.deptId = data.id;
      getUser(this.form);
    },

    // 搜索查询用户
    searchClick() {
      mygetUserData(this.form).then(res => {
        this.$store.commit("user/setUserData", res);
        this.total = res.totalElements;
      });
    },
    // 删除用户
    onDelete(id) {
      myDelete(id).then(res => {
        console.log(res);
        getUser(this.form);
      });
      this.$notify({
        title: "删除成功",
        message: "",
        type: "success"
      });
    },
    // 修改用户
    revise(scope) {
      this.dialogFormVisible = true;
      this.addTitle = false;
      this.setAddForm = scope;
      this.$refs.headerChild.setChange();
    },
    // 分页
    // 改变每页显示条数
    handleSizeChange(id) {
      this.form.size = id;
      this.pageSize = id;
      getUser(this.form);
    },

    handleCurrentChange(val) {
      this.form.page = val;
      getUser(this.form);
    },

    // 新增用户
    addUserList() {
      this.addTitle = true;
      this.dialogFormVisible = true;
      console.log(this.dialogFormVisible);
      // getRoles().then(res => {
      //   this.roles = res;
      // });
      this.$refs.headerChild.setChange();
      this.$refs.headerChild.userAddForm = {
        dept: {},
        email: undefined,
        enabled: undefined,
        job: {},
        phone: undefined,
        roles: [],
        username: ""
      };
    }
  }
};
</script>
<style lang="less" scoped>
.user_box {
  background-color: #fff;
  .el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
  .el-tree {
    margin-top: 20px;
  }
  .el-button {
    font-size: 12px;
    width: 73px;
  }
  .el-table {
    font-size: 12px;
    .el-table__row {
    }
    .el-switch {
      margin-bottom: 10px;
    }
    .el-button {
      width: 45px;
    }
  }
  .el-dropdown {
    margin-right: 10px;
  }
}
</style>
