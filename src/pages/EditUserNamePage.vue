<template>
    <div class="flex flex-col h-screen">
        <NavBar left-arrow title="编辑资料" @click-left="router.back()" />
    <div
      v-show="status == 'login'"
      class="flex flex-col grow items-center px-15 py-30 gap-10">
      <div class="flex flex-col items-center gap-5">
        <div class="text-20 font-bold">修改用户名</div>
        <div>您当前的用户名为：{{ }}</div>
      </div>
      <Field
        class="rounded-[10px] my-10"
        v-model="userName"
        maxlength="15"
        label="用户名"
        placeholder="请输入用户名"
        border />
      <div
        class="flex justify-center bg-vant text-white p-10 w-[50vw] rounded-[10px]"
        @click="onLogin">
        确认修改
      </div>
      <div class="flex text-13 text-vant-t2 self-start pt-40">
        <div>用户名一年仅可修改一次，请慎重修改<br/>· 不能以数字开头<br/>· 用户名需大于5位小于15位<br/>· 禁止包含非法字符和违禁关键词<br/>· 无法使用其他用户使用过的用户名</div>
      </div>
    </div>
    </div>

  </template>

  <script setup lang="ts">
  import { Field, Checkbox, showToast,NavBar } from "vant";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/user";
  const userStore = useUserStore();
  const router = useRouter();
  const status = ref("login");
  const userName = ref("");
  const checked = ref(true);
  const onLogin = () => {

  };
  </script>

  <style scoped>
  :deep(.van-field__button) {
    display: flex;
  }
  </style>
