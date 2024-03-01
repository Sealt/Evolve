<template>
  <div class="flex">
    <div class="pr-10">
      <Image
        class="shrink-0 size-32"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        fit="cover"
        round />
    </div>
    <div class="flex flex-col justify-around w-full">
      <div class="text-14 text-vant">春风Benin</div>
      <div class="text-14">我评论回复的内容</div>
      <div class="flex justify-between py-5 items-center">
        <span class="text-12 text-gray-500">1分钟前</span>
        <div class="flex items-center gap-5">
          <div class="flex items-center">
            <Icon name="good-job-o" /><span class="text-12 text-gray-500 px-5"
              >998</span
            >
          </div>
          <div class="flex items-center">
            <Icon name="comment-o" /><span class="text-12 text-gray-500 px-5"
              >986</span
            >
          </div>
        </div>
      </div>
      <div class="flex bg-gray-100 rounded-[5px] mt-5 mb-15 flex-col overflow-hidden">
        <div class="px-5 py-1 text-13 active:bg-gray-200" v-for="c in cc">
          <template v-if="c.to">
            <span class="text-vant">{{ c.user }}</span>
            <span>回复</span>
            <span class="text-vant">{{ c.to }}:</span>
            <TextEllipsis class="inline" :content="c.content" rows="2" expand-text="展开" collapse-text="收起"/>
          </template>
          <template v-else>
            <span class="text-vant">{{ c.user }}:</span>
            <TextEllipsis class="inline" :content="c.content" rows="3" expand-text="展开" collapse-text="收起"/>
          </template>
        </div>
        <div class="px-5 py-1 text-13 text-vant active:bg-gray-200">查看更多回复(666)</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Icon, TextEllipsis } from "vant";
const cc = [
  { user: "hi23hd", to: "", content: "这是一条评论内容评论的评论的评论测试" },
  {
    user: "争先恐后的人哈哈",
    to: "hi23hd",
    content:
      "这是一条评论内容评论的评论的评论测试这是一条评论内容评论的评论的评论测试这是一条评论内容评论的评论的评条评论内容评论的评论的评论测试论测试",
  },
];
</script>

<style lang="scss" scoped></style>
