<template>
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
    <Empty v-if="listData.length == 0" image="search" description="没有找到搜索结果" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import NotifyItem from "@/components/NotifyItem.vue";
import { ref, onMounted } from "vue";
import { Empty } from "vant";
import { useUserStore } from "@/stores/user";
import { searchUser } from "@/api/search";
const router = useRouter();
const userStore = useUserStore();
const listData: any = ref([]);
let detailType: any = ref("");
let fatherPage = ref("");
const props = defineProps<{
  keyword?: string;
}>();
onMounted(() => {
  searchUser({ current: 1, size: 10, keyword: props.keyword }).then((res) => {
    listData.value = res.data;
  });
});
</script>

<style scoped></style>
