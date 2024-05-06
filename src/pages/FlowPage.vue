<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <InfoCard
    v-for="(item, index) in records"
    :info="getItem(item)"
    :cardType="selectCardType(item)"
    :HotIndex="getHotIndex(item,index)" />
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
import { getFollow } from "@/api/flow";
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
  if (item.typed == null || item.typed == 5) {
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
  if (props.by == "follow") {
    getFollow({ current: 1, size: 10 }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        records.value = res.data.data;
      }
    });
  }
});
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
const getHotIndex = (item: any,index:number) => {
  if (item.id != null) {
    return index < 9 ? '0' + (index + 1) : '' + (index + 1);
  } else {
    return undefined;
  }
};
</script>

<style scoped></style>
