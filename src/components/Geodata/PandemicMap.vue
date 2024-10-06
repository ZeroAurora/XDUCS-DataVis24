<script setup lang="ts">
import * as echarts from "echarts";
import { ref, watch } from "vue";
import VChart from "vue-echarts";

const props = defineProps<
  {
    type: "confirmed" | "suspected" | "cured" | "dead" | "cumulated";
    date: string;
  }
>();

const option = ref({});

const typeToColIndex = {
  confirmed: 2,
  suspected: 3,
  cured: 4,
  dead: 5,
  cumulated: 6,
};

const typeToTitle = {
  confirmed: "确诊",
  suspected: "疑似",
  cured: "治愈",
  dead: "死亡",
  cumulated: "累计",
};

let data: any[][];
let geojson: any;

watch(props, async (newProps) => {
  if (!geojson) {
    geojson = await (await fetch("/data/3/geojson.json")).json();
    echarts.registerMap("china", geojson);
  }

  if (!data) {
    data = await (await fetch("/data/3/data.json")).json();
  }

  const type = newProps.type;
  const date = newProps.date;

  const colIndex = typeToColIndex[type];
  const title = typeToTitle[type];

  const seriesData = data
    .filter(d => d[0] === date)
    .map(d => ({
      name: d[1],
      value: d[colIndex],
    }));

  // dynamically compute the max value
  // the max value is too large so multiply it by 0.02
  const visualMapMax = data.reduce((max, d) => Math.max(max, d[colIndex]), 0) * 0.02;

  option.value = {
    visualMap: {
      left: "right",
      min: 0,
      max: visualMapMax,
      inRange: {
        color: ["lightskyblue", "yellow", "orangered"],
      },
      text: ["High", "Low"],
      calculable: true,
    },
    title: {
      text: `${title} - ${date}`,
    },
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
    },
    series: [
      {
        name: title,
        type: "map",
        roam: true,
        map: "china",
        data: seriesData,
      },
    ],
  };
}, { immediate: true });
</script>

<template>
  <VChart :option :update-options="{ notMerge: true }" :autoresize="true" />
</template>
