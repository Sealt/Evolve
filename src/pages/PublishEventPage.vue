<template>
  <div class="flex flex-col">
    <Cell
      title="分类"
      is-link
      :value="eventLargeId == '' ? '选择事件类目' : eventLargeValue"
      @click="handleEventPopup" />
    <Field
      v-model="nameText"
      label="事件名称"
      placeholder="请输入"
      input-align="right" />
    <Field
      v-model="bioText"
      label="事件简介"
      placeholder="请输入"
      input-align="right" />
      <div class="text-gray-500 text-13 p-15">
      新建事件需要管理员权限
    </div>
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
              <div class="text-15">{{ item.largeName }}</div>
              <div class="text-13 text-vant-t2">{{ item.largeDesc }}</div>
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
import { pubEvent, getTargetList } from "@/api/publish";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const targetList: any = ref([]);
const eventLargeId = ref("");
const eventLargeValue = ref("");
const nameText = ref("");
const bioText = ref("");
const searchValue = ref("");

const onPublish = () => {
  var data: any = {
    userId: userStore.userId,
    largeId: eventLargeId.value,
    eventName: nameText.value,
    eventDesc: bioText.value,
  };
  pubEvent(data).then((res) => {
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
  eventLargeId.value = item.id;
  eventLargeValue.value = item.largeName;
};
const onClosePopup = () => {
  showEventPopup.value = false;
};
const onSearch = () => {
  getTargetList({ typed: 3, query: searchValue.value }).then((res) => {
    if (res.code == 200) {
      targetList.value = res.data;
    }
  });
};
const showEventPopup = ref(false);
const handleEventPopup = () => {
  showEventPopup.value = true;
  getTargetList({ typed: 3, query: searchValue.value }).then((res) => {
    if (res.code == 200) {
      targetList.value = res.data;
    }
  });
};
</script>

<style>
.van-search {
  padding: 0px;
}
</style>
