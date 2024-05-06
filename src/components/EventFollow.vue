<template>
  <div class="flex flex-col gap-10 bg-white rounded-[10px] py-10 px-15">
    <div class="flex items-center justify-between">
      <div class="text-15">我的关注</div>
      <div class="flex items-center">
        <div class="text-13 text-gray-300 inline-flex">更多</div>
        <Icon size="4vw" name="arrow" class="text-gray-300" />
      </div>
    </div>
    <div class="text-vant-t1 text-14" v-if="followList.length == 0">暂无关注</div>
    <div class="grid grid-cols-2 gap-10" v-if="followList.length != 0">
      <div class="flex items-center gap-10 active:bg-vant-n2 rounded-[5px]"  v-for="item in followList" @click.stop="onClick(item)">
        <Image
          :src="item.icon"
          fit="cover"
          class="size-20 inline-flex"
          radius="3" />
        <div class="text-14 inline">{{ item.eventName }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Icon } from "vant";
import { getFollowByUser } from "@/api/event";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const followList:any = ref([]);
onMounted(() => {
  getFollowByUser().then((res) => {
    followList.value = res.data;
  });
});
const onClick = (item:any) => {
  router.push("/event/"+item.id);
};
</script>

<style scoped></style>
