<template>
  <div class="flex flex-col h-screen">
    <div
      class="flex h-45 border-b bg-white items-center sticky top-0 z-50 shrink-0">
      <Icon class="pl-10 pr-20" size="5vw" name="arrow-left" @click="onBack" />
      <Image
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        fit="cover"
        class="shrink-0 size-32"
        radius="5px" />
      <div class="flex flex-col justify-between ml-10 shrink-0">
        <div class="text-14">{{ node.event.eventName }}</div>
      </div>
      <div class="flex justify-end w-full pr-10 items-center">
        <Button plain round size="small" type="primary">关注</Button>
        <Icon name="ellipsis" size="5vw" />
      </div>
    </div>
    <div class="flex px-15 pt-10 flex-col gap-10">
      <div class="flex grow justify-between">
        <div class="text-15">{{ node.title }}</div>
        <Tag type="primary">进行中</Tag>
      </div>
      <div class="flex gap-10 items-center">
        <Tag plain type="primary" class="shrink-0 h-25">时间</Tag>
        <span class="text-14">{{ node.startTime + " - " + node.endTime }}</span>
      </div>
      <div class="flex gap-10" v-if="node.targetIds != null">
        <Tag plain type="primary" class="shrink-0 h-25">信息</Tag>
        <div class="flex flex-col gap-5">
          <div
            v-for="item in node.targetIds.infos"
            :key="item.id"
            class="rounded-[5px] bg-vant-n2 text-13 p-5">
            {{ "@" + item.user.userName + ":" + item.content }}
          </div>
        </div>
      </div>
      <div class="flex gap-10" v-if="node.targetIds != null">
        <Tag plain type="primary" class="shrink-0 h-25">经验</Tag>
        <div class="flex flex-col gap-5">
          <div
            v-for="item in node.targetIds.exps"
            :key="item.id"
            class="rounded-[5px] bg-vant-n2 text-13 p-5">
            {{ "@" + item.user.userName + ":" + item.content }}
          </div>
        </div>
      </div>
      <div class="flex gap-10" v-if="node.targetIds != null">
        <Tag plain type="primary" class="shrink-0 h-25">资源</Tag>
        <div class="flex flex-col gap-5">
          <div
            v-for="item in node.targetIds.resources"
            :key="item.id"
            class="rounded-[5px] bg-vant-n2 text-13 p-5">
            {{ "@" + item.user.userName + ":" + item.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="px-15 text-12 text-gray-500 pt-10">
      {{ "发布于" + node.publishIp }}
    </div>
    <div class="px-15 py-10 flex justify-between">
      <span class="text-14 text-gray-600">{{
        "共 " + node.commentCount + " 评论"
      }}</span>
    </div>
    <div class="px-15">
      <Comment ref="commentRef"/>
    </div>
    <div class="grow"></div>
    <div
      class="flex sticky bottom-0 bg-white border-t-[1px] gap-10 p-7 items-center">
      <div
        class="flex grow bg-vant-n2 text-vant-t3 text-13 rounded-full pl-10 py-3 items-center gap-5"
        @click="handleComment">
        <Icon name="records-o" size="4vw" />
        <div class="text-13">写评论...</div>
      </div>
      <div class="flex gap-5 items-center">
        <Icon name="comment-o" size="4vw" class="text-vant-t3" />
        <div class="text-vant-t3 text-13">{{ node.commentCount }}</div>
      </div>
      <div class="flex gap-5 items-center text-vant" v-if="node.isLike == true" @click.stop="likeOff">
        <Icon name="good-job-o" size="4vw" />
        <div class="text-13">{{ node.likeCount }}</div>
      </div>
      <div class="flex gap-5 items-center" v-if="node.isLike == null" @click.stop="likeOn">
        <Icon name="good-job-o" size="4vw" class="text-vant-t3" />
        <div class="text-vant-t3 text-13">{{ node.likeCount }}</div>
      </div>
      <div class="flex gap-5 items-center">
        <Icon name="star-o" size="4vw" class="text-vant-t3" />
        <div class="text-vant-t3 text-13">{{ node.starCount }}</div>
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
        <div class="text-14">评论</div>
        <div class="text-14 text-vant" @click="onComment">发布</div>
      </div>
      <div class="flex grow">
        <Field
          v-model="commentText"
          :placeholder="'评论: ' + node.user.userName"
          maxlength="400"
          type="textarea"
          show-word-limit
          class="grow" />
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Icon, Image, Button, Field, Popup, Tag, showToast } from "vant";
import TinyCard from "@/components/TinyCard.vue";
import Comment from "@/components/Comment.vue";
import LittleCard from "@/components/LittleCard.vue";
import { ref, onMounted } from "vue";
import {onBeforeRouteLeave, useRouter} from "vue-router";
import { getNode } from "@/api/event";
import { useUserStore } from "@/stores/user";
import {comment, getComment, like, unLike} from "@/api/action";

const commentRef = ref()
const userStore = useUserStore();
const router = useRouter();
const onBack = () => {
  router.back();
};

const showCommentPop = ref(false);
const commentText = ref("");
const node = ref({
  id: "",
  eventId: "",
  event: {
    eventName: "",
    icon: "",
  },
  targetIds: {
    infos: [{ id: "", userId: "", user: { userName: "" }, content: "" }],
    exps: [{ id: "", userId: "", user: { userName: "" }, content: "" }],
    resources: [{ id: "", userId: "", user: { userName: "" }, content: "" }],
  },
  userId: "",
  user: {
    userName: "",
    avatar: "",
    realAuth: {
      status: 0,
      campus: "",
      collage: "",
    },
  },
  title: "",
  content: " ",
  startTime: "",
  endTime: "",
  publishTime: "",
  publishIp: null,
  viewCount: 0,
  likeCount: 0,
  isLike:null,
  isStar:null,
  starCount: 0,
  commentStatus: 0,
  commentCount: 0,
});
const handleComment = () => {
  showCommentPop.value = true;
};
onBeforeRouteLeave((to, from) => {
  if (showCommentPop.value == true) {
    showCommentPop.value = false;
    return false;
  }
})
onMounted(() => {
  getNode({ nodeId: router.currentRoute.value.params.id }).then((res) => {
    if (res.code == 200) {
      node.value = res.data;
    }
  });
});
const onComment = () => {
  comment({
    userId: userStore.userId,
    targetId: router.currentRoute.value.params.id,
    content: commentText.value,
    targetType: 3,
    replyUserId: null,
    replyCommentId: null,
  }).then((res) => {
    if (res.code == 200) {
      showCommentPop.value = false;
      showToast("评论成功");
      commentText.value = '';
      commentRef.value.reloadComment();
      node.value.commentCount++;
    }
  });
};
const likeOn = () => {
  like({
    targetId:router.currentRoute.value.params.id,
    typed:3
  }).then(res => {
    if (res.code == 200){
      node.value.likeCount = res.data;
      node.value.isLike = true;
    }
  })
};
const likeOff = () => {
  unLike({
    targetId:router.currentRoute.value.params.id,
    typed:3
  }).then(res => {
    if (res.code == 200){
      node.value.likeCount = res.data;
      node.value.isLike = null;
    }
  })
}
</script>

<style lang="scss" scoped>
.van-overlay {
  --van-overlay-background: rgba(0, 0, 0, 0.3);
}
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
