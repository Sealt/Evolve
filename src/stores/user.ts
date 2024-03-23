import { ref } from "vue";
import { defineStore } from "pinia";
import { findAncestor } from "typescript";

export const useUserStore = defineStore(
  "user",
  () => {
    const userId = ref("");
    const userRole = ref(null);
    const token = ref("");
    const university = ref(0);

    const setToken = (newToken: string) => {
      token.value = newToken;
    };

    const removeToken = () => {
      token.value = "";
    };

    const clear = () => {
      userId.value = "";
      userRole.value = null;
      token.value = "";
      university.value = 0;
    }

    return { userId, userRole,university,token, clear,setToken, removeToken };
  },
  {
    persist: true, //持久化存储
  }
);
