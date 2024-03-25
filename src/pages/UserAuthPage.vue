<template>
  <NavBar title="校园认证" @click-left="router.back()" left-arrow />
  <div class="flex flex-col items-center">
    <Cell title="高校" :value="authData.university" />
    <Cell title="校区" :value="authData.realAuth.campus" />
    <Cell title="院系" :value="authData.realAuth.collage" />
    <Cell title="专业" :value="authData.realAuth.major" />
    <Cell title="班级" :value="authData.realAuth.clazz" />
    <Cell title="姓名" :value="authData.realAuth.name" />
    <Cell title="学号" :value="authData.realAuth.cardid" />

    <div
      class="flex justify-center items-center bg-vant-n3 text-white p-10 w-[40vw] rounded-[10px] h-40 mt-20"
      @click="onClick"
      ref="submitButton">
      <div>
        {{ authStatus }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavBar, Cell } from "vant";
import { useRouter } from "vue-router";
import { getUserInfo } from "@/api/user";
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();
const authData: any = ref({ realAuth: {} });
const authStatus = ref("");
const canDoAuth = ref(true);
const submitButton = ref<HTMLDivElement>();
const onClick = () => {
  if (canDoAuth.value == true) {
    router.push("/user/auth/do");
  }
};
onMounted(() => {
  getUserInfo({ id: userStore.userId, infoType: "auth" }).then((res) => {
    authData.value = res.data;
    switch (authData.value.realAuth.status) {
      case 0:
        authStatus.value = "立即认证";
        submitButton.value!.style.backgroundColor = "#1989fa";
        break;
      case 1:
        authStatus.value = "已认证";
        canDoAuth.value = false;
        break;
      case 2:
        authStatus.value = "审核中";
        canDoAuth.value = false;
        submitButton.value!.style.color = "gray";
        break;
    }
  });
});
</script>

<style scoped></style>
