<template>
  <el-dialog
    :title="isUpdate == true ? '修改部门' : '新增部门'"
    :visible="dialogFormVisible"
    @close="close"
    class="dialog"
  >
    <el-form :model="form" ref="form" :rules="rules">
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="名称"
            prop="name"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              class="role"
            ></el-input> </el-form-item
        ></el-col>
        
      </el-row>

      <el-row>
        <el-col :span="12"
          ><el-form-item label="状态">
            <el-radio-group v-model="form.enabled">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">停用</el-radio>
            </el-radio-group>
          </el-form-item></el-col
        >
      </el-row>

      <el-row>
        <el-col :span="24"
          ><el-form-item
            prop="deptId"
            label="上级部门"
          >
            <TreeSelect
              v-model="form.deptId"
              :options="deptOptions"
              @select="selectTree"
              placeholder="请选择上级部门"
            /> </el-form-item
        ></el-col>
      </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDept,addDept,updateDept } from "@/api/dept";

import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "DialogForm",
  props: ["dialogFormVisible", "isUpdate"],
  components: {
    TreeSelect,
  },
  data() {
    return {
      deptOptions:[],
      form: {
        createTime: new Date().getTime(),
        enabled: true,
        id: '',
        label: "1",
        name: "",
        deptId: null,
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在3到10个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    close() {
      this.$emit("closeDialog", false);
    },
    qryDept() {
      getDept({ enabled: true }).then((res) => {
        this.deptOptions = res.content;
      });
    },
    selectTree(item) {
      this.form.label = item.label
      this.form.pid = item.pid
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.isUpdate) {
            addDept(this.form).then((res) => {
              console.log(res);
              this.$notify({
                title: "成功",
                message: "添加部门成功",
                type: "success",
              });
              this.$refs["form"].resetFields();
              setTimeout(() => {
                this.$parent.searchTab();
              }, 500);
            });
          } else {
            updateDept(this.form).then((res) => {
              console.log(res);
            });
            this.$notify({
              message: "修改部门成功",
              type: "success",
            });
            this.$nextTick(function(){
              this.$refs["form"].resetFields();
            })
            console.log(this.$refs["form"]);
            setTimeout(() => {
              this.$parent.searchTab();
            }, 500);
          }

          this.close();
        } else {
          console.log("fail!");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog {
  padding: 0px;
  line-height: 0px;
  text-align: left;
  .role {
    width: 100%;
  }
}
</style>