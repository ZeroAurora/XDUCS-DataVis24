<script setup lang="ts">
import PandemicMap from "@/components/Geodata/PandemicMap.vue";
</script>

<template>
  <p>China GeoJSON from <a href="https://datav.aliyun.com/portal/school/atlas/area_selector">Aliyun</a>.</p>
  <PandemicMap id="pandemic-map" class="chart" />
</template>

<style scoped>
.chart {
  width: 80vw;
  height: 80vh;
}
</style>
