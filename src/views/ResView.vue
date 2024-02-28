<template>
  <div>
    <TopBar />
    <Tabs v-model:active="tabActiveName" sticky shrink swipeable>
      <Tab name="store" title="资料库">资料库</Tab>
      <Tab name="res" title="资源">资源
      </Tab>
      <Tab name="market" title="广场">市场</Tab>
    </Tabs>
    <Tabbar route>
      <TabbarItem name="info" to="/" icon="info-o">信息</TabbarItem>
      <TabbarItem name="res" to="/res" icon="apps-o">资源</TabbarItem>
      <TabbarItem name="chat" to="/chat" icon="chat-o">消息</TabbarItem>
      <TabbarItem name="me" to="/me" icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import { Tab, Tabs,Tabbar,TabbarItem } from "vant";
import { ref } from "vue";
const tabActiveName = ref("res");
</script>

<style>

</style>
