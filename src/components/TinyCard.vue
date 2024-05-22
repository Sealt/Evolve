<template>
  <div class="tinycard" @click.stop="onClick">
    <Image :src="icon" fit="cover" class="image" radius="3" />
    <div class="eventname">{{ cardname }}</div>
  </div>
</template>

<script setup lang="ts">
import { Image } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<{
  icon: string;
  cardname: string;
  id: string;
  type: string;
}>();
const onClick = () => {
  if (props.type == "event") {
    router.push("/event/" + props.id);
  }
  if (props.type == "project") {
    router.push("/project/" + props.id);
  }
};
</script>

<style lang="scss" scoped>
.tinycard {
  display: inline-flex;
  align-items: center;
  padding: 3px;
  border-radius: 5px;
  background-color: #f2f3f5;
  gap: 5px;
  .image {
    height: 20px;
    width: 20px;
  }
  .eventname {
    font-size: 12px;
    color: #646566;
    margin: 0px 5px;
  }
}
</style>
