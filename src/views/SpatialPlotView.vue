<script setup lang="ts">
import VChart from "vue-echarts";

import "echarts";
import "echarts-gl";

import { ref } from "vue";

const colorMap = [
  "#4575b4",
  "#74add1",
  "#abd9e9",
  "#e0f3f8",
  "#ffffbf",
  "#fee090",
  "#fdae61",
  "#f46d43",
  "#d73027",
  "#a50026",
];

// 1. Spiral curve
const spiralCurve = [];
for (let z = 0; z < 5; z += 0.01) {
  const x = Math.sin(z * 10) * 5;
  const y = Math.cos(z * 10) * 5;
  spiralCurve.push([x, y, z]);
}

const spiralCurveOption = ref({
  tooltip: {},
  backgroundColor: "#fff",
  visualMap: {
    show: false,
    dimension: 2,
    min: 0,
    max: 5,
    inRange: {
      color: colorMap,
    },
  },
  xAxis3D: {
    type: "value",
  },
  yAxis3D: {
    type: "value",
  },
  zAxis3D: {
    type: "value",
  },
  grid3D: {
    viewControl: {
      projection: "orthographic",
    },
  },
  series: [
    {
      type: "line3D",
      data: spiralCurve,
      lineStyle: {
        width: 5,
      },
    },
  ],
});

// 2. Bivariate normal distribution surface
const binormalOption = ref({
  backgroundColor: "#fff",
  visualMap: {
    show: false,
    dimension: 2,
    min: 0,
    max: 0.4,
    inRange: {
      color: colorMap,
    },
  },
  xAxis3D: {
    type: "value",
  },
  yAxis3D: {
    type: "value",
  },
  zAxis3D: {
    type: "value",
  },
  grid3D: {
    viewControl: {
      projection: "orthographic",
    },
  },
  series: [
    {
      type: "surface",
      equation: {
        x: {
          step: 0.01,
          min: -3,
          max: 3,
        },
        y: {
          step: 0.01,
          min: -3,
          max: 3,
        },
        z: (x: number, y: number) => {
          return Math.exp(-(x * x + y * y) / 2) / Math.sqrt(2 * Math.PI);
        },
      },
    },
  ],
});

// 3. Sphere
const sphereOption = ref({
  backgroundColor: "#fff",
  visualMap: {
    show: false,
    dimension: 2,
    min: -5,
    max: 5,
    inRange: {
      color: colorMap,
    },
  },
  xAxis3D: {
    type: "value",
  },
  yAxis3D: {
    type: "value",
  },
  zAxis3D: {
    type: "value",
  },
  grid3D: {
    viewControl: {
      projection: "orthographic",
    },
  },
  series: [
    {
      type: "surface",
      parametric: true,
      parametricEquation: {
        u: {
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
        },
        v: {
          min: -Math.PI,
          max: Math.PI,
          step: 0.01,
        },
        x: (u: number, v: number) => 5 * Math.sin(u) * Math.cos(v),
        y: (u: number, v: number) => 5 * Math.sin(u) * Math.sin(v),
        z: (u: number, _: number) => 5 * Math.cos(u),
      },
    },
  ],
});
</script>

<template>
  <VChart id="spiral-curve" class="chart" :option="spiralCurveOption" :autoresize="true"></VChart>
  <VChart id="binormal-surface" class="chart" :option="binormalOption" :autoresize="true"></VChart>
  <VChart id="sphere" class="chart" :option="sphereOption" :autoresize="true"></VChart>
</template>

<style scoped>
.chart {
  height: 70vh;
  width: 70vw;
}
</style>
