<template>
    <div class="flex grow">
        <div class="h-full w-10 border border-r-1 border-r-blue-500 border-y-vant-n2 border-l-vant-n2"></div>
        <div class="flex flex-col gap-10 grow pl-18">
            <NodeCard to="1516" v-for="a in [1,1,1,1,1,1,1,1,1,1]"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import NodeCard from '@/components/NodeCard.vue';
</script>

<style scoped>

</style>
