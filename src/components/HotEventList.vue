<template>
    <div class="flex flex-col p-10 bg-white rounded-[10px]">
        <div class="flex items-center h-30 active:bg-vant-n2" v-for="i in [{index: 'T'},{index: 1},{index: 2},{index: 3},{index: 4}]">
            <div v-if="i.index < 2 || i.index == 'T'" class="text-red-600 font-bold italic px-5 w-20 flex justify-center">{{ i.index }}</div>
            <div v-else-if="i.index < 4" class="text-red-500 font-bold italic px-5 w-20 flex justify-center">{{ i.index }}</div>
            <div v-else class="text-black italic px-5 w-20 flex justify-center">{{ i.index }}</div>
            <div class="text-14 px-5">中国国际大学生创新大赛（2024）</div>
            <div class="text-12 text-gray-500">625185</div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
