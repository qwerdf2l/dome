<template>
  <el-container class="layout">
    <!-- 切换侧边栏 -->

    <el-menu
      :router="true"
      :unique-opened="true"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="this.$store.state.collapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item>
        <!-- 菜单栏图片 -->
        <el-image
          src="http://192.168.2.30:8013/static/logo.png"
          width="30"
          height="30"
          style="vertical-align: middle"
          class="el-image-item"
          v-show="!this.$store.state.collapse"
        ></el-image>
        <!-- 菜单栏隐藏显示图标 -->
        <i class="el-icon-message" v-show="this.$store.state.collapse"></i>
      </el-menu-item>
      <!-- 首页 -->
      <el-menu-item index="/">
        <i class="el-icon-message"></i>
        <template slot="title">首页</template>
      </el-menu-item>
      <!-- 其他菜单 -->
      <el-submenu :index="item.path" v-for="(item,index) in menus" :key="index">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item2,index2) in item.children"
            :key="index2"
            :index="item.path+'/'+item2.path"
            @click="selectMenu(item,item2)"
          >
            <template>{{item2.meta.title}}</template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <el-container>
      <!-- 页眉 -->
      <!-- 面包屑 -->
      <el-header class="head">
        <el-col class="head-top">
          <el-col class="head-left">
            <i class="el-icon-s-fold" @click="hideSide"></i>
            <el-breadcrumb separator="/" class="bread">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

              <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col class="head-right">
            <!-- 源码图标 -->
            <el-col class="hidden-sm-and-down">
              <el-dropdown :hide-on-click="false">
                <el-dropdown-menu></el-dropdown-menu>
                <el-tooltip class="item" effect="dark" content="源码地址">
                  <svg
                    height="20"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="20"
                    data-view-component="true"
                    class="octicon octicon-mark-github v-align-middle"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                </el-tooltip>
              </el-dropdown>
            </el-col>
            <!-- 全屏图标 -->
            <el-col class="hidden-sm-and-down">
              <el-dropdown :hide-on-click="false">
                <el-dropdown-menu></el-dropdown-menu>
                <span class="el-dropdown-link" @click="fullScreen">
                  <div
                    data-v-29234bee
                    data-v-d16d6306
                    class="el-tooltip screenfull right-menu-item"
                    aria-describedby="el-tooltip-673"
                    tabindex="0"
                  >
                    <el-tooltip class="item" effect="dark" content="全屏">
                      <svg
                        data-v-29234bee
                        t="1508738709248"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2069"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="20"
                        height="20"
                        class="screenfull-svg"
                      >
                        <path
                          data-v-29234bee
                          d="M333.493443 428.647617 428.322206 333.832158 262.572184 168.045297 366.707916 64.444754 64.09683 64.444754 63.853283 366.570793 167.283957 262.460644Z"
                          p-id="2070"
                        />
                        <path
                          data-v-29234bee
                          d="M854.845439 760.133334 688.61037 593.95864 593.805144 688.764889 759.554142 854.56096 655.44604 958.161503 958.055079 958.161503 958.274066 656.035464Z"
                          p-id="2071"
                        />
                        <path
                          data-v-29234bee
                          d="M688.535669 428.550403 854.31025 262.801405 957.935352 366.921787 957.935352 64.34754 655.809313 64.081481 759.919463 167.535691 593.70793 333.731874Z"
                          p-id="2072"
                        />
                        <path
                          data-v-29234bee
                          d="M333.590658 594.033341 167.8171 759.804852 64.218604 655.67219 64.218604 958.270996 366.342596 958.502263 262.234493 855.071589 428.421466 688.86108Z"
                          p-id="2073"
                        />
                      </svg>
                    </el-tooltip>
                  </div>
                </span>
              </el-dropdown>
            </el-col>
            <!-- 个人图标 -->
            <el-col>
              <div class="el-dropdown-link">
                <img
                  width="40px"
                  height="40px"
                  style="vertical-align: middle"
                  src="data:image/png;base64,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"
                  class="user-avatar"
                />
              </div>
              <el-dropdown trigger="click" @command="logOut">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">项目文档</el-dropdown-item>
                  <el-dropdown-item command="b">布局设置</el-dropdown-item>
                  <el-dropdown-item command="c">个人中心</el-dropdown-item>
                  <el-dropdown-item command="d" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-col>
        </el-col>
        <!-- tabs标签 -->
        <el-col class="head-bot">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
            @tab-click="clickTab"
          >
            <el-tab-pane name="-1" label="首页"></el-tab-pane>
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >{{ item.content }}</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-header>
      <!-- 内容 -->
      <el-main>
        <transition name="el-fade-in">
          <router-view></router-view>
        </transition>
      </el-main>
      <!-- 页脚 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import screenfull from "screenfull";
import vue from "vue";
vue.use(screenfull);
export default {
  name: "MyLayout",
  data() {
    return {
      // 首页路由
      defaultActive: "/dashboard",
      breadList: [], //面包屑导航
      editableTabsValue: "-1", //tabs标签
      editableTabs: [], //tabs标签
      // 标签的序号名称
      tabIndex: -1,
      // 默认不全屏
      isFullscreen: false,
      roles: undefined
    };
  },
  computed: {
    ...mapState("login", ["menus"])
  },
  created() {},
  methods: {
    hideSide() {
      this.$store.commit("setCollapse", !this.$store.state.collapse);
    },
    // 点击菜单
    selectMenu(item, item2) {
      this.breadList = [item.meta.title, item2.meta.title];
      // 添加标签
      this.addTab(item, item2);
    },
    // 点击标签
    clickTab(obj) {
      let path;
      if (obj.name == "-1") {
        path = "/dashboard";
      } else {
        this.editableTabs.forEach(item => {
          if (item.name == obj.name) {
            path = item.path;
            return;
          }
        });
      }
      // 设置当前菜单激活
      this.defaultActive = path;

      this.$router.push(path);
    },
    // 删除标签
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    // 添加标签
    addTab(item, item2) {
      let currIndex = -1;
      this.editableTabs.forEach((element, index) => {
        if (element.title == item2.meta.title) {
          // 激活当前存在的名称
          this.editableTabsValue = index + "";
          currIndex = index;
          element.path = item.path + "/" + item2.path;
        }
      });

      if (currIndex == -1) {
        // 如果标签里不存在，则创建一个新的标签
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: item2.meta.title,
          name: newTabName,
          // 添加路由路径
          path: item.path + "/" + item2.path
        });
        this.editableTabsValue = newTabName;
      }
    },
    // 全屏事件
    fullScreen() {
      // 先使用screenfull.enabled判断是否支持全屏
      // 如果不允许全屏，则提示用户不支持全屏
      if (!screenfull.enabled) {
        this.$message({
          message: "当前浏览器不支持全屏功能",
          type: "warning"
        });
        return false;
      }
      // 调用screenfull.toggle方法，实现全屏功能
      screenfull.toggle();
      this.$message({
        message: "全屏功能",
        type: "success"
      });
    },
    // 退出登录
    logOut(disabled) {
      if (disabled === "d") {
        sessionStorage.setItem("token", "");
        this.$cookies.set("YZ-SYS-TOEKN", "");
        // this.$store.commit("logout");
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .head {
    height: 80px !important;
    display: flex;
    flex-direction: column;
    .head-top {
      flex: 1;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      .head-left {
        width: 400px;
        text-align: left;

        display: flex;
        align-items: center;
        .bread {
          margin-left: 20px;
        }
      }
      .head-right {
        display: flex;
        justify-content: flex-end;
        width: 400px;
        .el-col {
          display: flex;
          align-items: center;
          width: 50px;
        }
      }
    }
    .head-bot {
      flex: 1;
      line-height: 40px;
      /deep/ .el-tabs {
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    height: 100%;
    .el-row {
      height: 100%;
    }
    .el-menu {
      border: none;
      height: 100% !important;
    }
    .el-row > .el-col-12 {
      width: 100%;
      height: 100%;
    }
  }
  .el-main {
    background-color: #fff;
    color: #333;
    // text-align: center;
    // line-height: 160px;
    // .el-submenu__title {
    //   text-align: left;
    // }
  }
  .el-header,
  .el-footer {
    background-color: #fff;
    color: #333;
  }
}
</style>

