<template>
  <div class="flex flex-col gap-10">
    <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <InfoCard
    v-for="item in records"
    :info="item"
    :cardType="item.typed == 0 ? 'info' : 'exp'" />
  <div v-show="records.length != 0 && loadStatus == false" ref="loadMoreElement" class="flex justify-center text-13 text-vant-t2">
    {{ loadMoreContent }}
  </div>
  <Empty
    v-if="records.length == 0 && loadStatus == false"
    description="这里空空如也" />
  </div>
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getInfos, getByEvent, getByUser, getHeadLines } from "@/api/flow";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { Empty, showToast, Loading } from "vant";
import { useRouter } from "vue-router";
import { searchExp, searchInfo } from "@/api/search";
import { getStars } from "@/api/user";
const records: any = ref([]);
const loadStatus = ref(true);
const router = useRouter();
const loadMoreElement = ref(null);
const loadMoreContent = ref("加载更多");
let loadLock = 0;
const pageInfo = ref({
  current: 1,
  size: 10,
  pages: 0,
});
let observer: any = null;
const props = defineProps<{
  by: string;
  keyword?: string;
}>();
defineExpose({
  reload,
  onRefresh
});
function onRefresh() {
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
function reload(keyword: string) {
  loadLock = 1;
  loadMoreContent.value = "加载中";
  records.value = [];
  pageInfo.value.current = 1;
  pageInfo.value.pages = 0;
  if (props.by == "searchinfo") {
    searchInfo({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      keyword: keyword,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        loadMoreContent.value = "加载更多";
      } else {
        records.value = [];
      }
    });
  }
  if (props.by == "searchexp") {
    searchExp({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      keyword: keyword,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        loadMoreContent.value = "加载更多";
      } else {
        records.value = [];
      }
    });
  }
}
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
  loadLock = 1;
  loadMoreContent.value = "加载中";
  if (props.by == "home") {
    getHeadLines().then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = res.data.records;
        pageInfo.value.pages = -1;
        loadMoreContent.value = "没有更多了";
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "info") {
    getInfos({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
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
  if (props.by == "event") {
    getByEvent({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      type: "info",
      eventId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        loadStatus.value = false;
        loadMoreContent.value = "加载更多";
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "user") {
    getByUser({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      type: "info",
      userId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        loadStatus.value = false;
        loadMoreContent.value = "加载更多";
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "star") {
    getStars({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      typed: 0,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.data];
        pageInfo.value.pages = res.data.pageSize;
        pageInfo.value.current++;
        loadStatus.value = false;
        loadMoreContent.value = "加载更多";
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
}
</script>

<style scoped></style>
