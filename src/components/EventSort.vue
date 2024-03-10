<template>
  <div class="grid grid-cols-5 grid-rows-2 bg-white rounded-[10px] px-10 pb-10 pt-15 items-center gap-x-10">
    <div @click="onClick" class="flex flex-col items-center active:bg-vant-n2 pt-5 rounded-[10px]" v-for="a in [1,1,1,1,1,1,1,1,1,1]">
        <Image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          fit="cover"
          class="size-32 inline-flex"
          radius="3" />
          <div class="text-13 pt-4">品类</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from "vant";
import { useRouter } from "vue-router";
const router = useRouter()
const onClick = () => {
  router.push('/events')
}
</script>

<style scoped></style>
