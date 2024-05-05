<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <InfoCard
    v-for="(item, index) in records"
    :info="item"
    :cardType="selectCardType(item)"
    :HotIndex="index < 9 ? '0' + (index + 1) : '' + (index + 1)" />
  <Empty
    v-if="records.length == 0 && loadStatus == false"
    description="这里空空如也" />
</template>

<script setup lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import { getExps, getByEvent, getByUser } from "@/api/flow";
import { onMounted, ref } from "vue";
import { showToast, Loading, Empty } from "vant";
import { useRouter } from "vue-router";
import { getHotFlow } from "@/api/hot";
const records: any = ref([]);
const loadStatus = ref(true);
const router = useRouter();
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
  if (item.typed == null) {
    return "res";
  }
};
onMounted(() => {
  if (props.by == "hot") {
    getHotFlow().then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data;
      }
    });
  }
});
</script>

<style scoped></style>
