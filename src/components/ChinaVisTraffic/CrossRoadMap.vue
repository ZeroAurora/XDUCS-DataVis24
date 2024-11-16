<script setup lang="ts">
import * as echarts from "echarts";
import { inject, onMounted, ref, type Ref, watchEffect } from "vue";
import VChart from "vue-echarts";
import { renderMapEchartsAtSeq } from "./lib/map";
import { getSeqNearDatetime } from "./lib/utils";

const selectedDatetime = inject<Ref<string>>("selectedDatetime")!;

const seq = ref("0");
const option = ref({});

onMounted(async () => {
  echarts.registerMap("road10", await (await fetch(`/data/4/road10.geojson`)).json());
});

watchEffect(async () => {
  seq.value = await getSeqNearDatetime(selectedDatetime.value);
});

watchEffect(async () => {
  const optionValue = await renderMapEchartsAtSeq(seq.value);
  if (optionValue) {
    option.value = optionValue;
  }
});
</script>

<template>
  <VChart :option :autoresize="true" />
</template>
