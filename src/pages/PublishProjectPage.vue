<template>
    <div class="flex flex-col">
      <Cell
        title="分类"
        is-link
        value="项目大类"
        @click="handleProjectPopup" />
      <Field
        v-model="nameText"
        label="项目名称"
        placeholder="请输入"
        input-align="right"
         />
      <Field
        v-model="bioText"
        label="项目简介"
        placeholder="请输入"
        input-align="right" />
      <Popup v-model:show="showProjectPopup" class="h-1/2" round position="bottom">
        <div class="flex flex-col p-15 gap-15">
          <div class="flex items-center justify-between gap-10">
            <Search
              class="grow"
              v-model="searchValue"
              placeholder="请输入事件关键词"
              @search="onSearch" />
            <Icon class="text-vant-t2" name="cross" size="5vw" @click="onClosePopup" />
          </div>
          <div class="flex flex-col gap-5">
            <div
              class="flex gap-10 items-center"
              v-for="a in [1, 1, 1, 1, 1]" @click="onSelectEvent">
              <Image
                src="./icon_pdf.png"
                fit="cover"
                class="size-40 rounded-[5px] overflow-hidden" />
              <div class="flex flex-col">
                <div class="text-15">考研</div>
                <div class="text-13 text-vant-t2">热度数据</div>
              </div>
              <div class="flex justify-end grow">
                <Icon class="text-vant-t2" name="arrow" size="5vw"  />
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  </template>

  <script setup lang="ts">
  import {
    Popup,
    Cell,
    Search,
    Field,
    Uploader,
    showToast,
    Icon,
    Image,
    type UploaderFileListItem,
    type UploaderInstance,
  } from "vant";
  import { ref, onMounted } from "vue";
  const nameText = ref("");
  const bioText = ref("");
  const searchValue = ref("");
  const onSelectEvent = () => {
    showProjectPopup.value = false;
    showToast('success')
  }
  const onClosePopup = () => {
    showProjectPopup.value = false;
  };
  const onSearch = () => {
    showToast("success");
  };
  const showProjectPopup = ref(false);
  const handleProjectPopup = () => {
    showProjectPopup.value = true;
  };
  </script>

  <style>
  .van-search {
    padding: 0px;
  }
  </style>
