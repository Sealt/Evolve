<template>
  <div class="flex flex-col h-screen bg-vant-n2 p-10 gap-15">
    <div class="flex justify-end gap-10">
      <Icon size="6vw" name="setting-o" />
      <Icon size="6vw" name="good-job-o" />
      <Icon size="6vw" name="good-job-o" />
      <Icon size="6vw" name="add" />
    </div>
    <div class="flex gap-10 px-5" @click="router.push('/user/test')">
      <Image
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        fit="cover"
        class="size-48 shrink-0"
        round />
      <div class="flex flex-col justify-between">
        <div class="text-16">北冥有鱼</div>
        <div class="text-13 text-vant-t2">金币: 0.0 / 积分: 50</div>
      </div>
      <div class="flex items-center grow justify-end">
        <div class="text-12 text-vant-t2">空间</div>
        <Icon class="text-vant-t2" name="arrow" size="4vw" />
      </div>
    </div>
    <div class="grid grid-cols-3 bg-white rounded-[10px] py-5">
      <div class="flex flex-col items-center">
        <div class="text-16 font-bold">190</div>
        <div class="text-13 text-vant-t2">动态</div>
      </div>
      <div
        class="flex flex-col items-center"
        @click="router.push({ path: '/detail/follow' })">
        <div class="text-16 font-bold">125</div>
        <div class="text-13 text-vant-t2">关注</div>
      </div>
      <div
        class="flex flex-col items-center"
        @click="router.push({ path: '/detail/fans' })">
        <div class="text-16 font-bold">9937</div>
        <div class="text-13 text-vant-t2">粉丝</div>
      </div>
    </div>
    <div
      class="grid grid-cols-4 grid-rows-2 bg-white rounded-[10px] py-10 gap-y-10">
      <div
        class="flex flex-col items-center gap-5"
        v-for="a in [1, 1, 1, 1, 1, 1, 1, 1]">
        <Icon name="gold-coin-o" size="7vw" />
        <div class="text-12">金币商店</div>
      </div>
    </div>
    <div class="flex flex-col rounded-[10px] overflow-hidden">
      <Cell title="个人资料" is-link @click="router.push('/user/edit')" />
      <Cell title="校园认证" is-link @click="router.push('/user/auth')" />
      <Cell title="账号设置" is-link @click="router.push('/user/account')" />
      <Cell title="退出登录" is-link @click="onLogout" />
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
import { Tabbar, TabbarItem, Icon, Image, Cell, showToast } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
const router = useRouter();
const userStore = useUserStore();
const onLogout = () => {
  // localStorage.removeItem("user");
  userStore.clear()
  showToast("退出成功");
  router.push("/login");
};
</script>

<style scoped></style>
