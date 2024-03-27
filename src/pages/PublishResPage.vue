<template>
  <div class="flex flex-col">
    <Cell
      title="发布到"
      is-link
      :value="projectId == '' ? '更容易被看到' : projectValue"
      @click="handleProjectPopup" />
    <input type="file" ref="fileUploader" class="hidden" @change="getFile" />
    <Cell title="添加文件" is-link value="资源" @click="handleFilePopup" />

    <Field
      v-model="textValue"
      placeholder="介绍一下资源"
      type="textarea"
      :autosize="{ maxHeight: 200, minHeight: 150 }" />
    <div class="flex bg-white flex-col px-15">
      <div class="flex flex-col gap-5">
        <div
          class="flex gap-10 items-center pt-10"
          v-for="(card, index) in fileList"
          @click="onClickFile(index)">
          <Image
            src="./icon_pdf.png"
            fit="cover"
            class="size-40 rounded-[5px] overflow-hidden shrink-0" />
          <div class="flex flex-col grow w-0">
            <div class="text-15 truncate">{{ card.name }}</div>
            <div class="text-13 text-vant-t2 truncate">
              {{
                (card.size / 1000000).toFixed(2) +
                " Mb  " +
                card.point +
                " 积分  " +
                card.gold +
                " 金币"
              }}
            </div>
          </div>
          <div class="flex justify-end">
            <Icon class="text-vant-t2" name="arrow" size="5vw" />
          </div>
        </div>
      </div>
    </div>
    <Uploader
      ref="uploader"
      v-model="imgList"
      :after-read="afterRead"
      multiple
      :max-count="9"
      :max-size="1024 * 1024"
      @oversize="onOversize"
      @delete="imgDelete" />
    <Popup v-model:show="showResPopup" class="h-1/2" round position="bottom">
      <div class="flex flex-col p-15 gap-15">
        <div class="flex items-center justify-between gap-10">
          <Search
            class="grow"
            v-model="searchValue"
            placeholder="请输入项目关键词"
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
            @click="onSelectProject(item)">
            <Image
            :src="item.icon"
              fit="cover"
              class="size-40 rounded-[5px] overflow-hidden" />
            <div class="flex flex-col">
              <div class="text-15">{{ item.projectName }}</div>
              <div class="text-13 text-vant-t2">{{ item.hotIndex + ' & '+item.resourceCount }}</div>
            </div>
            <div class="flex justify-end grow">
              <Icon class="text-vant-t2" name="arrow" size="5vw" />
            </div>
          </div>
        </div>
      </div>
    </Popup>
    <Popup v-model:show="showFilePopup" class="h-2/3" round position="bottom">
      <div class="flex flex-col">
        <div class="flex items-center p-15 sticky top-0 z-10 bg-white">
          <div class="text-14">编辑资源</div>
          <div class="flex gap-20 grow justify-end">
            <Icon
              name="delete-o"
              size="5vw"
              class="text-vant-t2"
              @click="deleteFile"
              v-show="fileMode == 'edit'" />
            <Icon
              name="cross"
              size="5vw"
              class="text-vant-t2"
              @click="unSaveFile" />
            <Icon
              name="success"
              size="5vw"
              class="text-vant"
              @click="saveFile" />
          </div>
        </div>
        <Cell title="文件名" :label="currentFile.name" />
        <Cell title="文件类型" :value="currentFile.type" />
        <RadioGroup v-model="fileUploadType">
          <CellGroup>
            <Cell
              title="上传文件"
              clickable
              @click="fileUploadType = 'upload'"
              label="将文件上传至服务器，用户从服务器下载获取文件">
              <template #right-icon>
                <Radio name="upload" />
              </template>
            </Cell>
            <Cell
              title="指定获取方式"
              clickable
              @click="fileUploadType = 'third'"
              label="用户从提供的第三方途径下载，例如群文件、网盘链接等">
              <template #right-icon>
                <Radio name="third" />
              </template>
            </Cell>
          </CellGroup>
        </RadioGroup>
        <Field
          v-show="fileUploadType == 'third'"
          v-model="currentFile.getway"
          label="获取方式"
          type="textarea"
          placeholder="请输入用户获取文件的方式（群文件、网盘链接等）"
          label-align="top"
          required />
        <Field
          v-model="currentFile.source"
          label="资源来源"
          placeholder="资源来自哪里"
          input-align="right"
          required />
        <Field
          v-model="currentFile.point"
          label="积分价格"
          placeholder="获取需要积分"
          input-align="right" />
        <Field
          v-model="currentFile.gold"
          label="金币价格"
          placeholder="获取需要金币"
          input-align="right" />
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import {
  Popup,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Search,
  Field,
  Uploader,
  showToast,
  Icon,
  Image,
  type UploaderFileListItem,
  type UploaderInstance,
} from "vant";
import LittleCard from "@/components/LittleCard.vue";
import { ref } from "vue";
import { clone, cloneDeep, cloneDeepWith } from "lodash";
import { pubRes,getTargetList } from "@/api/publish";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const projectValue = ref("");
const textValue = ref("");
const targetList:any = ref([]);
const uploader = ref<UploaderInstance>();
const fileUploader = ref();
const fileUploadType = ref();
const searchValue = ref("");
var currentFileIndex = -1;
var fileMode = "new";
const currentFile: any = ref({});
const fileList:any = ref([]);
const imgList = ref<UploaderFileListItem[]>([]);
const showResPopup = ref(false);
const showFilePopup = ref(false);
var finallyFileList:File[] = [];
var projectId = "";

const onPublish = () => {
  console.log(fileList.value)
  // 处理一份最终的文件数组
  fileList.value.forEach((file:any) => {
    if (file.uploadType == 'upload') {
      finallyFileList.push(file.file)
    }
      file.file = null;
  });
  console.log(finallyFileList)
  // 组装参数
  var formData = new FormData();
  imgList.value.forEach((file) => {
    formData.append("images", file.file as File);
  });
  finallyFileList.forEach((file) => {
    formData.append("files", file)
  })
  var data: any = {
    userId: userStore.userId,
    projectId: projectId,
    content: textValue.value,
  };
  formData.append("data", JSON.stringify(data));
  formData.append("fileInfo", JSON.stringify(fileList.value));
  pubRes(formData).then((res) => {
    if (res.data.code == 200) {
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
const onClickFile = (index: number) => {
  currentFile.value = cloneDeep(fileList.value[index]);
  currentFileIndex = index;
  fileMode = "edit";
  showFilePopup.value = true;
};
const saveFile = () => {
  if (
    (fileUploadType.value == "third" && currentFile.value.getway == "") ||
    currentFile.value.source == "" ||
    currentFile.value.point == "" ||
    currentFile.value.gold == ""
  ) {
    showToast("请完整输入资源信息");
    return;
  }
  currentFile.value.uploadType = fileUploadType.value;
  if (fileMode == "edit") {
    Object.assign(fileList.value[currentFileIndex],currentFile.value);
  } else {
    var temp = {};
    Object.assign(temp,currentFile.value);
    fileList.value.push(temp);
  }
  showFilePopup.value = false;
  currentFile.value = {};
};
const unSaveFile = () => {
  showFilePopup.value = false;
  currentFile.value = {};
  currentFileIndex = -1;
};
const deleteFile = () => {
  showFilePopup.value = false;
  fileList.value.splice(currentFileIndex, 1);
  currentFile.value = {};
  currentFileIndex = -1;
};
const getFile = (e: any) => {
  let file = {
    name: "",
    type: "",
    size: 0,
    uploadType: "",
    getway: "",
    source: "",
    point: "0",
    gold: "0",
    file:File
  };
  file.name = e.target.files[0].name;
  file.type = e.target.files[0].name.split(".").pop();
  file.size = e.target.files[0].size;
  file.file = e.target.files[0]
  fileUploader.value.value = null;
  Object.assign(currentFile.value,file);
  fileMode = "new";
  showFilePopup.value = true;
};
const onSelectProject = (item:any) => {
  showResPopup.value = false;
  projectId = item.id;
  projectValue.value = item.projectName
  showToast("success");
};
const onClosePopup = () => {
  showResPopup.value = false;
};
const onSearch = () => {
  getTargetList({ typed: 2, query: searchValue.value }).then((res) => {
    if (res.code == 200) {
      targetList.value = res.data;
      showToast("success");
    }
  });
};
const handleProjectPopup = () => {
  showResPopup.value = true;
};
const handleFilePopup = () => {
  if (fileUploader.value) {
    fileUploader.value.click();
  }
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
  } else {
    file.forEach((element: any) => {
      element.status = "done";
    });
  }
};
const onOversize = (file: any) => {
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
  justify-content: flex-start;
  background: #fff;
  padding-left: 15px;
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
