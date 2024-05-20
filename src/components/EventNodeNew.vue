<template>
  <div class="flex flex-col gap-5 bg-white rounded-[10px] py-10 px-15">
    <div class="flex items-center justify-between">
      <div class="text-15">最新节点</div>
      <div class="flex items-center">
        <div class="text-13 text-gray-300 inline-flex hidden">更多</div>
        <Icon size="4vw" name="arrow" class="text-gray-300" />
      </div>
    </div>
    <div class="flex items-center justify-stretch active:bg-vant-n3 rounded-[5px]" v-for="item in newNodes" @click.stop="onClick(item)">
      <div class="flex gap-10 items-center py-3 grow">
        <Image
          :src="item.event.icon"
          fit="cover"
          class="size-20 shrink-0"
          radius="3" />
          <div class="text-14 truncate max-w-90 text-vant-t1">{{ item.event.eventName}}</div>
          <div class="text-14 truncate grow w-0">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Icon } from "vant";
import { getNewNodes } from "@/api/event";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const newNodes:any = ref();
const router = useRouter();
const onRefresh = () => {
  getNewNodes().then((res) => {
    newNodes.value = res.data;
  });
};
defineExpose({
  onRefresh
});
onMounted(() => {
  getNewNodes().then((res) => {
    newNodes.value = res.data;
  });
})
const onClick = (item:any) => {
  router.push("/node/"+item.id);
};
</script>

<style scoped></style>
