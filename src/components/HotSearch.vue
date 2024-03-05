<template>
  <div class="flex flex-col p-10 bg-white rounded-[10px] justify-between">
    <div>
      <Icon name="fire-o" size="4vw" class="inline px-5 text-red-600" /><span
        class="text-15"
        >破茧热搜</span
      >
    </div>
    <ul
      class="*:text-13 *:mt-10 *:mr-5 *:inline-block *:rounded-full *:border *:border-vant-n2 *:bg-vant-n2 *:px-12 *:py-3">
      <li>考研</li>
      <li>保研</li>
      <li>创新创业学分</li>
      <li>学习哈</li>
      <li>高等数学</li>
      <li>大学英语</li>
      <li>C语言</li>
      <li>机械</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "vant";
</script>

<style scoped></style>
