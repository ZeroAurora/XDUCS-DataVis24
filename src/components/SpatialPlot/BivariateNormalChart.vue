<script setup lang="ts">
import VChart from "vue-echarts";

import "echarts";
import "echarts-gl";

import { ref } from "vue";

const option = ref({
  backgroundColor: "#fff",
  visualMap: {
    show: false,
    dimension: 2,
    min: 0,
    max: 0.4,
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
</script>

<template>
  <VChart :option :autoresize="true"></VChart>
</template>
