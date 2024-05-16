<template>
  <div class="CurrentView flex flex-col h-screen">
    <Search
      v-model="searchValue"
      left-icon="arrow-left"
      right-icon="search"
      @click-left-icon="onBack"
      @click-right-icon="onSearch" />
    <Tabs
      v-model:active="activeTab"
      :lazy-render="false"
      shrink
      swipeable
      @change="onTabsChange">
      <Tab title="信息"><InfoFlowPage by="searchinfo" ref="infoflow" /></Tab>
      <Tab title="经验"><InfoFlowPage by="searchexp" ref="expflow" /></Tab>
      <Tab title="资源"><ResFlowPage by="searchres" ref="resflow" /></Tab>
      <Tab title="节点"><NodeFlowPage by="search" ref="nodeflow" /></Tab>
      <Tab title="用户"><UserFlowPage ref="userflow" /></Tab>
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
import { ref, onMounted, watch, onActivated } from "vue";
const activeTab = ref(0);
const router = useRouter();
const searchValue: any = ref("");
const infoflow = ref();
const expflow = ref();
const resflow = ref();
const nodeflow = ref();
const userflow = ref();
const onBack = () => {
  router.back();
};
const onSearch = () => {
  if (searchValue.value == "") {
    showToast("搜索内容为空");
    return;
  }
  router.replace("/search/detail?query=" + searchValue.value);
  onTabsChange();
};
const onTabsChange = () => {
  if (searchValue.value == "") {
    return;
  }
  router.currentRoute.value.query.query = searchValue.value;
  switch (activeTab.value) {
    case 0:
      infoflow.value.reload(searchValue.value);
      break;
    case 1:
      expflow.value.reload(searchValue.value);
      break;
    case 2:
      resflow.value.reload(searchValue.value);
      break;
    case 3:
      nodeflow.value.reload(searchValue.value);
      break;
    case 4:
      userflow.value.reload(searchValue.value);
      break;
    default:
      break;
  }
};
onMounted(() => {
  searchValue.value = router.currentRoute.value.query.query;
});
onActivated(() => {
  searchValue.value = router.currentRoute.value.query.query;
  onTabsChange();
});
watch(infoflow, (newVal, oldVal) => {
  if (newVal != null) {
    infoflow.value.reload(searchValue.value);
  }
});
</script>

<style scoped>
:deep(.van-search) {
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
