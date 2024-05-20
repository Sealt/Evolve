<template>
  <div class="flex flex-col gap-10">
    <EventFollow ref="followRef"/>
    <EventSort ref="sortRef"/>
    <EventHot ref="hotRef"/>
    <EventNew ref="newRef"/>
    <EventNodeNew ref="nodeNewRef"/>
  </div>
</template>

<script setup lang="ts">
import EventFollow from "@/components/EventFollow.vue";
import EventSort from "@/components/EventSort.vue";
import EventNew from "@/components/EventNew.vue";
import EventNodeNew from "@/components/EventNodeNew.vue";
import EventHot from "@/components/EventHot.vue";
import { ref } from "vue";
const followRef:any = ref(null);
const sortRef:any  = ref(null);
const hotRef:any  = ref(null);
const newRef:any  = ref(null);
const nodeNewRef:any  = ref(null);

defineExpose({
  onRefresh,
});
function onRefresh() {
  followRef.value.onRefresh();
  sortRef.value.onRefresh();
  hotRef.value.onRefresh();
  newRef.value.onRefresh();
  nodeNewRef.value.onRefresh();
}
</script>

<style scoped></style>
