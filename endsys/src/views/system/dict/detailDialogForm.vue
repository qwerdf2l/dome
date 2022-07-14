<template>
<!-- 对话框有两种种状态：字典详情状态下的新增字典、字典详情状态下的修改字典-->
  <el-dialog
    :title="detailDialogFlag == true ? '新增字典详情' : '编辑字典详情'"
    :visible="detailDialogVisble"
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
      <el-form-item label="字典标签" prop="label">
        <el-input
          v-model="form.label"
          size="small"
          style="width: 370px"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典值" >
        <el-input
          v-model="form.value"
          size="small"
          style="width: 370px"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number 
          v-model="form.sort" 
          controls-position="right" 
          @change="sortChange" 
          :min="1" 
          :max="999" 
          size="small" 
          style="width:370px"></el-input-number>
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
import { addDictDetail } from "@/api/dict"
export default {
  name: "dictDialog",
  props: ["detailDialogVisble","detailDialogFlag"],
  data(){
    return {
        form: {
            dict: {id: ''},
            id: '',// id
            label: '',//字典标签
            value: '',// 字典值
            sort: 999,// 排序
        },
        // // 排序的数字
        // num: 999,
        // 校验表单
        rules: {
            label: [{required: true,message: '请输入名称',trigger: 'blur'}],
            sort: [{required: true,message: '请输入排序',trigger: 'blur'}]
        }
    }
  },
  methods: {
    // 隐藏对话框
    cancelDialog(){
        this.$emit('edit:detailDialogVisble',false)
    },
    // 排序的事件
    sortChange(val){
      this.form.sort = val
      console.log('排序',val);
    },
    // 提交字典数据
    submitForm(form){
        this.$refs[form].validate((valid) => {
            if (valid) {
                if (this.detailDialogFlag) {
                    // 新增字典详情
                    // this.form.sort = this.num
                    addDictDetail(this.form).then((res) => {
                        console.log(res);
                        // this.$parent.$parent.searchDetailTab()
                    })
                    // 隐藏对话框
                    this.cancelDialog();
                    // 滞空表单
                    this.form = {
                        id: '',
                        label: '',
                        value: '',
                        sort: 999,
                    }
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