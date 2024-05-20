<template>
  <div
      @click="handleClick"
      class="flex flex-col bg-white rounded-[10px] p-10 gap-5 relative">
    <div class="absolute -left-26">
      <Icon class="text-vant" name="circle" size="4vw"/>
    </div>
    <div class="flex justify-between">
      <div class="text-15">{{ node.title }}</div>
      <Tag v-if="dayjs().isBetween(node.startTime,dayjs(node.endTime))" type="primary">进行中</Tag>
      <Tag v-if="dayjs().isBefore(node.startTime)" type="success">未开始</Tag>
      <Tag v-if="dayjs().isAfter(node.endTime)" plain >已结束</Tag>
    </div>
    <div class="text-14">{{ node.startTime + " - " + node.endTime }}</div>
    <div class="flex gap-5">
      <Tag plain type="primary">{{ "信息 "+node.targetIds?.infos.length }}</Tag>
      <Tag plain type="primary">{{ "经验 "+node.targetIds?.exps.length }}</Tag>
      <Tag plain type="primary">{{ "资源 "+node.targetIds?.resources.length }}</Tag>
    </div>
    <div class="flex gap-5 items-center justify-end">
      <div class="flex gap-5 items-center" v-if="node.isLike == null" @click.stop="likeOn(node.id)">
        <Icon class="text-gray-500" name="good-job-o" size="4vw"/>
        <span
            class="text-13 text-gray-500 pr-5"
        >{{ node.likeCount }}</span
        >
      </div>
      <div class="flex gap-5 items-center text-vant" v-if="node.isLike == true" @click.stop="likeOff(node.id)">
        <Icon name="good-job-o" size="4vw"/>
        <span
            class="text-13 pr-5"
        >{{ node.likeCount }}</span
        >
      </div>
      <div class="flex gap-5 items-center">
        <Icon class="text-gray-500" name="comment-o" size="4vw"/>
        <span
            class="text-13 text-gray-500"
        >{{ node.commentCount }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Tag, Icon} from "vant";
import {useRouter} from "vue-router";
import { getCurrentInstance } from 'vue'
import {like, unLike} from "@/api/action";
const dayjs = getCurrentInstance()?.appContext.config.globalProperties.$dayjs;
const router = useRouter();
const props = defineProps<{
  node?: any;
}>();
const likeOn = (nodeId: any) => {
  like({
    targetId: nodeId,
    typed: 3
  }).then(res => {
    if (res.code == 200) {
      props.node.likeCount = res.data;
      props.node.isLike = true;
    }
  })
};
const likeOff = (nodeId: any) => {
  unLike({
    targetId: nodeId,
    typed: 3
  }).then(res => {
    if (res.code == 200) {
      props.node.likeCount = res.data;
      props.node.isLike = null;
    }
  })
}
const handleClick = () => {
  router.push("/node/" + props.node.id);
};
</script>

<style scoped></style>
