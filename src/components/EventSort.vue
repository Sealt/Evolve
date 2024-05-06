<template>
  <div class="grid grid-cols-5 bg-white rounded-[10px] px-10 pb-10 pt-15 items-center gap-x-10">
    <div @click="onClick(item)" class="flex flex-col items-center active:bg-vant-n2 pt-5 rounded-[10px]" v-for="item in sortList">
        <Image
          :src="item.icon"
          fit="cover"
          class="size-32 inline-flex"
          radius="3" />
          <div class="text-13 pt-4">{{ item.largeName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from "vant";
import { useRouter } from "vue-router";
import { getSortCard } from "@/api/event";
import { ref, onMounted } from "vue";
const router = useRouter()
const sortList:any = ref();
const onClick = (item:any) => {
  router.push('/events?id='+item.id)
}
onMounted(() => {
  getSortCard().then((res) => {
    sortList.value = res.data;
  });
})
</script>

<style scoped></style>
