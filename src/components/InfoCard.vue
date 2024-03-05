<template>
  <div class="infocard" @click="cardOnClick">
    <div class="infocard-header">
      <div class="infocard-header__avator">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="image"
          round />
      </div>
      <div class="infocard-header__user">
        <div class="nickname">春风Benin</div>
        <div class="detail">来自头条推荐 南昌·信息工程学院</div>
      </div>
      <div class="infocard-header__action">
        <div v-if="HotIndex == '01'" class="gap-3 flex items-center mr-5">
          <Icon name="fire-o" size="4vw" class="inline text-red-600"/>
          <div class="text-red-600 font-bold italic inline-flex text-14">{{ HotIndex }}</div>
        </div>
        <div v-else-if="HotIndex == '02'" class="gap-3 flex items-center mr-5">
          <Icon name="fire-o" size="4vw" class="inline text-orange-500"/>
          <div class="text-orange-600 font-bold italic inline-flex text-14">{{ HotIndex }}</div>
        </div>
        <div v-else-if="HotIndex == '03'" class="gap-3 flex items-center mr-5">
          <Icon name="fire-o" size="4vw" class="inline text-amber-500"/>
          <div class="text-amber-600 font-bold italic inline-flex text-14">{{ HotIndex }}</div>
        </div>
        <div v-else-if="HotIndex != null" class="gap-3 flex items-center mr-5">
          <Icon name="fire-o" size="4vw" class="inline text-gray-500"/>
          <div class="text-gray-600 font-bold italic inline-flex text-14">{{ HotIndex }}</div>
        </div>
        <Icon v-else name="arrow-down" class="action" @click.stop="actionOn" />
      </div>
    </div>
    <div class="infocard-content">
      <LittleCard
        class="mb-10 mt-5"
        type="res"
        image="./icon_pdf.png"
        hot="0"
        detail="1568下载 4积分 2金币66666666666666666666666666666"
        title="高等数学一-23-24-Z-真题.pdf111111111111"
        follow="0"
        to="125153" />
      <div class="infocard-content__text">我就是普普通通的内容</div>
      <div class="infocard-content__image">
        <Image
          v-for="image in [1, 1, 1, 1, 1, 1, 1, 1]"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          radius="0"
          class="content-image" />
      </div>
      <div class="infocard-content__related">
        <TinyCard /><TinyCard /><TinyCard /><TinyCard />
      </div>
    </div>
    <div class="infocard-footer">
      <HotCommentCard />
      <div class="flex justify-around">
        <div class="flex items-center gap-5 p-10 text-15 text-gray-500">
          <Icon name="share-o" size="5vw" color="gray" />
          <div>18</div>
        </div>
        <div class="flex items-center gap-5 p-10 text-15 text-gray-500">
          <Icon name="comment-o" size="5vw" color="gray" />
          <div>18</div>
        </div>
        <div class="flex items-center gap-5 p-10 text-15 text-gray-500">
          <Icon name="good-job-o" size="5vw" color="gray" @click.stop="likeOn" />
          <div>18</div>
        </div>
      </div>
    </div>
    <ActionSheet
      v-model:show="showInfoAction"
      :actions="infoActions"
      cancel-text="取消"
      close-on-click-action
      teleport=".InfoView"
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
const props = defineProps<{ to: string; HotIndex: string }>();

const cardOnClick = () => {
  router.push("/info/" + props.to);
};
</script>

<style lang="scss" scoped>
.infocard {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  .infocard-header {
    display: flex;
    padding: 10px;
    box-sizing: content-box;
    height: 35px;

    .infocard-header__avator {
      display: flex;
      align-items: center;
    }
    .image {
      width: 32px;
      height: 32px;
    }
    .infocard-header__user {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      flex-shrink: 0;

      .nickname {
        font-size: 14px;
      }
      .detail {
        font-size: 10px;
        color: gray;
      }
    }
    .infocard-header__action {
      display: flex;
      justify-content: flex-end;
      align-self: center;
      width: 100%;
      .action {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
      }
      .action:active {
        background-color: whitesmoke;
      }
    }
  }
  .infocard-content {
    margin: 0px 10px;
    .infocard-content__text {
      font-size: 15px;
    }
    .infocard-content__image {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(100px,1fr));
      border-radius: 5px;
      overflow: hidden;
      grid-gap: 3px;
      margin: 10px 0px;
      .content-image {
        min-height: 28vw;
        min-width: 28vw;
      }
    }
  }
}
</style>
