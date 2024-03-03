<template>
  <div class="flex h-45 border-b bg-white items-center sticky top-0 z-50">
    <Icon class="pl-10 pr-20" name="arrow-left" />
    <Image
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      fit="cover"
      class="shrink-0 size-32"
      round />
    <div class="flex flex-col justify-between ml-10 shrink-0">
      <div class="text-14">春风Benin</div>
      <div class="text-10 text-gray-500">1天前 南昌 信息学院</div>
    </div>
    <div class="flex justify-end w-full pr-10 items-center">
      <Button plain round size="small" type="primary">关注</Button>
      <Icon name="ellipsis" />
    </div>
  </div>
  <Swipe
    :loop="false"
    indicator-color="#1989fa"
    lazy-render
    class="*:items-center">
    <SwipeItem v-for="image in images" :key="image">
      <Image :src="image" fit="contain" class="*:max-h-450" width="100vw" />
    </SwipeItem>
  </Swipe>
  <LittleCard
    class="mx-15 mb-10 mt-5"
    type="res"
    image="../icon_pdf.png"
    hot="0"
    detail="1568下载 4积分 2金币66666666666666666666666666666"
    title="高等数学一-23-24-Z-真题.pdf111111111111"
    follow="0"
    to="125153" />
  <div class="px-15 text-15">
    我是一段普通的内容哈哈我是一段普通的内容哈哈我是一段普通的内容哈哈我是一段普通的内容哈哈<br />还能换个行
  </div>
  <div class="px-15 pt-10 pb-5"><TinyCard /></div>
  <div class="px-15 text-12 text-gray-500">发布于广东</div>
  <div class="px-15 py-10 flex justify-between">
    <span class="text-14 text-gray-600">共 202 回复</span>
  </div>
  <div class="px-15" v-for="comment in [1, 1]">
    <Comment />
  </div>
</template>

<script setup lang="ts">
import { Swipe, SwipeItem, Icon, Image, Button, Tab, Tabs } from "vant";
import TinyCard from "@/components/TinyCard.vue";
import Comment from "@/components/Comment.vue";
import LittleCard from "@/components/LittleCard.vue";
import { ref } from "vue";
const images = ["../test.jpg", "../1.png", "../2.png"];
const activeCommentType = ref(0);
</script>

<style lang="scss" scoped>
.van-button {
  --van-button-small-height: 26px;
  margin-right: 20px;
}
:deep(.van-swipe__indicators) {
  position: static;
  bottom: 0;
  transform: none;
  justify-content: center;
  padding: 5px 0px;
}
</style>
