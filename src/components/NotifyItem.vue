<template>
  <div class="flex items-center" @click="handleClick">
    <div class="flex size-40 items-center justify-center" v-if="icon == 'more'">
      <Icon :name="icon" :class="iconClass" size="11vw" />
    </div>
    <Image
      :src="avatar"
      fit="cover"
      class="size-40 shrink-0"
      round
      v-if="icon != 'more'" />
    <div class="flex flex-col grow pl-10 w-0" v-if="type == 'user_list'">
      <div class="flex grow justify-between items-center">
        <div class="text-15 truncate">{{ userName }}</div>
        <div class="shrink-0 text-12 text-vant-t2">
          {{ dayjs(createTime).fromNow() }}
        </div>
      </div>
      <div v-if="dot" class="flex items-center">
        <div class="text-13 text-vant truncate">
          {{ (gender == "0" ? "" : gender == "1" ? "男" : "女") + " " + bio }}
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="text-13 text-vant-t2 truncate">
          {{
            (gender == "0" ? "" : gender == "1" ? "男" : "女") +
            " " +
            (bio != null ? bio : "用户简介")
          }}
        </div>
      </div>
    </div>

    <div class="flex flex-col grow pl-10 w-0" v-if="type == 'user_notify'">
      <div class="flex grow justify-between items-center">
        <div class="text-15 truncate">{{ userName }}</div>
        <div class="shrink-0 text-12 text-vant-t2">
          {{ dayjs(createTime).fromNow() }}
        </div>
      </div>
      <div v-if="dot" class="flex items-center">
        <div class="text-13 text-vant truncate">
          {{ "关注了你" }}
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="text-13 text-vant-t2 truncate">
          {{ "关注了你" }}
        </div>
      </div>
    </div>

    <div class="flex flex-col grow pl-10 w-0" v-if="type == 'comment'">
      <div class="flex grow justify-between items-center">
        <div class="text-15 truncate">{{ userName }}</div>
        <div class="shrink-0 text-12 text-vant-t2">
          {{ dayjs(createTime).fromNow() }}
        </div>
      </div>
      <div v-if="dot" class="flex items-center">
        <div class="text-13 text-vant truncate">
          {{ "回复了你的" + typeText + "：" + content }}
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="text-13 text-vant-t2 truncate">
          {{ "回复了你的" + typeText + "：" + content }}
        </div>
      </div>
    </div>

    <div class="flex flex-col grow pl-10 w-0" v-if="type == 'push'">
      <div class="flex grow justify-between items-center">
        <div class="text-15 truncate">{{ userName }}</div>
        <div class="shrink-0 text-12 text-vant-t2">
          {{ dayjs(createTime).fromNow() }}
        </div>
      </div>
      <div v-if="dot" class="flex items-center justify-between">
        <div class="text-13 text-vant truncate">
          {{ content }}
        </div>
        <div
          class="shrink-0 flex items-center justify-center text-12 bg-vant text-white rounded-[50%] size-14">
          {{ noRead }}
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="text-13 text-vant-t2 truncate">
          {{ content }}
        </div>
      </div>
    </div>

    <div class="flex flex-col grow pl-10 w-0" v-if="type == 'chat'">
      <div class="flex grow justify-between items-center">
        <div class="text-15 truncate">{{ userName }}</div>
        <div class="shrink-0 text-12 text-vant-t2">
          {{ dayjs(createTime).fromNow() }}
        </div>
      </div>
      <div v-if="dot" class="flex items-center justify-between">
        <div class="text-13 text-vant truncate">
          {{ content }}
        </div>
        <div
          class="shrink-0 flex items-center justify-center text-12 bg-vant text-white rounded-[50%] size-14">
          {{ noRead }}
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="text-13 text-vant-t2 truncate">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Badge, Icon, showToast } from "vant";
import { useRouter } from "vue-router";
import { getCurrentInstance, onMounted } from "vue";
import { checkComment } from "@/api/notify";
const router = useRouter();
const dayjs = getCurrentInstance()?.appContext.config.globalProperties.$dayjs;
const props = defineProps<{
  type: string;
  notifyId?: string;
  jumpId?: string;
  jumpType?: number;
  userName?: string;
  avatar?: string;
  bio?: string;
  content?: string;
  gender?: string;
  createTime?: string;
  noRead?: string;
  dot?: boolean;
  icon?: string;
  iconClass?: string;
  typeText?: string;
}>();
const emits = defineEmits(["check"]);
const handleClick = () => {
  if (props.dot && props.type == 'comment') {
    emits("check", props.notifyId);
  }
  if (props.dot && props.type == 'push') {
    emits("check", props.userName);
  }
  if (props.type == "chat") {
    router.push({
      path: "/message",
      query: { userid: props.jumpId, username: props.userName },
    });
  } else if (props.type == "push") {
    router.push({
      path: "/message/push",
    });
  } else if (props.type == "user_notify" || props.type == "user_list") {
    router.push({
      path: "/user/" + props.jumpId,
    });
  } else if (props.type == "comment") {
    if (props.jumpType == 0) {
      router.push("/post/info/" + props.jumpId);
    }
    if (props.jumpType == 1) {
      router.push("/post/exp/" + props.jumpId);
    }
    if (props.jumpType == 3) {
      router.push("/node/" + props.jumpId);
    }
    if (props.jumpType == 5) {
      router.push("/post/res/" + props.jumpId);
    }
    checkComment({ notifyId: props.notifyId });
  }
};
</script>

<style scoped></style>
