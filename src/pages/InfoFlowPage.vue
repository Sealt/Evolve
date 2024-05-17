<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <InfoCard
    v-for="item in records"
    :info="item"
    :cardType="item.typed == 0 ? 'info' : 'exp'" />
  <div id="loadMore" class="flex justify-center text-13 text-vant-t2">
    加载更多
  </div>
  <Empty
    v-if="records.length == 0 && loadStatus == false"
    description="这里空空如也" />
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getInfos, getByEvent, getByUser, getHeadLines } from "@/api/flow";
import { onMounted, ref, watch } from "vue";
import { Empty, showToast, Loading } from "vant";
import { useRouter } from "vue-router";
import { searchExp, searchInfo } from "@/api/search";
import { getStars } from "@/api/user";
const records: any = ref([]);
const loadStatus = ref(true);
const router = useRouter();
const props = defineProps<{
  by: string;
  keyword?: string;
}>();
defineExpose({
  reload,
});
function reload(keyword: string) {
  if (props.by == "searchinfo") {
    searchInfo({
      current: 1,
      size: 10,
      keyword: keyword,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      } else {
        records.value = [];
      }
    });
  }
  if (props.by == "searchexp") {
    searchExp({
      current: 1,
      size: 10,
      keyword: keyword,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      } else {
        records.value = [];
      }
    });
  }
}
onMounted(() => {
  if (props.by == "home") {
    getHeadLines().then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "info") {
    getInfos({
      current: 1,
      size: 10,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "event") {
    getByEvent({
      current: 1,
      size: 10,
      type: "info",
      eventId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
        loadStatus.value = false;
      }
    });
  }
  if (props.by == "user") {
    getByUser({
      current: 1,
      size: 10,
      type: "info",
      userId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
        loadStatus.value = false;
      }
    });
  }
  if (props.by == "star") {
    getStars({
      current: 1,
      size: 10,
      typed: 0
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data;
        loadStatus.value = false;
      }
    });
  }
});
</script>

<style scoped></style>
