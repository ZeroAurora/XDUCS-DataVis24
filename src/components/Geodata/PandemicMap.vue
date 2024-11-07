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
      left: "right",
      min: 0,
      max: 100000,
      inRange: {
        color: ["lightskyblue", "yellow", "orangered"],
      },
      text: ["High", "Low"],
      calculable: true,
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
      }
    },
    options,
  };
});
</script>

<template>
  <VChart :option :autoresize="true" />
</template>
