<script setup lang="ts">
import CrossRoadMap from "@/components/ChinaVisTraffic/CrossRoadMap.vue";
import DensityGraph from "@/components/ChinaVisTraffic/DensityGraph.vue";
import HighValueTable from "@/components/ChinaVisTraffic/HighValueTable.vue";
import SingleObject from "@/components/ChinaVisTraffic/SingleObject.vue";
import * as echarts from "echarts";
import { NDatePicker, NLayout, NLayoutSider, NSpace } from "naive-ui";

import { onMounted, provide, ref } from "vue";

const selectedDatetime = ref("2023-04-13 00:00:00");
const selectedObject = ref("0");

provide("selectedDatetime", selectedDatetime);
provide("selectedObject", selectedObject);

onMounted(async () => {
  echarts.registerMap("road10", await (await fetch(`/data/4/road10.geojson`)).json());
});
</script>

<template>
  <NSpace class="screen">
    <NLayout has-sider content-style="margin: 20px">
      <NLayoutSider width="30vw">
        <HighValueTable id="high-value-table" />
        <SingleObject id="single-object" />
      </NLayoutSider>
      <NLayout style="height: 100vh; width: 70vw">
        <NDatePicker v-model:formatted-value="selectedDatetime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" class="picker" />
        <DensityGraph id="density-graph" style="height: 30vh" />
        <CrossRoadMap id="crossroad-map" style="height: 50vh" />
      </NLayout>
    </NLayout>
  </NSpace>
</template>

<style scoped>
.picker {
  margin: 0 auto;
  padding: 20px;
  width: 800px;
}
.screen {
  height: 100vh;
  width: 100vw;
}
</style>
