<template>
    <div>
        <NavBar left-arrow title="校园认证" @click-left="router.back()"/>
        <Cell title="高校" value="江西理工大学"/>
        <Cell title="校区"/>
        <Cell title="院系"/>
        <Cell title="专业"/>
        <Cell title="姓名"/>
        <Cell title="学号"/>
    </div>
</template>

<script setup lang="ts">
import { NavBar,Cell } from 'vant';
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>

</style>
