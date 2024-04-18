<template>
  <div>
    <NavBar
      :title="detailType"
      left-arrow
      left-text="返回"
      fixed
      placeholder
      class="z-10"
      @click-left="router.back()" />
    <div v-if="detailType == '收到的赞'" class="flex flex-col m-15 gap-15">
      <NotifyLikeItem :item="a" v-for="a in listData" />
    </div>
    <div class="flex flex-col m-15 gap-15" v-else>
      <NotifyItem
        type="user_notify"
        v-if="fatherPage == 'notify'"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar } from "vant";
import NotifyLikeItem from "@/components/NotifyLikeItem.vue";
import NotifyItem from "@/components/NotifyItem.vue";
import { ref, onMounted } from "vue";
import { getFollow as getUserFollow, getFans as getUserFans } from "@/api/user";
import { getLikesAndGains, getFans } from "@/api/notify";
const router = useRouter();
var page = { size: 10, current: 1 };
const listData: any = ref([]);
let detailType: any = ref("");
let fatherPage = ref("");
onMounted(() => {
  switch (router.currentRoute.value.params.type) {
    case "follow":
      detailType.value = "关注";
      fatherPage.value = "user";
      getUserFollow(page).then((res) => {
        listData.value = res.data;
      });
      break;
    case "fans":
      detailType.value = "粉丝";
      fatherPage.value = "user";
      getUserFans(page).then((res) => {
        listData.value = res.data;
      });
      break;
    case "like":
      detailType.value = "收到的赞";
      fatherPage.value = "notify";
      getLikesAndGains().then((res) => {
        if (res.code == 200) {
          listData.value = res.data;
        }
      });
      break;
    case "followed":
      fatherPage.value = "notify";
      detailType.value = "被关注";
      getFans().then((res) => {
        if (res.code == 200) {
          listData.value = res.data;
        }
      });
      break;
    case "chat":
      detailType.value = "私信";
      break;
  }
});
</script>

<style scoped></style>
