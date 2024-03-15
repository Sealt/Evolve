<template>
  <div class="flex flex-col items-center p-15 gap-15 bg-vant-n1 h-screen">
    <div class="flex flex-col items-center gap-5">
      <div class="text-20 font-bold">手机短信登录</div>
      <div>未注册手机号验证后会直接注册为平台账号</div>
    </div>
    <Field
      class="rounded-[10px]"
      v-model="tel"
      type="tel"
      label="手机号"
      placeholder="请输入中国大陆手机号码"
      border />
    <Checkbox v-model="checked" class="flex justify-center text-14"
      >已阅读并同意隐私政策与用户协议</Checkbox
    >
    <div class="flex justify-center bg-vant text-white p-10 w-[80vw] rounded-[10px]">
      获取验证码
    </div>

    <div class="flex justify-center text-14 text-vant">
      使用平台已有账号登录
    </div>
    <div class="flex grow items-end gap-5 justify-center">
      <div class="text-15">高校研学服务平台 V1.0</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Field, Checkbox, Button } from "vant";
import { ref } from "vue";
const tel = ref("");
const checked = ref(true);
</script>

<style scoped></style>
