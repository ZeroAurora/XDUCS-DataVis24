<script setup lang="ts">
import CrossRoadMap from "@/components/ChinaVisTraffic/CrossRoadMap.vue";
import DensityGraph from "@/components/ChinaVisTraffic/DensityGraph.vue";
import { provide, ref } from "vue";

const selectedDatetime = ref("1970-01-01 00:00:00");

provide("selectedDatetime", selectedDatetime);
</script>

<template>
  <CrossRoadMap id="crossroad-map" class="chart" />
  <DensityGraph id="density-graph" class="chart" />
</template>

<style scoped>
.chart {
  height: 100vh;
  width: 100vw;
}
</style>
