<template>
  <div class="flex flex-col">
    <Cell title="发布到" is-link value="更容易被看到" />
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
  </div>
</template>

<script setup lang="ts">
import {
  CellGroup,
  Cell,
  Picker,
  Field,
  Uploader,
  showToast,
  type UploaderFileListItem,
} from "vant";
import { ref, onMounted } from "vue";
const textValue = ref("");
const eventValue = ref("");
const sourceText = ref("");
const scopeText = ref("");
const uploader = ref(null);
const imgDelete = () => {
  if (uploader.value.modelValue.length < 3) {
    uploader.value.$el.style["justifyContent"] = "flex-start";
    uploader.value.$el.style["paddingLeft"] = "15px";
  } else {
    uploader.value.$el.style["justifyContent"] = "center";
    uploader.value.$el.style["paddingLeft"] = "";
  }
};

const imgList = ref<UploaderFileListItem[]>([
  {
    url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
    status: "done",
    message: "上传中...",
  },
  {
    url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg",
    status: "done",
    message: "上传中...",
  },
  {
    url: "https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg",
    status: "failed",
    message: "上传失败",
  },
]);
const afterRead = (file: any) => {
  if (uploader.value.modelValue.length < 3) {
    uploader.value.$el.style["justifyContent"] = "flex-start";
    uploader.value.$el.style["paddingLeft"] = "15px";
  } else {
    uploader.value.$el.style["justifyContent"] = "center";
    uploader.value.$el.style["paddingLeft"] = "";
  }
  if (file.length == null) {
    file.status = "uploading";
    file.message = "上传中...";

    setTimeout(() => {
      file.status = "failed";
      file.message = "上传失败";
    }, 1000);
  } else {
    file.forEach((element) => {
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
</style>
