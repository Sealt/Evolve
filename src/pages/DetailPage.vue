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
    <div v-show="detailType == '赞和收藏'" class="flex flex-col m-15 gap-15">
      <NotifyLikeItem v-for="a in [1, 1]" />
    </div>
    <div class="flex flex-col m-15 gap-15">
      <NotifyItem
        type="user"
        v-for="list in listData"
        :id="list.id"
        :user-name="list.userName"
        :avatar="list.avatar"
        :bio="list.bio"
        :gender="list.gender"
        :create-time="list.createTime"
        :dot="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar } from "vant";
import NotifyLikeItem from "@/components/NotifyLikeItem.vue";
import NotifyItem from "@/components/NotifyItem.vue";
import { ref, onMounted } from "vue";
import { getFollow, getFans } from "@/api/user";
const router = useRouter();
var page = { size: 10, current: 1 };
const listData: any = ref([]);
let detailType: any = ref("");
onMounted(() => {
  switch (router.currentRoute.value.params.type) {
    case "follow":
      detailType.value = "关注";
      getFollow(page).then((res) => {
        listData.value=res.data
      });
      break;
    case "fans":
      detailType.value = "粉丝";
      getFans(page).then((res) => {
        listData.value=res.data
      });
      break;
    case "like":
      detailType.value = "赞和收藏";
      break;
    case "followed":
      detailType.value = "被关注";
      break;
    case "chat":
      detailType.value = "私信";
      break;
  }
});
</script>

<style scoped></style>
