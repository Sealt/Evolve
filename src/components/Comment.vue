<template>
  <div class="flex flex-col gap-15 pb-10">
    <div
      class="flex flex-col"
      v-for="cmt in commentItems.items"
      :key="cmt.id"
      >
      <CommentItem
        :commentItem="cmt"
        :-head-comment="cmt"
        @newComment="reloadComment"
        @newSonComment="reloadSonComment" />
      <div
        v-if="cmt.comment != null"
        class="flex bg-gray-100 rounded-[5px] ml-40 flex-col overflow-hidden">
        <div
          class="px-5 py-1 text-13 active:bg-gray-200"
          v-for="c in cmt.comment.slice(0, 4)">
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
          <CommentItem
            :commentItem="commentPop"
            :-head-comment="commentPop"
            @newComment="reloadComment"
            @newSonComment="reloadSonComment"
            @showCommentPop="itemCommentPop = true"
            @closeCommentPop="itemCommentPop = false" />
        </div>
        <div class="flex flex-col px-15 gap-10 bg-vant-n2 py-10">
          <CommentItem
            @newComment="reloadComment"
            @newSonComment="reloadSonComment"
            v-for="c in commentPop.comment"
            :commentItem="c"
            :-head-comment="commentPop"
            @showCommentPop="itemCommentPop = true"
            @closeCommentPop="itemCommentPop = false" />
        </div>
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { TextEllipsis, Popup, Field, Icon, showToast } from "vant";
import { comment, getComment } from "@/api/action";
import { ref, onMounted, inject, provide } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import CommentItem from "./CommentItem.vue";

const userStore = useUserStore();
const router = useRouter();
const commentItems: any = ref({ items: [] });
const commentText = ref("");
const showMoreComment = ref(false);
const itemCommentPop = ref(false);
const commentPop: any = ref({ comment: [] });
const pageId = router.currentRoute.value.params.id;
let updateLock = 1;

let pageCurrent = 1;
const pageSize = 10;
const onClickMore = (cmt: any) => {
  commentPop.value = cmt;
  showMoreComment.value = true;
};

onBeforeRouteLeave((to, from) => {
  if (showMoreComment.value == true && itemCommentPop.value == false) {
    showMoreComment.value = false;
    return false;
  }
});
const reloadComment = (comment:any) => {
  commentItems.value.items.unshift(comment);
};
const reloadSonComment = (comment:any) => {
  commentItems.value.items = commentItems.value.items.map((item:any) => {
    if (item.id == comment.id) {
      return comment; // 如果 id 相同，返回新的 comment
    } else {
      return item; // 否则返回原来的 item
    }
  });
  commentPop.value.comment = comment.comment;
};
defineExpose({
  reloadComment,reloadSonComment
});
onMounted(() => {
  getComment({
    current: pageCurrent,
    size: pageSize,
    targetId: pageId,
  }).then((res) => {
    if (res.code == 200) {
      commentItems.value.items = res.data.records;
      pageCurrent++;
      updateLock = 0;
    }
  });
  window.addEventListener('scroll', handleScroll);
});
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // 滚动条距离底部 100px 时触发
      if (scrollTop + windowHeight > scrollHeight - 100) {
        // 触发数据更新
        if (updateLock == 0) {
          updateLock = 1;
          loadMore();
        }
      }
};
const loadMore = () => {
  getComment({
    current: pageCurrent,
    size: pageSize,
    targetId: pageId,
  }).then((res) => {
    if (res.code == 200 && res.data.records.length != 0) {
      commentItems.value.items = [
        ...commentItems.value.items,
        ...res.data.records,
      ];
      pageCurrent++;
      updateLock = 0;
    }
  });
};
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
