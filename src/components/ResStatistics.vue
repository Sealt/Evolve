<template>
  <div class="bg-white rounded-[10px] p-10 grid grid-cols-4">
    <div class="flex flex-col items-center" v-for="item in data">
      <div class="text-vant text-15">{{ item.name }}</div>
      <div class="text-vant-t2 text-13">{{ item.desc }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = [
  {
    name: "6.6Gb",
    desc: "收录总大小",
  },
  {
    name: "6712",
    desc: "文件总数",
  },
  {
    name: "150000+",
    desc: "预览次数",
  },
  {
    name: ""+365*4,
    desc: "更新天数",
  },
];
</script>

<style scoped></style>
