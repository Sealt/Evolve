<template>
  <div class="flex flex-col h-screen">
    <NavBar
      :title="detailType"
      left-arrow
      left-text="返回"
      fixed
      placeholder
      class="z-10 shrink-0"
      @click-left="router.back()" />

    <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
    <div class="flex flex-col grow">
      <div v-if="detailType == '收到的赞'" class="flex flex-col grow">
        <PullRefresh
          v-model="pullLoading"
          @refresh="onRefresh"
          class="h-full"
          success-text="刷新成功">
          <div class="flex flex-col m-15 gap-15">
            <NotifyLikeItem :item="a" v-for="a in listData" />
          </div>
          <Empty
            v-if="listData.length == 0 && loadStatus == false"
            description="这里空空如也" />
        </PullRefresh>
      </div>

      <div v-else class="flex flex-col grow">
        <PullRefresh
          v-model="pullLoading"
          @refresh="onRefresh"
          class="h-full"
          success-text="刷新成功">
          <div class="flex flex-col m-15 gap-15">
            <NotifyItem
              type="user_notify"
              v-if="fatherPage == 'notify' && detailType == '被关注'"
              v-for="list in listData"
              :jumpId="list.fromId"
              :user-name="list.user.userName"
              :avatar="list.user.avatar"
              :bio="list.bio"
              :gender="list.gender"
              :create-time="list.createTime"
              :dot="list.isRead == 0" />
            <NotifyItem
              type="user_list"
              v-if="fatherPage == 'user'"
              v-for="list in listData"
              :jumpId="list.id"
              :user-name="list.userName"
              :avatar="list.avatar"
              :bio="list.bio"
              :gender="list.gender"
              :create-time="list.createTime" />
            <NotifyItem
              type="chat"
              v-if="fatherPage == 'notify' && detailType == '私信'"
              v-for="list in listData"
              :jumpId="
                list.fromUid == userStore.userId ? list.toUid : list.fromUid
              "
              :user-name="
                list.fromUid == userStore.userId
                  ? list.toUser.userName
                  : list.fromUser.userName
              "
              :avatar="
                list.fromUid == userStore.userId
                  ? list.toUser.avatar
                  : list.fromUser.avatar
              "
              :content="list.lastMsgNote"
              :no-read="list.unReadCount"
              :dot="list.unReadCount != 0"
              :create-time="list.updateTime" />
            <Empty
              v-if="listData.length == 0 && loadStatus == false"
              description="这里空空如也" />
          </div>
        </PullRefresh>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar, Empty, Loading, PullRefresh } from "vant";
import NotifyLikeItem from "@/components/NotifyLikeItem.vue";
import NotifyItem from "@/components/NotifyItem.vue";
import { ref, onMounted } from "vue";
import { getFollow as getUserFollow, getFans as getUserFans } from "@/api/user";
import { getLikesAndGains, getFans, getChats } from "@/api/notify";
import { useUserStore } from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();
const loadStatus = ref(true);
const pullLoading = ref(false);
var page = { size: 10, current: 1 };
const listData: any = ref([]);
let detailType: any = ref("");
let fatherPage = ref("");
onMounted(() => {
  window.addEventListener("onMessageWs", getNewMessage);
  switch (router.currentRoute.value.params.type) {
    case "follow":
      detailType.value = "关注";
      fatherPage.value = "user";
      getUserFollow(page).then((res) => {
        loadStatus.value = false;
        listData.value = res.data;
      });
      break;
    case "fans":
      detailType.value = "粉丝";
      fatherPage.value = "user";
      getUserFans(page).then((res) => {
        loadStatus.value = false;
        listData.value = res.data;
      });
      break;
    case "like":
      detailType.value = "收到的赞";
      fatherPage.value = "notify";
      getLikesAndGains().then((res) => {
        loadStatus.value = false;
        if (res.code == 200) {
          listData.value = res.data;
        }
      });
      break;
    case "followed":
      fatherPage.value = "notify";
      detailType.value = "被关注";
      getFans().then((res) => {
        loadStatus.value = false;
        if (res.code == 200) {
          listData.value = res.data;
        }
      });
      break;
    case "chat":
      detailType.value = "私信";
      fatherPage.value = "notify";
      getChats().then((res) => {
        loadStatus.value = false;
        if (res.code == 200) {
          listData.value = res.data;
        }
      });
      break;
  }
});
function onRefresh() {
  switch (router.currentRoute.value.params.type) {
    case "follow":
      detailType.value = "关注";
      fatherPage.value = "user";
      getUserFollow(page).then((res) => {
        loadStatus.value = false;
        pullLoading.value = false;
        listData.value = res.data;
      });
      break;
    case "fans":
      detailType.value = "粉丝";
      fatherPage.value = "user";
      getUserFans(page).then((res) => {
        loadStatus.value = false;
        pullLoading.value = false;
        listData.value = res.data;
      });
      break;
    case "like":
      detailType.value = "收到的赞";
      fatherPage.value = "notify";
      getLikesAndGains().then((res) => {
        loadStatus.value = false;
        pullLoading.value = false;
        if (res.code == 200) {
          listData.value = res.data;
        }
      });
      break;
    case "followed":
      fatherPage.value = "notify";
      detailType.value = "被关注";
      getFans().then((res) => {
        loadStatus.value = false;
        pullLoading.value = false;
        if (res.code == 200) {
          listData.value = res.data;
        }
      });
      break;
    case "chat":
      detailType.value = "私信";
      fatherPage.value = "notify";
      getChats().then((res) => {
        loadStatus.value = false;
        pullLoading.value = false;
        if (res.code == 200) {
          listData.value = res.data;
        }
      });
      break;
  }
}
function getNewMessage() {
  getChats().then((res) => {
    loadStatus.value = false;
    if (res.code == 200) {
      listData.value = res.data;
    }
  });
}
</script>

<style scoped></style>
