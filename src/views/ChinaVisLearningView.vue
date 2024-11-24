<script setup lang="ts">
import LearnerInfo from "@/components/ChinaVisLearning/LearnerInfo.vue";
import LearnerMethodPref from "@/components/ChinaVisLearning/LearnerMethodPref.vue";
import LearnerPortrait from "@/components/ChinaVisLearning/LearnerPortrait.vue";
import { provide, ref } from "vue";

const student = ref("01558eef77a8d39b7103");
provide("student", student);
</script>

<template>
  <LearnerPortrait id="learner-portrait" class="chart" />
  <LearnerMethodPref id="learner-method-pref" class="chart" />
  <LearnerInfo id="learner-info" class="chart" />
</template>

<style scoped>
.chart {
  height: 500px;
  width: 500px;
}
</style>
