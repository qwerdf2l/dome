<template>
  <el-container class="login-box">
    <el-form :model="formData" :rules="formRules" ref="form">
      <el-form-item class="title">YZ-SYS 后台管理系统</el-form-item>
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user-solid" v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row>
          <el-col :span="16">
            <el-input prefix-icon="el-icon-key" v-model="formData.code"></el-input>
          </el-col>
          <el-col :span="8">
            <el-image :src="codeImg" @click="code"></el-image>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">记住我</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="btn-login"
          @click="loginClick"
          @keyup.enter.native="enterSearchMember"
        >登 录</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import { getCode, myLogin } from "@/api/login";
// import { mapMutations } from "vuex";

export default {
  name: "myLogin",
  data() {
    return {
      checked: false,
      codeImg: "",
      // form表单数据对象
      formData: {
        username: "admin",
        password: "123456",
        code: "",
        uuid: ""
      },
      // 校验对象
      formRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 10, message: "请输入5-10个字符", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.code();
    var lett = this;
    document.onkeydown = function() {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.enterSearchMember();
      }
    };
  },
  methods: {
    // ...mapMutations("login", ["setUser"]),
    // 取验证码
    code() {
      getCode().then(res => {
        this.codeImg = res.img;
        this.formData.uuid = res.uuid;
      });
    },
    // 登录按钮
    loginClick() {
      // 实现校验
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log("校验通过");
          myLogin(this.formData).then(res => {
            // 登录成功
            sessionStorage.setItem("token", res.token);
            // 回写用户数据至vuex login模块
            // this.setUser(res.user)
            this.$store.commit("login/setUser", res.user);
            console.log(this.$store.state.login.user);
            // 设置cookie
            this.$cookies.set("YZ-SYS-TOEKN", res.token);
            // 跳转到主页面
            this.$router.push("/");
          });
        } else {
          console.log("校验失败");
        }
      });
    },
    //   登录回车
    enterSearchMember() {
      this.loginClick();
    }
  }
};
</script>
<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  .el-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-190px, -190px);
    width: 340px;
    height: 340px;
    padding: 20px;
    .title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
    .btn-login {
      width: 100%;
    }
    /deep/ .el-form-item__content {
      line-height: 0px;
    }
  }
}
</style>