<template>
  <div class="flex flex-col h-screen">
    <NavBar
      title="推送消息"
      left-arrow
      @click-left="router.back()"
      fixed
      class="shrink-0"
      placeholder />
    <div class="flex flex-col grow bg-vant-n2 p-10 gap-10">
      <div class="flex flex-col bg-white p-10 rounded-[10px] gap-5">
        <div class="text-15">你关注的事件有更新</div>
        <div class="text-14">详细通知的内容这里是没有问题的哈哈可以哦</div>
        <div class="text-13 text-vant-t2">2分钟前</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar } from "vant";
import { ref, onMounted } from "vue";
const router = useRouter();
</script>

<style scoped></style>
