<template>
  <div class="flex flex-col p-10 bg-white rounded-[10px]">
    <div class="pb-5 flex items-center">
      <Icon name="hot-o" size="5vw" class="inline px-5 text-red-600" /><span
        class="text-15"
        >实时热榜</span
      >
    </div>
    <div
      class="flex items-center h-30 active:bg-vant-n2 gap-5"
      v-for="(item, index) in data"
      @click="onClick(item)">
      <div
        v-if="index < 2 || index == 0"
        class="text-red-600 font-bold italic px-5 w-20 flex justify-center text-14">
        {{ index }}
      </div>
      <div
        v-else-if="index < 4"
        class="text-red-500 font-bold italic px-5 w-20 flex justify-center text-14">
        {{ index }}
      </div>
      <div
        v-else
        class="text-black italic px-5 w-20 flex justify-center text-14">
        {{ index }}
      </div>
      <div class="flex grow w-0 items-center justify-between">
        <div class="text-14 truncate">{{ item.title }}</div>
        <div class="text-12 text-gray-500">{{ item.sort }}</div>
      </div>
      <div class="flex justify-end shrink-0">
        <Tag v-if="item.typed == 2" color="#f87171" class="shrink-0">事件</Tag>
        <Tag v-if="item.typed == 3" color="#60a5fa" class="shrink-0">节点</Tag>
        <Tag v-if="item.typed == 4" color="#fdba74" class="shrink-0">项目</Tag>
        <Tag v-if="item.typed == 8" color="#c084fc" class="shrink-0">文件</Tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon, Tag } from "vant";
import { getHotList } from "@/api/hot";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const data: any = ref();
onMounted(() => {
  getHotList({ typed: 0 }).then((res) => {
    if (res.code == 200) {
      data.value = res.data.slice(0, 4);
    }
  });
});
const onClick = (item: any) => {
  if (item.typed == 2) {
    router.push(`/event/${item.targetId}`);
  } else if (item.typed == 3) {
    router.push(`/node/${item.targetId}`);
  } else if (item.typed == 4) {
    router.push(`/project/${item.targetId}`);
  } else if (item.typed == 8) {
    router.push(`/post/res/${item.targetId}`);
  }
};
</script>

<style scoped></style>
