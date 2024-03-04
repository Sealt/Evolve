<template>
  <HotEventList />
  <HotSearch />
  <InfoCard HotIndex="01"/>
  <InfoCard HotIndex="02"/>
  <InfoCard HotIndex="03"/>
  <InfoCard HotIndex="04"/>
</template>

<script setup lang="ts">
import HotEventList from "@/components/HotEventList.vue";
import InfoCard from "@/components/InfoCard.vue";
import HotSearch from '@/components/HotSearch.vue'
</script>

<style scoped></style>
