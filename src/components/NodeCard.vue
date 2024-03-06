<template>
  <div @click="handleClick" class="flex flex-col bg-white rounded-[10px] p-10 gap-5 relative">
    <div class="absolute -left-26"><Icon class="text-vant" name="circle" size="4vw"/></div>
    <div class="flex justify-between">
      <div class="text-15">考研预报名将于10月初正式启动</div>
      <Tag type="primary">进行中</Tag>
    </div>
    <div class="text-14">2024-02-23 14:00 - 2024-03-01 14:00</div>
    <div class="flex gap-5">
      <Tag plain type="primary">信息 3</Tag>
      <Tag plain type="primary">经验 4</Tag>
      <Tag plain type="primary">资源 16</Tag>
    </div>
    <div class="flex gap-5 items-center justify-end">
      <div class="flex gap-5 items-center"><Icon class="text-gray-500" name="good-job-o" size="4vw" /><span class="text-13 text-gray-500 pr-5">3</span></div>
      <div class="flex gap-5 items-center"><Icon class="text-gray-500" name="comment-o" size="4vw" /><span class="text-13 text-gray-500">3</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tag,Icon } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<{
  to?: string;
}>();
const handleClick = () => {
  router.push("/node/" + props.to);
}
</script>

<style scoped></style>
