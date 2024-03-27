<template>
  <div class="flex flex-col h-screen">
    <NavBar
      title="发布动态"
      left-arrow
      left-text="返回"
      right-text="发布"
      @click-left="onBack"
      @click-right="onPublish" />
    <Tabs v-model:active="activeTab">
      <Tab title="信息"><PublishInfoPage ref="info" /></Tab>
      <Tab title="经验">信息建设完毕后直接移用</Tab>
      <Tab title="资源"><PublishResPage ref="res" /></Tab>
      <Tab title="项目"><PublishProjectPage ref="proj" /></Tab>
      <Tab title="事件"><PublishEventPage ref="event" /> </Tab>
      <Tab title="节点"> <PublishNodePage ref="node" /></Tab>
      <Tab title="状态"><PublishStatusPage ref="status" /> </Tab>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import PublishInfoPage from "@/pages/PublishInfoPage.vue";
import PublishResPage from "@/pages/PublishResPage.vue";
import { Tab, Tabs, NavBar } from "vant";
import PublishProjectPage from "@/pages/PublishProjectPage.vue";
import PublishEventPage from "@/pages/PublishEventPage.vue";
import PublishNodePage from "@/pages/PublishNodePage.vue";
import PublishStatusPage from "@/pages/PublishStatusPage.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const activeTab = ref(0);
const info = ref();
const exp = ref();
const res = ref();
const proj = ref();
const event = ref();
const node = ref();
const status = ref();

const router = useRouter();
const onBack = () => {
  router.back();
};
const onPublish = () => {
  switch (activeTab.value) {
    case 0:
      info.value.onPublish();
      break;
    case 1:
      break;
    case 2:
      res.value.onPublish();
      break;
    case 3:
      proj.value.onPublish();
      break;
    case 4:
      event.value.onPublish();
      break;
    case 5:
      node.value.onPublish();
      break;
    default:
      break;
  }
};
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
