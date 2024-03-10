<template>
  <div class="flex flex-col p-10 bg-white rounded-[10px]">
    <div class="pb-5 flex items-center w-200">
      <Icon name="hot-o" size="5vw" class="inline px-5 text-red-600" /><span
        class="text-15"
        >实时热榜</span
      >
    </div>
    <div
      class="flex items-center h-30 active:bg-vant-n2 gap-5"
      v-for="i in [
        { index: 0 },
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
        { index: 5 },
        { index: 6 },
        { index: 7 },
        { index: 8 },
        { index: 9 },
      ]">
      <div
        v-if="i.index < 2 || i.index == 0"
        class="shrink-0 text-red-600 font-bold italic px-5 w-20 flex justify-center text-14">
        {{ i.index }}
      </div>
      <div
        v-else-if="i.index < 4"
        class="shrink-0 text-red-500 font-bold italic px-5 w-20 flex justify-center text-14">
        {{ i.index }}
      </div>
      <div
        v-else
        class="shrink-0 text-black italic px-5 w-20 flex justify-center text-14">
        {{ i.index }}
      </div>
      <div class="text-14 truncate w-0 grow">中国大学生66112233445566</div>
      <div class="flex justify-end shrink-0">
        <div class="text-12 text-gray-500">6454</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon, Tag } from "vant";
</script>

<style scoped></style>
