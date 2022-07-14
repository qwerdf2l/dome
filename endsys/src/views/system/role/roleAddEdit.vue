<template>
  <div>
    <el-dialog
      :title="addOredit?'编辑角色':'新增角色'"
      :visible="dialogFormVisible"
      :before-close="handleClose"
      custom-class="roledialog"
    >
      <el-form
        :model="dialogForm"
        :inline="true"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm rolefrom"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="dialogForm.name" style="width:140px"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="permission">
          <el-input v-model="dialogForm.permission" style="width:140px"></el-input>
        </el-form-item>
        <el-form-item label="数据范围">
          <el-select
            v-model="dialogForm.dataScope"
            clearable
            filterable
            popper-class="level"
            @change="Scopechange"
          >
            <el-option
              v-for="item in scopeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色级别">
          <el-input-number v-model="dialogForm.level" controls-position="right" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="数据权限" label-width="80px" v-show="deptBol">
          <Treeselect
            v-model="dialogForm.depts"
            :options="$store.state.role.roleDept"
            placeholder="请选择部门"
            :flat="true"
            :multiple="true"
            @select="openOnInput"
            style="width: 400px"
          />
        </el-form-item>
        <el-form-item label="描述信息" style="width: 502px;text-align: left;">
          <el-input type="textarea" rows="5" v-model="dialogForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addRoles, editRoles } from "@/api/role";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getDept } from "@/api/dept";
export default {
  name: "roleAddEdit",
  props: ["dialogFormVisible", "addOredit", "editFrom"],
  data() {
    return {
      //验证提交的表单数据
      dialogForm: {
        name: "",
        permission: "",
        dataScope: 2,
        level: 3,
        remark: "",
        depts: []
      },

      // 验证数据的规则
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        permission: [
          {
            required: true,
            message: "请输入权限",
            trigger: "blur"
          }
        ]
      },

      scopeOptions: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "本级"
        },
        {
          value: 3,
          label: "自定义"
        }
      ],
      deptBol: false
    };
  },
  //   注册组件
  components: {
    Treeselect
  },
  created() {},
  watch: {
    editFrom: {
      handler(newVal) {
        console.log(newVal);
        let value = this.scopeOptions.filter(item => {
          return item.label == newVal.dataScope;
        });
        this.dialogForm = {
          name: newVal.name,
          permission: newVal.permission,
          dataScope: value[0].value,
          level: newVal.level,
          remark: newVal.remark,
          depts: newVal.depts,
          id: newVal.id
        };
      }
    }
  },

  methods: {
    // 关闭对话框
    handleClose() {
      this.$emit("update:dialogFormVisible", false);
      this.$refs["ruleForm"].clearValidate();
    },
    openOnInput(val) {
      console.log(val);
    },
    // 对话框数据范围选择框值改变
    Scopechange(element) {
      console.log(element);
      if (element == 3) {
        this.deptBol = true;
        getDept({
          enabled: true
        }).then(res => {
          this.$store.commit("role/setroleDept", res.content);
        });
      } else {
        this.deptBol = false;
      }
    },
    // 对话框确认按钮
    confirm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let value = this.scopeOptions.filter(item => {
            return item.value == this.dialogForm.dataScope;
          });
          this.dialogForm.dataScope = value[0].label;
          if (this.addOredit == false) {
            addRoles(this.dialogForm).then(res => {
              if (res != "") {
                this.$notify({
                  title: "新增成功",
                  type: "success"
                });
                this.$refs["ruleForm"].resetFields();
                this.$store.dispatch("role/searchroleData");
                this.handleClose();
              }
            });
          } else {
            editRoles(this.dialogForm).then(res => {
              if (res == "") {
                this.$notify({
                  title: "修改成功",
                  type: "success"
                });
                this.$refs["ruleForm"].resetFields();
                this.$store.dispatch("role/searchroleData");
                this.handleClose();
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style scoped>
</style>