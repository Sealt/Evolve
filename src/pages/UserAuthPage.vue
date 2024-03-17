<template>
  <NavBar title="校园认证" @click-left="router.back()" left-arrow />
  <div class="flex flex-col items-center">
    <Cell title="高校" value="江西理工大学" />
    <Cell title="校区" />
    <Cell title="院系" />
    <Cell title="专业" />
    <Cell title="姓名" />
    <Cell title="学号" />

    <div
      class="flex justify-center items-center bg-vant text-white p-10 w-[40vw] rounded-[10px] h-40 mt-20"
      @click="onClick">
      <div>前往认证</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavBar, Cell } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
const onClick = () => {
    router.push('/user/auth/do')
};
</script>

<style scoped></style>
