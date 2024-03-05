<template>
  <div class="flex flex-col gap-10 bg-white rounded-[10px] py-10 px-15">
    <div class="flex items-center justify-between">
      <div class="text-15">我的关注</div>
      <div class="flex items-center">
        <div class="text-13 text-gray-300 inline-flex">更多</div>
        <Icon name="arrow" class="text-gray-300" />
      </div>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-10">
      <div class="flex items-center gap-10 active:bg-vant-n2 rounded-[5px]" v-for="a in [1, 1, 1, 1]">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-20 inline-flex"
          radius="3" />
        <div class="text-14 inline">高等数学一</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TinyCard from "./TinyCard.vue";
import { Image, Icon } from "vant";
</script>

<style scoped></style>
