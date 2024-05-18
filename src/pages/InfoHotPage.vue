<template>
  <div class="flex flex-col gap-10">
    <HotList />
    <HotSearch />
    <FlowPage by="hot" ref="hotPage" />
  </div>
</template>

<script setup lang="ts">
import HotList from "@/components/HotList.vue";
import HotSearch from "@/components/HotSearch.vue";
import FlowPage from "./FlowPage.vue";
import { ref, onMounted } from "vue";
const hotPage: any = ref(null);
onMounted(() => {});
defineExpose({
  onRefresh,
});
function onRefresh() {
  hotPage.value.onRefresh();
}
</script>

<style scoped></style>
