<template>
  <div class="CurrentView h-screen flex flex-col">
    <TopBar />
    <Tabs
      v-model:active="tabActiveName"
      sticky
      shrink
      swipeable
      lazy-render
      ref="viewTabs">
      <Tab name="follow" title="关注" ref="followTab">
          <PullRefresh
            v-model="pullLoading"
            @refresh="onRefresh"
            success-text="刷新成功">
            <FlowPage by="follow" ref="followPage" />
          </PullRefresh>
      </Tab>
      <Tab name="home" title="首页" ref="homeTab">
        <PullRefresh
          v-model="pullLoading"
          @refresh="onRefresh"
          success-text="刷新成功">
          <InfoHomePage  ref="homePage"/>
        </PullRefresh>
      </Tab>
      <Tab name="hot" title="热门" ref="hotTab">
          <PullRefresh
            v-model="pullLoading"
            @refresh="onRefresh"
            success-text="刷新成功">
            <InfoHotPage  ref="hotPage"/>
          </PullRefresh>
      </Tab>
      <Tab name="event" title="事件" ref="eventTab">
        <PullRefresh
          v-model="pullLoading"
          @refresh="onRefresh"
          success-text="刷新成功">
          <InfoEventPage ref="eventPage"/>
        </PullRefresh>
      </Tab>
      <Tab name="info" title="信息" ref="infoTab">
        <PullRefresh
          v-model="pullLoading"
          @refresh="onRefresh"
          success-text="刷新成功">
          <InfoFlowPage by="info"  ref="infoPage"/>
        </PullRefresh>
      </Tab>
      <Tab name="experience" title="经验" ref="experienceTab">
        <PullRefresh
          v-model="pullLoading"
          @refresh="onRefresh"
          success-text="刷新成功">
          <InfoExpsPage by="home"  ref="expPage"/>
        </PullRefresh>
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
import FlowPage from "@/pages/FlowPage.vue";
import InfoHomePage from "@/pages/InfoHomePage.vue";
import InfoHotPage from "@/pages/InfoHotPage.vue";
import InfoEventPage from "@/pages/InfoEventPage.vue";
import InfoFlowPage from "@/pages/InfoFlowPage.vue";
import InfoExpsPage from "@/pages/InfoExpsPage.vue";
import { Tab, Tabs, Tabbar, TabbarItem, PullRefresh } from "vant";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useViewStore } from "@/stores/view";
import { ref, onMounted, onActivated, nextTick } from "vue";

const tabActiveName = ref("home");
const router = useRouter();
const viewStore = useViewStore();
const homeTab: any = ref(null);
const followTab: any = ref(null);
const hotTab: any = ref(null);
const eventTab: any = ref(null);
const infoTab: any = ref(null);
const experienceTab: any = ref(null);
const followPage: any = ref(null);
const homePage: any = ref(null);
const hotPage: any = ref(null);
const eventPage: any = ref(null);
const infoPage: any = ref(null);
const expPage: any = ref(null);
const pullLoading = ref(false);

const onRefresh = () => {
  pullLoading.value = true;
  switch (tabActiveName.value) {
    case "follow":
      followPage.value.onRefresh();
      break;
    case "home":
      homePage.value.onRefresh();
      break;
    case "hot":
      hotPage.value.onRefresh();
      break;
    case "event":
      eventPage.value.onRefresh();
      break;
    case "info":
      infoPage.value.onRefresh();
      break;
    case "experience":
      expPage.value.onRefresh();
      break;
  }
  pullLoading.value = false;
};

onActivated(() => {
  if (router.currentRoute.value.query.from == "login") {
    router.push({ path: "/", query: {} }).then(() => {
      location.reload();
    });
  }
  nextTick(() => {
    followTab.value.$el.scrollTop = viewStore.infoScrollTops[0];
    homeTab.value.$el.scrollTop = viewStore.infoScrollTops[1];
    hotTab.value.$el.scrollTop = viewStore.infoScrollTops[2];
    eventTab.value.$el.scrollTop = viewStore.infoScrollTops[3];
    infoTab.value.$el.scrollTop = viewStore.infoScrollTops[4];
    experienceTab.value.$el.scrollTop = viewStore.infoScrollTops[5];
  });
});
onBeforeRouteLeave(() => {
  viewStore.infoScrollTops = [
    followTab.value.$el.scrollTop,
    homeTab.value.$el.scrollTop,
    hotTab.value.$el.scrollTop,
    eventTab.value.$el.scrollTop,
    infoTab.value.$el.scrollTop,
    experienceTab.value.$el.scrollTop,
  ];
});
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
  padding: 10px;
}
:deep(.van-swipe-item) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: scroll;
}
</style>
