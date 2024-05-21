<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <div class="flex grow" v-if="nodes.items.length != 0">
    <div
      class="h-full w-10 border border-r-1 border-r-blue-500 border-y-vant-n2 border-l-vant-n2"></div>
    <div class="flex flex-col gap-10 grow pl-18">
      <NodeCard v-for="item in nodes.items" :node="item" />
    </div>
  </div>
  <div v-show="nodes.items.length != 0 && loadStatus == false" ref="loadMoreElement" class="flex justify-center text-13 text-vant-t2">
    {{ loadMoreContent }}
  </div>
  <Empty
    v-if="nodes.items.length == 0 && loadStatus == false"
    description="这里空空如也" />
</template>

<script setup lang="ts">
import NodeCard from "@/components/NodeCard.vue";
import { Loading } from "vant";
import { useRouter } from "vue-router";
import { getNodes } from "@/api/event";
import { ref, onMounted,onBeforeUnmount } from "vue";
import { Empty } from "vant";
import { searchNode } from "@/api/search";
import { getStars } from "@/api/user";
const router = useRouter();
const loadStatus = ref(true);
const nodes:any = ref({ items: [] });
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
  by?: string;
}>();
defineExpose({
  reload,
});
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
function reload(keyword?: any) {
  loadStatus.value = true;
  loadLock = 1;
  loadMoreContent.value = "加载中";
  nodes.value.items = [];
  pageInfo.value.current = 1;
  pageInfo.value.pages = 0;
  if (props.by =="search") {
    searchNode({ current: pageInfo.value.current, size: pageInfo.value.size, keyword: keyword }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        nodes.value.items = [...nodes.value.items,...res.data.data];
        pageInfo.value.pages = res.data.pageSize;
        pageInfo.value.current++;
        if (pageInfo.value.current > pageInfo.value.pages) {
          loadMoreContent.value = "没有更多了";
          observer.disconnect();
        }
      } else {
        nodes.value.items.length = 0;
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
  loadMoreContent.value = "加载中";
  if (props.by == "event") {
    getNodes({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      eventId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        nodes.value.items = [...nodes.value.items, ...res.data.records];
        pageInfo.value.pages = res.data.pages;
        pageInfo.value.current++;
        loadMoreContent.value = "加载更多";
      } else {
        loadMoreContent.value = "加载失败";
        nodes.value.items.length = 0;
      }
    });
  }
  if (props.by == "star") {
    getStars({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
      typed: 3
    }).then((res) => {
      loadStatus.value = false;
      loadLock = 0;
      if (res.code == 200) {
        nodes.value.items = [...nodes.value.items, ...res.data.data];
        pageInfo.value.pages = res.data.pageSize;
        pageInfo.value.current++;
        loadMoreContent.value = "加载更多";
      } else {
        loadMoreContent.value = "加载失败";
        nodes.value.items.length = 0;
      }
    });
  }
}
</script>

<style scoped></style>
