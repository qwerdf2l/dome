<template>
<!-- 对话框有两种状态：字典状态下的新增字典、字典状态下的修改字典 -->
  <el-dialog
    :title="dictDialogFlag == true ? '新增字典' :  '编辑字典' "
    :visible="dialogFormVisible"
    @close="cancelDialog"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      style="font-weight: bold"
      class="demo-ruleForm"
    >
      <el-form-item label="字典名称" prop="name">
        <el-input
          v-model="form.name"
          size="small"
          style="width: 370px"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="permission">
        <el-input
          v-model="form.remark"
          size="small"
          style="width: 370px"
        ></el-input>
      </el-form-item>   
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" class="cancel" @click="cancelDialog"
        >取 消</el-button
      >
      <el-button type="primary" class="ok" @click="submitForm('form')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { addDict, editDict} from '@/api/dict'
export default {
  name: "dictDialog",
  props: ["dialogFormVisible", "dictDialogFlag", "editDictData"],
  data(){
    return {
        form: {
            id: '',// id
            name: '',//字典名称
            remark: '',// 描述
        },
        // 校验表单
        rules: {
            name: [{required: true,message: '请输入名称',trigger: 'blur'}]
        }
    }
  },
  watch: {
    // 监视字典列表修改的数据
    editDictData: {
      handler(newValue,oldValue){
        console.log(newValue,oldValue);
        // 回写数据
        this.form.id = newValue.id
        this.form.name = newValue.name
        this.form.remark = newValue.remark
      },
      deep:true // 深度监视
    },
  },
  methods: {
    // 隐藏对话框
    cancelDialog(){
        this.$emit('edit:dialogFormVisible',false)
    },
    // 提交字典数据
    submitForm(form){
        this.$refs[form].validate((valid) => {
            if (valid) {
              if (this.dictDialogFlag) {
                // 提交新增字典数据
                // 请求新增字典接口
                  addDict(this.form).then(() => {
                  // 刷新数据
                  this.$parent.$parent.searchTab()
                })
                // 隐藏对话框
                this.cancelDialog()
                // 滞空表单
                  this.form = {
                  id: '',
                  name: '',
                  remark: '',
                },
                  
                console.log('提交成功');
              } else {
                // 提交修改字典数据
                editDict(this.form).then(() => {
                  // 刷新数据
                  this.$parent.$parent.searchTab()
                })
                // 隐藏对话框
                this.cancelDialog()
                // 滞空表单
                this.form = {
                  id: '',
                  name: '',
                  remark: '',
                },
                console.log('提交成功');
              }
              
            } else {
                console.log('提交失败');
            }
        })
    }
  },
};
</script>
<style lang="less" scoped>
/deep/.el-dialog{
    width:500px;
    text-align: left;
    .el-form-item{
        margin-bottom: 13px;
    }
    .el-input-number.is-controls-right .el-input__inner{
      text-align:left;
    }
}
</style>
