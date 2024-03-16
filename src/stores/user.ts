import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const userId = ref("");
    const token = ref("");

    const setToken = (newToken: string) => {
      token.value = newToken;
    };

    const removeToken = () => {
      token.value = "";
    };

    return { userId, token, setToken, removeToken };
  },
  {
    persist: true, //持久化存储
  }
);
