<template>
  <div class="flex flex-col">
    <Cell
      title="事件"
      is-link
      :value="eventId == '' ? '选择事件' : eventValue"
      @click="handleEventPopup" />
    <Field
      v-model="nameText"
      label="节点标题"
      placeholder="请输入"
      input-align="right" />
    <Field
      v-model="startTime"
      label="起始时间"
      placeholder="2024-00-00 00:00:00"
      input-align="right" />
    <Field
      v-model="endTime"
      label="终止时间"
      placeholder="2024-00-00 00:00:00"
      input-align="right" />
    <Field
      v-model="commentText"
      label="备注"
      placeholder="补充和说明"
      input-align="right" />
    <Popup v-model:show="showEventPopup" class="h-1/2" round position="bottom">
      <div class="flex flex-col p-15 gap-15">
        <div class="flex items-center justify-between gap-10">
          <Search
            class="grow"
            v-model="searchValue"
            placeholder="搜索"
            @update:model-value="onSearch" />
          <Icon
            class="text-vant-t2"
            name="cross"
            size="5vw"
            @click="onClosePopup" />
        </div>
        <div class="flex flex-col gap-5">
          <div
            class="flex gap-10 items-center"
            v-for="item in targetList"
            @click="onSelectEvent(item)">
            <Image
              :src="item.icon"
              fit="cover"
              class="size-40 rounded-[5px] overflow-hidden" />
            <div class="flex flex-col">
              <div class="text-15">{{ item.eventName }}</div>
              <div class="text-13 text-vant-t2">
                {{ item.hotIndex + " & " + item.discussCount }}
              </div>
            </div>
            <div class="flex justify-end grow">
              <Icon class="text-vant-t2" name="arrow" size="5vw" />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { Popup, Cell, Search, Field, showToast, Icon, Image } from "vant";
import { ref, onMounted } from "vue";
import { pubNode, getTargetList } from "@/api/publish";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const targetList: any = ref([]);
const eventId = ref("");
const eventValue = ref("");
const nameText = ref("");
const startTime = ref("");
const endTime = ref("");
const searchValue = ref("");
const commentText = ref("");

const onPublish = () => {
  var data: any = {
    userId: userStore.userId,
    eventId: eventId.value,
    title: nameText.value,
    content: commentText.value,
    startTime: startTime.value,
    endTime: endTime.value,
  };
  pubNode(data).then((res) => {
    if (res.code == 200) {
      showToast("发表成功");
      router.back();
    } else {
      showToast("发表失败");
    }
  });
};
defineExpose({
  onPublish,
});

const onSelectEvent = (item: any) => {
  showEventPopup.value = false;
  eventId.value = item.id;
  eventValue.value = item.eventName;
  showToast("success");
};
const onClosePopup = () => {
  showEventPopup.value = false;
};
const onSearch = () => {
  getTargetList({ typed: 1, query: searchValue.value }).then((res) => {
    if (res.code == 200) {
      targetList.value = res.data;
      showToast("success");
    }
  });
};
const showEventPopup = ref(false);
const handleEventPopup = () => {
  showEventPopup.value = true;
};
</script>

<style>
.van-search {
  padding: 0px;
}
</style>
