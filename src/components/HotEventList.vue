<template>
    <div class="flex flex-col p-10 bg-white rounded-[10px]">
        <div class="pb-5"><Icon name="hot-o" size="4vw" class="inline px-5 text-red-600"/><span class="text-15">实时热榜</span></div>
        <div class="flex items-center h-30 active:bg-vant-n2" v-for="i in [{index: 'T'},{index: 1},{index: 2},{index: 3},{index: 4}]">
            <div v-if="i.index < 2 || i.index == 'T'" class="text-red-600 font-bold italic px-5 w-20 flex justify-center text-14">{{ i.index }}</div>
            <div v-else-if="i.index < 4" class="text-red-500 font-bold italic px-5 w-20 flex justify-center text-14">{{ i.index }}</div>
            <div v-else class="text-black italic px-5 w-20 flex justify-center text-14">{{ i.index }}</div>
            <div class="text-14 px-5">中国国际大学生创新大赛（2024）</div>
            <div class="text-12 text-gray-500">625185</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "vant";
</script>

<style scoped>

</style>
