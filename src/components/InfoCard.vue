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
              infoDesc
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
      <div v-show="type == 'res'" class="flex flex-col gap-5">
        <LittleCard
          v-for="item in info.fileList"
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
          :file-item="item" />
      </div>
      <div class="text-[15px]">{{ info.content }}</div>
      <div
        v-show="info.imageList.length == 1"
        class="flex w-fit overflow-hidden rounded-[5px]">
        <Image
          :src="info.imageList[0]"
          fit="cover"
          radius="0"
          class="min-h-[28vw] min-w-[28vw] max-w-[25vh]" />
      </div>
      <div
        v-show="info.imageList.length >= 2"
        class="grid imageGrid gap-4 overflow-hidden rounded-[5px]">
        <Image
          v-for="image in info.imageList"
          :src="image"
          fit="cover"
          radius="0"
          class="min-h-[28vw] min-w-[28vw] max-h-[20vh]" />
      </div>
      <div class="flex gap-5 flex-wrap">
        <TinyCard
          v-if="type == 'info'"
          :icon="info.event.icon"
          :cardname="info.event.eventName" />
        <TinyCard
          v-else
          :icon="info.project.icon"
          :cardname="info.project.projectName" />
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

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const showInfoAction = ref(false);
const infoActions = [{ name: "1" }, { name: "2" }];
const iconBaseUrl = import.meta.env.VITE_ICON_URL;
const imageLength = ref(3);
const infoDesc = ref("");
const actionOnCancel = () => {};
const actionOn = () => {
  showInfoAction.value = true;
};
const likeOn = () => {
  alert("gaag");
};
const props = defineProps<{
  info?: any;
  from?: string;
  type?: string;
  HotIndex?: string;
}>();

const cardOnClick = () => {
  router.push("/post/" + props.type + "/" + props.info.id);
};
onMounted(() => {
  if (props.info.imageList.length == 2) {
    imageLength.value = 2;
  } else if (props.info.imageList.length >= 3) {
    imageLength.value = 3;
  }
  var from = ''
  if (props.from != null) {
    from = props.from;
  }
  var auth = '暂未认证'
  if (props.info.user.realAuth != null) {
    auth = props.info.user.realAuth.campus + ' '+props.info.user.realAuth.collage;
  }
  infoDesc.value = from + auth;
});
</script>

<style lang="scss" scoped>
.imageGrid {
  grid-template-columns: repeat(v-bind(imageLength), minmax(0, 1fr));
}
</style>
