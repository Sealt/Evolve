<template>
  <NavBar
    title="校园认证"
    @click-left="router.back()"
    left-arrow
    right-text="提交"
    @click-right="onClick" />
  <div class="flex flex-col">
    <Field
      v-model="value1"
      label="校区"
      input-align="right"
      name="pattern"
      placeholder="示例：三江校区" />
    <Field
      v-model="value2"
      label="院系"
      input-align="right"
      name="validator"
      placeholder="示例：信息工程学院" />
    <Field
      v-model="value3"
      label="专业"
      input-align="right"
      name="validator"
      placeholder="示例：电气工程及自动化" />
    <Field
      v-model="value4"
      label="班级"
      input-align="right"
      name="asyncValidator"
      placeholder="示例：231" />
    <Field
      v-model="value5"
      label="姓名"
      input-align="right"
      name="asyncValidator"
      placeholder="示例：史诗琪" />
    <Field
      v-model="value6"
      label="学号"
      input-align="right"
      name="asyncValidator"
      placeholder="示例：1120231234" />
    <Field name="uploader" label="证明材料" input-align="right">
      <template #input> <Uploader v-model="imgValue" max-count="1" /> </template
    ></Field>
  </div>
</template>

<script setup lang="ts">
import { NavBar, Field, Form, Uploader, showToast } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { submitAuth } from "@/api/user";
const router = useRouter();
const imgValue:any = ref([]);
const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
const value5 = ref("");
const value6 = ref("");
const onClick = () => {
  if (
    !value1.value ||
    !value2.value ||
    !value3.value ||
    !value4.value ||
    !value5.value ||
    !value6.value ||
    imgValue.value.length == 0
  ) {
    showToast("请填写完整信息");
    return;
  }
  var data = new FormData();
  data.append("file", imgValue.value[0].file);
  var info = {
    campus: value1.value,
    collage: value2.value,
    major: value3.value,
    clazz: value4.value,
    name: value5.value,
    cardid: value6.value,
  };
  data.append("info", JSON.stringify(info));
  submitAuth(data).then((res) => {
    if (res.data.code == 200) {
      showToast("提交成功");
      router.back();
    } else {
      showToast(res.data.message);
    }
  });
};
</script>

<style scoped></style>
