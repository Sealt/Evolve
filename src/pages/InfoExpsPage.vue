<template>
    <InfoCard v-for="item in records" :info="item" cardType="exp"/>
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getExps, getByEvent, getByUser } from "@/api/flow";
import { onMounted, ref } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
const records: any = ref([]);
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
      if (res.code == 200) {
        records.value = res.data.records;
      }
    });
  }
});
</script>

<style scoped></style>
