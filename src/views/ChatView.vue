<template>
  <div class="flex flex-col h-screen overflow-scroll">
    <div class="flex items-center justify-center p-10 text-15 border-b-[1px] border-gray-100 font-bold">消息</div>
    <PullRefresh
      v-model="pullLoading"
      @refresh="onRefresh"
      class="h-full *:!h-full !overflow-scroll"
      success-text="刷新成功">
      <div class="grid grid-cols-3 justify-items-center py-25">
        <div
          class="flex flex-col items-center gap-5"
          @click="
            notifyData.likes = 0;
            router.push('/detail/like');
          ">
          <Badge :content="notifyData.likes" :show-zero="false">
            <Icon
              name="good-job"
              size="10vw"
              class="text-red-500 rounded-[10px] overflow-hidden bg-red-100 p-5"
          /></Badge>
          <div class="text-14">收到的赞</div>
        </div>
        <div
          class="flex flex-col items-center gap-5"
          @click="
            notifyData.follow = 0;
            router.push('/detail/followed');
          ">
          <Badge :content="notifyData.follow" :show-zero="false">
            <Icon
              name="contact"
              size="10vw"
              class="text-blue-500 rounded-[10px] overflow-hidden bg-blue-100 p-5"
          /></Badge>
          <div class="text-14">关注</div>
        </div>
        <div
          class="flex flex-col items-center gap-5"
          @click="
            notifyData.chat = 0;
            router.push('/detail/chat');
          ">
          <Badge :content="notifyData.chat" :show-zero="false">
            <Icon
              name="chat"
              size="10vw"
              class="text-green-500 rounded-[10px] overflow-hidden bg-green-100 p-5"
          /></Badge>
          <div class="text-14">私信</div>
        </div>
      </div>
      <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
      <div class="flex flex-col mx-15 mb-15 gap-15">
        <NotifyItem
          @check="onCheck"
          type="push"
          :icon="item.icon"
          :iconClass="item.iconClass"
          :id="item.notifyCommentId"
          :userName="item.userName"
          :create-time="item.notifyTime"
          :content="item.content"
          :noRead="item.count"
          :dot="item.count != 0"
          v-for="item in notifyData.items" />
        <NotifyItem
          @check="onCheck"
          type="comment"
          :avatar="item.comment.user.avatar"
          :jumpId="item.comment.targetId"
          :jumpType="item.comment.targetType"
          :notifyId="item.id"
          :userName="item.comment.user.userName"
          :create-time="item.comment.commentTime"
          :content="item.comment.content"
          :typeText="typeTextOn(item)"
          :dot="!item.isRead"
          v-for="item in commentData" />
        <div
          v-show="commentData.length != 0 && loadStatus == false"
          ref="loadMoreElement"
          class="flex justify-center text-13 text-vant-t2 pb-15">
          {{ loadMoreContent }}
        </div>
      </div>
      <Empty
        v-if="
          notifyData.items.length == 0 &&
          commentData.length == 0 &&
          loadStatus == false
        "
        description="暂无通知" />
    </PullRefresh>

    <Tabbar route placeholder class="flex shrink-0" ref="tabbarRef">
      <TabbarItem name="info" to="/" icon="info-o">信息</TabbarItem>
      <TabbarItem name="res" to="/res" icon="apps-o">资源</TabbarItem>
      <TabbarItem name="chat" to="/chat" icon="chat-o">消息</TabbarItem>
      <TabbarItem name="me" to="/me" icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import NotifyItem from "@/components/NotifyItem.vue";
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Loading,
  Badge,
  Icon,
  Empty,
  PullRefresh,
} from "vant";
import { getNotify } from "@/api/notify";
import { onMounted, ref, onBeforeUnmount, onActivated } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const notifyData: any = ref({ items: [] });
const loadStatus = ref(true);
const commentData: any = ref([]);
const pullLoading = ref(false);
const tabbarRef:any = ref(null);
const loadMoreElement = ref(null);
const loadMoreContent = ref("加载更多");
let loadLock = 0;
const pageInfo = ref({
  current: 1,
  size: 10,
  pages: 0,
});
let observer: any = null;

onActivated(() => {
  tabbarRef.value.$el.style.height = "7vh";
});
const onCheck = (id: any) => {
  if (id == "消息助手") {
    notifyData.value.items.forEach((item: any) => {
      if (item.userName == "消息助手") {
        item.count = 0;
        item.content = "暂无您关注的节点和资源更新";
      }
    });
  } else {
    commentData.value.forEach((item: any) => {
      if (item.id == id) {
        item.isRead = true;
      }
    });
  }
};

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (loadLock == 0) {
        loadLock = 1;
        loadData();
      }
    }
  });
  observer.observe(loadMoreElement.value);
  loadData();
  window.addEventListener("onNotifyWs", updateNotify);
  window.addEventListener("onMessageWs", updateChat);
});

const onRefresh = () => {
  loadLock = 1;
  pullLoading.value = true;
  notifyData.value.likes = 0;
  notifyData.value.follow = 0;
  notifyData.value.chat = 0;
  notifyData.value.items = [];
  commentData.value = [];
  pageInfo.value.current = 1;
  pageInfo.value.pages = 0;
  loadData();
};
function loadData() {
  if (
    pageInfo.value.pages != 0 &&
    pageInfo.value.current > pageInfo.value.pages
  ) {
    loadMoreContent.value = "没有更多了";
    return;
  }
  loadLock = 1;
  loadMoreContent.value = "加载中";
  getNotify({
    current: pageInfo.value.current,
    size: pageInfo.value.size,
  }).then((res) => {
    loadStatus.value = false;
    pullLoading.value = false;
    loadLock = 0;
    if (res.code == 200) {
      notifyData.value.likes = res.data.likes;
      notifyData.value.follow = res.data.follow;
      notifyData.value.chat = res.data.chat;
      if (res.data.items != null) {
        notifyData.value.items = [...notifyData.value.items, ...res.data.items];
      }
      commentData.value = [...commentData.value, ...res.data.comments.records];
      pageInfo.value.pages = res.data.comments.pages;
      pageInfo.value.current++;
      loadMoreContent.value = "加载更多";
    } else {
      loadMoreContent.value = "加载失败";
    }
  });
}
function updateNotify(e: any) {
  var returnData = e.detail;
  if (returnData.msgVariety == 1) {
    notifyData.value.likes++;
  }
  if (returnData.msgVariety == 2) {
    onRefresh();
  }
  if (returnData.msgVariety == 3) {
    notifyData.value.follow++;
  }
}
function updateChat() {
  notifyData.value.chat++;
}
const typeTextOn = (item: any) => {
  switch (item.comment.targetType) {
    case 0:
      if (item.comment.replyUserId != null) return "评论";
      else return "信息";
      break;
    case 1:
      return "经验";
      break;
    case 3:
      return "节点";
      break;
    case 5:
      return "资源";
      break;
    case 6:
      return "评论";
      break;
  }
};
</script>

<style scoped></style>
