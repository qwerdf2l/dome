<template>
  <el-container class="layout">
    <el-menu
      :router="true"
      :unique-opened="true"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="$store.state.collapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/dashboard">
        <!-- <img src="../../assets/logo.png" >  -->
        <el-image :src="logo"></el-image>
      </el-menu-item>
      <el-menu-item index="/dashboard">
        <i class="el-icon-s-home"></i>
        <template slot="title">首页</template>
      </el-menu-item>

      <el-submenu :index="item.path" v-for="(item, index) in menus" :key="index">
        <template slot="title">
          <i :class="'el-icon-' + item.meta.icon"></i>
          {{ item.meta.title }}
        </template>
        <el-menu-item
          :index="item.path + '/' + item2.path"
          v-for="(item2, index2) in item.children"
          :key="index2"
          @click="selectMenu(item, item2)"
        >
          <template slot="title">
            <i :class="'el-icon-' + item2.meta.icon"></i>
            {{ item2.meta.title }}
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>

    <el-container>
      <el-header class="head">
        <el-col class="head-top">
          <el-col class="head-left">
            <i class="el-icon-s-fold" @click="hideSide"></i>
            <el-breadcrumb separator="/" class="bread">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

              <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" >{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col class="head-right">
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
              <div  class="avatar-wrapper">
                <img
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  alt=""
                  class="user-avatar"
                />
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <span style="display: block">
                  <el-dropdown-item> 布局设置 </el-dropdown-item>
                </span>
                <router-link to="/user/center">
                  <el-dropdown-item> 个人中心 </el-dropdown-item>
                </router-link>
                <span style="display: block" @click="logOut">
                  <el-dropdown-item divided> 退出登录 </el-dropdown-item>
                </span>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
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
            >
              {{ item.content }}
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "myLayout",
  data() {
    return {
      logo: require("@/assets/logo.png"),
      defaultActive: "/dashboard",
      breadList: [],
      editableTabsValue: "-1",
      editableTabs: [
        /*{
          title: 'Tab 1',
          name: '1',
          path: '/xxxx'
        }, {
          title: 'Tab 2',
          name: '2',         
        }*/
      ],
      // 标签的序号名称
      tabIndex: -1
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
      // console.log(item, item2);
      this.breadList = [item.meta.title, item2.meta.title];
      // 添加标签
      this.addTab(item, item2);
    },
    // 点击标签
    clickTab(obj) {
      console.log(obj.name);
      let path;
      if (obj.name == "-1") {
        path = "/dashboard";
      } else {
        // console.log(this.editableTabs[obj.name*1])
        //  path =  this.editableTabs[obj.name*1].path
        this.editableTabs.forEach((item) => {
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
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
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
          path: item.path + "/" + item2.path,
        });
        this.editableTabsValue = newTabName;
      }
    },
    // 退出登录
    logOut() {

        sessionStorage.setItem("token", "");
        this.$router.push("/login");
      
    }
  }
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  .el-header,
  .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .logo {
    height: 80px;
    /deep/ .el-image__inner {
      margin-top: 25px;
    }
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
        // align-items: flex-end;
        justify-content: flex-end;
        align-items: center;
        width: 400px;
       .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
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
    
    text-align: center;
    height: 100%;
    transition: all 0.1s ease-in;
  }

  .el-main {
    color: #333;
    text-align: center;
    margin-top: 20px;
  }
}
</style>