<template>
    <div class="flex flex-col gap-10 p-10">
        <InfoCard v-for="item in records" :info="item" type="res"/>
    </div>
  </template>

  <script setup lang="ts">
  import InfoCard from "@/components/InfoCard.vue";
  import { getRes } from "@/api/flow";
  import { onMounted,ref } from "vue";
  import { showToast } from "vant";
  const records:any = ref([]);
  onMounted(() => {
    getRes({
      current:1,size:10,type:"all"
    }).then((res) => {
      if (res.code == 200) {
        records.value = res.data.records;
      }
    })
  })
  </script>

  <style scoped>

  </style>
