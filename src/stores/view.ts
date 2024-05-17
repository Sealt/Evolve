import { ref } from "vue";
import { defineStore } from "pinia";

export const useViewStore = defineStore(
  "view",
  () => {
    const infoScrollTops = ref([0,0,0,0,0,0])
    const resScrollTops = ref([0,0,0])

    return { infoScrollTops, resScrollTops};
  }
);
