<script setup lang="ts">
import { ref } from "vue";

import VChart from "vue-echarts";
import "echarts";

import "echarts-gl";

const option = ref({
  backgroundColor: "#fff",
  visualMap: {
    show: false,
    dimension: 2,
    min: -5,
    max: 5,
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
  <VChart :option :autoresize="true" />
</template>
