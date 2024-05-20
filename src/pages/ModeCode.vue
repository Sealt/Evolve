<template>
  <div class="flex flex-col h-screen gap-5">
    <NavBar
      title="验证码"
      left-arrow
      left-text="返回"
      fixed
      placeholder
      class="z-10 shrink-0"
      @click-left="router.back()" />
    <div class="flex flex-col gap-10 p-10">
      <div
        v-for="item in contentItems"
        class="text-14 p-5 flex flex-col justify-between gap-5 bg-gray-50 rounded-[10px]">
        <div>
          {{
            "手机号：" +
            item.mobile +
            " 场景：" +
            item.scene +
            " 验证码：" +
            item.verifyCode
          }}
        </div>
        <div>{{ "过期时间：" + item.expiredTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { NavBar } from "vant";
import { getVerifyCode } from "@/api/mode";

const router = useRouter();
const contentItems: any = ref([]);

onMounted(() => {
  getVerifyCode().then((res) => {
    if (res.code == 200) {
      contentItems.value = res.data;
    }
  });
});
</script>

<style scoped></style>
