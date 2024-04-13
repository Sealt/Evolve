<template>
  <div class="infocard bg-white rounded-[10px]" @click="cardOnClick">
    <div class="flex flex-col pt-10 px-10 gap-10">
      <div class="flex h-[35px] box-content">
        <div class="flex items-center">
          <Image
            :src="info.user.avatar"
            fit="cover"
            class="size-[32px]"
            round />
        </div>
        <div class="flex flex-col justify-between ml-10 shrink-0">
          <div class="text-[14px]">{{ info.user.userName }}</div>
          <div class="text-vant-t2 text-[10px]">
            {{
              info.infoSource +
              " " +
              info.user.realAuth.campus +
              " " +
              info.user.realAuth.collage
            }}
          </div>
        </div>
        <div class="flex justify-end self-center w-full">
          <div v-if="HotIndex == '01'" class="gap-3 flex items-center mr-5">
            <Icon name="fire-o" size="4vw" class="inline text-red-600" />
            <div class="text-red-600 font-bold italic inline-flex text-14">
              {{ HotIndex }}
            </div>
          </div>
          <div
            v-else-if="HotIndex == '02'"
            class="gap-3 flex items-center mr-5">
            <Icon name="fire-o" size="4vw" class="inline text-orange-500" />
            <div class="text-orange-600 font-bold italic inline-flex text-14">
              {{ HotIndex }}
            </div>
          </div>
          <div
            v-else-if="HotIndex == '03'"
            class="gap-3 flex items-center mr-5">
            <Icon name="fire-o" size="4vw" class="inline text-amber-500" />
            <div class="text-amber-600 font-bold italic inline-flex text-14">
              {{ HotIndex }}
            </div>
          </div>
          <div
            v-else-if="HotIndex != null"
            class="gap-3 flex items-center mr-5">
            <Icon name="fire-o" size="4vw" class="inline text-gray-500" />
            <div class="text-gray-600 font-bold italic inline-flex text-14">
              {{ HotIndex }}
            </div>
          </div>
          <div v-els class="flex justify-center items-center size-[32px]">
            <Icon e name="arrow-down" @click.stop="actionOn" />
          </div>
        </div>
      </div>
      <LittleCard
        v-for="item in info.fileList"
        class="mb-10 mt-5"
        type="res"
        image="./icon_pdf.png"
        hot="0"
        detail="1568下载 4积分 2金币66666666666666666666666666666"
        title="高等数学一-23-24-Z-真题.pdf111111111111"
        follow="0"
        to="125153" />
      <div class="text-[15px]">{{ info.content }}</div>
      <div
        v-show="info.imageList.length"
        class="grid grid-cols-3 gap-4 overflow-hidden rounded-[5px]">
        <Image
          v-for="image in info.imageList"
          :src="image"
          fit="cover"
          radius="0"
          class="min-h-[28vw] min-w-[28vw]" />
      </div>
      <div class="flex gap-5 flex-wrap">
        <TinyCard :icon="info.event.icon" :cardname="info.event.eventName" />
      </div>
      <HotCommentCard v-show="info.hotCommentId" />
    </div>
    <div class="flex justify-around">
      <div class="flex items-center gap-5 p-10 text-15 text-gray-500">
        <Icon name="share-o" size="5vw" color="gray" />
        <div>{{ info.starCount }}</div>
      </div>
      <div class="flex items-center gap-5 p-10 text-15 text-gray-500">
        <Icon name="comment-o" size="5vw" color="gray" />
        <div>{{ info.commentCount }}</div>
      </div>
      <div class="flex items-center gap-5 p-10 text-15 text-gray-500">
        <Icon name="good-job-o" size="5vw" color="gray" @click.stop="likeOn" />
        <div>{{ info.likeCount }}</div>
      </div>
    </div>
    <ActionSheet
      v-model:show="showInfoAction"
      :actions="infoActions"
      cancel-text="取消"
      close-on-click-action
      teleport=".CurrentView"
      @cancel="actionOnCancel" />
  </div>
</template>

<script setup lang="ts">
import { Image, Button, Icon, ActionSheet } from "vant";
import TinyCard from "./TinyCard.vue";
import HotCommentCard from "./HotCommentCard.vue";
import LittleCard from "./LittleCard.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const showInfoAction = ref(false);
const infoActions = [{ name: "1" }, { name: "2" }];
const actionOnCancel = () => {};
const actionOn = () => {
  showInfoAction.value = true;
};
const likeOn = () => {
  alert("gaag");
};
const props = defineProps<{
  info: any;
  HotIndex?: string;
}>();

const cardOnClick = () => {
  router.push("/info/" + props.info.id);
};
</script>

<style lang="scss" scoped></style>
