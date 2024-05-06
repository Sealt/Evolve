<template>
  <div class="flex flex-col h-screen">
    <Search
      v-model="searchValue"
      left-icon="arrow-left"
      right-icon="search"
      @click-left-icon="onBack"
      @click-right-icon="onSearch"
      ref="search" />
    <div class="bg-vant-n2 flex flex-col p-10 gap-10 grow">
      <SearchHistory />
      <HotSearch />
      <div class="flex gap-10 overflow-scroll">
        <SearchHotList typed="event"/>
        <SearchHotList typed="node"/>
        <SearchHotList typed="project"/>
        <SearchHotList typed="file"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, showToast } from "vant";
import { useRouter } from "vue-router";
import { ref,onMounted } from "vue";
import HotSearch from "@/components/HotSearch.vue";
import SearchHistory from "@/components/SearchHistory.vue";
import SearchHotList from "@/components/SearchHotList.vue";
const router = useRouter();
const searchValue = ref("");
const search = ref();
const onBack = () => {
  router.back();
};
const onSearch = () => {
  if (searchValue.value == "") {
    showToast("请输入搜索的内容");
    return;
  }
  router.push("/search/detail?query=" + searchValue.value);
};
onMounted(() => {
  search.value.focus();
})
</script>

<style scoped>
:deep(.van-search__content) {
  background: #f2f3f5;
}
</style>
