<template>
  <div class="flex flex-col bg-vant-n2 p-10 gap-15">
    <div class="flex justify-end gap-10">
      <Icon size="6vw" name="setting-o" />
      <Icon
        size="6vw"
        name="info-o"
        @click="
          showToast(
            '高校研学服务平台 V1.0 \n 江理一起来学 荣誉出品 \n Copyright ©️Benin'
          )
        " />
      <Icon
        size="6vw"
        name="add"
        class="text-vant"
        @click="router.push('/publish')" />
    </div>
    <div
      class="flex gap-10 px-5"
      @click="router.push('/user/' + userStore.userId)">
      <Image :src="data.avatar" fit="cover" class="size-48 shrink-0" round />
      <div class="flex flex-col justify-between">
        <div class="text-16">{{ data.userName }}</div>
        <div class="text-13 text-vant-t2">
          金币: {{ data.coin }} / 积分: {{ data.score }}
        </div>
      </div>
      <div class="flex items-center grow justify-end">
        <div class="text-12 text-vant-t2">空间</div>
        <Icon class="text-vant-t2" name="arrow" size="4vw" />
      </div>
    </div>
    <div class="grid grid-cols-3 bg-white rounded-[10px] py-5">
      <div
        class="flex flex-col items-center"
        @click="router.push('/user/' + userStore.userId)">
        <div class="text-16 font-bold">{{ data.posts }}</div>
        <div class="text-13 text-vant-t2">动态</div>
      </div>
      <div
        class="flex flex-col items-center"
        @click="router.push({ path: '/detail/follow' })">
        <div class="text-16 font-bold">{{ data.follow }}</div>
        <div class="text-13 text-vant-t2">关注</div>
      </div>
      <div
        class="flex flex-col items-center"
        @click="router.push({ path: '/detail/fans' })">
        <div class="text-16 font-bold">{{ data.fans }}</div>
        <div class="text-13 text-vant-t2">粉丝</div>
      </div>
    </div>
    <div
      class="grid grid-cols-4 grid-rows-2 bg-white rounded-[10px] py-10 gap-y-10">
      <div
        class="flex flex-col items-center gap-5"
        v-for="item in funcItems"
        @click="showToast('Coding')">
        <Icon :name="item.icon" size="7vw" />
        <div class="text-12">{{ item.text }}</div>
      </div>
    </div>
    <div
      class="grid grid-cols-4 grid-rows-1 bg-white rounded-[10px] py-10 gap-y-10">
      <div
        class="flex flex-col items-center gap-5"
        v-for="item in adminItems"
        @click="showToast('Coding')">
        <Icon :name="item.icon" size="7vw" />
        <div class="text-12">{{ item.text }}</div>
      </div>
    </div>
    <div class="flex flex-col rounded-[10px] overflow-hidden shrink-0">
      <Cell title="个人资料" is-link @click="router.push('/user/edit')" />
      <Cell title="校园认证" is-link @click="router.push('/user/auth')" />
      <Cell title="账号设置" is-link @click="router.push('/user/account')" />
      <Cell title="退出登录" is-link @click="onLogout" />
    </div>
    <div class="grow bg-vant-n2"></div>
    <Tabbar route placeholder>
      <TabbarItem name="info" to="/" icon="info-o">信息</TabbarItem>
      <TabbarItem name="res" to="/res" icon="apps-o">资源</TabbarItem>
      <TabbarItem name="chat" to="/chat" icon="chat-o">消息</TabbarItem>
      <TabbarItem name="me" to="/me" icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import { Tabbar, TabbarItem, Icon, Image, Cell, showToast } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
const tabActiveName = ref("a");
import { getUserInfo } from "@/api/user";
const data: any = ref({
  userName: "",
  score: 0,
  coin: 0,
  follow: 0,
  posts: 0,
  fans: 0,
  realAuth: {},
});
const router = useRouter();
const userStore = useUserStore();
const funcItems = [
  { icon: "star-o", text: "我的收藏" },
  { icon: "notes-o", text: "关注事件" },
  { icon: "list-switch", text: "关注项目" },
  { icon: "good-job-o", text: "我的点赞" },
  { icon: "comment-o", text: "我的回复" },
  { icon: "question-o", text: "我的问答" },
  { icon: "gold-coin-o", text: "金币充值" },
  { icon: "balance-list-o", text: "我的下载" },
];
const adminItems = [
  { icon: "shield-o", text: "内容审核" },
  { icon: "bar-chart-o", text: "数据统计" },
  { icon: "photo-o", text: "轮播图管理" },
  { icon: "apps-o", text: "入口管理" },
  { icon: "filter-o", text: "类目管理" },
  { icon: "user-o", text: "用户管理" },
  { icon: "certificate", text: "权限管理" },
];
const onLogout = () => {
  // localStorage.removeItem("user");
  userStore.clear();
  showToast("退出成功");
  router.push("/login");
};
onMounted(() => {
  getUserInfo({ id: userStore.userId, infoType: "all" }).then((res) => {
    data.value = res.data;
  });
});
</script>

<style scoped></style>
