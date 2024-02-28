<template>
  <div class="infocard">
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
        <Icon name="arrow-down" class="action" />
      </div>
    </div>
    <div class="infocard-content">
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
      <div class="flex justify-around m-10">
        <div class="flex items-center gap-5 text-15 text-gray-500 active:bg-vant-n3">
          <Icon name="share-o" size="20" color="gray" />
          <div>18</div>
        </div>
        <div class="flex items-center gap-5 text-15 text-gray-500">
          <Icon name="comment-o" size="20" color="gray" />
          <div>18</div>
        </div>
        <div class="flex items-center gap-5 text-15 text-gray-500">
          <Icon name="good-job-o" size="20" color="gray" />
          <div>18</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Button, Icon } from "vant";
import TinyCard from "./TinyCard.vue";
import HotCommentCard from "./HotCommentCard.vue";
</script>

<style lang="scss" scoped>
.infocard {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  margin: 5px;
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
      display: flex;
      flex-wrap: wrap;
      border-radius: 5px;
      overflow: hidden;
      gap: 3px;
      margin: 10px 0px;
      .content-image {
        height: 30vw;
        width: 30vw;
      }
    }
  }
}
</style>
