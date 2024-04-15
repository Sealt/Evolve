<template>
  <Loading v-if="loadingStatus"/>
  <lazy-component class="flex flex-col gap-10">
    <InfoCard v-for="item in records" :info="item" cardType="res" />
  </lazy-component>
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getRes, getByProject, getByEvent, getByUser } from "@/api/flow";
import { onMounted, ref } from "vue";
import { showToast,Loading } from "vant";
import { useRouter } from "vue-router";
const records: any = ref([]);
const loadingStatus = ref(true)
const router = useRouter();
const props = defineProps<{
  by: string;
}>();
onMounted(() => {
  if (props.by == "home") {
    getRes({
      current: 1,
      size: 10,
      type: "all",
    }).then((res) => {
      loadingStatus.value = false
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
      loadingStatus.value = false
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
      loadingStatus.value = false
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
      loadingStatus.value = false
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
});
</script>

<style scoped></style>
