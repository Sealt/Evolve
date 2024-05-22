<template>
  <Search
    show-action
    v-model="searchValue"
    placeholder="搜索"
    @click-input="onFocus">
    <template #action>
      <Icon id="new" name="add" size="7vw" @click="handlePublish" />
    </template>
    <template #left>
      <Icon id="avator" :name="avatar" size="7vw" @click="handleAvatar" />
    </template>
  </Search>
</template>

<script setup lang="ts">
import { Search, Button, Icon } from "vant";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getUserInfo } from "@/api/user";
import { useUserStore } from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();
const searchValue = ref("");
const avatar = ref("user-circle-o");
const handlePublish = () => {
  router.push("/publish");
};
const onFocus = () => {
  router.push("/search");
};
onMounted(() => {
  getUserInfo({ id: userStore.userId, infoType: "avatar" }).then((res) => {
    avatar.value = res.data.avatar;
  });
});
function handleAvatar() {
  router.push("/user/" + userStore.userId);
}
</script>

<style scoped>
.van-search {
  padding: 10px 0 0 12px;
}
:deep(.van-search__action) {
  padding: 0 12px;
}
:deep(.van-search__action:active) {
  background-color: #fff;
}
.van-icon[id="avator"] {
  padding-right: 12px;
}
.van-icon[id="new"] {
  color: var(--van-primary-color);
  vertical-align: middle;
}
.van-icon:active[id="new"] {
  color: #086da8;
}
:deep(.van-icon__image) {
  border-radius: 9999px;
}
</style>
