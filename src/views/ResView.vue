<template>
  <div class="CurrentView h-screen flex flex-col">
    <TopBar />
    <Tabs v-model:active="tabActiveName" sticky shrink swipeable lazy-render>
      <Tab name="store" title="资料库">
        <StockTree treeType="project" />
      </Tab>
      <Tab name="res" title="资源" ref="resTab">
        <ResMainPage />
      </Tab>
      <Tab name="market" title="广场" ref="marketTab">
        <div class="flex flex-col gap-10 p-10"><ResFlowPage by="home"/></div>
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
import { ref,onActivated,nextTick } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import ResMainPage from "@/pages/ResMainPage.vue";
import ResFlowPage from "@/pages/ResFlowPage.vue";
import { useViewStore } from "@/stores/view";
const tabActiveName = ref("res");
const resTab: any = ref(null);
const marketTab: any = ref(null);
const viewStore = useViewStore();

onActivated(() => {
  nextTick(() => {
    resTab.value.$el.scrollTop = viewStore.resScrollTops[1];
    marketTab.value.$el.scrollTop = viewStore.resScrollTops[2];
  });
});
onBeforeRouteLeave(() => {
  viewStore.resScrollTops = [
    0,
    resTab.value.$el.scrollTop,
    marketTab.value.$el.scrollTop
  ];
});
</script>

<style scoped>
:deep(.van-tabs) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: scroll;
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
  overflow: scroll;
}
</style>
