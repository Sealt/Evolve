<template>
  <div class="flex flex-col">
    <CommentItem />
    <div
      class="flex bg-gray-100 rounded-[5px] mb-15 ml-40 flex-col overflow-hidden">
      <div class="px-5 py-1 text-13 active:bg-gray-200" v-for="c in cc">
        <template v-if="c.to">
          <span class="text-vant">{{ c.user }}</span>
          <span>回复</span>
          <span class="text-vant">{{ c.to }}:</span>
          <TextEllipsis
            class="inline"
            :content="c.content"
            rows="2"
            expand-text="展开"
            collapse-text="收起" />
        </template>
        <template v-else>
          <span class="text-vant">{{ c.user }}:</span>
          <TextEllipsis
            class="inline"
            :content="c.content"
            rows="3"
            expand-text="展开"
            collapse-text="收起" />
        </template>
      </div>
      <div
        class="px-5 py-1 text-13 text-vant active:bg-gray-200"
        @click="onClickMore">
        查看更多回复(666)
      </div>
      <Popup
        v-model:show="showMoreComment"
        position="bottom"
        class="h-2/3"
        round>
        <div
          class="flex flex-col px-15 pt-15 pb-10 gap-10 sticky top-0 bg-white z-10">
          <div class="text-15">回复({{ 18 }})</div>
          <CommentItem />
        </div>
        <div class="flex flex-col px-15 gap-10 bg-vant-n2 py-10">
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </div>
        <div
          class="flex sticky bottom-0 bg-white border-t-[1px] gap-10 p-7 items-center">
          <div
            class="flex grow bg-vant-n2 text-vant-t3 text-13 rounded-full pl-10 py-3 items-center gap-5"
            @click="handleComment">
            <Icon name="records-o" size="4vw" />
            <div class="text-13">写回复...</div>
          </div>
        </div>
      </Popup>
    </div>
    <Popup
      v-model:show="showCommentPop"
      class="p-15 h-1/3"
      position="bottom"
      round>
      <div class="flex flex-col gap-10 h-full">
        <div class="flex items-center justify-between">
          <div class="text-14">回复</div>
          <div class="text-14 text-vant">发布</div>
        </div>
        <div class="flex grow">
          <Field
            v-model="commentText"
            placeholder="回复: 计科211史诗琪"
            maxlength="400"
            type="textarea"
            show-word-limit
            class="grow" />
        </div>
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { TextEllipsis, Popup, Field } from "vant";
import { ref } from "vue";
import CommentItem from "./CommentItem.vue";
const commentText = ref("");
const showMoreComment = ref(false);
const showCommentPop = ref(false);
const onClickMore = () => {
  showMoreComment.value = true;
};
const handleComment = () => {
  showCommentPop.value = true;
};
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

<style lang="scss" scoped>
.van-field {
  padding: 0px;
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
