<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { Tabbar, TabbarItem } from "vant";
import { ref } from 'vue'
const active = ref('info')
</script>

<template>
    <RouterView/>
    <Tabbar route v-model="active">
      <TabbarItem name="info" to="/" icon="info-o">信息</TabbarItem>
      <TabbarItem name="res" to="/res" icon="apps-o">资源</TabbarItem>
      <TabbarItem name="chat" to="/chat" icon="chat-o">消息</TabbarItem>
      <TabbarItem name="me" to="/me" icon="user-o">我的</TabbarItem>
    </Tabbar>

</template>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
