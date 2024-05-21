<template>
  <div class="flex flex-col h-screen">
    <NavBar
      :title="targetUser"
      left-arrow
      @click-left="router.back()"
      fixed
      class="shrink-0"
      placeholder />
    <div
      class="flex flex-col grow bg-vant-n2 p-10 gap-10 overflow-scroll h-full"
      ref="scrollPanel">
      <div class="flex flex-col" v-for="(item, index) in messageHistory">
        <div
          class="flex text-13 text-vant-t2 justify-center pb-10"
          v-if="showTime(item, index)">
          {{
            dayjs(item.createTime).calendar(null, {
              sameDay: "HH:mm", // The same day ( Today at 2:30 AM )
              lastDay: "[昨天] HH:mm", // The day before ( Yesterday at 2:30 AM )
              lastWeek: "[上周] dddd", // Last week ( Last Monday at 2:30 AM )
              sameElse: "YYYY/MM/DD HH:mm", // Everything else ( 7/10/2011 )
            })
          }}
        </div>
        <div
          class="flex items-start gap-10"
          v-if="item.fromUid != userStore.userId">
          <Image
            :src="
              item.fromUid != chatData.toUid
                ? chatData.fromUser.avatar
                : chatData.toUser.avatar
            "
            fit="cover"
            class="size-40 shrink-0"
            round />
          <div
            class="bg-white whitespace-pre-line text-14 rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px] p-10 min-h-40 max-w-300 break-all">
            {{ item.body.text }}
          </div>
          <div class="w-40 shrink-0"></div>
        </div>
        <div class="flex items-start gap-10 justify-end" v-else>
          <div class="w-40 shrink-0"></div>
          <div
            class="flex whitespace-pre-line text-14 items-center bg-vant rounded-tl-[15px] rounded-tr-[5px] rounded-bl-[15px] rounded-br-[15px] text-white p-10 min-h-40 max-w-300 break-all">
            {{ item.body.text }}
          </div>
          <Image
            :src="
              item.fromUid != chatData.toUid
                ? chatData.fromUser.avatar
                : chatData.toUser.avatar
            "
            fit="cover"
            class="size-40 shrink-0"
            round />
        </div>
      </div>
    </div>
    <div
      class="flex sticky bottom-0 bg-white border-t-[1px] gap-10 p-10 items-center shrink-0">
      <div class="flex grow bg-vant-n2 rounded-[5px] overflow-hidden">
        <Field
          v-model="messageText"
          placeholder="回复..."
          class="bg-vant-n2"
          type="textarea"
          rows="1"
          :autosize="{ maxHeight: 90, minHeight: 25 }" />
      </div>
      <div class="text-13 text-vant" @click="onPush">发送</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavBar, Field, Image, showToast } from "vant";
import { ref, onMounted, watch, nextTick, getCurrentInstance } from "vue";
import { useUserStore } from "@/stores/user";
import { getMessages, getChat } from "@/api/notify";
const router = useRouter();
const dayjs = getCurrentInstance()?.appContext.config.globalProperties.$dayjs;
const userStore = useUserStore();
const targetUser: any = ref("");
var targetId: any = "";
const messageText = ref("");
const scrollPanel: any = ref(null);
const messageHistory: any = ref([]);
const chatData: any = ref({ fromUser: {}, toUser: {} });
onMounted(() => {
  targetUser.value = router.currentRoute.value.query.username;
  targetId = router.currentRoute.value.query.userid;

  window.addEventListener("onMessageWs", getSocketData);
  window.addEventListener("onMessageOkWs", onMessageOkWs);
  getMessages({ targetUid: targetId }).then((res) => {
    if (res.code == 200) {
      res.data.forEach((element: any) => {
        messageHistory.value.push(element);
      });
      getChat({ targetUid: targetId }).then((res) => {
        if (res.code == 200) {
          chatData.value = res.data;
        }
      });
      nextTick(() => {
        scrollPanel.value.scrollTop = scrollPanel.value.scrollHeight;
      });
    }
  });
});
watch(
  () => messageHistory.value.length,
  (cur, pre) => {
    if (pre != 0 && pre != cur) {
      nextTick(() => {
        scrollPanel.value.scrollTo({
          top: scrollPanel.value.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }
);
const showTime = (item: any, index: any) => {
  if (index == 0) {
    return true;
  } else {
    if (
      dayjs(item.createTime).diff(
        messageHistory.value[index - 1]?.createTime,
        "minute"
      ) >= 2
    ) {
      return true;
    } else return false;
  }
};
const onMessageOkWs = () => {
  if (messageHistory.value.length == 0) {
    showToast("消息发送成功");
    getChat({ targetUid: targetId }).then((res) => {
      if (res.code == 200) {
        chatData.value = res.data;
      }
    });
    getMessages({ targetUid: targetId }).then((res) => {
      if (res.code == 200) {
        res.data.forEach((element: any) => {
          messageHistory.value.push(element);
        });
      }
    });
  }
};

const getSocketData = (e: any) => {
  var res = JSON.parse(e.detail.data);
  if (targetId == res.fromUid) {
    messageHistory.value.push(res);
    var wsMessage = {
      action: 11,
      msgId: "PUSH MESSAGE",
      salt: {
        userId: userStore.userId,
        loginLabel: "no logic",
      },
      data: res.id,
    };
    if (
      router.currentRoute.value.path == "/message" &&
      router.currentRoute.value.query.userid == res.fromUid
    ) {
      //console.log("发送已读信息给服务器", wsMessage);
      window.dispatchEvent(
        new CustomEvent("pushMessageWs", { detail: JSON.stringify(wsMessage) })
      );
    }
  }
};
const onPush = () => {
  if (messageText.value == "") {
    showToast("消息为空");
    return;
  }
  var wsMessage = {
    action: 10,
    msgId: "PUSH MESSAGE",
    salt: {
      userId: userStore.userId,
      loginLabel: "no logic",
    },
    data: {
      toUid: targetId,
      fromUid: userStore.userId,
      body: {
        text: messageText.value,
      },
    },
  };
  window.dispatchEvent(
    new CustomEvent("pushMessageWs", { detail: JSON.stringify(wsMessage) })
  );
  if (messageHistory.value.length != 0) {
    messageHistory.value.push(wsMessage.data);
  }
  messageText.value = "";
};
</script>

<style scoped>
.van-field {
  padding: 0px;
}

:deep(.van-field__control) {
  background-color: #f2f3f5;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
