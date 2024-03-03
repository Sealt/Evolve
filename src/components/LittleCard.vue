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
          size="14px" />
        <div class="card-content__detail-wrapper">{{ detail }}</div>
      </div>
    </div>
    <div class="card-button">
      <Tag v-show="follow == '1'" type="primary" size="medium" round
        >已关注</Tag
      >
      <Tag v-show="type == 'res'" type="success" size="medium" round>获取</Tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Icon, Tag } from "vant";
import { useRouter } from "vue-router";
import { ref,onMounted } from "vue";
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

onMounted(()=>{
})

const handleClick = () => {
  if (props.type == "event") router.push("/event/" + props.to);
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
