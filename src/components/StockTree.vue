<template>
    <TreeSelect
      v-model:main-active-index="activeIndex"
      class="grow"
      :items="items">
      <template #content>
        <div>
          <LittleCard
            v-for="a in [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]"
            class="m-5"
            image="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            type="project"
            hot="1"
            detail="9999万关注 1258讨论"
            title="考研"
            follow="1"
            to="125153" />
        </div> </template
    ></TreeSelect>
</template>

<script setup lang="ts">
import { TreeSelect } from "vant";
import LittleCard from "./LittleCard.vue";
import { ref } from "vue";
const items = [{ text: "升学" }, { text: "期末考试" }];
const activeIndex = ref(0);
</script>

<style>
:root:root {
    --van-tree-select-nav-item-padding: 10px;
    --van-tree-select-nav-background: #ffffff;
    --van-tree-select-content-background: #f2f3f5;
    --van-sidebar-selected-background: #f2f3f5;
    --van-sidebar-background: #ffffff;
    --van-tree-select-item-height: 32px;
    --van-sidebar-line-height: 16px;
    --van-sidebar-selected-border-width: 3px;
    --van-sidebar-selected-border-height: 100%;
}
.van-tree-select__nav {
    flex: 1 0 0;
}
.van-tree-select__content {
    flex: 0 0 78%;
}
.van-sidebar-item {
    display: flex;
    justify-content: center;
}
</style>
