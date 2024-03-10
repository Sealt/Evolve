<template>
    <Search show-action v-model="searchValue" placeholder="搜索" @click-input="onFocus">
    <template #action>
        <Icon id="new" name="add" size="7vw" @click="handlePublish"/>
    </template>
    <template #left>
        <Icon id="avator" name="user-circle-o" size="7vw" />
    </template>
    </Search>
</template>

<script setup lang="ts">
import { Search,Button,Icon } from 'vant'
import { useRouter } from 'vue-router';
import { ref } from 'vue'
const router = useRouter();
const searchValue = ref('')
const handlePublish = () => {
    router.push('/publish')
}
const onFocus = () => {
    router.push('/search')
}
</script>

<style scoped>
.van-search {
    padding: 10px 0 0 12px;
}
:deep(.van-search__action) {
    padding: 0 12px;
}
:deep(.van-search__action:active) {
    background-color: #fff;
}
.van-icon[id="avator"] {
    padding-right: 12px;
}
.van-icon[id="new"] {
    color: var(--van-primary-color);
    vertical-align: middle;
}
.van-icon:active[id="new"] {
    color: #086da8;
}
</style>
