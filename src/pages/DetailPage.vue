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
      <NotifyLikeItem v-for="a in [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar } from "vant";
import NotifyLikeItem from "@/components/NotifyLikeItem.vue";
import { ref, onMounted } from "vue";
const router = useRouter();
let detailType: any = ref("");
onMounted(() => {
  switch (router.currentRoute.value.params.type) {
    case "follow":
      detailType.value = "关注";
      break;
    case "fans":
      detailType.value = "粉丝";
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
