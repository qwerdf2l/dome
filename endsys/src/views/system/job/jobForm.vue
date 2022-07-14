<template>
  <!-- 对话框 -->
  <el-dialog
    :title="bianji== false?'新增岗位':'编辑岗位'"
    :visible="dialogVisible"
    width="32%"
    :before-close="handleClose"
  >
    <!-- form表单 -->
    <el-form label-width="68px" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="所属部门">
        <treeselect
              placeholder="选择部门"
              :options="deptoOption"            
              v-model="form.dept.id"
            />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="quxiao">取 消</el-button>
      <el-button type="primary" @click="Ok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getDept } from "@/api/dept";   //部门查询
import { addJob } from "@/api/job";     //添加
export default {
  name: "jobFrom",
  props: ["dialogVisible", "bianji"],
  data() {
    return {
      deptoOption: [], //部门数据
      //表单数据
      form: {
        id: "",
        name: "",
        sort: 999,
        enabled: false,
        createTime: "",
        dept: { id: undefined }
      },

      //校验
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sort: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
 
  //组件引入
  components: {
    Treeselect
  },
  //点击事件
  methods: {
    //关闭
    handleClose() {
      console.log("关闭");
    },
    //取消
    quxiao() {
      this.$emit("update:dialogVisible", false);
    },
    //确定
    Ok() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          addJob(this.form).then(res=>{
            this.$message({
          message: '添加成功',
          type: 'warning'
        });
        console.log(this.$parent.$parent.$parent.Search);
        this.$parent.$parent.$parent.Search();
        this.quxiao()

        console.log(res);
          })
          console.log("成功");
        } else {
          console.log("失败");
        }
      });
    },

    //部门查询
    deptSearch() {
      getDept({ enabled: true }).then(res => {
        console.log('查询部门',res);
        this.deptoOption = res.content;
      });
    },
  }
};
</script>

<style lang="less" scoped>
.el-form-item {
  font-weight: bold;
}
</style>