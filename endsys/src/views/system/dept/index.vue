<template>
  <div class="dept_box">
    <el-row>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="80px" :inline="true">
          <el-form-item>
            <el-input v-model="form.name" placeholder="输入部门名称搜索">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="block">
              <el-date-picker
                v-model="selTime"
                type="daterange"
                range-separator=":"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="sel_date"
                @change="dateChange"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" v-model="form.enabled" class="state">
              <el-option label="激活" :value="true"></el-option>
              <el-option label="锁定" :value="false"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              @click="searchTab"
              type="success"
              class="btn"
              icon="el-icon-search"
            >
              搜索</el-button
            >
            <el-button
              type="primary"
              class="btn"
              icon="el-icon-plus"
              @click="addDept"
            >
              新增</el-button
            >
            <el-button type="warning" class="btn" icon="el-icon-download">
              导出</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          style="width: 100%"
          default-expand-all
        >
          <el-table-column label="名称" prop="name">
            <template #default="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="enabled">
            <template #default="scope">
              <el-switch
                v-model="scope.row.enabled"
                active-color="#409eff"
                inactive-color="red"
                @change="changeStatus(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="createTime">
            <template #default="scope">
              <span>{{ new Date(scope.row.createTime).toLocaleString() }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                class="operate"
                @click="updateDept(scope.row)"
              ></el-button>
              &nbsp;
              <el-popover placement="top" width="160" :ref="scope.row.id">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="$refs[scope.row.id].doClose()"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="delDept(scope.row)"
                    >确定</el-button
                  >
                </div>
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  class="operate"
                ></el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <DialogForm
      :dialogFormVisible.sync="isShow"
      @closeDialog="closeDialog"
      ref="dialogObj"
      :isUpdate="isUpdate"
    />
  </div>
</template>

<script>
import { getDept, delDept, updateDept } from "../../../api/dept";
import DialogForm from "./DialogForm.vue";
export default {
  name: "myDept",
  created() {
    this.searchTab();
  },
  components: {
    DialogForm,
  },
  data() {
    return {
      isShow: false,
      isUpdate: false,
      selTime: [],
      form: {
        page: 0,
        size: 10,
        sort: "id,desc",
        name: "",
        time: undefined,
        stateTime: undefined,
        endTime: undefined,
        enabled: undefined,
      },
      tableData: [],
    };
  },
  methods: {
    update(row) {
      console.log(row);
    },
    searchTab() {
      getDept(this.form).then((res) => {
        console.log(res);
        this.tableData = res.content;
      });
    },
    dateChange(e) {
      this.form.stateTime = e[0].toLocaleString().replace(/\//g, "-");
      this.form.endTime = e[1].toLocaleString().replace(/\//g, "-");
    },
    closeDialog() {
      this.isShow = false;
    },
    addDept() {
      this.isUpdate = false;
      this.isShow = true;
      this.$refs["dialogObj"].qryDept();
    },
    updateDept(row) {
      this.isUpdate = true;
      this.isShow = true;
      console.log(row);
      console.log({ ...row, deptId: row.id });
      this.$refs["dialogObj"].form = { ...row, deptId: row.id };
      this.$refs["dialogObj"].qryDept();
    },
    delDept(row) {
      console.log(row);
      delDept(row.id).then((res) => {
        console.log(res);
        this.$refs[row.id].doClose();
        this.$message({
          message: "删除部门成功！",
          type: "success",
        });
      });
      setTimeout(() => {
        this.searchTab();
      }, 500);
    },
    changeStatus(row) {
      let str = row.enabled ? "启动" : "停用";
      this.$confirm(`此操作将"${str}"${row.name}部门，是否继续`, "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateDept(row).then((res) => {
            console.log(res);
            this.$message({
              message: "操作成功",
              type: "success",
            });
          });
          this.searchTab()
        })
        .catch(() => {
          this.$message({
            message: "取消操作",
            type: "info",
          });
          this.searchTab()
        });
    },
  },
};
</script>

<style lang="less" scoped>
.dept_box {
  margin-top: 20px;
  text-align: left;
  .el-input {
    width: 250px;
    margin-right: 10px;
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