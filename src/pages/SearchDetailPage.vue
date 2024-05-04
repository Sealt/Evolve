<template>
  <div class="CurrentView flex flex-col h-screen">
    <Search
      v-model="searchValue"
      left-icon="arrow-left"
      right-icon="search"
      @click-left-icon="onBack"
      @click-right-icon="onSearch" />
    <Tabs v-model:active="activeTab" lazy-render shrink swipeable>
      <Tab title="信息"><InfoFlowPage by="searchinfo" :keyword="searchValue"/></Tab>
      <Tab title="经验"><InfoFlowPage by="searchexp" :keyword="searchValue"/></Tab>
      <Tab title="资源"><ResFlowPage by="searchres" :keyword="searchValue"/></Tab>
      <Tab title="节点"><NodeFlowPage :keyword="searchValue"/></Tab>
      <Tab title="用户"><UserFlowPage :keyword="searchValue"/></Tab>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { Tab, Tabs, Search, showToast } from "vant";
import { useRouter } from "vue-router";
import InfoFlowPage from "./InfoFlowPage.vue";
import ResFlowPage from "./ResFlowPage.vue";
import NodeFlowPage from "./NodeFlowPage.vue";
import UserFlowPage from "./UserFlowPage.vue";
import { ref,onMounted } from "vue";
const activeTab = ref(0);
const router = useRouter();
const searchValue:any = ref("");
const onBack = () => {
  router.back();
};
const onSearch = () => {
  showToast("hello");
};
onMounted(() => {
  searchValue.value = router.currentRoute.value.query.query
})
</script>

<style scoped>
:deep(.van-search){
  padding: 10px 12px 0px 12px;
}
:deep(.van-search__content) {
  background: #f2f3f5;
}
:deep(.van-tabs) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
:deep(.van-tabs__content) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
:deep(.van-tab__panel) {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}
:deep(.van-swipe-item) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
