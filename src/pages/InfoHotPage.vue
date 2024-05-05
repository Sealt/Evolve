<template>
  <HotList />
  <HotSearch />
  <FlowPage by="hot" />
</template>

<script setup lang="ts">
import HotList from "@/components/HotList.vue";
import HotSearch from '@/components/HotSearch.vue'
import FlowPage from "./FlowPage.vue";
import { ref,onMounted } from 'vue'
onMounted(() => {

})
</script>

<style scoped></style>
