<script setup lang="ts">
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import type { Ref } from "vue";
import { NDataTable, NTab, NTabs } from "naive-ui";
import { inject, ref, watch } from "vue";
import { createAccelrationColumns, createOverSpeedColumns, getAcceleration, getOverSpeed } from "./lib/highValue";

const selectedObject = inject<Ref<string>>("selectedObject")!;

const type = ref<"overspeed" | "acceleration">("overspeed");
const columns = ref<DataTableColumns<any>>([]);
const data = ref<any[]>([]);
const checked = ref<DataTableRowKey[]>([]);

watch(type, async () => {
  if (type.value === "overspeed") {
    columns.value = createOverSpeedColumns();
    data.value = await getOverSpeed();
  }
  else if (type.value === "acceleration") {
    columns.value = createAccelrationColumns();
    data.value = await getAcceleration();
  }
}, { immediate: true });

watch(checked, () => {
  selectedObject.value = checked.value[0].toString();
});
</script>

<template>
  <div>
    <NTabs v-model:value="type" type="line" animated>
      <NTab tab="overspeed" name="overspeed">
        OverSpeed
      </NTab>
      <NTab tab="acceleration" name="acceleration">
        Acceleration
      </NTab>
    </NTabs>
    <NDataTable v-model:checked-row-keys="checked" :columns :data :row-key="(row) => row.id" :pagination="{ defaultPageSize: 5 }" />
  </div>
</template>
