<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <div class="flex grow" v-if="nodes.items.length != 0">
    <div
      class="h-full w-10 border border-r-1 border-r-blue-500 border-y-vant-n2 border-l-vant-n2"></div>
    <div class="flex flex-col gap-10 grow pl-18">
      <NodeCard v-for="item in nodes.items" :node="item" />
    </div>
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
import { ref, onMounted } from "vue";
import { Empty } from "vant";
import { searchNode } from "@/api/search";
const router = useRouter();
const loadStatus = ref(true);
const nodes = ref({ items: [] });
const props = defineProps<{
  by?: string;
}>();
defineExpose({
  reload,
});
function reload(keyword?: any) {
  loadStatus.value = true;
  if (props.by != null && keyword != null) {
    searchNode({ current: 1, size: 10, keyword: keyword }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        nodes.value = { items: res.data.records };
      } else {
        nodes.value.items.length = 0;
      }
    });
  }
  if (props.by == null) {
    getNodes({
      current: 1,
      size: 10,
      eventId: router.currentRoute.value.params.id,
    }).then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        nodes.value = { items: res.data.records };
      } else {
        nodes.value.items.length = 0;
      }
    });
  }
}
onMounted(() => {
  reload();
});
</script>

<style scoped></style>
