<template>
  <!-- 新增 -->
  <el-dialog
    :title="absolute?'新增角色' : '修改角色'"
    :visible="dialogFormVisible"
    width="700px"
    @close="handleClose"
  >
    <el-form
      :model="userAddForm"
      :rules="rules"
      ref="userAddForm"
      label-width="70px"
      class="demo-userAddForm"
      :inline="true"
    >
      <el-form-item label="角色" prop="name" label-width="80px">
        <el-input v-model="userAddForm.name"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="permission" label-width="80px">
        <el-input v-model="userAddForm.permission"></el-input>
      </el-form-item>
      <el-form-item label="数据范围" prop="dataScope" label-width="80px">
        <el-select
          v-model="userAddForm.dataScope"
          placeholder="请选择"
          style="width:202px"
          @change="DataRange"
        >
          <el-option
            v-for="item in dataScope"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="角色级别" prop="level" label-width="80px">
        <el-input-number
          v-model="userAddForm.level"
          controls-position="right"
          :min="1"
          :max="10"
          style="width:202px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="数据权限" label-width="80px" v-show="deptBol">
        <Treeselect
          v-model="userAddForm.depts"
          :options="dept"
          placeholder="请选择部门"
          :flat="true"
          :multiple="true"
          style="width:485px; "
          @select="openOnInput"
        />
      </el-form-item>
      <el-form-item label="描述信息" prop="remark" label-width="80px">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="userAddForm.remark"
          style="width:485px; "
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClick">取 消</el-button>
      <el-button type="primary" @click="determine">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { postRole, putRole } from "@/api/roles";
import { mygetMenu } from "@/api/user";
import { Treeselect } from "@riophae/vue-treeselect";
export default {
  name: "addRole",
  props: ["dialogFormVisible", "absolute", "form", "setAddForm"], //接收父组件传递的值
  computed: {},
  components: {
    Treeselect
  },
  data() {
    return {
      // 新增角色form表单
      userAddForm: {
        permission: undefined,
        dataScope: undefined,
        level: undefined,
        remark: undefined,
        name: undefined,
        depts: []
      },
      //数据范围
      dataScope: [
        { value: "1", label: "全部" },
        { value: "2", label: "本级" },
        { value: "3", label: "自定义" }
      ],
      // 角色权限
      dept: [],
      // 数据权限
      deptBol: false,
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        permission: [
          { required: true, message: "请输入角色权限", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  watch: {
    /* setAddForm: {
      handler(newName, olaName) {
        console.log(newName, "newName", olaName, "olaName");
        this.userAddForm = {
          dept: { id: newName.dept.id },
          email: newName.email,
          enabled: newName.enabled,
          job: { id: newName.job.id },
          phone: newName.phone,
          roles: [{ id: newName.roles.id }],
          username: newName.username,
          id: newName.id
        }; //
        this.jobList.push({ ...newName.job }); //
        this.roles.push({ ...newName.roles }); //

        let arr = [];
        newName.roles.map(item => {
          return arr.push(item.id);
        });
        this.role = arr;
        console.log(arr, "arr");
        // this.userAddForm.roles = arr;
      },

      deep: true
    }
    */
  },
  methods: {
    // 新增角色

    handleClose() {
      this.handleClick();
    },
    //  取消新增角色
    handleClick() {
      this.$emit("update:dialogFormVisible", false);
    },
    //
    DataRange(val) {
      if (val == "3") {
        this.deptBol = true;
        mygetMenu({ enabled: true }).then(res => {
          this.dept = res.content;
        });
      }
    },
    //
    openOnInput() {},
    //  新增角色的保存
    determine() {
      this.$refs["userAddForm"].validate(valid => {
        if (valid) {
          if (this.absolute) {
            postRole(this.userAddForm).then(res => {
              console.log(res, this.userAddForm, "res");
              this.$message({
                message: "新增成功",
                type: "success"
              });
              //调用父容器的搜索方法searchClick
              this.$parent.$parent.searchClick();
            });
          } else {
            putRole(this.userAddForm).then(res => {
              console.log(res, this.userAddForm, "res");
              this.$message({
                message: "修改成功",
                type: "success"
              });
              //调用父容器的搜索方法searchClick
              this.$parent.$parent.searchClick();
            });
          }
          this.$emit("update:dialogFormVisible", false);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
