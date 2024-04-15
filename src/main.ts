import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import "vant/lib/index.css";
import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { Lazyload } from "vant";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(Lazyload,{
    preLoad: 1
});
app.config.globalProperties.$dayjs = dayjs;
app.mount("#app");
