<template>
  <div class="CurrentView flex flex-col h-screen">
    <NavBar
      title="关注的事件"
      left-arrow
      left-text="返回"
      fixed
      placeholder
      class="z-10"
      @click-left="router.back()" />
    <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
    <LittleCard
      v-for="item in contentItems"
      class="m-10"
      :image="item.icon"
      type="event"
      hot="1"
      :detail="item.hotIndex + ' 热度 ' + item.discussCount + ' 讨论 '"
      :title="item.eventName"
      :follow="item.isFollow ? '1' : '0'"
      :to="item.id" />
    <Empty
      v-if="contentItems.length == 0 && loadStatus == false"
      description="这里空空如也" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { NavBar,Loading,Empty} from "vant";
import { useUserStore } from "@/stores/user";
import LittleCard from "@/components/LittleCard.vue";
import { getUserEvent } from "@/api/user";

const router = useRouter();
const loadStatus = ref(true);
const userStore = useUserStore();
const contentItems: any = ref([]);

onMounted(() => {
  getUserEvent().then((res) => {
    loadStatus.value = false;
    if (res.code == 200) {
      contentItems.value = res.data;
    }
  });
});
</script>

<style scoped></style>
