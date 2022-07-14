<template>
  <el-container class="dict-box">
    <!-- 字典列表 -->
    <el-col :span="10" class="left">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>字典列表</span>
          <el-button
            style="float: right"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="addDict"
            >新增</el-button
          >
        </div>
        <!-- 表单 -->
        <el-form
          ref="dictForm"
          :model="dictForm"
          label-width="80px"
          :inline="true"
        >
          <el-form-item>
            <el-input
              v-model="dictForm.blurry"
              placeholder="请输入名称或描述搜索"
              style="width: 200px"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              size="mini"
              icon="el-icon-search"
              @click="searchTab"
              >搜索</el-button
            >
            <el-button type="warning" size="mini" icon="el-icon-download"
              >导出</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 展示字典数据 -->
        <el-table
          :data="tableData"
          style="width: 100%; font-size: 12px"
          v-loading="loading"
          @row-click="tableColumnClick"
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="remark" label="描述"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editDict(scope.row)"
              ></el-button>
              <!-- 删除按钮 -->
              <el-popover
                placement="top"
                width="160"
                v-model="scope.row.visible"
                :ref="scope.row.id"
                style="margin-left: 5px"
              >
                <p>此操作将删除字典与对应的字典详情，确定要删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" size="mini" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="dictDelete(scope.row)">确定</el-button>
                </div>
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  class="del-btn"
                ></el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="pageSize"
          layout="total,prev,pager, next, sizes"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-col>
    <!-- 字典详情 -->
    <el-col :span="14" class="right">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>字典详情</span>
          <el-button
            v-show="flag == true"
            style="float: right"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="addDictDetail"
            >新增</el-button
          >
        </div>
        <!-- 不展示字典列表详情 -->
        <div class="text item details-box" v-if="flag == false">
          {{ "点击字典列表查看详情" }}
        </div>
        <!-- 展示字典列表详情 -->
        <div class="text item" v-else>
          <el-form
            ref="dictDetailForm"
            :model="dictDetailForm"
            label-width="80px"
            :inline="true"
          >
            <el-form-item>
              <el-input
                v-model="dictDetailForm.label"
                placeholder="输入字典标签查询"
                style="width: 200px"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="mini" icon="el-icon-search" @click="searchDetailTab(dictDetailForm)"
                >搜索</el-button
              ></el-form-item
            >
          </el-form>
          <!-- 展示字典详情 -->
          <el-table :data="detailData" style="width: 100%; font-size: 12px" v-loading="loading">
            <el-table-column label="所属字典">
              <template>
                <div>
                  {{dictName}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="label" label="字典标签"> </el-table-column>
            <el-table-column prop="value" label="字典值"> </el-table-column>
            <el-table-column prop="sort" label="排序"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                ></el-button>
                <!-- 删除按钮 -->
                <el-popover
                  placement="top"
                  width="160"
                  v-model="scope.row.visible"
                  :ref="scope.row.id"
                  style="margin-left: 5px"
                >
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini">取消</el-button>
                    <!--  @click="edit" @click="$refs[scope.row.id].doClose()" @click="tableDelete(scope.row)" -->
                    <el-button type="primary" size="mini">确定</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    class="del-btn"
                  ></el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              :page-size="pageSize2"
              layout="total,prev,pager, next, sizes"
              :total="total2"
            >
            </el-pagination>
        </div>
      </el-card>
    </el-col>
    <!-- 字典的对话框 -->
    <dictDialogForm
      :dialogFormVisible.sync="showFlag" 
      :dictDialogFlag="dictDialogFlag"      
      ref="dictDialogForm"
      @edit:dialogFormVisible="showDislog"
      :editDictData="dictFormData"
    ></dictDialogForm>
    <!-- 字典详情的对话框 -->
    <detailDialogForm
      ref="dictDetailDialogForm"
      :detailDialogVisble.sync="detailShowFlag"
      :detailDialogFlag="detailDialogFlag"
      @edit:detailDialogVisble="detailShow"
    ></detailDialogForm>
  </el-container>
</template>

<script>
import { getDict, getDictDetail,deleteDict } from "@/api/dict";
import dictDialogForm from './dictDialogForm.vue'
import detailDialogForm from './detailDialogForm.vue'
export default {
  name: "myDict",
  data() {
    return {      
      loading: false,// 加载      
      flag: false,// 是否点击了字典列表数据

      // 字典列表的表单
      dictForm: {
        page: 0, // 页数
        size: 10, // 10条/页
        sort: "id,desc", // 降序
        blurry: undefined, // 模糊查询的值
      },      
      tableData: [],// 字典列表的数据      
      currentPage: 1,// 字典列表-当前页      
      pageSize: 10,// 字典列表-10条/页      
      total: 0,// 字典列表-总页数

      // 字典详情的表单
      dictDetailForm: {
        page: 0, // 页数
        size: 10, // 10条/页
        dictName: "", // 字典名称
        label: undefined,//字典详情模糊搜索
      },      
      dictName: '',// 所属字典      
      detailData: [],// 字典详情的列表数据      
      currentPage2: 1,// 字典详情-当前页      
      pageSize2: 10,// 字典详情-10条/页      
      total2: 0,// 字典详情-总页数

      showFlag: false,// 字典对话框是否弹出          
      dictDialogFlag: false,// 字典列表对话框的状态 

      detailShowFlag: false,// 详情对话框是否弹出     
      detailDialogFlag: false,// 字典详情对话框的状态   
      
      dictFormData: "",// 字典对话框的表单修改数据
    };
  },
  components: {
    dictDialogForm,
    detailDialogForm
  },
  mounted() {
    this.searchTab();
  },
  methods: {
    // 字典列表-分页，x条/页
    handleSizeChange(val) {
      this.pageSize = val;
      this.dictForm.size = val;
      this.searchTab();
    },

    // 字典列表-分页，当前x页
    handleCurrentChange(val) {
      this.currentPage = val - 1;
      this.dictForm.page = val - 1;
      this.searchTab();
    },
    // 字典详情-分页，x条/页
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.dictDetailForm.size = val;
      // this.getDict();
    },

    // 字典详情-分页，当前x页
    handleCurrentChange2(val) {
      this.currentPage2 = val - 1;
      this.dictDetailForm.page = val - 1;
      // this.getDict();
    },

    // 字典搜索按钮的事件
    searchTab() {
      this.loading = true
      getDict(this.dictForm).then((res) => {
        console.log("字典列表", res);
        this.tableData = res.content;
        this.total = res.totalElements;
        this.loading = false;
      });
    },

    // 字典详情搜索按钮的事件
    searchDetailTab(row){
      this.loading = true;

      // 接口需要用到的参数
      this.dictDetailForm.dictName = row.name
      // 如果详情表单里的所属名称为空就获取本地储存里的数据作为参数
      if(this.dictDetailForm.dictName == undefined){
        this.dictDetailForm.dictName = sessionStorage.getItem('dictName')
      }

      // 请求当前字典的详情接口      
      getDictDetail(this.dictDetailForm).then((res) => {
        this.detailData = res.content;  //字典详情的数据
        this.dictName = this.dictDetailForm.dictName; //所属字典
        this.total2 = res.totalElements// 字典详情-总页数
        this.loading = false;
      });
    },

    // 点击字典列表查看详情
    tableColumnClick(row) {
      // 显示字典详情
      this.flag = true;   
      this.searchDetailTab(row)
      // 储存字典详情里所属名称
      sessionStorage.setItem('dictName',row.name)
    },

    // 显示字典对话框
    showDislog(flag){
      this.showFlag = flag
    },
    // 显示详情对话框
    detailShow(flag){
      this.detailShowFlag = flag
    },

    // 新增字典
    addDict(){
      // 显示对话框
      this.showDislog(true);
      // 对话框状态为新增字典
      this.dictDialogFlag = true
    },
    // 修改字典
    editDict(row){
      // 显示对话框
      this.showDislog(true);
      // 对话框状态为修改字典
      this.dictDialogFlag = false
      // 把当前行的数据回写
      this.dictFormData = row
    },

    // 删除字典
    dictDelete(row){
      this.$refs[row.id].doClose();
      deleteDict(row.id).then(() => {
        // 刷新数据
        this.searchTab()
      })
    },
    
    // 新增字典详情
    addDictDetail(){
      // 显示对话框
      this.detailShow(true);
      // 对话框为新增字典详情状态
      this.detailDialogFlag = true;
      
    },
  },
};
</script>

<style lang="less" scope>
.dict-box {
  padding-top: 20px;
  .left,
  .right {
    text-align: left;
    .clearfix {
      height: 23px;
      .el-button--mini,
      .el-button--mini.is-round {
        padding: 4px 10px;
      }
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-pagination {
      padding-top: 8px;
    }
  }
  .right {
    margin-left: 10px;
    .details-box {
      padding: 15px;
      line-height: 20px;
      border-left: 3px solid #ddd;
      color: #333;
      font-family: Courier New;
      font-size: 12px;
    }
  }
}
</style>