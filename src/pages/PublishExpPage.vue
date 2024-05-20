<template>
  <div class="flex flex-col">
    <Cell
      title="发布到"
      is-link
      :value="eventId == '' ? '更容易被看到' : eventValue"
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
      :max-count="9"
      :max-size="10240 * 1024"
      @oversize="onOversize"
      @delete="imgDelete" />
    <Field
      v-model="sourceText"
      label="经验来源"
      placeholder="经验从何而来"
      input-align="right" />
    <Field
      v-model="scopeText"
      label="有效范围"
      placeholder="经验对哪些群体有效"
      input-align="right" />
    <Popup v-model:show="showEventPopup" class="h-1/2" round position="bottom">
      <div class="flex flex-col p-15 gap-15">
        <div class="flex items-center justify-between gap-10">
          <Search
            class="grow"
            v-model="searchValue"
            placeholder="请输入事件关键词"
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
                {{ item.hotIndex + " 热度 " + item.discussCount  + " 讨论" }}
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
import {
  Popup,
  Cell,
  Search,
  Field,
  Uploader,
  showToast,
  Icon,
  Image,
  showLoadingToast,
  type UploaderFileListItem,
  type UploaderInstance,
  closeToast,
} from "vant";
import { ref, onMounted } from "vue";
import { pubInfo, getTargetList, type IInfoType } from "@/api/publish";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const textValue = ref("");
const eventValue = ref("");
const sourceText = ref("");
const scopeText = ref("");
const searchValue = ref("");
const imgList = ref<UploaderFileListItem[]>([]);
const showEventPopup = ref(false);
const uploader = ref<UploaderInstance>();
const targetList: any = ref([]);
const eventId = ref('');

const onPublish = () => {
  var formData = new FormData();
  imgList.value.forEach((file) => {
    formData.append("images", file.file as File);
  });
  var data: IInfoType = {
    userId: userStore.userId,
    eventId: eventId.value,
    typed: 1,
    content: textValue.value,
    infoSource: sourceText.value,
    scopeDetail: scopeText.value,
  };
  formData.append("data", JSON.stringify(data));
  showLoadingToast({
    duration: 0,
    message: "发布中",
    forbidClick: true,
  });
  pubInfo(formData).then((res) => {
    if (res.data.code == 200) {
      closeToast();
      showToast("发表成功");
      router.back();
    } else {
      closeToast();
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
  eventValue.value = item.eventName
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

const handleEventPopup = () => {
  showEventPopup.value = true;
};

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
    file.status = "done";
    // file.message = "上传中...";

    // setTimeout(() => {
    //   file.status = "failed";
    //   file.message = "上传失败";
    // }, 1000);
  } else {
    file.forEach((element: any) => {
      element.status = "done";
    });
  }
};
const onOversize = (file: any) => {
  //console.log(file);
  showToast("文件大小不能超过 10Mb");
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
