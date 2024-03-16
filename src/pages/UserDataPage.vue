<template>
    <div>
        <NavBar left-arrow title="编辑资料" @click-left="router.back()"/>
        <Cell title="头像"/>
        <Cell title="主页背景"/>
        <Cell title="用户名"/>
        <Cell title="昵称"/>
        <Cell title="性别"/>
        <Cell title="签名"/>
        <Cell title="高校" value="江西理工大学"/>
    </div>
</template>

<script setup lang="ts">
import { NavBar,Cell } from 'vant';
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>

</style>
