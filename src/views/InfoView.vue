<template>
  <div class="CurrentView h-screen flex flex-col">
    <TopBar />
    <Tabs v-model:active="tabActiveName" sticky shrink swipeable lazy-render>
      <Tab name="follow" title="关注">关注</Tab>
      <Tab name="home" title="首页">
        <InfoHomePage />
      </Tab>
      <Tab name="hot" title="热门">
        <InfoHotPage />
      </Tab>
      <Tab name="event" title="事件">
        <InfoEventPage />
      </Tab>
      <Tab name="info" title="信息">
        <InfoFlowPage by="home"/>
      </Tab>
      <Tab name="experience" title="经验">
        <InfoExpsPage by="home"/>
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
import InfoHomePage from "@/pages/InfoHomePage.vue";
import InfoHotPage from "@/pages/InfoHotPage.vue";
import InfoEventPage from "@/pages/InfoEventPage.vue";
import InfoFlowPage from "@/pages/InfoFlowPage.vue";
import InfoExpsPage from "@/pages/InfoExpsPage.vue";
import { Tab, Tabs, Tabbar, TabbarItem } from "vant";
import { useRouter } from "vue-router";
import { ref,onMounted } from "vue";
const tabActiveName = ref("info");
const router = useRouter();
onMounted(() => {
})
</script>

<style>
:root {
  --van-tabs-bottom-bar-width: 10px;
  --van-tab-active-text-color: var(--van-primary-color);
  --van-tabs-line-height: 40px;
  --van-tab-font-size: 16px;
}
.van-tabs__line {
  bottom: 5.3vw;
}
.van-tabs__content {
  background-color: #f2f3f5;
}
</style>

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
