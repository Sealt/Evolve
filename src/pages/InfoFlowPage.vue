<template>
  <InfoCard v-for="item in records" :info="item" cardType="info" />
  <Empty v-if="records.length == 0" image="search" description="没有找到搜索结果" />
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getInfos, getByEvent, getByUser } from "@/api/flow";
import { onMounted, ref } from "vue";
import { Empty, showToast } from "vant";
import { useRouter } from "vue-router";
import { searchExp, searchInfo } from "@/api/search";
const records: any = ref([]);
const router = useRouter();
const props = defineProps<{
  by: string;
  keyword?:string;
}>();
onMounted(() => {
  if (props.by == "home") {
    getInfos({
      current: 1,
      size: 10,
    }).then((res) => {
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "event") {
    getByEvent({
      current: 1,
      size: 10,
      type:'info',
      eventId:router.currentRoute.value.params.id
    }).then((res) => {
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "user") {
    getByUser({
      current: 1,
      size: 10,
      type:'info',
      userId:router.currentRoute.value.params.id
    }).then((res) => {
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "searchinfo") {
    searchInfo({
      current: 1,
      size: 10,
      keyword:props.keyword,
    }).then((res) => {
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
  if (props.by == "searchexp") {
    searchExp({
      current: 1,
      size: 10,
      keyword:props.keyword,
    }).then((res) => {
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
});
</script>

<style scoped></style>
