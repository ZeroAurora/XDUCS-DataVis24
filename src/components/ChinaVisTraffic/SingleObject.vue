<script setup lang="ts">
import type { Ref } from "vue";
import type { RowData } from "./lib/types";
import { NInput } from "naive-ui";
import { inject, ref, watch } from "vue";
import VChart from "vue-echarts";
import { getObjectsOfId } from "./lib/clickhouseClient";
import { renderMapEcharts } from "./lib/map";
import { renderSpeedLineEcharts } from "./lib/speed";
import "echarts";

const objId = inject<Ref<string>>("selectedObject")!;
let data: RowData[] = [];

const speedOption = ref({});
const mapOption = ref({});

watch(objId, async () => {
  data = await getObjectsOfId(objId.value);
  if (data) {
    speedOption.value = renderSpeedLineEcharts(data);
    mapOption.value = renderMapEcharts(data);
  }
}, { immediate: true });
</script>

<template>
  <div>
    <NInput v-model:value="objId" placeholder="Object ID" style="margin: 8px auto;" />
    <VChart style="margin: 8px auto; height: 20vh;" :option="speedOption" :autoresize="true" />
    <VChart style="margin: 8px auto; height: 50vh;" :option="mapOption" :autoresize="true" />
  </div>
</template>
