<template>
    <InfoCard v-for="item in records" :info="item"/>
  </template>

  <script setup lang="ts">
  import InfoCard from "@/components/InfoCard.vue";
  import { getExps } from "@/api/flow";
  import { onMounted,ref } from "vue";
  import { showToast } from "vant";
  const records:any = ref([]);
  onMounted(() => {
    getExps({
      current:1,size:10
    }).then((res) => {
      if (res.code == 200) {
        records.value = res.data.records;
      }
    })
  })
  </script>

  <style scoped>

  </style>
