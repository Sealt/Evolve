<template>
  <div class="flex flex-col p-10 bg-white rounded-[10px] justify-between">
    <div>
      <Icon name="clock-o" size="4vw" class="inline px-5" /><span
        class="text-15"
        >搜索历史</span
      >
    </div>
    <ul
      class="*:text-13 *:mt-10 *:mr-5 *:inline-block *:rounded-full *:border *:border-vant-n2 *:bg-vant-n2 *:px-12 *:py-3">
      <li v-for="item in historys" @click="onClick(item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getHistory } from "@/api/search";
import { Icon } from "vant";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const historys: any = ref();
const router = useRouter();
onMounted(() => {
  getHistory().then((res) => {
    if (res.code == 200) {
      historys.value = res.data;
    }
  });
});
const onClick = (keyword: any) => {
  router.push("/search/detail?query=" + keyword);
};
</script>

<style scoped></style>
