import { createRouter, createWebHistory } from "vue-router";
import InfoView from "../views/InfoView.vue";
import { useUserStore } from "@/stores/user";
import { showDialog } from "vant";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "infoview",
      component: InfoView,
    },
    {
      path: "/login",
      name: "loginview",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/res",
      name: "resview",
      component: () => import("../views/ResView.vue"),
    },
    {
      path: "/chat",
      name: "chatview",
      component: () => import("../views/ChatView.vue"),
    },
    {
      path: "/me",
      name: "meview",
      component: () => import("../views/MeView.vue"),
    },
    {
      path: "/user/:id",
      name: "userpage",
      component: () => import("../pages/UserPage.vue"),
    },
    {
      path: "/user/edit",
      name: "userdatapage",
      component: () => import("../pages/UserDataPage.vue"),
    },
    {
      path: "/user/auth",
      name: "userauthpage",
      component: () => import("../pages/UserAuthPage.vue"),
    },
    {
      path: "/user/account",
      name: "useraccountpage",
      component: () => import("../pages/UserAccountPage.vue"),
    },
    {
      path: "/event/:id",
      name: "eventpage",
      component: () => import("../pages/EventPage.vue"),
    },
    {
      path: "/project/:id",
      name: "projectpage",
      component: () => import("../pages/ProjectPage.vue"),
    },
    {
      path: "/info/:id",
      name: "infopage",
      component: () => import("../pages/InfoCardPage.vue"),
    },
    {
      path: "/node/:id",
      name: "nodepage",
      component: () => import("../pages/NodeCardPage.vue"),
    },
    {
      path: "/publish",
      name: "publishview",
      component: () => import("../views/PublishView.vue"),
    },
    {
      path: "/search",
      name: "searchpage",
      component: () => import("../pages/SearchPage.vue"),
    },
    {
      path: "/events",
      name: "eventspage",
      component: () => import("../pages/EventSortPage.vue"),
    },
    {
      path: "/detail/:type",
      name: "detailpage",
      component: () => import("../pages/DetailPage.vue"),
    },
    {
      path: "/message",
      name: "messagepage",
      component: () => import("../pages/MessagePage.vue"),
    },
    {
      path: "/message/push",
      name: "pushpage",
      component: () => import("../pages/MessagePushPage.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem("token");
  //在前置路由中解构对象就对了
  const tokenStore = useUserStore();
  console.log(tokenStore.token)
  if (to.name === "loginview") {
    next();
  } else if (tokenStore.token) {
    next();
  } else {
    showDialog({
      title: "欢迎",
      message:
        "欢迎使用高校研学服务平台，请点击确认按钮，注册或登录后使用信息和资源。",
    }).then(() => {
      next({
        name: "loginview",
      });
    });
  }
});

export default router;
