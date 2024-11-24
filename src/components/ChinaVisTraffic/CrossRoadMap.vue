<script setup lang="ts">
import type { Ref } from "vue";
import type { RowData } from "./lib/types";
import { inject, ref, watchEffect } from "vue";
import VChart from "vue-echarts";
import { getObjectsAtSeq, getSeqNearDatetime } from "./lib/clickhouseClient";
import { renderMapEcharts } from "./lib/map";
import "echarts";

const selectedDatetime = inject<Ref<string>>("selectedDatetime")!;
const selectedObject = inject<Ref<string>>("selectedObject")!;

let data: RowData[] = [];

const seq = ref("0");
const option = ref({});

watchEffect(async () => {
  seq.value = await getSeqNearDatetime(selectedDatetime.value);
});

watchEffect(async () => {
  data = await getObjectsAtSeq(seq.value);
  const optionValue = renderMapEcharts(data);
  if (optionValue) {
    option.value = optionValue;
  }
});

function onClick(params: any) {
  selectedObject.value = params.data.id;
}
</script>

<template>
  <VChart :option :autoresize="true" @click="onClick" />
</template>
