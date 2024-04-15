<template>
  <div class="CurrentView father flex flex-col h-screen">
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
        <Image :src="project.icon" fit="cover" class="image" />
      </div>
      <div class="event-content">
        <div class="event-content__title">{{ project.projectName }}</div>

        <div class="event-content__detail">
          <div class="event-content__detaila">
            {{ project.hotIndex + " 热度 " + project.resourceCount + " 讨论" }}
          </div>
          <div class="event-content__detailb">531万关注</div>
        </div>
      </div>
      <div class="event-button">
        <Button type="primary" size="small" round>已关注</Button>
      </div>
    </div>
    <div class="event-intro">{{ project.projectDesc }}</div>
    <Tabs v-model:active="activeTab" sticky offset-top="46" animated swipeable lazy-render>
      <Tab title="资料库" name="a">
        <StockTree treeType="database" />
      </Tab>
      <Tab title="校友分享" name="b">
        <div class="flex flex-col gap-10 p-10">
          <ResFlowPage by="project" />
        </div>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import StockTree from "@/components/StockTree.vue";
import { NavBar, Image, Button, Tab, Tabs } from "vant";
import ResFlowPage from "./ResFlowPage.vue";
import { ref, onMounted } from "vue";
import { getProject } from "@/api/res";
import { useRouter } from "vue-router";
const router = useRouter();
const activeTab = ref("a");
const project = ref({
  id: "",
  userId: "",
  managerIds: null,
  projectName: "",
  projectDesc: "",
  icon: "",
  sort: 0,
  largeId: 0,
  hotIndex: null,
  resourceCount: null,
  createTime: "",
});
const onClickLeft = () => {
  history.back();
};
onMounted(() => {
  getProject({ projectId: router.currentRoute.value.params.id }).then((res) => {
    if (res.code == 200) {
      project.value = res.data;
    }
  });
});
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: whitesmoke;
}
.father {
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
}
:deep(.van-swipe-item) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
