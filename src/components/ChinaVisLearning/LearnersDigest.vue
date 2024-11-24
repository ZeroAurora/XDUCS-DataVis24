<script setup lang="ts">
import type { Ref } from "vue";
import type { TitleInfoRowData } from "./lib/types";
import { NSelect, type SelectGroupOption } from "naive-ui";
import { inject, onMounted, ref } from "vue";
import { getAllObjects } from "./lib/clickhouseClient";

const student = inject<Ref<string>>("student")!;
const title: Ref<string> = ref("");
const options: Ref<any[]> = ref([]);

let titleData: TitleInfoRowData[] = [];
onMounted(async () => {
  titleData = await getAllObjects<TitleInfoRowData>("title_info");

  for (const title of titleData) {
    options.value.push({
      label: title.title_ID,
      value: title.title_ID,
    });
  }
});

// watch(title, async () => {

// })
</script>

<template>
  <NSelect v-model:value="title" :options />
</template>
