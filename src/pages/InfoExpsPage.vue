<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <InfoCard v-for="item in records" :info="item" cardType="exp" />
  <Empty
    v-if="records.length == 0 && loadStatus == false"
    description="这里空空如也" />
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getExps, getByEvent, getByUser } from "@/api/flow";
import { onMounted, ref } from "vue";
import { showToast, Loading,Empty } from "vant";
import { useRouter } from "vue-router";
const records: any = ref([]);
const loadStatus = ref(true);
const router = useRouter();
const props = defineProps<{
  by: string;
}>();
onMounted(() => {
  if (props.by == "home") {
    getExps({
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
      type: "exp",
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
      type: "exp",
      userId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
});
</script>

<style scoped></style>
