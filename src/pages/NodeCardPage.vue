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
    </div>
    <div class="flex px-15 pt-10 flex-col gap-10">
      <div class="flex grow justify-between">
        <div class="text-15">{{ node.title }}</div>
        <Tag type="primary">进行中</Tag>
      </div>
      <div class="text-14">{{ node.content }}</div>
      <div class="flex gap-10 items-center">
        <Tag plain type="primary" class="shrink-0 h-25">时间</Tag>
        <span class="text-14">{{ node.startTime + " - " + node.endTime }}</span>
      </div>
      <div class="flex gap-10" v-if="node.targetIds != null">
        <Tag plain type="primary" class="shrink-0 h-25">信息</Tag>
        <div class="flex flex-col gap-5">
          <div
            v-for="(item, index) in node.targetIds.infos"
            :key="index"
            class="rounded-[5px] bg-vant-n2 text-13 p-5"
            @touchstart="onTouchStart(item, 0)"
            @touchend="onTouchEnd">
            {{ "@" + item.user.userName + ":" + item.content }}
          </div>
        </div>
      </div>
      <div class="flex gap-10" v-if="node.targetIds != null">
        <Tag plain type="primary" class="shrink-0 h-25">经验</Tag>
        <div class="flex flex-col gap-5">
          <div
            v-for="(item, index) in node.targetIds.exps"
            :key="index"
            class="rounded-[5px] bg-vant-n2 text-13 p-5"
            @touchstart="onTouchStart(item, 1)"
            @touchend="onTouchEnd">
            {{ "@" + item.user.userName + ":" + item.content }}
          </div>
        </div>
      </div>
      <div class="flex gap-10" v-if="node.targetIds != null">
        <Tag plain type="primary" class="shrink-0 h-25">资源</Tag>
        <div class="flex flex-col gap-5">
          <div
            v-for="(item, index) in node.targetIds.resources"
            :key="index"
            class="rounded-[5px] bg-vant-n2 text-13 p-5"
            @touchstart="onTouchStart(item, 5)"
            @touchend="onTouchEnd">
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
      <Comment ref="commentRef" />
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
      <div class="flex gap-5 items-center" @click="handleComment">
        <Icon name="comment-o" size="4vw" class="text-vant-t3" />
        <div class="text-vant-t3 text-13">{{ node.commentCount }}</div>
      </div>
      <div
        class="flex gap-5 items-center text-vant"
        v-if="node.isLike == true"
        @click.stop="likeOff">
        <Icon name="good-job-o" size="4vw" />
        <div class="text-13">{{ node.likeCount }}</div>
      </div>
      <div
        class="flex gap-5 items-center"
        v-if="node.isLike == null"
        @click.stop="likeOn">
        <Icon name="good-job-o" size="4vw" class="text-vant-t3" />
        <div class="text-vant-t3 text-13">{{ node.likeCount }}</div>
      </div>
      <div
        class="flex gap-5 items-center text-vant"
        v-if="node.isStar == true"
        @click.stop="starOff">
        <Icon name="star-o" size="4vw" />
        <div class="text-13">{{ node.starCount }}</div>
      </div>
      <div
        class="flex gap-5 items-center"
        v-if="node.isStar == null"
        @click.stop="starOn">
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
import {
  Icon,
  Image,
  showConfirmDialog,
  Field,
  Popup,
  Tag,
  showToast,
} from "vant";
import TinyCard from "@/components/TinyCard.vue";
import Comment from "@/components/Comment.vue";
import LittleCard from "@/components/LittleCard.vue";
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { getNode } from "@/api/event";
import { useUserStore } from "@/stores/user";
import {
  comment,
  like,
  unLike,
  star,
  unStar,
  unLinkFromNode,
} from "@/api/action";

const commentRef = ref();
const userStore = useUserStore();
const router = useRouter();
const onBack = () => {
  router.back();
};
let timer:any = null;
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
    infos: [{ targetId: "", user: { userName: "" }, content: "" }],
    exps: [{ targetId: "",  user: { userName: "" }, content: "" }],
    resources: [{ targetId: "", user: { userName: "" }, content: "" }],
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
  isLike: null,
  isStar: null,
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
});
onMounted(() => {
  getNode({ nodeId: router.currentRoute.value.params.id }).then((res) => {
    if (res.code == 200) {
      node.value = res.data;
    }
  });
});
const onComment = () => {
  if (commentText.value == "") {
    showToast("请输入评论内容");
    return;
  }
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
      commentText.value = "";
      commentRef.value.reloadComment(res.data);
      node.value.commentCount++;
    }
  });
};
const likeOn = () => {
  like({
    targetId: router.currentRoute.value.params.id,
    typed: 3,
  }).then((res) => {
    if (res.code == 200) {
      node.value.likeCount = res.data;
      node.value.isLike = true;
    }
  });
};
const likeOff = () => {
  unLike({
    targetId: router.currentRoute.value.params.id,
    typed: 3,
  }).then((res) => {
    if (res.code == 200) {
      node.value.likeCount = res.data;
      node.value.isLike = null;
    }
  });
};
const starOn = () => {
  star({
    targetId: router.currentRoute.value.params.id,
    typed: 3,
  }).then((res) => {
    if (res.code == 200) {
      node.value.starCount = res.data;
      node.value.isStar = true;
    }
  });
};
const starOff = () => {
  unStar({
    targetId: router.currentRoute.value.params.id,
    typed: 3,
  }).then((res) => {
    if (res.code == 200) {
      node.value.starCount = res.data;
      node.value.isStar = null;
    }
  });
};
const onTouchStart = (item: any, typed: number) => {
  timer = setTimeout(() => {
    timer = null;
    showConfirmDialog({
      message: "确认从节点中移除",
    })
      .then(() => {
        unLinkFromNode({
          nodeId: router.currentRoute.value.params.id,
          typed: typed,
          targetId: item.targetId,
        }).then((res) => {
          if (res.code == 200) {
            showToast("移除成功");
            if (typed == 0) {
              node.value.targetIds.infos = node.value.targetIds.infos.filter(
                (i) => i.targetId != item.targetId
              );
            }
            if (typed == 1) {
              node.value.targetIds.exps = node.value.targetIds.exps.filter(
                (i) => i.targetId != item.targetId
              );
            }
            if (typed == 5) {
              node.value.targetIds.resources =
                node.value.targetIds.resources.filter((i) => i.targetId != item.targetId);
            }
          }
        });
      })
      .catch(() => {
        // on cancel
      });
  }, 500);
};
const onTouchEnd = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};
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
