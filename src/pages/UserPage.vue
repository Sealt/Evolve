<template>
  <div class="CurrentView flex flex-col h-screen">
    <div
      class="flex fixed t-0 l-0 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/50 before:z-10">
      <Image :src="data.bgImg" fit="cover" width="100vw" height="50vh" />
    </div>
    <div class="flex p-10 z-20">
      <Icon
        class="p-5 text-white"
        name="arrow-left"
        size="4vw"
        @click="router.back()" />
    </div>
    <div class="flex flex-col grow z-20">
      <div class="flex p-15 items-center">
        <Image :src="data.avatar" fit="cover" class="size-64 shrink-0" round />
        <div class="flex grow justify-end gap-5">
          <div v-if="userStore.userId == data.id"
            @click="router.push('/user/edit')"
            class="text-white bg-white/30 rounded-full text-14 w-90 h-30 flex items-center justify-center">
            编辑资料
          </div>
          <div v-if="userStore.userId != data.id && data.isFollow == true"
            @click="followOff"
            class="text-white bg-white/30 rounded-full text-14 w-90 h-30 flex items-center justify-center">
            已关注
          </div>
          <div v-if="userStore.userId != data.id && data.isFollow == null"
            @click="followOn"
            class="text-white bg-vant rounded-full text-14 w-90 h-30 flex items-center justify-center">
            关注
          </div>
          <div
            class="text-white bg-white/30 rounded-full w-32 flex items-center justify-center">
            <Icon name="envelop-o" size="6vw" />
          </div>
        </div>
      </div>
      <div class="flex flex-col px-15 gap-10">
        <div class="text-16 font-bold text-white">{{ data.userName }}</div>
        <div class="text-14 text-white">
          {{ data.bio }}
        </div>
        <div class="flex gap-10 items-end">
          <span class="text-16 font-bold text-white">{{ data.likes }}</span>
          <span class="text-13 text-white">获赞</span>
          <span class="text-16 font-bold text-white">{{ data.follow }}</span>
          <span class="text-13 text-white">关注</span>
          <span class="text-16 font-bold text-white">{{ data.fans }}</span>
          <span class="text-13 text-white">粉丝</span>
        </div>
      </div>
      <div class="flex px-15 py-10 gap-5">
        <div class="text-13 bg-white/30 rounded-full px-10 text-white">
          {{ data.gender }}
        </div>
        <div class="text-13 bg-white/30 rounded-full px-10 text-white">
          {{ data.realAuth == null ? "暂无认证" : data.realAuth.collage }}
        </div>
      </div>
      <Tabs v-model:active="tabActiveName" sticky swipeable class="pt-10" lazy-render>
        <Tab name="info" title="信息"> <InfoFlowPage by="user" /></Tab>
        <Tab name="exp" title="经验">
          <InfoExpsPage by="user" />
        </Tab>
        <Tab name="res" title="资源">
          <ResFlowPage by="user" />
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, Tab, Image, Icon, Button,showToast } from "vant";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { follow,unFollow } from "@/api/action";
import InfoCard from "@/components/InfoCard.vue";
const router = useRouter();
const tabActiveName = ref("a");
import { getUserInfo } from "@/api/user";
import { useUserStore } from "@/stores/user";
import InfoFlowPage from "./InfoFlowPage.vue";
import InfoExpsPage from "./InfoExpsPage.vue";
import ResFlowPage from "./ResFlowPage.vue";
const userStore = useUserStore();
const data: any = ref({ realAuth: { collage: "" } });
onMounted(() => {
  getUserInfo({ id: router.currentRoute.value.params.id, infoType: "all" }).then((res) => {
    data.value = res.data;
  });
});
const followOn = () => {
  follow({
    targetId:router.currentRoute.value.params.id,
    typed:7
  }).then(res=>{
    if(res.code == 200){
      showToast('success')
      data.value.isFollow = true;
    }
  })
}
const followOff = () => {
  unFollow({
    targetId:router.currentRoute.value.params.id,
    typed:7
  }).then(res=>{
    if(res.code == 200){
      showToast('success')
      data.value.isFollow = null;
    }
  })
}
</script>

<style scoped></style>
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
