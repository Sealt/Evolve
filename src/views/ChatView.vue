<template>
  <div>
    <NavBar title="消息" fixed placeholder class="z-10" />
    <div class="grid grid-cols-3 justify-items-center my-25">
      <div
        class="flex flex-col items-center gap-5"
        @click="router.push('/detail/like')">
        <Badge :content="notifyData.likes" :show-zero="false">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-48 rounded-[10px] overflow-hidden" /></Badge>
        <div class="text-14">赞和获取</div>
      </div>
      <div
        class="flex flex-col items-center gap-5"
        @click="router.push('/detail/followed')">
        <Badge :content="notifyData.follow" :show-zero="false">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-48 rounded-[10px] overflow-hidden" /></Badge>
        <div class="text-14">关注</div>
      </div>
      <div
        class="flex flex-col items-center gap-5"
        @click="router.push('/detail/chat')">
        <Badge :content="notifyData.chat" :show-zero="false">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-48 rounded-[10px] overflow-hidden" /></Badge>
        <div class="text-14">私信</div>
      </div>
    </div>
    <div class="flex flex-col mx-15 mb-15 gap-15">
      <NotifyItem
        type="comment"
        :avatar="item.user.avatar"
        :id="item.id"
        :userName="item.user.userName"
        :create-time="item.commentTime"
        :content="item.content"
        v-for="item in notifyData.comments" />
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
import { Tabbar, TabbarItem, NavBar, Image,Badge } from "vant";
import { getNotify } from "@/api/notify";
import { onMounted,ref } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
const notifyData:any = ref({})
onMounted(() => {
  getNotify().then(res=>{
    if(res.code == 200)
      notifyData.value = res.data
  })
})
</script>

<style scoped></style>
