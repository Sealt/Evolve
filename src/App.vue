<template>
  <router-view v-slot="{ Component }">
  <keep-alive include="InfoView,ResView,ChatView,MeView,SearchDetailPage">
    <component :is="Component" />
  </keep-alive>
</router-view>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { onMounted,onBeforeUnmount } from "vue";
import { useUserStore } from "./stores/user";
import { showToast, showDialog, showNotify, showLoadingToast } from "vant";
const userStore = useUserStore();
const router = useRouter();

const wsConnect = {
  action: 1,
  msgId: "CONNECT",
  salt: {
    userId: userStore.userId,
    loginLabel: userStore.token,
  },
  data: null,
};
const wsKeepAlive = {
  action: 2,
  msgId: "KEEPALIVE",
  salt: {
    userId: userStore.userId,
    loginLabel: 'nologic',
  },
  data: null,
};
var socket = null;
var timeout = 45 * 1000; // 45秒一次心跳
var timeoutObj: any = null; // 心跳倒计时
var serverTimeoutObj: any = null; // 响应倒计时
var timeoutnum: any = null; // 断开 重连倒计时
var lockReconnect = false; // 防止
var websocket: any = null;
onMounted(() => {
  initWebSocket();
  window.addEventListener("pushMessageWs", onPushMessage);
  window.addEventListener("visibilitychange", handleVisibility);
});
function handleVisibility() {
  if (document.visibilityState === 'hidden') {
    closeWebSocket();

  } else if(document.visibilityState === 'visible'){
    initWebSocket();
  }
}
function onPushMessage(e: any) {
  //console.log("即将发送WS消息：" + e.detail);
  websocket.send(e.detail);
}
function initWebSocket() {
  // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
  let wsUrl = `wss://evolve.ntrun.com:8082/ws`;
  websocket = new WebSocket(wsUrl);
  websocket.onopen = websocketonopen;
  websocket.onerror = websocketonerror;
  websocket.onmessage = setOnmessageMessage;
  websocket.onclose = websocketclose;
  // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  // window.onbeforeunload = that.onbeforeunload
}

function firstConnect() {
  //console.log("firstConnect");
  if (websocket && websocket.readyState == 1) {
    websocket.send(JSON.stringify(wsConnect));
  } else {
    reconnect();
  }
}

function heartBeat() {
  //console.log("heartBeat 计时开始");
  //清除延时器
  timeoutObj && clearTimeout(timeoutObj);
  serverTimeoutObj && clearTimeout(serverTimeoutObj);
  timeoutObj = setTimeout(() => {
    if (websocket && websocket.readyState == 1) {
      websocket.send(JSON.stringify(wsKeepAlive)); //发送消息，服务端返回信息，即表示连接良好，可以在socket的onmessage事件重置心跳机制函数
    } else {
      reconnect();
    }
    //定义一个延时器等待服务器响应，若超时，则关闭连接，重新请求server建立socket连接
    serverTimeoutObj = setTimeout(() => {
      websocket.close();
    }, timeout);
  }, timeout);
}

function reset() {
  // 重置心跳
  // 清除时间
  clearTimeout(timeoutObj);
  clearTimeout(serverTimeoutObj);
  // 重启心跳
  heartBeat();
}

function reconnect() {
  if (lockReconnect) return;
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  timeoutnum && clearTimeout(timeoutnum);
  timeoutnum = setTimeout(() => {
    initWebSocket();
    lockReconnect = false;
  }, 5000);
}

async function setOnmessageMessage(event: any) {
  //console.log("收到来自服务器WS消息", event.data);
  let returnData = JSON.parse(event.data);
  var messageData = JSON.parse(returnData.data);
  if (returnData.action == 3) {
    reset(); // 得到服务器回复，重置心跳
  }
  if (returnData.action == 5) {
    // 主动推送业务消息
    if (messageData.msgType == 1 && messageData.msgVariety == 0) {
      showDialog({
        title: "注意",
        message: "登录已过期，请重新登录",
      }).then(() => {
        userStore.clear();
        router.push("/login");
      });
    }
    if (messageData.msgType == 3) {
      if (messageData.msgVariety == 1) {
        showNotify({ type: "primary", message: "您有新的被赞" });
      }
      if (messageData.msgVariety == 2) {
        showNotify({ type: "primary", message: "您有新的评论回复" });
      }
      if (messageData.msgVariety == 3) {
        showNotify({ type: "primary", message: "您有新的粉丝关注" });
      }
      if (messageData.msgVariety == 0) {
        showDialog({
          title: "通知",
          message: messageData.msgBody,
        }).then(() => {});
      }
      window.dispatchEvent(
        new CustomEvent("onNotifyWs", {
          detail: messageData,
        })
      );
    }
  }
  if (returnData.action == 10) {
    window.dispatchEvent(
      new CustomEvent("onMessageWs", {
        detail: returnData,
      })
    );
    if (
      router.currentRoute.value.path == "/message" &&
      router.currentRoute.value.query.userid == messageData.fromUid
    ) {
      return;
    }
    showNotify({ type: "primary", message: "您有新的私信消息" });
  }
}
function websocketonopen() {
  //console.log("WebSocket 通道连接成功" + new Date() + "----" + websocket.readyState);
  firstConnect();
}
function websocketonerror(e: any) {
  //console.log("WebSocket连接发生错误" + e);
}
function websocketclose(e: any) {
  websocket.close();
  clearTimeout(timeoutObj);
  clearTimeout(serverTimeoutObj);
}

function closeWebSocket() {
  // 关闭websocket
  websocket.close();
}
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
.van-overlay {
  --van-overlay-background: rgba(0, 0, 0, 0.3);
}
</style>
