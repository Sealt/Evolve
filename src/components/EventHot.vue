<template>
  <div class="flex flex-col gap-10 bg-white rounded-[10px] py-10 px-15">
    <div class="flex items-center justify-between">
      <div class="text-15">今日热门</div>
      <div class="flex items-center">
        <div class="text-13 text-gray-300 inline-flex hidden">榜单</div>
        <Icon size="4vw" name="arrow" class="text-gray-300" />
      </div>
    </div>
    <div
      class="grid grid-cols-4 justify-items-center items-center gap-y-10">
      <div
        class="flex flex-col items-center grow w-full relative active:bg-vant-n2"
        @click.stop="onClick(item)"
        v-for="(item, index) in hotList">
        <div
          v-if="index < 1"
          class="absolute top-0 left-5 text-11 bg-red-500 text-white w-10 h-20 text-center"
          style="
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%);
          ">
          {{ index + 1 }}
        </div>
        <div
          v-else-if="index < 2"
          class="absolute top-0 left-5 text-11 bg-orange-500 text-white w-10 h-20 text-center"
          style="
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%);
          ">
          {{ index + 1 }}
        </div>
        <div
          v-else-if="index < 3"
          class="absolute top-0 left-5 text-11 bg-orange-300 text-white w-10 h-20 text-center"
          style="
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%);
          ">
          {{ index + 1 }}
        </div>
        <div
          v-else-if="index < 9"
          class="absolute top-0 left-5 text-11 bg-gray-500 text-white w-10 h-20 text-center"
          style="
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%);
          ">
          {{ index + 1 }}
        </div>
        <Image
          :src="item.icon"
          fit="cover"
          class="size-32 mb-5"
          radius="3" />
        <div class="text-14 max-w-full truncate">{{ item.title }}</div>
        <div class="text-10 text-gray-400 max-w-full truncate">{{ item.sort + ' 热度' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TinyCard from "./TinyCard.vue";
import { Image, Icon } from "vant";
import { getHotEvents } from "@/api/event";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const hotList: any = ref();
const router=useRouter();
onMounted(() => {
  getHotEvents().then((res) => {
    hotList.value = res.data;
  });
});
const onClick = (item: any) => {
  router.push("/event/" + item.targetId);
};
</script>

<style scoped></style>
