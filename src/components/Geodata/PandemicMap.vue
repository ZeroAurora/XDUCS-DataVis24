<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import VChart from "vue-echarts";

const option = ref({});

let geojson: any;
let data: Record<string, any[][]>;

onMounted(async () => {
  if (!geojson) {
    geojson = await (await fetch("/data/3/geojson.json")).json();
    echarts.registerMap("china", geojson);
  }

  if (!data) {
    data = await (await fetch("/data/3/data.json")).json();
  }

  const options: Record<string, any>[] = [];

  for (const updateTime of Object.keys(data)) {
    const info = data[updateTime];
    const mappedInfo = info.map(item => ({
      name: item[0],
      value: item[1],
    }));
    options.push({
      title: {
        text: `${updateTime} 确诊`,
      },
      series: {
        data: mappedInfo,
      },
    });
  }

  option.value = {
    visualMap: {
      type: "piecewise",
      pieces: [
        { min: 10000, label: ">10000", color: "#CC400F" },
        { min: 1000, max: 10000, label: "1000-10000", color: "#FF5013" },
        { min: 500, max: 1000, label: "500-1000", color: "#FF8A22" },
        { min: 100, max: 500, label: "100-500", color: "#FEC342" },
        { min: 50, max: 100, label: "50-100", color: "#FFFE64" },
        { min: 10, max: 50, label: "10-50", color: "#CFEF66" },
        { min: 1, max: 10, label: "1-10", color: "#9FDE68" },
        { min: 0, max: 1, label: "0", color: "#6FD069" },
      ],
      left: "right",
    },
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
    },
    series: {
      name: "确诊",
      type: "map",
      roam: true,
      map: "china",
    },
    timeline: {
      axisType: "category",
      data: Object.keys(data),
      playInterval: 500,
      checkpointStyle: {
        animationDuration: 100,
      },
    },
    options,
  };
});
</script>

<template>
  <VChart :option :autoresize="true" />
</template>
