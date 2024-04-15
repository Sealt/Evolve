<template>
  <div class="CurrentView father h-screen flex flex-col">
    <NavBar
      :border="false"
      :fixed="true"
      left-arrow
      left-text="返回"
      :placeholder="true"
      class="shrink-0"
      @click-left="onClickLeft" />
    <div class="event">
      <div class="event-image">
        <Image :src="event.icon" fit="cover" class="image" />
      </div>
      <div class="event-content">
        <div class="event-content__title">{{event.eventName}}</div>

        <div class="event-content__detail">
          <div class="event-content__detaila">{{ event.hotIndex +' 热度 ' +  event.discussCount +' 讨论' }}</div>
          <div class="event-content__detailb">{{'关注数据'}}</div>
        </div>
      </div>
      <div class="event-button">
        <Button type="primary" size="small" round>已关注</Button>
      </div>
    </div>
    <div class="event-intro">{{ event.eventDesc}}</div>
    <Tabs v-model:active="activeTab" sticky offset-top="46" animated swipeable lazy-render>
      <Tab title="节点" name="a"><NodeFlowPage /></Tab>
      <Tab title="信息" name="b"><InfoFlowPage by="event"/></Tab>
      <Tab title="经验" name="c"><InfoExpsPage by="event"/></Tab>
      <Tab title="资源" name="d"><ResFlowPage by="event"/></Tab>
      <Tab title="问答" name="e">TO BE CONTINUE</Tab>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { NavBar, Image, Button, Tab, Tabs } from "vant";
import NodeFlowPage from "./NodeFlowPage.vue";
import InfoFlowPage from "./InfoFlowPage.vue";
import InfoExpsPage from "./InfoExpsPage.vue";
import ResFlowPage from "./ResFlowPage.vue";
import { ref, onMounted } from "vue";
import { getEvent } from "@/api/event";
import { useRouter } from "vue-router";
const activeTab = ref("a");
const event = ref({
  id: "",
  eventName: "",
  eventDesc: "",
  icon: "",
  sort: 0,
  createTime: "",
  updateTime: "",
  hotIndex: 0,
  discussCount: 0,
  userId: "",
  managerIds: null,
  largeId: 0,
});
const router = useRouter();
const onClickLeft = () => {
  history.back();
};
onMounted(() => {
  getEvent({ eventId: router.currentRoute.value.params.id }).then((res) => {
    if (res.code == 200) {
      event.value = res.data;
    }
  });
});
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: whitesmoke;
}

.event-intro {
  background-color: whitesmoke;
  padding: 5px 16px 10px 16px;
  font-size: 15px;
}
.event {
  display: flex;
  background-color: whitesmoke;
  padding: 5px 16px;

  .event-image {
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    overflow: hidden;
    .image {
      width: 70px;
      height: 70px;
    }
  }

  .event-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;

    .event-content__title {
      font-size: 17px;
    }
    .event-content__detaila,
    .event-content__detailb {
      font-size: 14px;
      color: gray;
    }
  }
  .event-button {
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-end;
  }
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
  flex-grow: 1;
  gap: 10px;
  padding: 10px;
}
:deep(.van-swipe-item) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
