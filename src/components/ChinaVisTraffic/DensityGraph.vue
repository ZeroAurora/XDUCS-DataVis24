<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";
import VChart from "vue-echarts";
import { renderDensityEcharts } from "./lib/density";

import "echarts";

const selectedDatetime = inject<Ref<string>>("selectedDatetime")!;

const option = ref({});

onMounted(async () => {
  option.value = await renderDensityEcharts();
});

function onClick(params: any) {
  selectedDatetime.value = params.name;
}
</script>

<template>
  <VChart :option :autoresize="true" @click="onClick" />
</template>
