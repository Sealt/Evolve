<template>
  <div class="father">
    <NavBar
      :border="false"
      :fixed="true"
      left-arrow
      left-text="返回"
      :placeholder="true"
      @click-left="onClickLeft" />
    <div class="event">
      <div class="event-image">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="image" />
      </div>
      <div class="event-content">
        <div class="event-content__title">考研</div>

        <div class="event-content__detail">
          <div class="event-content__detaila">68.4万热度 61.3万讨论</div>
          <div class="event-content__detailb">6531万关注</div>
        </div>
      </div>
      <div class="event-button">
        <Button type="primary" size="small" round>已关注</Button>
      </div>
    </div>
    <div class="event-intro">这是一段简单的事件介绍你好</div>
    <div class="event-tabs">
      <Tabs
        v-model:active="activeTab"
        sticky
        offset-top="46"
        animated
        swipeable>
        <Tab title="节点" name="a">内容1</Tab>
        <Tab title="信息" name="b">内容2</Tab>
        <Tab title="经验" name="c">内容3</Tab>
        <Tab title="资源" name="d">内容3</Tab>
        <Tab title="问答" name="e">内容3</Tab>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavBar, Image, Button, Tab, Tabs } from "vant";
import { ref } from "vue";
const activeTab = ref("a");
const onClickLeft = () => {
  history.back();
};
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
.event-tabs {
  border: 1px solid whitesmoke;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
}
</style>
