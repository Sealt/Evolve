<template>
  <div class="flex items-center" @click.stop="clickOn(item.typed)">
    <Image :src="item.user.avatar" fit="cover" class="size-40 shrink-0" round />
    <div class="flex flex-col grow pl-10 w-0">
      <div class="flex grow justify-between items-center">
        <div class="flex gap-5 items-center" v-if="item.isRead == 1">
          <div class="text-15 truncate">{{ item.user.userName }}</div>
          <div class="text-13 text-vant-t3">
            {{ "赞了你的" + typeTextOn(item.typed) }}
          </div>
        </div>
        <div class="flex gap-5 items-center text-vant" v-else>
          <div class="text-15 truncate">{{ item.user.userName }}</div>
          <div class="text-13">
            {{ "赞了你的" + typeTextOn(item.typed) }}
          </div>
        </div>
      </div>
      <div class="shrink-0 text-12 text-vant-t2">
        {{ dayjs(item.createTime).fromNow() }}
      </div>
    </div>
    <div class="justify-end w-40 text-10 text-vant-t2 line-clamp-3">
      {{ "目标实体信息简略展示TODO" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Badge, Tag, showToast } from "vant";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const dayjs = getCurrentInstance()?.appContext.config.globalProperties.$dayjs;
const router = useRouter();
const props = defineProps<{
  item: any;
}>();
const typeTextOn = (item: any) => {
  switch (item) {
    case 0:
      return "信息";
      break;
    case 1:
      return "经验";
      break;
    case 3:
      return "节点";
      break;
    case 5:
      return "资源";
      break;
    case 6:
      return "评论";
      break;
  }
};
const clickOn = (item: any) => {
  switch (item) {
    case 0:
      router.push("/post/info/" + props.item.targetId);
      break;
    case 1:
      router.push("/post/exp/" + props.item.targetId);
      break;
    case 3:
      router.push("/post/node/" + props.item.targetId);
      break;
    case 5:
      router.push("/post/res/" + props.item.targetId);
      break;
    case 6:
      break;
  }
};
</script>

<style scoped></style>
