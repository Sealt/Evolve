<template>
  <div class="flex flex-col p-10 gap-10">
    <ResStatistics />
    <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
    <InfoCard v-for="item in records" :info="item" cardType="res" />
    <div
      v-show="records.length != 0 && loadStatus == false"
      ref="loadMoreElement"
      class="flex justify-center text-13 text-vant-t2">
      {{ loadMoreContent }}
    </div>
    <Empty
      v-if="records.length == 0 && loadStatus == false"
      description="这里空空如也" />
  </div>
</template>

<script setup lang="ts">
import ResStatistics from "@/components/ResStatistics.vue";
import InfoCard from "@/components/InfoCard.vue";
import { getRes } from "@/api/flow";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { Loading, Empty } from "vant";
const records: any = ref([]);
const loadStatus = ref(true);
const loadMoreElement = ref(null);
const loadMoreContent = ref("加载更多");
let loadLock = 0;
const pageInfo = ref({
  current: 1,
  size: 10,
  pages: 0,
});
let observer: any = null;
defineExpose({
  onRefresh,
});
function onRefresh() {
  loadLock = 1;
  records.value = [];
  pageInfo.value.current = 1;
  pageInfo.value.pages = 0;
  loadData();
}
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (loadLock == 0) {
        loadLock = 1;
        loadData();
      }
    }
  });
  observer.observe(loadMoreElement.value);
  loadData();
});
function loadData() {
  if (pageInfo.value.pages != 0 && pageInfo.value.current > pageInfo.value.pages) {
    loadMoreContent.value = "没有更多了";
    return;
  }
  loadMoreContent.value = "加载中";
  getRes({
    current: pageInfo.value.current,
    size: pageInfo.value.size,
    type: "database",
  }).then((res) => {
    loadStatus.value = false;
    loadLock = 0;
    if (res.code == 200) {
      records.value = [...records.value, ...res.data.records];
      pageInfo.value.pages = res.data.pages;
      pageInfo.value.current++;
      loadMoreContent.value = "加载更多";
    } else {
      loadMoreContent.value = "加载失败";
    }
  });
}
</script>

<style scoped></style>
