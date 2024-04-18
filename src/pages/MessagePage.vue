<template>
  <div class="flex flex-col h-screen">
    <NavBar
      :title="targetUser"
      left-arrow
      @click-left="router.back()"
      fixed
      class="shrink-0"
      placeholder />
    <div class="flex flex-col grow bg-vant-n2 p-10 gap-10 overflow-scroll">
      <div class="flex text-13 text-vant-t2 justify-center">
        2024-01-03 14:00
      </div>
      <div class="flex items-start gap-10" v-for="a in [1, 1, 1, 1, 1, 1]">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-40 shrink-0"
          round />
        <div
          class="bg-white rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px] p-10 min-h-40">
          一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语
        </div>
        <div class="w-40 shrink-0"></div>
      </div>
      <div class="flex items-start gap-10 justify-end">
        <div class="w-40 shrink-0"></div>
        <div
          class="flex items-center bg-vant rounded-tl-[15px] rounded-tr-[5px] rounded-bl-[15px] rounded-br-[15px] text-white p-10 min-h-40">
          一段测试话语测试话语一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语一段测试话语
        </div>
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-40 shrink-0"
          round />
      </div>
    </div>
    <div
      class="flex sticky bottom-0 bg-white border-t-[1px] gap-10 p-10 items-center shrink-0">
      <div class="flex grow bg-vant-n2 rounded-[5px] overflow-hidden">
        <Field
          v-model="messageText"
          placeholder="回复..."
          class="bg-vant-n2"
          type="textarea"
          rows="1"
          :autosize="{ maxHeight: 90, minHeight: 25 }" />
      </div>
      <div class="text-13 text-vant">发送</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar, Field, Image, showToast } from "vant";
import { ref, onMounted } from "vue";
const router = useRouter();
const targetUser: any = ref("");
const messageText = ref("");
onMounted(() => {
  targetUser.value = router.currentRoute.value.query.nickname;
  window.addEventListener('onmessageWS', getSocketData)
});
const getSocketData = (res:any) =>{
  showToast(res.data);
}
</script>

<style scoped>
.van-field {
  padding: 0px;
}

:deep(.van-field__control) {
  background-color: #f2f3f5;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
