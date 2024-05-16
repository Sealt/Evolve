<template>
  <div class="CurrentView flex flex-col h-screen">
    <NavBar
      title="我的收藏"
      left-arrow
      left-text="返回"
      fixed
      placeholder
      class="shrink-0"
      @click-left="router.back()" />
      <Tabs v-model:active="tabActiveName" sticky shrink swipeable lazy-render offset-top="46">
      <Tab name="info" title="信息">
        <InfoFlowPage by="star" />
      </Tab>
      <Tab name="exp" title="经验">
        <InfoExpsPage by="star" />
      </Tab>
      <Tab name="res" title="资源">
        <ResFlowPage by="star" />
      </Tab>
      <Tab name="node" title="节点">
        <NodeFlowPage by="star" />
      </Tab>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { NavBar, Tabs, Tab } from "vant";
import { useUserStore } from "@/stores/user";
import NodeFlowPage from "./NodeFlowPage.vue";
import ResFlowPage from "./ResFlowPage.vue";
import InfoExpsPage from "./InfoExpsPage.vue";
import InfoFlowPage from "./InfoFlowPage.vue";

const router = useRouter();
const loadStatus = ref(true);
const userStore = useUserStore();
const tabActiveName = ref("info");
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
  gap: 10px;
  padding: 10px;
}
:deep(.van-swipe-item) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
