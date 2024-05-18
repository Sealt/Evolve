<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <InfoCard v-for="item in records" :info="item" cardType="res" />
  <div v-show="records.length != 0 && loadStatus == false" ref="loadMoreElement" class="flex justify-center text-13 text-vant-t2">
    {{ loadMoreContent }}
  </div>
  <Empty
    v-if="records.length == 0 && loadStatus == false"
    description="这里空空如也" />
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getRes, getByProject, getByEvent, getByUser } from "@/api/flow";
import { onMounted, ref,onBeforeUnmount } from "vue";
import { showToast, Loading, Empty } from "vant";
import { useRouter } from "vue-router";
import { searchRes } from "@/api/search";
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
  loadLock = 1;
  records.value = [];
  pageInfo.value.current = 1;
  pageInfo.value.pages = 0;
  loadData();
}
function reload(keyword: any) {
  loadLock = 1;
  loadMoreContent.value = "加载中";
  records.value = [];
  pageInfo.value.current = 1;
  pageInfo.value.pages = 0;
  if (props.by == "searchres") {
    searchRes({
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
        if (pageInfo.value.current > pageInfo.value.pages) {
          loadMoreContent.value = "没有更多了";
          observer.disconnect();
        }
      } else {
        records.value = [];
      }
    });
  }
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
  loadMoreContent.value = "加载中";
  if (props.by == "home") {
    getRes({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      type: "all",
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        if (pageInfo.value.current > pageInfo.value.pages) {
          loadMoreContent.value = "没有更多了";
          observer.disconnect();
        }
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "project") {
    getByProject({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      type: "res",
      projectId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        if (pageInfo.value.current > pageInfo.value.pages) {
          loadMoreContent.value = "没有更多了";
          observer.disconnect();
        }
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "event") {
    getByEvent({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      type: "res",
      eventId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        if (pageInfo.value.current > pageInfo.value.pages) {
          loadMoreContent.value = "没有更多了";
          observer.disconnect();
        }
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "user") {
    getByUser({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      type: "res",
      userId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        if (pageInfo.value.current > pageInfo.value.pages) {
          loadMoreContent.value = "没有更多了";
          observer.disconnect();
        }
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "star") {
    getStars({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      typed: 5,
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        if (res.data.length == 0) {
          loadMoreContent.value = "没有更多了";
          observer.disconnect();
        }
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
}
</script>

<style scoped></style>
