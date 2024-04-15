<template>
  <div class="flex">
    <div class="pr-10">
      <Image
        class="shrink-0 size-32"
        :src="commentItem.user.avatar"
        fit="cover"
        round
        @click.stop="router.push('/user/' + commentItem.userId)" />
    </div>
    <div class="flex flex-col justify-around w-full">
      <div
        v-if="
          commentItem.replyUserId != null &&
          commentItem.replyUserId != HeadComment.userId
        "
        class="text-14">
        <span class="text-vant">{{ commentItem.user.userName }}</span>
        <span class="text-vant-t2">{{ " 回复 " }}</span>
        <span class="text-vant">{{ commentItem.replyUser.userName }}:</span>
      </div>
      <div v-else="commentItem.replyUserId == null" class="text-14 text-vant">
        {{ commentItem.user.userName }}
      </div>
      <div class="text-14">{{ commentItem.content }}</div>
      <div class="flex justify-between py-5 items-center">
        <span class="text-12 text-gray-500">{{
          dayjs(commentItem.commentTime).fromNow()
        }}</span>
        <div class="flex items-center gap-5">
          <div class="flex items-center">
            <Icon name="good-job-o" size="4vw" /><span
              class="text-12 text-gray-500 px-5"
              >{{ commentItem.likeCount }}</span
            >
          </div>
          <div class="flex items-center" @click.stop="handleComment">
            <Icon name="comment-o" size="4vw" /><span
              class="text-12 text-gray-500 px-5"
              >{{ commentItem.replyCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <Popup
    v-model:show="showCommentPop"
    class="p-15 h-1/3"
    position="bottom"
    round>
    <div class="flex flex-col gap-10 h-full">
      <div class="flex items-center justify-between">
        <div class="text-14">回复</div>
        <div class="text-14 text-vant" @click="onComment">发布</div>
      </div>
      <div class="flex grow">
        <Field
          v-model="commentText"
          :placeholder="'回复：' + commentItem.user.userName"
          maxlength="400"
          type="textarea"
          show-word-limit
          class="grow" />
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Image, Icon, showToast, Popup, Field } from "vant";
import { ref, onMounted, getCurrentInstance } from "vue";
import { comment } from "@/api/action";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const router = useRouter();
const dayjs = getCurrentInstance()?.appContext.config.globalProperties.$dayjs;
const props = defineProps<{
  commentItem: any;
  HeadComment: any;
}>();
const commentText = ref("");
const showCommentPop = ref(false);
const pageType = router.currentRoute.value.params.type;
const pageId = router.currentRoute.value.params.id;

const handleComment = () => {
  showCommentPop.value = true;
};
const onComment = () => {
  var targetT = 0;
  switch (router.currentRoute.value.params.type) {
    case "info":
      targetT = 0;
      break;
    case "exp":
      targetT = 1;
      break;
    case "node":
      targetT = 3;
      break;
    case "res":
      targetT = 5;
      break;
  }
  comment({
    userId: userStore.userId,
    targetId: router.currentRoute.value.params.id,
    content: commentText.value,
    targetType: targetT,
    replyUserId: props.commentItem.userId,
    replyCommentId: props.HeadComment.id,
    realCommentId: props.commentItem.id,
  }).then((res) => {
    if (res.code == 200) {
      showCommentPop.value = false;
      showToast("评论成功");
    }
  });
};
</script>

<style scoped>
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
