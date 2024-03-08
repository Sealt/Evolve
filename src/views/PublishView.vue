<template>
  <div class="flex flex-col h-screen">
    <NavBar title="发布动态" left-arrow left-text="返回" right-text="发布" />
    <Tabs v-model:active="activeTab">
      <Tab title="信息"><PublishInfoPage/></Tab>
      <Tab title="经验">信息建设完毕后直接移用</Tab>
      <Tab title="资源"><PublishResPage/></Tab>
      <Tab title="项目"> </Tab>
      <Tab title="事件"> </Tab>
      <Tab title="节点"> </Tab>
      <Tab title="状态"> </Tab>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import PublishInfoPage from "@/pages/PublishInfoPage.vue";
import PublishResPage from "@/pages/PublishResPage.vue";
import { Tab, Tabs, NavBar } from "vant";
import { ref } from "vue";
const activeTab = ref(0);
</script>

<style scoped>
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
  flex-grow: 1;
}
:deep(.van-swipe-item) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
