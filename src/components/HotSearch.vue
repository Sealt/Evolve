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
      <li v-for="item in data" @click="onClick(item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "vant";
import { getHotSearch } from "@/api/hot";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const data: any = ref();
const router = useRouter();
onMounted(() => {
  getHotSearch().then((res) => {
    if (res.code == 200) {
      data.value = res.data;
    }
  });
});
const onClick = (item: string) => {
  router.push({ path: "/search/detail", query: { query: item } });
};
</script>

<style scoped></style>
