<template>
  <InfoCard v-for="item in records" :info="item" type="info"/>
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getInfos } from "@/api/flow";
import { onMounted,ref } from "vue";
import { showToast } from "vant";
const records:any = ref([]);
onMounted(() => {
  getInfos({
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
