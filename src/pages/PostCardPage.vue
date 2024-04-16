<template>
  <div class="flex flex-col h-screen">
    <div
        class="flex h-45 border-b bg-white items-center sticky top-0 z-50 shrink-0">
      <Icon class="pl-10 pr-20" size="5vw" name="arrow-left" @click="onBack"/>
      <Image
          :src="data.user.avatar"
          fit="cover"
          class="shrink-0 size-32"
          round
          lazy-load
          @click.stop="router.push('/user/'+data.userId)"/>
      <div class="flex flex-col justify-between ml-10 shrink-0">
        <div class="text-14">{{ data.user.userName }}</div>
        <div class="text-10 text-gray-500">
          {{ infoDesc }}
        </div>
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
        class="flex flex-col *:items-center shrink-0">
      <SwipeItem v-for="image in data.imageList" :key="image" class="shrink-0">
        <Image
            :src="image"
            fit="contain"
            class="*:max-h-450 shrink-0"
            width="100vw"
        />
      </SwipeItem>
    </Swipe>
    <div
        v-show="$router.currentRoute.value.params.type == 'res'"
        class="flex flex-col gap-5 p-10">
      <LittleCard
          v-for="item in data.fileList"
          type="res"
          :image="iconBaseUrl + '/res/fileicon/file_icon_' + item.type + '.png'"
          hot="0"
          :detail="
          item.gainCount +
          ' 下载 ' +
          item.point +
          ' 积分 ' +
          item.gold +
          ' 金币 '
        "
          :title="item.fileName"
          follow="0"
          :to="item.id"
          :file-item="item"/>
    </div>
    <div class="px-15 pt-10 text-15">
      {{ data.content }}
    </div>
    <div class="px-15 pt-10 pb-5">
      <div class="flex gap-5 flex-wrap" v-if="data.event != null || data.project != null">
        <TinyCard
            v-if="$router.currentRoute.value.params.type == 'info' || $router.currentRoute.value.params.type == 'exp'"
            :icon="data.event.icon"
            :cardname="data.event.eventName"/>
        <TinyCard
            v-else
            :icon="data.project.icon"
            :cardname="data.project.projectName"/>
      </div>
    </div>
    <div class="px-15 text-12 text-gray-500">
      {{ "发布于" + data.publishIp }}
    </div>
    <div class="px-15 py-10 flex justify-between">
      <span class="text-14 text-gray-600">{{
          "共 " + data.commentCount + " 评论"
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
        <Icon name="records-o" size="4vw"/>
        <div class="text-13">写评论...</div>
      </div>
      <div class="flex gap-5 items-center">
        <Icon name="comment-o" size="4vw" class="text-vant-t3"/>
        <div class="text-vant-t3 text-13">{{ data.commentCount }}</div>
      </div>
      <div class="flex gap-5 items-center" v-if="data.isLike == null" @click.stop="likeOn">
        <Icon name="good-job-o" size="4vw" class="text-vant-t3"/>
        <div class="text-vant-t3 text-13">{{ data.likeCount }}</div>
      </div>
      <div class="flex gap-5 items-center text-vant" v-if="data.isLike == true" @click.stop="likeOff">
        <Icon name="good-job-o" size="4vw"/>
        <div class="text-13">{{ data.likeCount }}</div>
      </div>
      <div class="flex gap-5 items-center">
        <Icon name="star-o" size="4vw" class="text-vant-t3"/>
        <div class="text-vant-t3 text-13">{{ data.starCount }}</div>
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
            :placeholder="'评论: '+data.user.userName"
            maxlength="400"
            type="textarea"
            show-word-limit
            class="grow"/>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import {Swipe, SwipeItem, Icon, Image, Button, Field, Popup, showToast} from "vant";
import TinyCard from "@/components/TinyCard.vue";
import Comment from "@/components/Comment.vue";
import LittleCard from "@/components/LittleCard.vue";
import {getInfo} from "@/api/info";
import {getResource} from "@/api/res";
import {comment, like, unLike} from "@/api/action";
import {ref, onMounted, getCurrentInstance} from "vue";
import {onBeforeRouteLeave, useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";

const commentRef = ref()
const userStore = useUserStore();
const router = useRouter();
var data: any = ref({
  id: "",
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
  typed: 0,
  eventId: "",
  event: {
    eventName: "",
    icon: "",
  },
  project: {
    projectName: "",
    icon: "",
  },
  infoSource: "",
  content: "",
  infoStatus: 0,
  viewCount: 0,
  likeCount: 0,
  starCount: 0,
  commentStatus: 0,
  commentCount: 0,
  hotCommentId: null,
  imageList: [],
  publishTime: "",
  publishIp: "",
});
const onBack = () => {
  router.back();
};
const showCommentPop = ref(false);
const commentText = ref("");
const infoDesc = ref("");
const dayjs = getCurrentInstance()?.appContext.config.globalProperties.$dayjs
const handleComment = () => {
  showCommentPop.value = true;
};
onBeforeRouteLeave((to, from) => {
  if (showCommentPop.value == true) {
    showCommentPop.value = false;
    return false;
  }
})
const iconBaseUrl = import.meta.env.VITE_ICON_URL;
onMounted(() => {
  if (router.currentRoute.value.params.type == "info" || router.currentRoute.value.params.type == "exp") {
    getInfo({targetId: router.currentRoute.value.params.id}).then((res) => {
      if (res.code == 200) {
        data.value = res.data;
        var auth = "暂未认证";
        if (data.value.user.realAuth != null) {
          auth = data.value.user.realAuth.campus + " " + data.value.user.realAuth.collage;
        }
        infoDesc.value = dayjs(data.value.publishTime).fromNow() + " " + auth;
      }
    });
  }
  if (router.currentRoute.value.params.type == "res") {
    getResource({resId: router.currentRoute.value.params.id}).then((res) => {
      if (res.code == 200) {
        data.value = res.data;
        var auth = "暂未认证";
        if (data.value.user.realAuth != null) {
          auth = data.value.user.realAuth.campus + " " + data.value.user.realAuth.collage;
        }
        infoDesc.value = dayjs(data.value.publishTime).fromNow() + " " + auth;
      }
    });
  }
});
const onComment = () => {
  var targetT = 0;
  switch (router.currentRoute.value.params.type) {
    case "info":
      targetT = 0;
      break;
    case 'exp':
      targetT = 1;
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
    replyUserId: null,
    replyCommentId: null,
  }).then((res) => {
    if (res.code == 200) {
      showCommentPop.value = false;
      showToast("评论成功");
      commentText.value = '';
      commentRef.value.reloadComment();
      data.value.commentCount++;
    }
  });
};
const likeOn = () => {
  let currentType = 0;
  switch (router.currentRoute.value.params.type) {
    case 'exp':
      currentType = 1;
      break;
    case 'res':
      currentType = 5;
      break;
  }
  like({
    targetId: router.currentRoute.value.params.id,
    typed: currentType
  }).then(res => {
    if (res.code == 200) {
      data.value.likeCount = res.data;
      data.value.isLike = true;
    }
  })
};
const likeOff = () => {
  let currentType = 0;
  switch (router.currentRoute.value.params.type) {
    case 'exp':
      currentType = 1;
      break;
    case 'res':
      currentType = 5;
      break;
  }
  unLike({
    targetId: router.currentRoute.value.params.id,
    typed: currentType
  }).then(res => {
    if (res.code == 200) {
      data.value.likeCount = res.data;
      data.value.isLike = null;
    }
  })
}
</script>

<style></style>
<style lang="scss" scoped>
.van-button {
  --van-button-small-height: 26px;
  margin-right: 20px;
}

.van-field {
  padding: 0px;
}

:deep(.van-swipe__indicators) {
  --van-swipe-indicator-inactive-background: gray;
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
