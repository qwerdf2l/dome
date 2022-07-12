<template>
  <div class="home">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="grid-content bg-purple">2222222</div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="grid-content bg-purple-light">2222222</div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="grid-content bg-purple">2222222</div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <div class="grid-content bg-purple-light">2222222</div>
      </el-col>
    </el-row>
    <!-- 折线图 -->
    <el-col :xs="25" :sm="25" :md="25" :lg="30" :xl="30">
      <div id="main"></div>
    </el-col>
    <el-row class="tubiao" :gutter="12">
      <el-col :xs="25" :sm="25" :md="25" :lg="8" :xl="8">
        <div id="tubiao1"></div>
      </el-col>
      <el-col :xs="25" :sm="25" :md="25" :lg="8" :xl="8">
        <div id="tubiao2"></div>
      </el-col>
      <el-col :xs="25" :sm="25" :md="25" :lg="8" :xl="8">
        <div id="tubiao3"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "myHome",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.hexagramStar();
    this.createMain();
    this.NightingaleChart();
    this.StackedColumnChart();
    
  },
  methods: {
    
    createMain() {
      // 基于准备好的dom，初始化echarts实例
      // let myChart = echarts.getInstanceByDom(document.getElementById("main"));
      
      // if (myChart == null) {
       let myChart = echarts.init(document.getElementById("main"));
      // }
      let option = {
        title: {
          text: "Stacked Line"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      } // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      
    },
    hexagramStar() {
      // var myChart = echarts.init(document.getElementById("tubiao1"));
      let myChart = echarts.getInstanceByDom(
        document.getElementById("tubiao1")
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("tubiao1"));
      }
      let option = {
        backgroundColor: "#fff",
        title: {
          text: "Customized Pie",
          left: "center",
          top: 25,
          textStyle: {
            color: "#ccc"
          }
        },
        tooltip: {
          trigger: "item"
        },
        visualMap: {
          show: false,
          min: 80,
          max: 500,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 274, name: "Union Ads" },
              { value: 235, name: "Video Ads" },
              { value: 400, name: "Search Engine" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              smooth: 0.2,
              length: 10,
              length2: 25
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 250,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function() {
              return Math.random() * 250;
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    NightingaleChart() {
      // var myChart = echarts.init(document.getElementById("tubiao2"));
      let myChart = echarts.getInstanceByDom(
        document.getElementById("tubiao2")
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("tubiao2"));
      }
      let option = {
        legend: {
          top: "bottom"
        },
        toolbox: {
          show: true,
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [10, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 1
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    StackedColumnChart() {
      // var myChart = echarts.init(document.getElementById("tubiao3"));
      let myChart = echarts.getInstanceByDom(
        document.getElementById("tubiao3")
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("tubiao3"));
      }
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "50%",
            data: [10, 52, 250, 334, 390, 330, 225]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  padding: 25px;
  .el-col {
    border-radius: 4px;
    margin: 10px 0px;
  }
  .bg-purple-dark {
    // background: #fff;
  }
  .bg-purple {
    line-height: 100px;
    height: 100px;
    // background: #fff;
  }
  .bg-purple-light {
    height: 100px;
    line-height: 100px;
    // background: #fff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 35px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
  #main {
    background-color: #fff;
    width: 100%;
    height: 300px;
    margin: 0 auto;
  }
  .tubiao {
    #tubiao1,
    #tubiao2,
    #tubiao3 {
      margin: 0 auto;
      background-color: #fff;
      width: 100%;
      height: 300px;
    }
  }
}
</style>