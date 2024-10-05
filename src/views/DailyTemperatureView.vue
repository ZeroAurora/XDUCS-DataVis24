<script setup lang="ts">
import DailyTemperatureChart from "@/components/DailyTemperature/DailyTemperatureChart.vue";

import { ref, onMounted } from "vue";

const loading = ref(true);
const data = ref([]);

onMounted(async () => {
  data.value = await (await fetch("/data/1/daily-minimum-temperatures.json")).json();
  loading.value = false;
});
</script>

<template>
  <DailyTemperatureChart id="daily-temperature-chart" class="chart" :loading :data />
</template>

<style scoped>
.chart {
  height: 100vh;
  width: 100vw;
}
</style>
