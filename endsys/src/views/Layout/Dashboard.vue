<template>
  <el-row class>
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
    <el-col>
      <el-col>
        <div id="LineChart"></div>
      </el-col>
      <el-col>
        <el-col :xs="25" :sm="25" :md="25" :lg="8" :xl="8">
          <div id="tubiao1"></div>
        </el-col>
        <el-col :xs="25" :sm="25" :md="25" :lg="8" :xl="8">
          <div id="tubiao2"></div>
        </el-col>
        <el-col :xs="25" :sm="25" :md="25" :lg="8" :xl="8">
          <div id="tubiao3"></div>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "myDashboard",
  data() {
    return {};
  },
  mounted() {
    this.createMain();
    this.hexagramStar();
    this.NightingaleChart();
    this.StackedColumnChart();
  },
  methods: {
    // 初始化echarts
    // 折线图
    createMain() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("LineChart"));
      let option = {
        title: {
          text: "Stacked Line"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
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
          }
        ]
      }; // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 雷电图
    hexagramStar() {
      let myChart = echarts.getInstanceByDom(
        document.getElementById("tubiao1")
      );

      if (myChart == null) {
        myChart = echarts.init(document.getElementById("tubiao1"));
      }
      let option = {
        color: ["#67F9D8", "#FFE434", "#56A3F1", "#FF917C"],
        title: {
          // text: "Basic Radar Chart"
        },
        legend: {
          bottom: -5
          // data: ["Allocated Budget", "Actual Spending"]
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            symbol: "none",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
                areaStyle: {
                  color: "rgba(103, 249, 216)"
                }
                // itemStyle: {
                //   normal: {
                //     color: "rgba(0,0,0)"
                //   }
                // }
              },
              {
                areaStyle: {
                  color: "rgba(255, 228, 52)"
                },
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending"
              }
            ]
          }
        ],
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 }
          ]
        }
      };
      myChart.setOption(option);
    },
    // 饼图
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
    // 柱状图
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
.grid-content {
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  min-height: 35px;
  height: 100px;
  line-height: 100px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
#LineChart {
  background-color: #fff;
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
#tubiao1,
#tubiao2,
#tubiao3 {
  margin: 0 auto;
  background-color: #fff;
  width: 100%;
  height: 300px;
}
</style>