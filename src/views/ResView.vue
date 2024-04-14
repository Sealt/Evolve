<template>
  <div class="CurrentView h-screen flex flex-col">
    <TopBar />
    <Tabs v-model:active="tabActiveName" sticky shrink swipeable>
      <Tab name="store" title="资料库">
        <StockTree type="project"/>
      </Tab>
      <Tab name="res" title="资源">
        <ResMainPage />
      </Tab>
      <Tab name="market" title="广场">
        <ResFlowPage />
      </Tab>
    </Tabs>
    <Tabbar route placeholder class="shrink-0">
      <TabbarItem name="info" to="/" icon="info-o">信息</TabbarItem>
      <TabbarItem name="res" to="/res" icon="apps-o">资源</TabbarItem>
      <TabbarItem name="chat" to="/chat" icon="chat-o">消息</TabbarItem>
      <TabbarItem name="me" to="/me" icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import StockTree from "@/components/StockTree.vue";
import { Tab, Tabs, Tabbar, TabbarItem } from "vant";
import { ref } from "vue";
import ResMainPage from "@/pages/ResMainPage.vue";
import ResFlowPage from "@/pages/ResFlowPage.vue";
const tabActiveName = ref("market");
</script>

<style scoped>
:deep(.van-tabs){
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
