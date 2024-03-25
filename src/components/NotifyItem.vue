<template>
  <div class="flex items-center" @click="handleClick">
    <Image :src="props.avatar" fit="cover" class="size-40 shrink-0" round />
    <div class="flex flex-col grow pl-10 w-0">
      <div class="flex grow justify-between items-center">
        <div class="text-15 truncate">{{ props.userName }}</div>
        <div class="shrink-0 text-12 text-vant-t2">{{ props.createTime }}</div>
      </div>
      <div v-if="dot" class="flex items-center">
        <div class="text-13 text-vant truncate">
          {{
            (props.gender == 0 ? "" : props.gender == 1 ? "男" : "女") +
            " " +
            props.bio
          }}
        </div>
        <div
          class="shrink-0 flex items-center justify-center text-12 bg-vant text-white rounded-[50%] size-14">
          {{ props.noRead }}
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="text-13 text-vant-t2 truncate">
          {{
            (props.gender == 0 ? "" : props.gender == 1 ? "男" : "女") +
            " " +
            props.bio
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Badge, Tag } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps<{
  type: string;
  id?: string;
  userName?: string;
  avatar?: string;
  bio?: string;
  gender?: number;
  createTime?: string;
  noRead?: string;
  dot?: boolean;
}>();
const handleClick = () => {
  if (props.type == "message") {
    router.push({
      path: "/message",
      query: { uid: "23123", nickname: "helloworld" },
    });
  } else if (props.type == "push") {
    router.push({
      path: "/message/push",
    });
  } else if (props.type == "user") {
    router.push({
      path: "/user/" + props.id,
    });
  }
};
</script>

<style scoped></style>
