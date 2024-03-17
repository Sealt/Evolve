<template>
  <div class="flex flex-col h-screen">
    <NavBar
      left-arrow
      title="编辑头像"
      @click-left="router.currentRoute.value.query.status ? router.go(-2) : router.back()" />
    <div class="flex flex-col grow items-center gap-20 p-20">
      <Image :src="imgSrc" fit="cover" class="size-128 shrink-0" round />
      <Button type="primary" size="small" @click="onSelect">选择图片</Button>
      <input
        ref="imgUploader"
        type="file"
        class="hidden"
        accept="image/png, image/jpeg"
        @change="onChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavBar, Image, Button } from "vant";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { ref, onMounted } from "vue";

// 使用组件
const showCropper = ref(false);
const router = useRouter();
var data = ref({});
const imgUploader = ref();
const imgSrc = ref();
const onSelect = () => {
  imgUploader.value.click();
};
const onChange = (e: any) => {
  router.push({
    name: "avatarCropperPage",
    query: { src: window.URL.createObjectURL(e.target.files[0]) },
  });
};

onMounted(() => {
  if (router.currentRoute.value.query) {
    imgSrc.value = router.currentRoute.value.query.img;
  }
});
</script>

<style scoped></style>
