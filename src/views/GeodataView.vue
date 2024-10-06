<script setup lang="ts">
import PandemicMap from "@/components/Geodata/PandemicMap.vue";
import { NButton, NDatePicker, NSelect } from "naive-ui";
import { ref } from "vue";

const date = ref("2020-01-24");

const options = [
  {
    label: "确诊",
    value: "confirmed",
  },
  {
    label: "疑似",
    value: "suspected",
  },
  {
    label: "治愈",
    value: "cured",
  },
  {
    label: "死亡",
    value: "dead",
  },
  {
    label: "累计",
    value: "cumulated",
  },
];
const type = ref<"confirmed" | "suspected" | "cured" | "dead" | "cumulated">("confirmed");

let demoIntervalId: number | null = null;

function onDemo() {
  if (demoIntervalId) {
    clearInterval(demoIntervalId);
  }
  let current = Date.UTC(2020, 0, 24);
  date.value = new Date(current).toISOString().split("T")[0];

  demoIntervalId = setInterval(() => {
    current += 1000 * 60 * 60 * 24;
    date.value = new Date(current).toISOString().split("T")[0];

    if (current >= Date.UTC(2020, 3, 18)) {
      clearInterval(demoIntervalId!);
    }
  }, 100);
}
</script>

<template>
  <PandemicMap class="chart" :type :date />
  <NDatePicker v-model:formatted-value="date" value-format="yyyy-MM-dd" type="date" />
  <NSelect v-model:value="type" :options />
  <NButton @click="onDemo">
    演示
  </NButton>
  <p>China GeoJSON from <a href="https://datav.aliyun.com/portal/school/atlas/area_selector">Aliyun</a>.</p>
</template>

<style scoped>
.chart {
  width: 80vw;
  height: 80vh;
}
</style>
