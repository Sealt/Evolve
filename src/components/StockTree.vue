<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <TreeSelect
    v-if="loadStatus == false && treeItems.length != 0"
    v-model:main-active-index="activeIndex"
    class="grow"
    :items="treeItems"
    v-on:click-nav="onClickNav">
    <template #content>
      <div v-if="treeType == 'event'">
        <LittleCard
          v-for="item in contentItems.items"
          class="m-5"
          :image="item.icon"
          type="event"
          hot="1"
          :detail="item.hotIndex + ' 热度 ' + item.discussCount + ' 讨论 '"
          :title="item.eventName"
          :follow="item.isFollow ? '1' : '0'"
          :to="item.id" />
      </div>
      <div v-if="treeType == 'project'">
        <LittleCard
          v-for="item in contentItems.items"
          class="m-5"
          :image="item.icon"
          type="project"
          hot="0"
          :detail="item.hotIndex + ' 热度 ' + item.resourceCount + ' 资源 '"
          :title="item.projectName"
          :follow="item.isFollow ? '1' : '0'"
          :to="item.id" />
      </div>
      <div v-if="treeType == 'database'">
        <LittleCard
          @touchstart="onTouchStart(item)"
          @touchend="onTouchEnd"
          v-for="item in contentItems.items"
          class="m-5"
          :image="
            iconBaseUrl +
            '/res/fileicon/file_icon_' +
            getFileType(item.type) +
            '.png'
          "
          type="file"
          hot="0"
          :detail="item.gainCount + ' 获取 '"
          :title="item.fileName"
          follow="0"
          :to="item.resId" />
      </div>
    </template>
  </TreeSelect>
  <Empty
    v-if="treeItems.length == 0 && loadStatus == false"
    description="这里空空如也" />
</template>

<script setup lang="ts">
import { TreeSelect, Loading, Empty,showConfirmDialog, showToast } from "vant";
import LittleCard from "./LittleCard.vue";
import { ref, onMounted } from "vue";
import { getSorts as getEventSort, getEvents } from "@/api/event";
import {
  getSorts as getResSort,
  getDatabase,
  getProjects,
  getFiles,
} from "@/api/res";
import { useRouter } from "vue-router";
import { unLinkFromDatabase } from "@/api/action";
const router = useRouter();
const iconBaseUrl = import.meta.env.VITE_ICON_URL;
const activeIndex = ref(0);
const treeItems: any = ref([]);
const contentItems: any = ref({});
const loadStatus = ref(true);
const props = defineProps<{
  treeType?: string;
}>();
const onClickNav = (index: number) => {
  if (props.treeType == "event") {
    getEvents({ largeId: treeItems.value[index].id }).then((res) => {
      loadStatus.value = false;
      contentItems.value = { items: res.data };
    });
  }
  if (props.treeType == "project") {
    getProjects({ largeId: treeItems.value[index].id }).then((res) => {
      loadStatus.value = false;
      contentItems.value = { items: res.data };
    });
  }
  if (props.treeType == "database") {
    getFiles({ subId: treeItems.value[index].id }).then((res) => {
      loadStatus.value = false;
      contentItems.value = { items: res.data };
    });
  }
};
onMounted(() => {
  if (props.treeType == "event") {
    getEventSort().then((res) => {
      if (res.code == 200) {
        loadStatus.value = false;
        res.data.forEach((item: any) => {
          treeItems.value.push({ id: item.id, text: item.largeName });
        });
        onClickNav(0);
      }
    });
  }
  if (props.treeType == "project") {
    getResSort().then((res) => {
      loadStatus.value = false;
      if (res.code == 200) {
        res.data.forEach((item: any) => {
          treeItems.value.push({ id: item.id, text: item.largeName });
        });
        onClickNav(0);
      }
    });
  }
  if (props.treeType == "database") {
    getDatabase({ projectId: router.currentRoute.value.params.id }).then(
      (res) => {
        if (res.code == 200) {
          loadStatus.value = false;
          res.data.forEach((item: any) => {
            treeItems.value.push({ id: item.id, text: item.subName });
          });
          onClickNav(0);
        }
      }
    );
  }
});
const fileTypes = [
  "aac",
  "apk",
  "doc",
  "docx",
  "jpg",
  "mp3",
  "ogg",
  "pdf",
  "png",
  "ppt",
  "pptx",
  "rar",
  "txt",
  "wps",
  "xls",
  "xlsx",
  "zip",
];
const getFileType = (type: string) => {
  if (fileTypes.indexOf(type) != -1) {
    return type;
  } else {
    return "default";
  }
};
let timer: any = null;
const onTouchStart = (item: any) => {
  timer = setTimeout(() => {
    timer = null;
    showConfirmDialog({
      message: "确认从资源库中移除",
    })
      .then(() => {
        unLinkFromDatabase({
          fileId: item.id,
        }).then((res) => {
          if (res.code == 200) {
            showToast("移除成功");
            contentItems.value.items = contentItems.value.items.filter((i: any) => i.id != item.id);
          }
        });
      })
      .catch(() => {
        // on cancel
      });
  }, 500);
};
const onTouchEnd = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};
</script>

<style>
:root:root {
  --van-tree-select-nav-item-padding: 10px;
  --van-tree-select-nav-background: #ffffff;
  --van-tree-select-content-background: #f2f3f5;
  --van-sidebar-selected-background: #f2f3f5;
  --van-sidebar-background: #ffffff;
  --van-tree-select-item-height: 32px;
  --van-sidebar-line-height: 16px;
  --van-sidebar-selected-border-width: 3px;
  --van-sidebar-selected-border-height: 100%;
}
.van-tree-select__nav {
  flex: 1 0 0;
}
.van-tree-select__content {
  flex: 0 0 78%;
}
.van-sidebar-item {
  display: flex;
  justify-content: center;
}
</style>
