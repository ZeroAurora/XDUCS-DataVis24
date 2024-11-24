<script setup lang="ts">
import type { Ref } from "vue";
import type { SubmitRecordRowData } from "./lib/types";
import { inject, ref, watch } from "vue";
import VChart from "vue-echarts";
import { getStudentSubmitRecords } from "./lib/clickhouseClient";
import { renderMethodPrefEcharts } from "./lib/methodPref";
import "echarts";

const student = inject<Ref<string>>("student")!;
const option = ref({});

let data: SubmitRecordRowData[] = [];

watch(student, async () => {
  data = await getStudentSubmitRecords(student.value);
  option.value = renderMethodPrefEcharts(data);
}, { immediate: true });
</script>

<template>
  <VChart :option :autoresize="true" />
</template>
