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
</style>
