<template>
  <div class="flex items-center">
    <Image
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      fit="cover"
      class="size-40 shrink-0"
      round />
    <div class="flex flex-col grow pl-10 w-0">
      <div class="flex grow justify-between items-center">
        <div class="flex gap-5 items-center">
          <div class="text-15 truncate">Glory Day</div>
          <div class="text-13 text-vant-t3">赞了你的笔记</div>
        </div>
      </div>
        <div class="shrink-0 text-12 text-vant-t2">2022-1-16</div>
    </div>
    <div class="justify-end w-40 text-10 text-vant-t2 line-clamp-3">评论或动态的内容啊123哈</div>
  </div>
</template>

<script setup lang="ts">
import { Image, Badge, Tag } from "vant";
import { getCurrentInstance } from 'vue'
const dayjs = getCurrentInstance()?.appContext.config.globalProperties.$dayjs;
const dot = true;
</script>

<style scoped></style>
