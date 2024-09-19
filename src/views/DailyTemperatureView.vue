<script setup lang="ts">
import VChart from "vue-echarts";

import { use } from "echarts/core";
import { VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { Bar3DChart } from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";

import { ref, onMounted } from "vue";
import type { Ref } from "vue";

use([VisualMapComponent, Grid3DComponent, Bar3DChart, CanvasRenderer]);

const loading = ref(true);

const option: Ref<any> = ref({
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
});

onMounted(async () => {
  const data = await (await fetch("/data/1/daily-minimum-temperatures.json")).json();

  option.value.series = {
    type: "bar3D",
    shading: "lambert",
    data: data,
    emphasis: {
      label: {
        fontSize: 20,
        color: "#900",
      },
      itemStyle: {
        color: "#900",
      },
    },
  };

  loading.value = false;
});
</script>

<template>
  <VChart class="chart" :option :loading :autoresize="true"></VChart>
</template>

<style scoped>
.chart {
  height: 100vh;
  width: 100vw;
}
</style>
