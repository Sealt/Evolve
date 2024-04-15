<template>
  <div class="flex flex-col gap-15 pb-10">
    <div class="flex flex-col" v-for="cmt in commentItems.items" :key="cmt.id">
      <CommentItem :commentItem="cmt" :-head-comment="cmt" />
      <div
        v-if="cmt.comment != null"
        class="flex bg-gray-100 rounded-[5px] ml-40 flex-col overflow-hidden">
        <div
          class="px-5 py-1 text-13 active:bg-gray-200"
          v-for="c in cmt.comment">
          <template v-if="c.replyUser != null && c.replyUserId != cmt.userId">
            <span class="text-vant">{{ c.user.userName }}</span>
            <span>回复</span>
            <span class="text-vant">{{ c.replyUser.userName }}:</span>
            <TextEllipsis
              class="inline"
              :content="c.content"
              rows="2"
              expand-text="展开"
              collapse-text="收起" />
          </template>
          <template v-else>
            <span class="text-vant">{{ c.user.userName }}:</span>
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
          @click="onClickMore(cmt)">
          查看更多回复({{ cmt.comment.length }})
        </div>
      </div>
    </div>
    <Popup v-model:show="showMoreComment" position="bottom" class="h-2/3" round>
      <div class="flex flex-col h-full">
        <div
          class="flex flex-col px-15 pt-15 pb-10 gap-10 sticky top-0 bg-white z-10">
          <div class="text-15">回复({{ commentPop.comment.length }})</div>
          <CommentItem :commentItem="commentPop" :-head-comment="commentPop" />
        </div>
        <div class="flex flex-col px-15 gap-10 bg-vant-n2 py-10">
          <CommentItem
            v-for="c in commentPop.comment"
            :commentItem="c"
            :-head-comment="commentPop" />
        </div>
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { TextEllipsis, Popup, Field, Icon, showToast } from "vant";
import { comment, getComment } from "@/api/action";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import CommentItem from "./CommentItem.vue";
const userStore = useUserStore();
const router = useRouter();
const commentItems: any = ref({ items: [] });
const commentText = ref("");
const showMoreComment = ref(false);
const showCommentPop = ref(false);
const commentPop:any = ref();
const pageId = router.currentRoute.value.params.id;
const onClickMore = (cmt:any) => {
  commentPop.value = cmt
  showMoreComment.value = true;
};
onMounted(() => {
  getComment({
    current: 1,
    size: 10,
    targetId: pageId,
  }).then((res) => {
    if (res.code == 200) {
      commentItems.value.items = res.data.records;
    }
  });
});
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
