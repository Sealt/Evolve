<template>
  <div class="flex">
    <div class="pr-10">
    <Image
      class="shrink-0 size-32"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      fit="cover"
      round />
  </div>
  <div class="flex flex-col justify-around w-full">
    <div class="text-14 text-vant">春风Benin</div>
    <div class="text-14">我评论回复的内容</div>
    <div class="flex justify-between py-5 items-center">
      <span class="text-12 text-gray-500">1分钟前</span>
      <div class="flex items-center gap-5">
        <div class="flex items-center">
          <Icon name="good-job-o" size="4vw" /><span
            class="text-12 text-gray-500 px-5"
            >998</span
          >
        </div>
        <div class="flex items-center">
          <Icon name="comment-o" size="4vw" /><span
            class="text-12 text-gray-500 px-5"
            >986</span
          >
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Icon } from "vant";
</script>

<style scoped></style>
