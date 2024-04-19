import request from "@/axios";

export const getNotify = async () => {
  return await request.get({
    url: "/notify/getNotify",
  });
};
export const checkComment = async (data: any) => {
  return await request.get({
    url: "/notify/checkComment",
    params: data,
  });
};
export const getLikesAndGains = async () => {
  return await request.get({
    url: "/notify/getLikesAndGains",
  });
};
export const getFans = async () => {
  return await request.get({
    url: "/notify/getFans",
  });
};
export const getChats = async () => {
  return await request.get({
    url: "/notify/getChats",
  });
};
export const getMessages = async (data:any) => {
  return await request.get({
    url: "/notify/getMessages",
    params: data
  });
};
export const getChat = async (data:any) => {
  return await request.get({
    url: "/notify/getChat",
    params: data
  });
};
