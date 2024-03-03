<template>
  <div class="InfoView">
    <TopBar />
    <Tabs v-model:active="tabActiveName" sticky shrink swipeable>
      <Tab name="follow" title="关注">关注</Tab>
      <Tab name="home" title="首页">
        <InfoHomeView />
      </Tab>
      <Tab name="hot" title="热门">热门</Tab>
      <Tab name="event" title="事件">事件</Tab>
      <Tab name="info" title="信息">信息</Tab>
      <Tab name="experience" title="经验">经验</Tab>
    </Tabs>
    <Tabbar route placeholder>
      <TabbarItem name="info" to="/" icon="info-o">信息</TabbarItem>
      <TabbarItem name="res" to="/res" icon="apps-o">资源</TabbarItem>
      <TabbarItem name="chat" to="/chat" icon="chat-o">消息</TabbarItem>
      <TabbarItem name="me" to="/me" icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import InfoHomeView from "@/pages/InfoHomePage.vue";
import { Tab, Tabs,Tabbar,TabbarItem } from "vant";
import { ref } from "vue";
const tabActiveName = ref("home");
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
