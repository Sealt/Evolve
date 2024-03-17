<template>
  <NavBar title="校园认证" @click-left="router.back()" left-arrow right-text="提交" @click-right="onClick"/>
  <div class="flex flex-col">
      <Field
        v-model="value1"
        label="校区"
        input-align="right"
        name="pattern"
        placeholder="示例：三江校区"
         />
      <Field
        v-model="value2"
        label="院系"
        input-align="right"
        name="validator"
        placeholder="示例：信息工程学院"
         />
      <Field
        v-model="value3"
        label="专业"
        input-align="right"
        name="validator"
        placeholder="示例：电气工程及自动化"
         />
      <Field
        v-model="value4"
        label="班级"
        input-align="right"
        name="asyncValidator"
        placeholder="示例：231"
         />
      <Field
        v-model="value5"
        label="姓名"
        input-align="right"
        name="asyncValidator"
        placeholder="示例：史诗琪"
        />
      <Field
        v-model="value6"
        label="学号"
        input-align="right"
        name="asyncValidator"
        placeholder="示例：1120231234"
         />
      <Field name="uploader" label="证明材料" input-align="right">
        <template #input>
          <Uploader v-model="imgValue" max-count="1" /> </template
      ></Field>
    </div>
</template>

<script setup lang="ts">
import { NavBar, Field, Form, Uploader, showToast } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const imgValue = ref([]);
const value1 = ref("");
const value2 = ref("");
const value3 = ref("abc");
const value4 = ref("");
const value5 = ref("");
const value6 = ref("");
const onClick = () => {
  showToast('success')
  router.back()
};
</script>

<style scoped></style>
