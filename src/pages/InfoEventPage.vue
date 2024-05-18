<template>
  <div class="flex flex-col gap-10">
    <EventFollow />
    <EventSort />
    <EventHot />
    <EventNew />
    <EventNodeNew />
  </div>
</template>

<script setup lang="ts">
import EventFollow from "@/components/EventFollow.vue";
import EventSort from "@/components/EventSort.vue";
import EventNew from "@/components/EventNew.vue";
import EventNodeNew from "@/components/EventNodeNew.vue";
import EventHot from "@/components/EventHot.vue";

defineExpose({
  onRefresh,
});
function onRefresh() {
  setTimeout(() => {
  }, 1000);
}
</script>

<style scoped></style>
