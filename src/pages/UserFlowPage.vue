<template>
  <Loading class="pt-20" v-if="loadStatus" vertical>加载中</Loading>
  <NotifyItem
    class="bg-white p-10 rounded-[10px]"
    type="user_list"
    v-for="list in listData"
    :jumpId="list.id"
    :user-name="list.userName"
    :avatar="list.avatar"
    :bio="list.bio"
    :gender="list.gender"
    :create-time="list.createTime" />
  <div
    v-show="listData.length != 0 && loadStatus == false"
    ref="loadMoreElement"
    class="flex justify-center text-13 text-vant-t2">
    {{ loadMoreContent }}
  </div>
  <Empty
    v-if="listData.length == 0 && loadStatus == false"
    description="这里空空如也" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import NotifyItem from "@/components/NotifyItem.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Empty, Loading } from "vant";
import { useUserStore } from "@/stores/user";
import { searchUser } from "@/api/search";
const router = useRouter();
const loadStatus = ref(true);
const userStore = useUserStore();
const searchQuery: any = ref("");
const listData: any = ref([]);
const loadMoreElement = ref(null);
const loadMoreContent = ref("加载更多");
let loadLock = 0;
const pageInfo = ref({
  current: 1,
  size: 10,
  pages: 0,
});
let observer: any = null;

defineExpose({
  reload,
});
function reload(keyword: any) {
  observer.observe(loadMoreElement.value);
  searchQuery.value = keyword;
  pageInfo.value.current = 1;
  pageInfo.value.pages = 0;
  loadLock = 1;
  listData.value = [];
  loadStatus.value = true;
  loadData(keyword);
}
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (loadLock == 0) {
        loadLock = 1;
        loadData(searchQuery.value);
      }
    }
  });
});
function loadData(keyword: any) {
  if (pageInfo.value.pages != 0 && pageInfo.value.current > pageInfo.value.pages) {
    loadMoreContent.value = "没有更多了";
    return;
  }
  searchUser({
    current: pageInfo.value.current,
    size: pageInfo.value.size,
    keyword: keyword,
  }).then((res) => {
    loadStatus.value = false;
    loadLock = 0;
    if (res.code == 200) {
      listData.value = [...listData.value, ...res.data];
      pageInfo.value.pages = -1;
      pageInfo.value.current++;
      loadMoreContent.value = "加载更多";
    } else {
      loadMoreContent.value = "加载失败";
    }
  });
}
</script>

<style scoped></style>
