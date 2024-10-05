<script setup lang="ts">
import BivariateNormalChart from "@/components/SpatialPlot/BivariateNormalChart.vue";
import SphereChart from "@/components/SpatialPlot/SphereChart.vue";
import SpiralCurveChart from "@/components/SpatialPlot/SpiralCurveChart.vue";
</script>

<template>
  <SpiralCurveChart id="spiral-curve" class="chart" />
  <BivariateNormalChart id="bivariate-normal" class="chart" />
  <SphereChart id="sphere" class="chart" />
</template>

<style scoped>
.chart {
  height: 70vh;
  width: 70vw;
}
</style>
