<template>
  <div class="flex flex-col h-screen">
    <NavBar left-arrow title="账号设置" @click-left="router.back()" />
    <div
      v-show="status == 'auth'"
      class="flex flex-col items-center px-15 py-30 gap-10 h-screen">
      <div class="flex flex-col items-center gap-5">
        <div class="text-20 font-bold">身份校验</div>
        <div>修改密码需要验证身份</div>
      </div>
      <Field
        class="rounded-[10px] my-10"
        v-model="sms"
        center
        label="验证码"
        placeholder="请输入短信验证码">
        <template #button>
          <Button
            size="mini"
            type="primary"
            :disabled="disableSms"
            @click="getSms"
            >{{ smsText }}</Button
          >
        </template></Field
      >
      <div
        class="flex justify-center bg-vant text-white p-10 w-[50vw] rounded-[10px]"
        @click="onCheck">
        验证
      </div>
    </div>

    <div
      v-show="status == 'edit'"
      class="flex flex-col grow items-center px-15 py-30 gap-10">
      <div class="flex flex-col items-center gap-5">
        <div class="text-20 font-bold">修改密码</div>
        <div>请修改密码，可使用手机号和密码登录</div>
      </div>
      <div class="flex flex-col py-20 w-full">
      <Field
        v-model="pwdOne"
        type="password"
        maxlength="16"
        label="密码"
        placeholder="请输入密码"
        border />
      <Field
        v-model="pwdTwo"
        type="password"
        maxlength="16"
        label="确认密码"
        placeholder="请再次输入密码"
        border />
      </div>
      <div
        class="flex justify-center bg-vant text-white p-10 w-[50vw] rounded-[10px]"
        @click="onEdit">
        确认修改
      </div>
      <div class="flex text-13 text-vant-t2 self-start pt-40">
        <div>
          请注意密码安全，谨慎防止被盗号<br />· 必须包含数字、字符和特殊符号<br />·
          密码需大于8位小于16位
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Field, Button, showToast, NavBar } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const router = useRouter();
const status = ref("auth");
const pwdOne = ref("");
const pwdTwo = ref("");
const disableSms = ref(false);
const sms = ref("");
const smstime = ref(60);
const smsText = ref("发送验证码");
const onEdit = () => {
  showToast('success')
  router.replace('/user/account')
}
const onCheck = () => {
  status.value = "edit";
};
const getSms = () => {
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
</script>

<style scoped>
:deep(.van-field__button) {
  display: flex;
}
</style>
