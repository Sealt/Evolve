<template>
  <div class="flex grow">
    <div
      class="h-full w-10 border border-r-1 border-r-blue-500 border-y-vant-n2 border-l-vant-n2"></div>
    <div class="flex flex-col gap-10 grow pl-18">
      <NodeCard v-for="item in nodes.items" :node="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NodeCard from "@/components/NodeCard.vue";
import { useRouter } from "vue-router";
import { getNodes } from "@/api/event";
import { ref, onMounted } from "vue";
const router = useRouter();
const nodes = ref({items:[]});
onMounted(() => {
  getNodes({ eventId: router.currentRoute.value.params.id }).then((res) => {
    if (res.code == 200) {
      nodes.value = { items: res.data };
    }
  });
});
</script>

<style scoped></style>
