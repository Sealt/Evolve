<template>
  <div
    v-show="status == 'login'"
    class="flex flex-col items-center px-15 py-30 gap-10 bg-vant-n1 h-screen">
    <div class="flex flex-col items-center gap-5">
      <div class="text-20 font-bold">手机短信登录</div>
      <div>未注册手机号验证后会直接注册为平台账号</div>
    </div>
    <Field
      class="rounded-[10px] my-10"
      v-model="tel"
      type="tel"
      label="手机号"
      placeholder="请输入中国大陆手机号码"
      border />
    <Checkbox
      v-model="checked"
      class="flex justify-center text-14"
      icon-size="16"
      >已阅读并同意隐私政策与用户协议</Checkbox
    >
    <div
      class="flex justify-center bg-vant text-white p-10 w-[80vw] rounded-[10px]"
      @click="onLogin">
      获取验证码
    </div>
    <div class="flex justify-center text-14 text-vant" @click="status = 'pwd'">
      使用平台已有账号登录
    </div>
    <div class="flex grow items-end gap-5 justify-center">
      <div class="text-15">高校研学服务平台 V1.0</div>
    </div>
  </div>

  <div
    v-show="status == 'pwd'"
    class="flex flex-col items-center px-15 py-30 gap-10 bg-vant-n1 h-screen">
    <div class="flex flex-col items-center gap-5">
      <div class="text-20 font-bold">账号密码登录</div>
      <div>未注册的用户请使用短信验证注册后登录</div>
    </div>
    <Field
      class="rounded-[10px] mt-10"
      v-model="userName"
      label="用户名"
      placeholder="请输入用户名/手机号"
      border />
    <Field
      class="rounded-[10px] mb-10"
      v-model="pwd"
      type="password"
      label="密码"
      placeholder="请输入密码"
      border />
    <Checkbox
      v-model="checked"
      class="flex justify-center text-14"
      icon-size="16"
      >已阅读并同意隐私政策与用户协议</Checkbox
    >
    <div
      class="flex justify-center bg-vant text-white p-10 w-[80vw] rounded-[10px]"
      @click="onCheck">
      登录平台
    </div>
    <div
      class="flex justify-center text-14 text-vant"
      @click="status = 'login'">
      使用短信验证码注册或登录
    </div>
    <div class="flex grow items-end gap-5 justify-center">
      <div class="text-15">高校研学服务平台 V1.0</div>
    </div>
  </div>

  <div
    v-show="status == 'check'"
    class="flex flex-col items-center px-15 py-30 gap-10 bg-vant-n1 h-screen">
    <div class="flex flex-col items-center gap-5">
      <div class="text-20 font-bold">输入验证码</div>
      <div>验证码短信已发送至+86 - {{ tel }}</div>
    </div>
    <Field
      class="rounded-[10px] my-10"
      v-model="sms"
      center
      label="验证码"
      placeholder="请输入短信验证码">
      <template #button>
        <Button size="mini" type="primary" :disabled="disableSms">{{
          smsText
        }}</Button>
      </template></Field
    >
    <div v-if="haveTel" class="text-14 text-vant-t2">
      手机号已注册，验证后直接登录
    </div>
    <div v-else="haveTel" class="text-14 text-vant-t2">
      手机号未注册，验证后直接注册
    </div>
    <div
      class="flex justify-center bg-vant text-white p-10 w-[80vw] rounded-[10px]"
      @click="onCheck">
      {{ haveTel ? "登录平台" : "注册新账号" }}
    </div>
    <div class="flex grow items-end gap-5 justify-center">
      <div class="text-15">高校研学服务平台 V1.0</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Field, Checkbox, Button, showToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const router = useRouter();
const status = ref("login");
const tel = ref("13293750885");
const sms = ref("");
const smstime = ref(60);
const smsText = ref("发送验证码");
const userName = ref("");
const checked = ref(true);
const pwd = ref("");
const disableSms = ref(true);
const haveTel = ref(true);
const onLogin = () => {
  status.value = "check";
  disableSms.value = true;
  smsText.value = "发送验证码(" + smstime.value + ")";
  var jb = setInterval(() => {
    if (smstime.value == 0) {
      disableSms.value = false;
      smsText.value = "发送验证码";
      clearInterval(jb);
      return;
    }
    smstime.value--;
    smsText.value = "发送验证码(" + smstime.value + ")";
  }, 1000);
};
const onCheck = () => {
  if (status.value == "pwd") {
  }
  if (status.value == "check") {
  }
  userStore.setToken("123456789");
  userStore.userId = "66778899";
  showToast("登录成功");
  router.push("/");
};
</script>

<style scoped>
:deep(.van-field__button) {
  display: flex;
}
</style>
