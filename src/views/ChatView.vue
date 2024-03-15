<template>
  <div>
    <NavBar title="消息" fixed placeholder class="z-10" />
    <div class="grid grid-cols-3 justify-items-center my-25">
      <div
        class="flex flex-col items-center gap-5"
        @click="router.push('/detail/like')">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-48 rounded-[10px] overflow-hidden" />
        <div class="text-14">赞和收藏</div>
      </div>
      <div
        class="flex flex-col items-center gap-5"
        @click="router.push('/detail/followed')">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-48 rounded-[10px] overflow-hidden" />
        <div class="text-14">关注</div>
      </div>
      <div
        class="flex flex-col items-center gap-5"
        @click="router.push('/detail/chat')">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-48 rounded-[10px] overflow-hidden" />
        <div class="text-14">私信</div>
      </div>
    </div>
    <div class="flex flex-col mx-15 mb-15 gap-15">
      <NotifyItem
        type="push"
        v-for="a in [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3]" />
    </div>
    <Tabbar route placeholder>
      <TabbarItem name="info" to="/" icon="info-o">信息</TabbarItem>
      <TabbarItem name="res" to="/res" icon="apps-o">资源</TabbarItem>
      <TabbarItem name="chat" to="/chat" icon="chat-o">消息</TabbarItem>
      <TabbarItem name="me" to="/me" icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import NotifyItem from "@/components/NotifyItem.vue";
import { Tabbar, TabbarItem, NavBar, Image } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped></style>
