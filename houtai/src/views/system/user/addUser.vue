<template>
  <!-- 新增 -->
  <el-dialog
    :title="addTitle?'新增用户' : '修改用户'"
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
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userAddForm.username"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="resource">
        <el-radio-group v-model="userAddForm.enabled" @change="radioChange">
          <el-radio :label="true">激活</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="userAddForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userAddForm.email"></el-input>
      </el-form-item>
      <el-form-item label="部门管理">
        <Treeselect
          v-model="userAddForm.dept.id"
          :options="userMenu.content"
          placeholder="请选择部门"
          style="width:200px; "
          @select="openOnInput"
        />
      </el-form-item>
      <el-form-item label="岗位">
        <el-select
          v-model="userAddForm.job.id"
          placeholder="请选择岗位"
          :loading="false"
          @change="jobChange"
        >
          <el-option
            v-for="(item,index) in jobList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="role" multiple placeholder="请选择角色" @change="rolesChange" value-key="id">
          <el-option v-for="(item,index) in roles" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClick">取 消</el-button>
      <el-button type="primary" @click="determine">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getJob } from "@/api/job";
import { mapState } from "vuex";
import { Treeselect } from "@riophae/vue-treeselect";
import { mypostUserData, mygetUserData, myputUserData } from "@/api/user";
import { getRoles } from "@/api/roles";

export default {
  name: "addUser",
  props: ["dialogFormVisible", "addTitle", "form", "setAddForm"], //接收父组件传递的值
  computed: {
    ...mapState("user", ["userMenu"]) //部门list
  },
  components: {
    Treeselect
  },
  data() {
    return {
      // 用户新增form表单
      userAddForm: {
        dept: { id: undefined },
        email: undefined,
        enabled: false,
        job: { id: undefined },
        phone: undefined,
        roles: [],
        username: "",
        id: undefined
      },
      jib: { deptId: undefined, page: 0, size: 9999 }, // 获取岗位列表的参数
      role: [],
      jobList: [], //岗位列表
      roles: [], // 角色列表
      dept: undefined, //部门
      job: undefined, //岗位
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        enabled: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  created() {},
  watch: {
    setAddForm: {
      handler(newName, olaName) {
        console.log(newName, "newName", olaName, "olaName");
        this.userAddForm = {
          dept: { id: newName.dept.id },
          email: newName.email,
          enabled: newName.enabled,
          job: { id: newName.job.id },
          phone: newName.phone,
          roles: [{id:newName.roles.id}],
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
  },
  methods: {
    // 新增用户

    handleClose() {
      this.handleClick();
    },
    //  取消新增用户
    handleClick() {
      this.$emit("update:dialogFormVisible", false);
    },
    // 新增用户的状态按钮
    radioChange(val) {
      this.userAddForm.enabled = val;
    },
    // 新增用户的部门点击事件获取岗位
    openOnInput(value) {
      // this.userAddForm.dept = { id: value.id };
      this.jib.deptId = value.id;
      getJob(this.jib).then(res => {
        this.jobList = res.content;
      });
    },
    // 新增用户的岗位
    jobChange(id) {
      console.log(id, 11111);
      // this.userAddForm.job = { id: id };
    },
    // 新增用户的角色
    rolesChange(arrid) {
      let arr = [];
      arrid.map(item => {
        arr.push({ id: item });
      });
      this.userAddForm.roles = arr;
    },
    // 新增用户的保存
    determine() {
      this.$refs["userAddForm"].validate(valid => {
        if (valid) {
          if (this.addTitle) {
            mypostUserData(this.userAddForm).then(res => {
              this.$notify({
                title: "新增成功",
                message: "",
                type: "success"
              });
              mygetUserData(this.form).then(res => {
                this.$store.commit("user/setUserData", res);
              });
              console.log(res);
              this.handleClick();
            });
          } else {
            myputUserData(this.userAddForm).then(res => {
              this.$notify({
                title: "修改成功",
                message: "",
                type: "success"
              });
              mygetUserData(this.form).then(res => {
                this.$store.commit("user/setUserData", res);
              });
              console.log(res);
              this.handleClick();
            });
          }
        } else {
          console.log(22222);
        }
      });
    },

    //修改用户
    setChange() {
      getRoles().then(res => (this.roles = res));
    }
  }
};
</script>

<style>
</style>