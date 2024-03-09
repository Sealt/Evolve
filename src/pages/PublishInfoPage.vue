<template>
  <div class="flex flex-col">
    <Cell
      title="发布到"
      is-link
      value="更容易被看到"
      @click="handleEventPopup" />
    <Field
      v-model="textValue"
      placeholder="分享你的信息"
      type="textarea"
      :autosize="{ maxHeight: 200, minHeight: 150 }" />
    <Uploader
      ref="uploader"
      v-model="imgList"
      :after-read="afterRead"
      multiple
      :max-count="9"
      :max-size="1024 * 1024"
      @oversize="onOversize"
      @delete="imgDelete" />
    <Field
      v-model="sourceText"
      label="信息来源"
      placeholder="信息从何而来"
      input-align="right" />
    <Field
      v-model="scopeText"
      label="有效范围"
      placeholder="信息对哪些群体有效"
      input-align="right" />
    <Popup v-model:show="showEventPopup" class="h-1/2" round position="bottom">
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
const textValue = ref("");
const eventValue = ref("");
const sourceText = ref("");
const scopeText = ref("");
const searchValue = ref("");
const onSelectEvent = () => {
  showEventPopup.value = false;
  showToast('success')
}
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
const uploader = ref<UploaderInstance>();
const imgDelete = () => {
  if (uploader.value) {
    if (uploader.value.modelValue.length < 3) {
      uploader.value.$el.style["justifyContent"] = "flex-start";
      uploader.value.$el.style["paddingLeft"] = "15px";
    } else {
      uploader.value.$el.style["justifyContent"] = "center";
      uploader.value.$el.style["paddingLeft"] = "0px";
    }
  }
};

const imgList = ref<UploaderFileListItem[]>([]);
const afterRead = (file: any) => {
  if (uploader.value) {
    if (uploader.value.modelValue.length < 3) {
      uploader.value.$el.style["justifyContent"] = "flex-start";
      uploader.value.$el.style["paddingLeft"] = "15px";
    } else {
      uploader.value.$el.style["justifyContent"] = "center";
      uploader.value.$el.style["paddingLeft"] = "0px";
    }
  }

  if (file.length == null) {
    file.status = "uploading";
    file.message = "上传中...";

    setTimeout(() => {
      file.status = "failed";
      file.message = "上传失败";
    }, 1000);
  } else {
    file.forEach((element: any) => {
      element.status = "uploading";
      element.message = "上传中...";

      setTimeout(() => {
        element.status = "failed";
        element.message = "上传失败";
      }, 1000);
    });
  }
};
const onOversize = (file: any) => {
  console.log(file);
  showToast("文件大小不能超过 1mb");
};
</script>

<style>
:root {
  --van-uploader-size: 30vw;
  --van-uploader-delete-icon-size: 5vw;
}
.van-uploader {
  display: flex;
  justify-content: center;
  background: #fff;
  padding: 10px 0px;
}
.van-uploader__wrapper {
  display: grid;
  grid-template-columns: min-content min-content min-content;
  justify-items: center;
  align-items: center;
  gap: 5px;
}
.van-uploader__preview,
.van-uploader__upload {
  margin: 0;
  overflow: hidden;
  border-radius: 10px;
}
.van-uploader__preview-delete {
  top: 2px;
  right: 2px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.van-uploader__preview-delete--shadow {
  border-radius: 100%;
}
.van-uploader__preview-delete-icon {
  font-size: 3vw;
  position: static;
  transform: none;
}
.van-search {
  padding: 0px;
}
</style>
