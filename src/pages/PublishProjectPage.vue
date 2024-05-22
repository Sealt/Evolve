<template>
  <div class="flex flex-col">
    <Cell
      title="分类"
      is-link
      :value="projectLargeId == '' ? '选择项目类目' : projectLargeValue"
      @click="handleProjectPopup" />
    <Field
      v-model="nameText"
      label="项目名称"
      placeholder="请输入"
      input-align="right" />
    <Field
      v-model="bioText"
      label="项目简介"
      placeholder="请输入"
      input-align="right" />
      <div class="text-gray-500 text-13 p-15">
      新建项目需要管理员权限
    </div>
    <Popup
      v-model:show="showProjectPopup"
      class="h-1/2"
      round
      position="bottom">
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
            @click="onSelectProjectLarge(item)">
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
import { pubProject, getTargetList } from "@/api/publish";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const targetList: any = ref([]);
const projectLargeId = ref("");
const projectLargeValue = ref("");

const nameText = ref("");
const bioText = ref("");
const searchValue = ref("");

const onPublish = () => {
  var data: any = {
    userId: userStore.userId,
    largeId: projectLargeId.value,
    projectName: nameText.value,
    projectDesc: bioText.value,
  };
  pubProject(data).then((res) => {
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

const onSelectProjectLarge = (item: any) => {
  showProjectPopup.value = false;
  projectLargeId.value = item.id;
  projectLargeValue.value = item.largeName;
};
const onClosePopup = () => {
  showProjectPopup.value = false;
};
const onSearch = () => {
  getTargetList({ typed: 4, query: searchValue.value }).then((res) => {
    if (res.code == 200) {
      targetList.value = res.data;
    }
  });
};
const showProjectPopup = ref(false);
const handleProjectPopup = () => {
  showProjectPopup.value = true;
  getTargetList({ typed: 4, query: searchValue.value }).then((res) => {
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
