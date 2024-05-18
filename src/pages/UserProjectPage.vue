<template>
  <div class="CurrentView flex flex-col h-screen gap-5">
    <NavBar
      title="关注的项目"
      left-arrow
      left-text="返回"
      fixed
      placeholder
      class="z-10"
      @click-left="router.back()" />
    <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
    <LittleCard
      v-for="item in contentItems"
      class="mx-10 mt-5"
      :image="item.icon"
      type="project"
      hot="0"
      :detail="item.hotIndex + ' 热度 ' + item.resourceCount + ' 资源 '"
      :title="item.projectName"
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
import { NavBar, Loading, Empty } from "vant";
import { useUserStore } from "@/stores/user";
import LittleCard from "@/components/LittleCard.vue";
import {  getUserProject } from "@/api/user";

const router = useRouter();
const loadStatus = ref(true);
const userStore = useUserStore();
const contentItems: any = ref([]);

onMounted(() => {
  getUserProject().then((res) => {
    loadStatus.value = false;
    if (res.code == 200) {
      contentItems.value = res.data;
    }
  });
});
</script>

<style scoped></style>
