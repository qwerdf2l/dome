<template>
  <div class="role">
    <el-row :gutter="20">
      <el-col style="text-align: left;" class="roleFrom">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="输入名称或者邮箱搜索" v-model="searchinfoFrom.blurry"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="block">
              <el-date-picker
                v-model="Creationtime"
                type="daterange"
                range-separator=":"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="topbtn" >
              <el-button type="success" size="mini" icon="el-icon-search" @click="roleSearch">搜索</el-button>
              <el-button type="primary" size="mini" icon="el-icon-plus" @click="roleAdd">新增</el-button>
              <el-button type="warning" size="mini" icon="el-icon-download">导出</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17">
        <div class="roleTable">
          <div class="roleTablehead">角色列表</div>
          <div class="roleTablebody">
            <el-table
              :data="roleData.content"
              style="width: 100%"
              v-loading="loading"
              highlight-current-row
              @current-change="TableClick"
              ref="singleTable"
            >
              <el-table-column property="name" label="名称"></el-table-column>
              <el-table-column property="dataScope" label="数据权限"></el-table-column>
              <el-table-column property="permission" label="角色权限"></el-table-column>
              <el-table-column property="level" label="角色级别"></el-table-column>

              <el-table-column label="描述" width="87" style="text-align:left">
                <template #default="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.row.remark"
                    placement="top"
                    :disabled="scope.row.remark.length>5?false:true"
                  >
                    <span>{{scope.row.remark}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="创建日期" width="130">
                <template #default="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="new Date(scope.row.createTime).toLocaleString().replace(/\//g, '-')"
                    placement="top"
                  >
                    <span>{{new Date(scope.row.createTime).toLocaleString().replace(/\//g, '-')}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                width="130"
                type="index"
                style="text-align:center"
              >
                <template #default="scope">
                  <div class="handlebtn">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click.stop="roleEdit(scope.row)"
                    ></el-button>
                    <el-popconfirm title="确定删除本条数据吗？" @confirm.stop="roleDelete(scope.row)">
                      <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="block page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40,50,100]"
                :page-size="10"
                layout="total, prev, pager, next, sizes"
                :total="roleData.totalElements"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>菜单分配</span>
            <el-button
              type="primary"
              icon="el-icon-check"
              :disabled="currentRow==null?true:false"
              @click="saveAssign"
            >保存</el-button>
          </div>
          <el-tree
            :data="roleTreeList"
            :props="defaultProps"
            accordion
            show-checkbox
            check-strictly
            :check-on-click-node="false"
            ref="tree"
            node-key="id"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="24">
        <roleAddEdit
          :dialogFormVisible.sync="fromDisplay"
          :addOredit="addOredit"
          :editFrom="editFrom"
        ></roleAddEdit>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getRole, deleteRoles, getRolesmenu } from "@/api/role";
import { ConfirmMenu } from "@/api/menu";
import roleAddEdit from "./roleAddEdit.vue";
export default {
  name: "MyRole",
  components: {
    roleAddEdit
  },
  data() {
    return {
      Creationtime: undefined, //选择的日期
      loading: false, //搜索加载图标
      //搜索提交的数据
      searchinfoFrom: {
        page: 0,
        size: 10,
        sort: "id,desc",
        blurry: undefined,
        startTime:
          this.Creationtime &&
          this.Creationtime[0].toLocaleString().replace(/\//g, "-"),
        endTime:
          this.Creationtime &&
          this.Creationtime[1].toLocaleString().replace(/\//g, "-")
      },
      // 点击表格获取的每行数据
      currentRow: null,
      defaultProps: {
        children: "children",
        label: "label"
      },
      fromDisplay: false, //对话框显示与隐藏
      addOredit: false, //判断是新增还是编辑
      editFrom: ""
    };
  },
  computed: {
    ...mapState("role", ["roleData", "roleTreeList"])
  },
  created() {
    this.$store.dispatch("role/searchroleData");
    this.$store.dispatch("role/searchroleTreeList");
  },
  methods: {
    // 新增按钮
    roleAdd() {
      this.fromDisplay = true;
    },
    // 编辑按钮
    roleEdit(row) {
      this.fromDisplay = true;
      this.addOredit = true;
      this.editFrom = row;
      console.log(row)
    },
    // 搜索角色按钮
    roleSearch() {
      this.loading = true;
      getRole(this.searchinfoFrom).then(res => {
        this.loading = false;
        this.$store.commit("role/setroleData", res);
      });
    },
    // 删除按钮
    roleDelete(row) {
      deleteRoles(row.id).then(res => {
        if (res == "") {
          this.$notify({
            title: "删除成功",
            type: "success"
          });
          this.$store.dispatch("role/searchroleData");
        }
      });
    },
    //选择几条一页
    handleSizeChange(size) {
      this.$store.commit("role/setroleSize", size);
      this.$store.dispatch("role/searchroleData");
    },
    //选择第几页的消息
    handleCurrentChange(page) {
      this.$store.commit("role/setrolePage", page - 1);
      this.$store.dispatch("role/searchroleData");
    },
    // 选中表格某一行获取这一行的数据
    TableClick(val) {
      this.currentRow = val;
      let arr = [];
      this.currentRow.menus.map(item => {
        arr.push(item.id);
      });
      this.$refs.tree.setCheckedKeys(arr);
    },
    // 保存菜单分配按钮
    saveAssign() {
      let arrs = [];
      console.log(this.$refs.tree.getCheckedNodes())
      this.$refs.tree.getCheckedNodes().map(item => {
        return arrs.push({
          id: item.id
        });
      });
      console.log(arrs)
      ConfirmMenu({
        id: this.currentRow.id,
        menus: arrs
      }).then(res => {
        if (res == "") {
          this.$notify({
            title: "保存成功",
            type: "success"
          });
        }
        getRolesmenu(this.currentRow.id).then(res => {
          return res;
        });
      });
    }
  }
};
</script>
<style scoped>
@import url("@/assets/Css/role.css");
</style>