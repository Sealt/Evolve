<template>
  <div class="flex flex-col">
    <Cell
      title="事件"
      is-link
      value="请选择节点所属事件"
      @click="handleEventPopup" />
    <Field
      v-model="nameText"
      label="节点内容"
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
    <Popup v-model:show="showEventPopup" class="h-1/2" round position="bottom">
      <div class="flex flex-col p-15 gap-15">
        <div class="flex items-center justify-between gap-10">
          <Search
            class="grow"
            v-model="searchValue"
            placeholder="搜索"
            @search="onSearch" />
          <Icon
            class="text-vant-t2"
            name="cross"
            size="5vw"
            @click="onClosePopup" />
        </div>
        <div class="flex flex-col gap-5">
          <div
            class="flex gap-10 items-center"
            v-for="a in [1, 1, 1, 1, 1]"
            @click="onSelectEvent">
            <Image
              src="./icon_pdf.png"
              fit="cover"
              class="size-40 rounded-[5px] overflow-hidden" />

            <div class="flex flex-col">
              <div class="text-15">考研</div>
              <div class="text-13 text-vant-t2">热度数据</div>
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
const nameText = ref("");
const startTime = ref("");
const endTime = ref("");
const searchValue = ref("");
const onSelectEvent = () => {
  showEventPopup.value = false;
  showToast("success");
};
const onClosePopup = () => {
  showEventPopup.value = false;
};
const onSearch = () => {
  showToast("success");
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
