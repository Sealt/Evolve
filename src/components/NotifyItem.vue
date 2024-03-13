<template>
  <div class="flex items-center">
    <Image
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      fit="cover"
      class="size-40 shrink-0"
      round />
    <div class="flex flex-col grow pl-10 w-0">
      <div class="flex grow justify-between items-center">
        <div class="text-15 truncate">消息助手</div>
        <div class="shrink-0 text-12 text-vant-t2">2022-1-16</div>
      </div>
      <div v-if="dot" class="flex items-center">
        <div class="text-14 text-vant truncate">
          这是具体的消息内容555消息内容555消息内容555消息内容555
        </div>
        <div class="shrink-0 flex items-center justify-center text-12 bg-vant text-white rounded-[50%] size-14">
            1
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="text-14 text-vant-t2 truncate">
          这是具体的消息内容555消息内容555消息内容555消息内容555
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Badge,Tag } from "vant";
const dot = true;
</script>

<style scoped></style>
