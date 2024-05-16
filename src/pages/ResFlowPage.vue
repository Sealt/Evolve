<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <InfoCard v-for="item in records" :info="item" cardType="res" />
  <Empty
      v-if="records.length == 0 && loadStatus == false"
      description="这里空空如也" />
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getRes, getByProject, getByEvent, getByUser } from "@/api/flow";
import { onMounted, ref } from "vue";
import { showToast, Loading, Empty } from "vant";
import { useRouter } from "vue-router";
import { searchRes } from "@/api/search";
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
function reload(keyword: any) {
  if (props.by == "searchres") {
    searchRes({
      current: 1,
      size: 10,
      keyword: keyword,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      } else {
        records.value.length = 0;
      }
    });
  }
}
onMounted(() => {
  if (props.by == "home") {
    getRes({
      current: 1,
      size: 10,
      type: "all",
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "project") {
    getByProject({
      current: 1,
      size: 10,
      type: "res",
      projectId: router.currentRoute.value.params.id,
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
      type: "res",
      eventId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "user") {
    getByUser({
      current: 1,
      size: 10,
      type: "res",
      userId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "star") {
    getStars({
      current: 1,
      size: 10,
      typed: 5
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data;
      }
    });
  }
});
</script>

<style scoped></style>
