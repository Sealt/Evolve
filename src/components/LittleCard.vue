<template>
  <div @click.stop="handleClick" class="card">
    <div class="card-image">
      <Image :src="image" fit="cover" class="image" />
    </div>
    <div class="card-content">
      <div class="card-content__title">{{ title }}</div>
      <div class="card-content__detail">
        <Icon
          v-if="hot == '1'"
          name="fire-o"
          class="text-red-500 mr-4"
          size="4vw"
           />
        <div class="card-content__detail-wrapper">{{ detail }}</div>
      </div>
    </div>
    <div class="card-button">
      <Tag v-show="follow == '1'" type="primary" size="medium" round
        >已关注</Tag
      >
      <Tag v-show="type == 'res'" type="success" size="medium" round>获取</Tag>
    </div>
    <Popup
    class="h-1/3"
    v-model:show="showResPopup"
    position="bottom"
    round
    closeable
    teleport="body">
    <div class="flex m-15 flex-col gap-10">
      <div>资源详情</div>
      <div class="flex">
        <Tag class="mr-10 w-60 justify-center h-21 shrink-0" type="primary">资源名</Tag>
        <div class="text-14 break-all">高等数学一-23-24-Z-真题.pdf156184551516518</div>
      </div>
      <div class="flex">
        <Tag class="mr-10 w-60 justify-center h-21 shrink-0" type="primary">作者</Tag>
        <div class="text-14">计科211史诗琪</div>
      </div>
      <div class="flex">
        <Tag class="mr-10 w-60 justify-center h-21 shrink-0" type="primary">获取方式</Tag>
        <div class="text-14 break-all">微信公众号江理一起来学资料557387278578278578278282785278578578578578278278278578库微信公众号江理一起来学资料库微信公众号江理一起来学资料库微信公众号江理一起来学资料库</div>
      </div>
    </div>
  </Popup>
  </div>

</template>

<script setup lang="ts">
import { Image, Icon, Tag, Popup } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const props = defineProps<{
  type?: string;
  image?: string;
  title?: string;
  detail?: string;
  hot?: string;
  follow?: string;
  to?: string;
}>();
const showResPopup = ref(false);

const handleClick = () => {
  if (props.type == "event") {
    router.push("/event/" + props.to);
  } if (props.type == "project") {
    router.push("/project/" + props.to);
  }else {
    showResPopup.value = true;
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  box-sizing: content-box;
  height: 40px;
  background-color: white;
  padding: 10px;
  border: 1px solid #f2f3f5;
  border-radius: 5px;
  .card-image {
    width: 40px;
    height: 40px;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    overflow: hidden;
    flex-shrink: 0;
    .image {
      width: 40px;
      height: 40px;
    }
  }
  .card-content {
    display: flex;
    min-width: 100px;
    max-width: 220px;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    .card-content__title {
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-content__detail {
      display: flex;
      align-items: center;
      .card-content__detail-wrapper {
        display: inline-block;
        font-size: 12px;
        color: gray;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .card-button {
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-end;
  }
}
.card:active {
  background-color: #ebedf0;
}
</style>
