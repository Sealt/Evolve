<template>
    <div>
        <NavBar left-arrow title="账号设置" @click-left="router.back()"/>
        <Cell title="用户名" :value="data.userName" @click="router.push('/user/edit/name')"/>
        <Cell title="手机号" :value="data.mobile"/>
        <Cell title="邮箱" :value="data.mail"/>

        <Cell title="修改密码" is-link @click="router.push('/user/edit/pwd?mobile='+data.mobile)"/>
    </div>
</template>

<script setup lang="ts">
import { NavBar,Cell } from 'vant';
import { useRouter } from "vue-router";
import { getUserInfo } from '@/api/user';
import { ref,onMounted } from 'vue'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const router = useRouter();
const data = ref({userName: '' , mobile: '',mail:''});
onMounted(() => {
    getUserInfo({id:userStore.userId,infoType:"account"}).then(res => {
        data.value = res.data
    })
})
</script>

<style scoped>

</style>
