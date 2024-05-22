<template>
  <div @click.stop="handleClick" class="card">
    <div class="card-image">
      <Image :src="image" fit="cover" class="image" />
    </div>
    <div class="card-content">
      <div class="card-content__title">{{ title }}</div>
      <div class="card-content__detail">
        <Icon
          v-if="hot == '1'"
          name="fire-o"
          class="text-red-500 mr-4"
          size="4vw" />
        <div class="card-content__detail-wrapper">{{ detail }}</div>
      </div>
    </div>
    <div class="card-button">
      <Tag v-show="follow == '1'" type="primary" size="medium" round
        >已关注</Tag
      >
      <Tag v-show="type == 'res'" type="success" size="medium" round>获取</Tag>
    </div>
    <Popup
      class="h-1/3"
      v-model:show="showResPopup"
      position="bottom"
      round
      closeable
      teleport=".CurrentView">
      <div class="flex m-15 flex-col gap-10">
        <div>资源详情</div>
        <div class="flex">
          <Tag class="mr-10 w-60 justify-center h-21 shrink-0" type="primary"
            >资源名</Tag
          >
          <div class="text-14 break-all">
            {{ fileItem.fileName }}
          </div>
        </div>
        <div class="flex">
          <Tag class="mr-10 w-60 justify-center h-21 shrink-0" type="primary"
            >文件大小</Tag
          >
          <div class="text-14">
            {{ (fileItem.size / 1000000).toFixed(2) + " Mb" }}
          </div>
        </div>
        <div class="flex" v-if="fileItem.uploadType == 'third'">
          <Tag class="mr-10 w-60 justify-center h-21 shrink-0" type="primary"
            >获取方式</Tag
          >
          <div class="text-14 break-all">
            {{ fileItem.source }}
          </div>
        </div>
        <div class="flex" v-if="fileItem.uploadType == 'upload'">
          <Tag class="mr-10 w-60 justify-center h-21 shrink-0" type="primary"
            >下载地址</Tag
          >
          <div class="text-14 break-all">
            {{ fileItem.url }}
          </div>
        </div>
        <div class="flex justify-end">
          <Button
            v-show="userStore.userRole.includes('admin')"
            type="warning"
            @click="showDatabasePop = true"
            size="small"
            >加入资源库</Button
          >
        </div>
      </div>
    </Popup>
    <Popup v-model:show="showDatabasePop" class="h-1/2" round position="bottom" teleport=".CurrentView">
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
            @click="onCloseDatabasePopup" />
        </div>
        <div class="flex flex-col gap-5">
          <div
            class="flex gap-10 items-center"
            v-for="item in targetList"
            @click="onSelectDatabase(item)">
            <div class="flex gap-10">
              <div class="text-15">{{ item.subName }}</div>
              <Tag type="primary">{{ item.projectName }}</Tag>
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
import { Image, Icon, Tag, Popup, showToast, Button,Search } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { gain, linkToDatabase } from "@/api/action";
import { useUserStore } from "@/stores/user";
import { getProjectSubs } from "@/api/search";
const userStore = useUserStore();
const router = useRouter();
const props = defineProps<{
  type?: string;
  image?: string;
  title?: string;
  detail?: string;
  hot?: string;
  follow?: string;
  to?: string;
  fileItem?: any;
}>();
const showResPopup = ref(false);
const showDatabasePop = ref(false);
const searchValue = ref("");
const targetList:any = ref([]);
const onSearch = (value: string) => {
  getProjectSubs({ query: value }).then((res) => {
    targetList.value = res.data;
  });
};
const onCloseDatabasePopup = () => {
  showDatabasePop.value = false;
};
const onSelectDatabase = (item: any) => {
  linkToDatabase({
    subId: item.id,
    projectId: item.projectId,
    fileId: props.fileItem.id,
  }).then((res) => {
    showToast("关联成功");
    showDatabasePop.value = false;
  });
};

const handleClick = () => {
  if (props.type == "event") {
    router.push("/event/" + props.to);
  }
  if (props.type == "project") {
    router.push("/project/" + props.to);
  }
  if (props.type == "file") {
    router.push("/post/res/" + props.to);
  }
  if (props.type == "res") {
    gain({ fileId: props.fileItem.id }).then((res) => {
      showToast("获取成功");
    });
    showResPopup.value = true;
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  box-sizing: content-box;
  height: 40px;
  background-color: white;
  padding: 10px;
  border: 1px solid #f2f3f5;
  border-radius: 5px;
  .card-image {
    width: 40px;
    height: 40px;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    overflow: hidden;
    flex-shrink: 0;
    .image {
      width: 40px;
      height: 40px;
    }
  }
  .card-content {
    display: flex;
    min-width: 100px;
    max-width: 220px;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    .card-content__title {
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-content__detail {
      display: flex;
      align-items: center;
      .card-content__detail-wrapper {
        display: inline-block;
        font-size: 12px;
        color: gray;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .card-button {
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-end;
  }
}
.card:active {
  background-color: #ebedf0;
}
.van-search {
  padding: 0px;
}
</style>
