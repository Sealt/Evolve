<template>
  <div>
    <NavBar left-arrow title="编辑资料" @click-left="router.back()" />
    <Cell title="头像" center @click="router.push('/user/edit/avatar')">
      <template #value>
        <div class="flex items-center justify-end">
          <Image
            :src="data.avatar"
            fit="cover"
            class="size-40 shrink-0"
            round />
        </div>
      </template>
    </Cell>
    <Cell title="主页背景" center @click="router.push('/user/edit/bgimg')">
      <template #value>
        <div class="flex items-center justify-end">
          <Image
            :src="data.bgImg"
            fit="cover"
            class="size-40 rounded-[5px] overflow-hidden" />
        </div>
      </template>
    </Cell>
    <Cell
      title="用户名"
      :value="data.userName"
      @click="router.push('/user/edit/name?username=' + data.userName)" />
    <Cell title="性别" :value="data.gender" @click="showPicker = true" />
    <Cell title="签名" :value="data.bio" @click="showBioField = true" />
    <Cell title="高校" :value="data.university" />
  </div>
  <Popup v-model:show="showPicker" position="bottom" round>
    <Picker
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm" />
  </Popup>
  <Popup v-model:show="showBioField" class="p-15 h-1/3" position="bottom" round>
    <div class="flex flex-col gap-10 h-full">
      <div class="flex items-center justify-between">
        <div class="text-14">签名</div>
        <div class="text-14 text-vant" @click="saveBio">确定</div>
      </div>
      <div class="flex grow">
        <Field
          v-model="bioFieldValue"
          placeholder="介绍你自己"
          maxlength="60"
          type="textarea"
          show-word-limit
          class="grow" />
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { NavBar, Cell, Image, Picker, Popup, Field, showToast } from "vant";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getUserInfo, editGender, editBio } from "@/api/user";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const router = useRouter();
const showPicker = ref(false);
const showBioField = ref(false);
const bioFieldValue = ref("");
var data = ref({
  avatar: "",
  bgImg: "",
  userName: "",
  gender: "",
  university: "",
  bio: "",
});
const columns = [
  { text: "男", value: 1 },
  { text: "女", value: 2 },
  { text: "保密", value: 0 },
];
const onConfirm = ({ selectedOptions }: any) => {
  showPicker.value = false;
  editGender({gender: selectedOptions[0].value}).then((res) => {
    if (res.code == 200) {
      showToast("修改成功");
      data.value.gender = selectedOptions[0].text;
    }
  })
};
const saveBio = () => {
  showBioField.value = false;
  editBio({ bio: bioFieldValue.value }).then((res) => {
    if (res.code == 200) {
      showToast("修改成功");
      data.value.bio = bioFieldValue.value;
    }
  });
};
onMounted(() => {
  getUserInfo({ id: userStore.userId, infoType: "data" }).then((res) => {
    data.value = res.data;
  });
});
</script>

<style scoped>
.van-field {
  padding: 0px;
}
:deep(.van-field__value) {
  display: flex;
  flex-direction: column;
}
:deep(.van-field__body) {
  flex-grow: 1;
}
:deep(.van-field__control--min-height) {
  height: 100% !important;
}
</style>
