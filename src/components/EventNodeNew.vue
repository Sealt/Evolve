<template>
  <div class="flex flex-col gap-5 bg-white rounded-[10px] py-10 px-15">
    <div class="flex items-center justify-between">
      <div class="text-15">最新节点</div>
      <div class="flex items-center">
        <div class="text-13 text-gray-300 inline-flex">更多</div>
        <Icon name="arrow" class="text-gray-300" />
      </div>
    </div>
    <div class="flex items-center justify-stretch active:bg-vant-n3 rounded-[5px]" v-for="a in [1,1,1,1]">
      <div class="flex gap-10 items-center py-3 grow">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-20 shrink-0"
          radius="3" />
          <div class="text-14 truncate max-w-90">报送</div>
          <div class="text-14 truncate grow w-0">这是一个节点的展示信息测试中哈哈6666</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TinyCard from "./TinyCard.vue";
import { Image, Icon } from "vant";
</script>

<style scoped></style>
