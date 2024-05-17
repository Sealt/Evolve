<template>
  <div
    v-show="status == 'login'"
    class="flex flex-col items-center px-15 py-30 gap-10 bg-vant-n1 h-screen">
    <div class="flex flex-col items-center gap-5">
      <div class="text-20 font-bold">手机短信登录</div>
      <div class="text-14">未注册手机号验证后会直接注册为平台账号</div>
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
      icon-size="4vw"
      >已阅读并同意隐私政策与用户协议</Checkbox
    >
    <div
      class="flex text-14 justify-center bg-vant text-white p-10 w-[80vw] rounded-[10px]"
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
      <div class="text-14">未注册的用户请使用短信验证注册后登录</div>
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
      class="flex text-14 justify-center bg-vant text-white p-10 w-[80vw] rounded-[10px]"
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
      <div class="text-14">验证码短信已发送至+86 - {{ tel }}</div>
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
      class="flex text-14 justify-center bg-vant text-white p-10 w-[80vw] rounded-[10px]"
      @click="onCheck">
      {{ haveTel ? "登录平台" : "注册新账号" }}
    </div>
    <div class="flex grow items-end gap-5 justify-center">
      <div class="text-15">高校研学服务平台 V1.0</div>
    </div>
  </div>

  <div
    v-show="status == 'select'"
    class="flex flex-col items-center px-15 py-30 gap-10 bg-vant-n1 h-screen">
    <div class="flex flex-col items-center gap-5">
      <div class="text-20 font-bold">选择高校</div>
      <div class="text-14">请选择你要加入的平台，确认后不可修改</div>
    </div>
    <div
      class="flex flex-col bg-white rounded-[10px] w-full my-10 overflow-hidden">
      <Search
        v-model="searchValue"
        @update:model-value="onSearch"
        @clear="onClear" />
      <RadioGroup v-model="checked">
        <CellGroup class="max-h-[30vh] overflow-scroll">
          <Cell
            :title="uni.uniName"
            clickable
            @click="checked = uni.id"
            v-for="uni in uniList">
            <template #right-icon>
              <Radio :name="uni.id" />
            </template>
          </Cell>
        </CellGroup>
      </RadioGroup>
    </div>
    <div
      class="flex text-14 justify-center bg-vant text-white p-10 w-[50vw] rounded-[10px]"
      @click="onCheck">
      进入平台
    </div>
    <div class="flex grow items-end gap-5 justify-center">
      <div class="text-15">高校研学服务平台 V1.0</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Search,
  Field,
  Checkbox,
  Button,
  showToast,
} from "vant";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import {
  loginByAccount,
  type ILoginByAccountType,
  loginBySms,
  type ILoginBySmsType,
  getSms,
  getUniversity,
  signWithUniversity,
} from "@/api/user";
const userStore = useUserStore();
const router = useRouter();
const status = ref("login");
const tel = ref("13293750885");
const sms = ref("");
const smstime = ref(60);
const smsText = ref("发送验证码");
const userName = ref("");
const checked = ref("");
const pwd = ref("");
const disableSms = ref(true);
const haveTel = ref(true);
const searchValue = ref("");
const uniList: any = ref([]);
onMounted(() => {
  if (userStore.token && userStore.university == 0) {
    status.value = "select";
  }
});
const onClear = () => {
  checked.value = "";
  uniList.value = [];
};
const onSearch = () => {
  checked.value = "";
  if (searchValue.value == "") {
    uniList.value = [];
    return;
  }
  getUniversity({ query: searchValue.value }).then((res) => {
    uniList.value = res.data;
  });
};
const onLogin = () => {
  const params: ILoginBySmsType = {
    mobile: tel.value,
    scene: "signup"
  };
  getSms(params).then(res => {
    if (res.code == 200) {
      // todo 测试
      sms.value = res.message
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
    } else {
      showToast("获取验证码失败");
    }
  });
};
const onCheck = () => {
  if (status.value == "pwd") {
    // 密码登录逻辑
    const params: ILoginByAccountType = {
      userAccount: userName.value,
      userPassword: pwd.value,
    };
    loginByAccount(params).then((res) => {
      if (res.code == 200) {
        userStore.setToken(res.data.loginToken);
        userStore.userId = res.data.id;
        userStore.userRole = res.data.userRole;
        userStore.university = res.data.university;
        showToast("登录成功");
        router.push("/?from=login");
      } else {
        showToast(res.message);
      }
    });
  }
  if (status.value == "check") {
    // 验证码登录逻辑
    const params: ILoginBySmsType = {
      code: sms.value,
      mobile: tel.value,
    };
    loginBySms(params).then((res) => {
      if (res.code == 200) {
        userStore.setToken(res.data.loginToken);
        userStore.userId = res.data.id;
        userStore.userRole = res.data.userRole;
        userStore.university = res.data.university;
        if (res.data.university == 0) {
          // 如果是首次注册 跳转大学选择
          status.value = "select";
        } else {
          showToast("登录成功");

          router.push("/?from=login");
        }
      } else {
        showToast(res.message);
      }
    });
  }
  if (status.value == "select") {
    signWithUniversity({ uniId: checked.value }).then((res) => {
      if (res.code == 200) {
        showToast("注册成功");
        userStore.university = Number.parseInt(checked.value);
        router.push("/?from=login");
      } else {
        showToast("注册失败");
      }
    });
  }
};
</script>

<style scoped>
:deep(.van-field__button) {
  display: flex;
}
</style>
@/api/user
