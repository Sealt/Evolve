<template>
  <div class="flex flex-col p-10 gap-10">
    <ResStatistics />
    <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
    <InfoCard v-for="item in records" :info="item" cardType="res"/>
  </div>
</template>

<script setup lang="ts">
import ResStatistics from "@/components/ResStatistics.vue";
import InfoCard from "@/components/InfoCard.vue";
import { getRes } from "@/api/flow";
import { onMounted, ref } from "vue";
import { Loading } from "vant";
const records: any = ref([]);
const loadStatus = ref(true);
onMounted(() => {
  getRes({
    current: 1,
    size: 10,
    type: "database",
  }).then((res) => {
    loadStatus.value = false;
    if (res.code == 200) {
      records.value = res.data.records;
    }
  });
});
</script>

<style scoped></style>
