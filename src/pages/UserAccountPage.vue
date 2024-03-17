<template>
    <div>
        <NavBar left-arrow title="账号设置" @click-left="router.back()"/>
        <Cell title="用户名" :value="data.userName" @click="router.push('/user/edit/name')"/>
        <Cell title="手机号" :value="data.phone"/>
        <Cell title="邮箱" :value="data.mail"/>

        <Cell title="修改密码" is-link @click="router.push('/user/edit/pwd')"/>
    </div>
</template>

<script setup lang="ts">
import { NavBar,Cell } from 'vant';
import { useRouter } from "vue-router";
import { ref } from 'vue'
const router = useRouter();
const data = ref({userName: 'abc' , phone: '132',mail:'164'});
</script>

<style scoped>

</style>
