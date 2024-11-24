<script setup lang="ts">
import type { Ref } from "vue";
import type { StudentInfoRowData } from "./lib/types";
import { NTable } from "naive-ui";
import { inject, ref, watch } from "vue";
import { getStudentInfo } from "./lib/clickhouseClient";

const student = inject<Ref<string>>("student")!;
const data: Ref<StudentInfoRowData> = ref({} as StudentInfoRowData);

watch(student, async () => {
  data.value = await getStudentInfo(student.value);
}, { immediate: true });
</script>

<template>
  <NTable>
    <tr>
      <th>Student Id</th>
      <td>{{ data.student_ID }}</td>
    </tr>

    <tr>
      <th>Age</th>
      <td>{{ data.age }}</td>
    </tr>
    <tr>
      <th>City</th>
      <td>{{ data.major }}</td>
    </tr>
    <tr>
      <th>Sex</th>
      <td>{{ data.sex }}</td>
    </tr>
  </NTable>
</template>
