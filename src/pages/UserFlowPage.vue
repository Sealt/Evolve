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
  <Empty
    v-if="listData.length == 0 && loadStatus == false"
    description="这里空空如也" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import NotifyItem from "@/components/NotifyItem.vue";
import { ref, onMounted } from "vue";
import { Empty, Loading } from "vant";
import { useUserStore } from "@/stores/user";
import { searchUser } from "@/api/search";
const router = useRouter();
const loadStatus = ref(true);
const userStore = useUserStore();
const listData: any = ref([]);
let detailType: any = ref("");
let fatherPage = ref("");
const props = defineProps<{
  keyword?: string;
}>();
defineExpose({
  reload,
});
function reload(keyword: any) {
  loadStatus.value = true;
  searchUser({ current: 1, size: 10, keyword: keyword }).then((res) => {
    loadStatus.value = false;
    listData.value = res.data;
  });
}
</script>

<style scoped></style>
