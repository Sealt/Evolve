<template>
  <div class="flex flex-col p-10 bg-white rounded-[10px]">
    <div class="pb-5 flex items-center w-200">
      <Icon name="hot-o" size="5vw" class="inline px-5 text-red-600" /><span
        class="text-15"
        >{{ getHotType() }}</span
      >
    </div>
    <div
      class="flex items-center h-30 active:bg-vant-n2 gap-5"
      v-for="(item, i) in hotList"
      @click.stop="onClick(item)">
      <div
        v-if="i < 2 || i == 0"
        class="shrink-0 text-red-600 font-bold italic px-5 w-20 flex justify-center text-14">
        {{ i }}
      </div>
      <div
        v-else-if="i < 4"
        class="shrink-0 text-red-500 font-bold italic px-5 w-20 flex justify-center text-14">
        {{ i }}
      </div>
      <div
        v-else
        class="shrink-0 text-black italic px-5 w-20 flex justify-center text-14">
        {{ i }}
      </div>
      <div class="text-14 truncate w-0 grow">{{ item.title }}</div>
      <div class="flex justify-end shrink-0">
        <div class="text-12 text-gray-500">{{ item.sort }}</div>
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
const hotList: any = ref();
const props = defineProps<{
  typed: string;
}>();
const getHotType = () => {
  if (props.typed == "event") {
    return "事件热榜";
  }
  if (props.typed == "node") {
    return "节点热榜";
  }
  if (props.typed == "project") {
    return "项目热榜";
  }
  if (props.typed == "file") {
    return "文件热榜";
  }
};
onMounted(() => {
  if (props.typed == "event") {
    getHotList({ typed: 1 }).then((res) => {
      hotList.value = res.data;
    });
  }
  if (props.typed == "node") {
    getHotList({ typed: 2 }).then((res) => {
      hotList.value = res.data;
    });
  }
  if (props.typed == "project") {
    getHotList({ typed: 3 }).then((res) => {
      hotList.value = res.data;
    });
  }
  if (props.typed == "file") {
    getHotList({ typed: 4 }).then((res) => {
      hotList.value = res.data;
    });
  }
});
const onClick = (item: any) => {
  if (props.typed == "event") {
    router.push("/event/" + item.targetId);
  }
  if (props.typed == "node") {
    router.push("/node/" + item.targetId);
  }
  if (props.typed == "project") {
    router.push("/project/" + item.targetId);
  }
  if (props.typed == "file") {
    router.push("/post/res/" + item.targetId);
  }
};
</script>

<style scoped></style>
