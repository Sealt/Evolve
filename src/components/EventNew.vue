<template>
  <div
    class="flex flex-col gap-5 bg-white rounded-[10px] py-10 px-15">
    <div class="flex items-center justify-between pb-5">
      <div class="text-15">最新事件</div>
      <div class="flex items-center">
        <div class="text-13 text-gray-300 inline-flex">更多</div>
        <Icon name="arrow" class="text-gray-300" />
      </div>
    </div>
    <div
      @touchmove="handleTouch"
      @touchstart="handleStart"
      class="flex flex-nowrap overflow-scroll">
      <div
        v-for="a in [1, 1]"
        class="flex bg-sky-600 w-230 h-80 rounded-[5px] items-center px-15 justify-between shrink-0 mr-10">
        <div class="flex flex-col grow w-0">
          <div class="text-15 text-white truncate">事件名称</div>
          <div class="text-12 text-white truncate">
            事件介绍介绍介绍介绍介绍介绍
          </div>
        </div>
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-48 shrink-0"
          radius="3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TinyCard from "./TinyCard.vue";
import { Image, Icon } from "vant";
let startX = 0;
let startY = 0;
const handleStart = (event: TouchEvent) => {
  startX = event.changedTouches[0].pageX;
  startY = event.changedTouches[0].pageY;
};
const handleTouch = (e: TouchEvent) => {
  //获取滑动屏幕时的X,Y
  let endX = e.changedTouches[0].pageX;
  let endY = e.changedTouches[0].pageY;
  //获取滑动距离
  let distanceX = endX - startX;
  let distanceY = endY - startY;
  //判断滑动方向
  if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
    e.stopPropagation();
  } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
    e.stopPropagation();
  } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < 0) {
    // 往上滑动
  } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 0) {
    // 往下滑动
  } else {
    // 点击未滑动
  }
};
</script>

<style scoped></style>
