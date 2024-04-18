<template>
  <router-view />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();
const wsConnect = {
  action: 1,
  msgId: "CONNECT",
  salt: {
    userId: userStore.userId,
    loginLabel: "no logic",
  },
  data: null,
};
const wsKeepAlive = {
  action: 2,
  msgId: "KEEPALIVE",
  salt: {
    userId: userStore.userId,
    loginLabel: "no logic",
  },
  data: null,
};
var socket = null;
var timeout = 10 * 1000; // 45秒一次心跳
var timeoutObj: any = null; // 心跳心跳倒计时
var serverTimeoutObj: any = null; // 心跳倒计时
var timeoutnum: any = null; // 断开 重连倒计时
var lockReconnect = false; // 防止
var websocket: any = null;
onMounted(() => {
  initWebSocket();
});
function initWebSocket() {
  // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
  let wsUrl = `ws://192.168.3.246:8082/ws`;
  websocket = new WebSocket(wsUrl);
  websocket.onopen = websocketonopen;
  websocket.onerror = websocketonerror;
  websocket.onmessage = setOnmessageMessage;
  websocket.onclose = websocketclose;
  // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  // window.onbeforeunload = that.onbeforeunload
}
function start() {
  console.log("start");
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
  start();
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
  console.log(event.data, "获得消息");
  reset();
  // 自定义全局监听事件
  window.dispatchEvent(
    new CustomEvent("onmessageWS", {
      detail: {
        data: event.data,
      },
    })
  );
  // //发现消息进入    开始处理前端触发逻辑
  // if (event.data === 'success' || event.data === 'heartBath') return
}
function websocketonopen() {
  //开启心跳
  start();
  console.log(
    "WebSocket连接成功!!!" + new Date() + "----" + websocket.readyState
  );
}
function websocketonerror(e:any) {
  console.log("WebSocket连接发生错误" + e);
}
function websocketclose(e:any) {
  websocket.close();
  clearTimeout(timeoutObj);
  clearTimeout(serverTimeoutObj);
  console.log("WebSocket连接关闭");
}
function websocketsend(messsage:any) {
  websocket.send(messsage);
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
