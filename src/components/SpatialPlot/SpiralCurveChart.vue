<script setup lang="ts">
import { ref } from "vue";

import VChart from "vue-echarts";
import "echarts";

import "echarts-gl";

const spiralCurve = [];
for (let z = 0; z < 10; z += 0.01) {
  const x = Math.sin(z * 2) * 5;
  const y = Math.cos(z * 2) * 5;
  spiralCurve.push([x, y, z]);
}

const option = ref({
  tooltip: {},
  backgroundColor: "#fff",
  visualMap: {
    show: false,
    dimension: 2,
    min: 0,
    max: 10,
    inRange: {
      color: [
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
      ],
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
</script>

<template>
  <VChart :option :autoresize="true" />
</template>
