<template>
  <div>
    <NavBar title="消息" fixed placeholder class="z-10" />
    <div class="grid grid-cols-3 justify-items-center my-25">
      <div
        class="flex flex-col items-center gap-5"
        @click="router.push('/detail/like')">
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
        @click="router.push('/detail/followed')">
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
        @click="router.push('/detail/chat')">
        <Badge :content="notifyData.chat" :show-zero="false">
          <Icon
            name="chat"
            size="10vw"
            class="text-green-500 rounded-[10px] overflow-hidden bg-green-100 p-5"
        /></Badge>
        <div class="text-14">私信</div>
      </div>
    </div>
    <div class="flex flex-col mx-15 mb-15 gap-15">
      <NotifyItem
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
    </div>
    <Tabbar route placeholder>
      <TabbarItem name="info" to="/" icon="info-o">信息</TabbarItem>
      <TabbarItem name="res" to="/res" icon="apps-o">资源</TabbarItem>
      <TabbarItem name="chat" to="/chat" icon="chat-o">消息</TabbarItem>
      <TabbarItem name="me" to="/me" icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import NotifyItem from "@/components/NotifyItem.vue";
import { Tabbar, TabbarItem, NavBar, Image, Badge, Icon } from "vant";
import { getNotify } from "@/api/notify";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const notifyData: any = ref({});
const commentData: any = ref({});
onMounted(() => {
  getNotify().then((res) => {
    if (res.code == 200) {
      notifyData.value = res.data;
      commentData.value = notifyData.value.comments;
    }
  });
  window.addEventListener("onNotifyWs", updateNotify);
  window.addEventListener("onMessageWs", updateChat);
});
function updateNotify(e: any) {
  var returnData = e.detail;
  if (returnData.msgVariety == 1) {
    notifyData.value.likes++;
  }
  if (returnData.msgVariety == 2) {
    getNotify().then((res) => {
      if (res.code == 200) {
        notifyData.value = res.data;
        commentData.value = notifyData.value.comments;
      }
    });
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
