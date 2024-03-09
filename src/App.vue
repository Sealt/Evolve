<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { Tabbar, TabbarItem } from "vant";
import { ref } from "vue";
const active = ref("info");
</script>

<template>
  <router-view/>
</template>

<style>
body::-webkit-scrollbar {
  display: none;
}
.van-overlay {
  --van-overlay-background: rgba(0,0,0,0.3)
}
</style>
