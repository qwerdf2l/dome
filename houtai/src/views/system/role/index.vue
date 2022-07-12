
<template>
  <el-row>
    <el-col class="roles" :xs="25" :sm="25" :md="17" :lg="17" :xl="17">
      <el-form :inline="true" :data="form">
        <el-form-item>
          <el-input v-model="form.blurry" placeholder="请输入名称或者描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="daterange"
            range-separator=":"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 200px"
            @change="getTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="searchClick" size="mini">搜索</el-button>
          <el-button type="primary" class="el-icon-plus" size="mini" @click="addRoleClick">新增</el-button>
          <el-button type="warning" class="el-icon-download" size="mini">导出</el-button>
        </el-form-item>
      </el-form>
      <el-col class="roles_list">
        <div class="roles_list_text">角色列表</div>
        <el-table :data="rolesList">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="dataScope" label="数据权限"></el-table-column>
          <el-table-column prop="permission" label="角色权限"></el-table-column>
          <el-table-column prop="level" label="角色级别"></el-table-column>
          <el-table-column prop="remark" label="描述"></el-table-column>
          <el-table-column prop="createTime" label="创建日期">
            <template #default="scope">
              <el-tooltip
                class="item"
                effect="dark"
                :content="tabTime(scope.row.createTime)"
                placement="top"
              >
                <span class="createTime">{{tabTime(scope.row.createTime)}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="editRoleClick(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteRoleClick(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-col>

    <el-col :span="6" class="menu_db hidden-sm-only hidden-sm-and-down">
      <el-col class="menu_db_text">
        <span>菜单分配</span>
        <el-button class="el-icon-check btn" type="primary" size="mini">保存</el-button>
      </el-col>
      <el-col>
        <el-tree
          :data="multipleTable"
          :props="defaultProps"
          ref="tree"
          show-checkbox
          check-strictly
        ></el-tree>
      </el-col>
    </el-col>
    <el-col>
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
    <add-role
      ref="childrenAddRole"
      :absolute="absolute"
      :dialogFormVisible.sync="dialogFormVisible"
    ></add-role>
  </el-row>
</template>
<script>
import { publicTime } from "@/utils/common";
import { getRole } from "@/api/roles";
import { getMenus } from "@/api/login";
import addRole from "./addRoles";
export default {
  name: "myVue",
  data() {
    return {
      // 角色列表
      rolesList: [],
      //
      form: {
        page: 0,
        size: 10,
        sort: "level,asc",
        blurry: undefined,
        startTime: undefined,
        endTime: undefined
      },

      // 菜单分配
      multipleTable: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      pageSize: 10,
      currentPage: 0,
      total: 0,
      dialogFormVisible: false,
      absolute: false
    };
  },
  created() {
    getMenus().then(res => {
      this.multipleTable = res;
    });
    this.searchClick();
  },
  // 注册组件
  components: {
    addRole
  },
  methods: {
    //
    tabTime(time) {
      return publicTime(time);
    },
    //
    getTime(val) {
      this.form.startTime = publicTime(val[0]);
      this.form.endTime = publicTime(val[1]);
    },
    //  搜索
    searchClick() {
      getRole(this.form).then(res => {
        this.rolesList = res.content;
        this.total = res.totalElements;
      });
    },
    // 菜单分配
    handleNodeClick(data) {
      console.log(data);
    },

    // 新增角色
    addRoleClick() {
      this.dialogFormVisible = true;
      this.absolute = true;
    },
    // 编辑角色
    editRoleClick(val) {
      this.dialogFormVisible = true;
      this.absolute = false;
      console.log(val);
    },
    // 分页 切换
    handleCurrentChange(val) {
      this.form.page = val;
      this.searchClick();
    },
    //
    handleSizeChange(id) {
      this.form.size = id;
      this.pageSize = id;
      this.searchClick();
    }
  }
};
</script>
<style lang="less" scoped>
.roles {
  .roles_list {
    margin-top: 20px;
    border: solid 1px #ccc;
    border-radius: 5px;
    .roles_list_text {
      font-size: 16px;
      font-weight: bold;
      padding: 20px;
    }
    .cell {
      font-size: 12px;
    }
    .createTime {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.menu_db {
  margin: 83px 20px;
  border: solid 1px #ccc;
  border-radius: 5px;
  position: absolute;
  right: 0;
  .menu_db_text {
    font-size: 16px;
    font-weight: bold;
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
