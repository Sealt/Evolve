<template>
  <div class="flex flex-col gap-10">
    <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <InfoCard
    v-for="(item, index) in records"
    :info="getItem(item)"
    :cardType="selectCardType(item)"
    :HotIndex="getHotIndex(item, index)" />
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
import InfoCard from "@/components/InfoCard.vue";
import { getExps, getByEvent, getByUser } from "@/api/flow";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { showToast, Loading, Empty } from "vant";
import { useRouter } from "vue-router";
import { getHotFlow } from "@/api/hot";
import { getFollow } from "@/api/flow";
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
}>();
const selectCardType = (item: any) => {
  if (item.typed == 0) {
    return "info";
  }
  if (item.typed == 1) {
    return "exp";
  }
  if (item.typed == null || item.typed == 5) {
    return "res";
  }
};
defineExpose({
  onRefresh,
});
function onRefresh() {
  loadLock = 1;
  loadMoreContent.value = "加载中";
  records.value = [];
  pageInfo.value.current = 1;
  pageInfo.value.pages = 0;
  if (props.by == "hot") {
    getHotFlow().then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data;
        loadMoreContent.value = "没有更多了";
        observer.disconnect();
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "follow") {
    getFollow({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
    }).then((res) => {
      loadLock = 0;
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.data;
        pageInfo.value.pages = res.data.pageSize;
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
  if (props.by == "hot") {
    getHotFlow().then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data];
        loadMoreContent.value = "没有更多了";
        observer.disconnect();
      } else {
        loadMoreContent.value = "加载失败";
      }
    });
  }
  if (props.by == "follow") {
    getFollow({
      current: pageInfo.value.current,
      size: pageInfo.value.size,
    }).then((res) => {
      loadLock = 0;
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = [...records.value, ...res.data.data];
        pageInfo.value.pages = res.data.pageSize;
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
}
const getItem = (item: any) => {
  if (item.id != null) {
    return item;
  } else {
    if (item.info == null) {
      return item.res;
    } else {
      return item.info;
    }
  }
};
const getHotIndex = (item: any, index: number) => {
  if (item.id != null) {
    return index < 9 ? "0" + (index + 1) : "" + (index + 1);
  } else {
    return undefined;
  }
};
</script>

<style scoped></style>
