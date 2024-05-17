<template>
  <div class="firstCard flex flex-col">
    <Swipe
      class="my-swipe"
      :autoplay="3000"
      height="130"
      indicator-color="white">
      <SwipeItem v-for="image in swiperImages" :key="image">
        <img :src="image" />
      </SwipeItem>
    </Swipe>
    <div
      class="grid grid-cols-5 bg-white rounded-bl[10px] rounded-br[10px] py-10 gap-y-10">
      <div class="flex flex-col items-center gap-5" v-for="item in funcItems" @click="showToast('Coding')">
        <Icon :name="item.icon" size="7vw" :class="item.color"/>
        <div class="text-12">{{ item.text }}</div>
      </div>
    </div>
  </div>
  <InfoFlowPage by="home"/>
</template>

<script setup lang="ts">
import { Swipe, SwipeItem, Icon,showToast } from "vant";
import InfoFlowPage from "./InfoFlowPage.vue";
const swiperImages = ["/1.png", "/2.png", "/3.png"];
const funcItems = [
  { icon: "fire", text: "必看",color:'text-red-400' },
  { icon: "clock", text: "实况",color:'text-blue-400' },
  { icon: "info", text: "状态" ,color:'text-pink-300'},
  { icon: "notes", text: "日程",color:'text-orange-300' },
  { icon: "question", text: "咨询" ,color:'text-purple-400'}]

</script>

<style scoped>
.firstCard {
  border: 1px solid whitesmoke;
  border-radius: 10px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 10px 0px;
}
.van-col:active {
  background-color: whitesmoke;
}
.bannerButton {
  background-color: white;
}
</style>
