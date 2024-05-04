<template>
  <div class="flex grow">
    <div
      class="h-full w-10 border border-r-1 border-r-blue-500 border-y-vant-n2 border-l-vant-n2"></div>
    <div class="flex flex-col gap-10 grow pl-18">
      <NodeCard v-for="item in nodes.items" :node="item" />
    </div>
  </div>
  <Empty v-if="nodes.items.length == 0" image="search" description="没有找到搜索结果" />
</template>

<script setup lang="ts">
import NodeCard from "@/components/NodeCard.vue";
import { useRouter } from "vue-router";
import { getNodes } from "@/api/event";
import { ref, onMounted } from "vue";
import { Empty } from "vant";
import { searchNode } from "@/api/search";
const router = useRouter();
const nodes = ref({ items: [] });
const props = defineProps<{
  keyword?: string;
}>();
onMounted(() => {
  if (props.keyword != null) {
    searchNode({ current: 1, size: 10, keyword: props.keyword }).then((res) => {
      if (res.code == 200) {
        nodes.value = { items: res.data.records };
      }
    });
  } else {
    getNodes({
      current: 1,
      size: 10,
      eventId: router.currentRoute.value.params.id,
    }).then((res) => {
      if (res.code == 200) {
        nodes.value = { items: res.data.records };
      }
    });
  }
});
</script>

<style scoped></style>
