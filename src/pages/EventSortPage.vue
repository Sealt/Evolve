<template>
    <div class="flex h-screen flex-col">
        <NavBar title="事件分类" left-arrow left-text="返回" @click-left="onBack"/>
        <StockTree />
    </div>
</template>

<script setup lang="ts">
import StockTree from '@/components/StockTree.vue';
import { NavBar } from 'vant';
import { useRouter } from "vue-router";
const router = useRouter()
const onBack = () => {
  router.back()
}
</script>

<style scoped>

</style>
