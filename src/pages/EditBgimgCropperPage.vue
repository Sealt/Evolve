<template>
  <div class="flex flex-col h-screen">
    <NavBar
      left-arrow
      title="裁剪"
      @click-left="router.back()"
      rightText="确定"
      placeholder
      @clickRight="onCropper" />
    <div class="flex grow">
      <vueCropper
        ref="cropper"
        :img="router.currentRoute.value.query.src"
        :outputSize="0.7"
        :info="false"
        limitMinSize="64"
        autoCrop
        centerBox
        :fixed="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavBar, Image, Button } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { uploadBgImg } from "@/api/user";
const router = useRouter();
const cropper = ref();
const onCropper = () => {
  cropper.value.getCropBlob((data: Blob) => {
    var bgimg = new FormData();
    bgimg.append("bgimg", data);
    uploadBgImg(bgimg).then((res) => {
      router.replace({
        name: "editBgimgPage",
        query: { img: res.data.data, status: "done" },
      });
    });
  });
};
</script>

<style scoped></style>
