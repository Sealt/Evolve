<template>
  <div class="flex h-45 border-b bg-white items-center sticky top-0 z-50">
    <Icon class="pl-10 pr-20" size="5vw" name="arrow-left" @click="onBack"/>
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
      <Icon name="ellipsis" size="5vw"/>
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
  <div
    class="flex sticky bottom-0 bg-white border-t-[1px] gap-10 p-7 items-center">
    <div
      class="flex grow bg-vant-n2 text-vant-t3 text-13 rounded-full pl-10 py-3 items-center gap-5" @click="handleComment">
      <Icon name="records-o" size="4vw" />
      <div class="text-13">写回复...</div>
    </div>
    <div class="flex gap-5 items-center">
      <Icon name="comment-o" size="4vw" class="text-vant-t3" />
      <div class="text-vant-t3 text-13">648</div>
    </div>
    <div class="flex gap-5 items-center">
      <Icon name="good-job-o" size="4vw" class="text-vant-t3" />
      <div class="text-vant-t3 text-13">6245</div>
    </div>
    <div class="flex gap-5 items-center">
      <Icon name="star-o" size="4vw" class="text-vant-t3" />
      <div class="text-vant-t3 text-13">6867</div>
    </div>
  </div>
  <Popup v-model:show="showCommentPop" class="p-15 h-1/3" position="bottom" round>
    <div class="flex flex-col gap-10 h-full">
      <div class="flex items-center justify-between">
      <div class="text-14">回复</div>
      <div class="text-14 text-vant">发布</div>
    </div>
    <div class="flex grow">
      <Field v-model="commentText" placeholder="回复: 计科211史诗琪" maxlength="400" type="textarea" show-word-limit class="grow"/>
    </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Swipe, SwipeItem, Icon, Image, Button, Field, Popup } from "vant";
import TinyCard from "@/components/TinyCard.vue";
import Comment from "@/components/Comment.vue";
import LittleCard from "@/components/LittleCard.vue";
import { ref } from "vue";
import {useRouter} from 'vue-router'
const router = useRouter()
const onBack = () => {
  router.back()
}
const images = ["../test.jpg", "../1.png", "../2.png"];
const activeCommentType = ref(0);
const showCommentPop = ref(false);
const commentText = ref('');
const handleComment = () => {
  showCommentPop.value = true;
}
</script>

<style>

</style>
<style lang="scss" scoped>

.van-button {
  --van-button-small-height: 26px;
  margin-right: 20px;
}
.van-field {
  padding: 0px;
}
:deep(.van-swipe__indicators) {
  position: static;
  bottom: 0;
  transform: none;
  justify-content: center;
  padding: 5px 0px;
}
:deep(.van-field__value) {
  display: flex;
  flex-direction: column;
}
:deep(.van-field__body) {
  flex-grow: 1;
}
:deep(.van-field__control--min-height) {
  height: 100% !important;
}
</style>
