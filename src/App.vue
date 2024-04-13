<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>

<router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
</router-view>

</template>

<style>
body::-webkit-scrollbar {
  display: none;
}
.van-overlay {
  --van-overlay-background: rgba(0,0,0,0.3)
}
</style>
