<template>
  <div @click="handleClick" class="card">
    <div class="card-image">
      <Image :src="image" fit="cover" class="image"/>
    </div>
    <div class="card-content">
      <div class="card-content__title">{{ title }}</div>
      <div class="card-content__detail">
        <Icon v-if="hot=='1'" name="fire-o" style="color: red" size="14px" />
        <div class="card-content__detail-wrapper">{{ detail }}</div>
      </div>
    </div>
    <div class="card-button">
        <Tag v-show="follow == '1'" type="primary" size="medium" round>已关注</Tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Icon, Tag } from "vant";
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const props = defineProps<{
  image?: string;
  title?: string;
  detail?: string;
  hot?: string;
  follow?: string;
  to?: string;
}>();
const handleClick = () => { router.push('/event/'+props.to)}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  box-sizing: content-box;
  height: 40px;
  background-color: white;
  margin: 5px;
  padding: 10px;
  border: 1px solid whitesmoke;
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
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    .card-content__title {
      font-size: 15px;
    }
    .card-content__detail {
      display: flex;
      align-items: center;
      .card-content__detail-wrapper {
        margin-left: 4px;
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
  background-color: #dcdee0;
}
</style>
