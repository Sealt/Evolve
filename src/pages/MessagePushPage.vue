<template>
  <div class="flex flex-col h-screen">
    <NavBar
      title="推送消息"
      left-arrow
      @click-left="router.back()"
      fixed
      class="shrink-0"
      placeholder />
      <Loading class="pt-20 bg-vant-n2" v-if="loadStatus" vertical>加载中</Loading>
    <div class="flex flex-col grow bg-vant-n2 p-10 gap-10"
    v-if="notifyData.length != 0 && loadStatus == false">
      <div
        class="flex flex-col bg-white p-10 rounded-[10px] gap-5"
        v-for="item in notifyData">
        <div class="text-15">
          <span class="text-vant">{{
            item.eventName ? item.eventName : item.projectName
          }}</span>
          <span>{{ item.eventName ? " 有新的节点" : " 有新的资源" }}</span>
        </div>
        <div class="text-14">
          {{ item.eventName ? item.content : item.fileName }}
        </div>
        <div class="text-13 text-vant-t2">
          {{ dayjs(item.createTime).fromNow() }}
        </div>
      </div>
    </div>
    <Empty
      v-if="notifyData.length == 0 && loadStatus == false"
      description="这里空空如也" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar,Loading,Empty } from "vant";
import { ref, onMounted } from "vue";
import { getSubscribe } from "@/api/notify";
import dayjs from "dayjs";
const router = useRouter();
const notifyData: any = ref([]);
const loadStatus = ref(true);

onMounted(() => {
  getSubscribe().then((res) => {
    loadStatus.value = false;
    if (res.code == 200){
      notifyData.value = res.data;
    }

  });
});
</script>

<style scoped></style>
