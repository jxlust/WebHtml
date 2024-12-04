<template>
  <div class="test-map" ref="nodeRef"></div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
import china_geojson from "./area_geo.json";
// 引入柱状图图表，图表后缀都为 Chart
// import { BarChart, LineChart } from "echarts/charts";
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  VisualMapComponent,
  ToolboxComponent,
  GeoComponent,
} from "echarts/components";
// 标签自动布局、全局过渡动画等特性
import { MapChart } from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 注册必须的组件
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  GeoComponent,
  VisualMapComponent,
  MapChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

echarts.registerMap("China", { geoJSON: china_geojson });

const fetchData = [
  { name: "东部大区", value: 999 },
  { name: "东北大区", value: 200 },
  { name: "中部地区", value: 12 },
  { name: "南部大区", value: 82 },
  { name: "西北大区", value: 600 },
];

export default {
  name: "TestEcharts",
  data: () => ({
    test: 1,
  }),
  created() {
    console.log("test-demo-area-map created", china_geojson);
  },
  mounted() {
    this.initOption();
  },
  methods: {
    initOption() {
      const nodeRef = this.$refs.nodeRef;
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      const myChart = echarts.init(nodeRef);
      let option = {
        // 3.在 echarts 中展示中国地图
        // geo: {
        //   map: "china",
        // },
        title: {
          text: "中国地图",
          subtext: "描述描述描述",
          sublink: "http://xxx.html",
          left: "right",
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: "{b}<br/>{c} (小时)",
        },
        // grid: {},
        // 1.视觉数据映射
        visualMap: [
          {
            // type: "continuous", // 连续型视觉映射组件 (默认)
            // type: "piecewise", // 分段型视觉映射组件
            left: "right",
            min: 0,
            max: 1000,
            // left: "20%",
            // seriesIndex: [0], // 指定取哪个系列的数据
            // 定义 在选中范围中 的视觉元素, 对象类型。
            inRange: {
              //  映射组件和地图的颜色(一般和地图色相近)
              //   color: [
              //     "#313695",
              //     "#4575b4",
              //     "#74add1",
              //     "#abd9e9",
              //     "#e0f3f8",
              //     "#ffffbf",
              //     "#fee090",
              //     "#fdae61",
              //     "#f46d43",
              //     "#d73027",
              //     "#a50026",
              //   ],
              //   color: ["#ebe296", "#c7b40a"],
              color: ["lightskyblue", "yellow", "orangered"],
            },
            realtime: false,
            text: ["High", "Low"],
            calculable: true,
          },
        ],

        series: [
          {
            name: "中国地图",
            type: "map",
            map: "China",
            roam: true,
            emphasis: {
              itemStyle: { areaColor: "red" },
              label: {
                show: true,
                color: "white",
              },
            },
            itemStyle: {
              areaColor: "skyblue",
              borderColor: "#1180c7",
            },
            label: {
              show: true,
              color: "rgba(0,0,0,0.8)",
            },

            select: {
              label: { color: "white" },
              itemStyle: { areaColor: "#4499d0" },
            },
            data: fetchData,

            // 自定义名称映射
            // nameMap: {
            //   'A': "北京市",
            // },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss">
.test-map {
  width: 100vw;
  height: 100vh;
}
</style>
