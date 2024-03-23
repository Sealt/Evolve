import { createRouter, createWebHistory } from "vue-router";
import InfoView from "../views/InfoView.vue";
import { useUserStore } from "@/stores/user";
import { showDialog } from "vant";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "infoView",
      component: InfoView,
    },
    {
      path: "/login",
      name: "loginView",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/res",
      name: "resView",
      component: () => import("../views/ResView.vue"),
    },
    {
      path: "/chat",
      name: "chatView",
      component: () => import("../views/ChatView.vue"),
    },
    {
      path: "/me",
      name: "meView",
      component: () => import("../views/MeView.vue"),
    },
    {
      path: "/user/:id",
      name: "userPage",
      component: () => import("../pages/UserPage.vue"),
    },
    {
      path: "/user/edit",
      name: "userDataPage",
      component: () => import("../pages/UserDataPage.vue"),
    },
    {
      path: "/user/edit/name",
      name: "editUserNamePage",
      component: () => import("../pages/EditUserNamePage.vue"),
    },
    {
      path: "/user/edit/pwd",
      name: "editPwdPage",
      component: () => import("../pages/EditPwdPage.vue"),
    },
    {
      path: "/user/edit/avatar",
      name: "editAvatarPage",
      component: () => import("../pages/EditAvatarPage.vue"),
    },
    {
      path: "/user/edit/avatar/cropper",
      name: "avatarCropperPage",
      component: () => import("../pages/EditAvatarCropperPage.vue"),
    },
    {
      path: "/user/edit/avatar/cropper",
      name: "bgimgCropperPage",
      component: () => import("../pages/EditBgimgCropperPage.vue"),
    },
    {
      path: "/user/edit/bgimg",
      name: "editBgimgPage",
      component: () => import("../pages/EditBgimgPage.vue"),
    },
    {
      path: "/user/auth",
      name: "userAuthPage",
      component: () => import("../pages/UserAuthPage.vue"),
    },
    {
      path: "/user/auth/do",
      name: "userAuthDoPage",
      component: () => import("../pages/UserAuthDoPage.vue"),
    },
    {
      path: "/user/account",
      name: "userAccountPage",
      component: () => import("../pages/UserAccountPage.vue"),
    },
    {
      path: "/event/:id",
      name: "eventPage",
      component: () => import("../pages/EventPage.vue"),
    },
    {
      path: "/project/:id",
      name: "projectPage",
      component: () => import("../pages/ProjectPage.vue"),
    },
    {
      path: "/info/:id",
      name: "infoPage",
      component: () => import("../pages/InfoCardPage.vue"),
    },
    {
      path: "/node/:id",
      name: "nodePage",
      component: () => import("../pages/NodeCardPage.vue"),
    },
    {
      path: "/publish",
      name: "publishView",
      component: () => import("../views/PublishView.vue"),
    },
    {
      path: "/search",
      name: "searchPage",
      component: () => import("../pages/SearchPage.vue"),
    },
    {
      path: "/events",
      name: "eventsPage",
      component: () => import("../pages/EventSortPage.vue"),
    },
    {
      path: "/detail/:type",
      name: "detailPage",
      component: () => import("../pages/DetailPage.vue"),
    },
    {
      path: "/message",
      name: "messagePage",
      component: () => import("../pages/MessagePage.vue"),
    },
    {
      path: "/message/push",
      name: "pushPage",
      component: () => import("../pages/MessagePushPage.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem("token");
  //在前置路由中解构对象就对了
  const userStore = useUserStore();
  if (to.name === "loginView") {
    next();
  } else if (userStore.token && userStore.university != 0) {
    next();
  }
 else {
    showDialog({
      title: "欢迎",
      message:
        "欢迎使用高校研学服务平台，请点击确认按钮，注册或登录后使用信息和资源。",
    }).then(() => {
      next({
        name: "loginView",
      });
    });
  }
});

export default router;
