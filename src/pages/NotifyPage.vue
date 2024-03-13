<template>
  <div>
    <NavBar
      :title="pageTitle"
      left-arrow
      left-text="返回"
      fixed
      placeholder
      class="z-10"
      @click="router.back()" />
    <div v-show="pageType == 'like'" class="flex flex-col m-15 gap-15">
      <NotifyLikeItem v-for="a in [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { NavBar } from "vant";
import NotifyLikeItem from "@/components/NotifyLikeItem.vue";
const router = useRouter();
const pageTitle = ref("");
let pageType:any = "";
onMounted(() => {
  // 打印
  pageType = router.currentRoute.value.params.type;
  switch (pageType) {
    case "like":
      pageTitle.value = "赞和收藏";
      break;
    case "follow":
      pageTitle.value = "关注";
      break;
    case "chat":
      pageTitle.value = "私信";
      break;
    default:
      break;
  }
});
</script>

<style scoped></style>
