<template>
  <el-dialog
    title="异常详情"
    width="50%"
    @close="cancel"
    :visible="dialogErrorVisible"
    :destroy-on-close="true"
  >
    <span>{{content}}</span>
  </el-dialog>
</template>

<script>
import { outError } from "@/api/log";

export default {
  props: ["dialogErrorVisible", "acceptId"],
  name: "errorDiaLog",
  data(){
    return{
      content:'',
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel:dialogErrorVisible", false);
    },
    outputError(index) {

      outError(index).then(res => {
        console.log(res);
        this.content = res
      });
    }
  }
};
</script>

<style>
</style>