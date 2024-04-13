<template>
    <div class="tinycard">
        <Image :src="icon"
          fit="cover"
          class="image"
          radius="3" />
          <div class="eventname">{{cardname}}</div>
    </div>
</template>

<script setup lang="ts">
import { Image } from 'vant'
defineProps<{
    icon:string;
    cardname:string;
}>();
</script>

<style lang="scss" scoped>
.tinycard {
    display: inline-flex;
    align-items: center;
    padding: 3px;
    border-radius: 5px;
    background-color: #f2f3f5;
    gap:5px;
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
