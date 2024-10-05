<script setup lang="ts">
import { ref, watchEffect } from "vue";

import VChart from "vue-echarts";
import "echarts";

import "echarts-gl";

const props = defineProps(["loading", "data"]);

const option = ref({
  grid3D: {
    boxWidth: 50,
    boxDepth: 200,
  },
  xAxis3D: {
    type: "category",
    name: "year",
  },
  yAxis3D: {
    type: "category",
    name: "monthAndDay",
  },
  zAxis3D: {
    type: "value",
    min: "dataMin",
    name: "temperature",
  },
  visualMap: {
    max: 30,
    min: -1,
    inRange: {
      color: [
        "#313695",
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
  series: {
    type: "bar3D",
    shading: "lambert",
    data: [],
    emphasis: {
      label: {
        fontSize: 20,
        color: "#900",
      },
      itemStyle: {
        color: "#900",
      },
    },
  },
});

watchEffect(() => {
  option.value.series.data = props.data;
});
</script>

<template>
  <VChart :option :loading :autoresize="true" />
</template>
