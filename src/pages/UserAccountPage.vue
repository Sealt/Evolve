<template>
    <div>
        <NavBar left-arrow title="账号设置" @click-left="router.back()"/>
        <Cell title="用户名"/>
        <Cell title="手机号"/>
        <Cell title="邮箱"/>

        <Cell title="修改密码" is-link/>
    </div>
</template>

<script setup lang="ts">
import { NavBar,Cell } from 'vant';
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>

</style>
