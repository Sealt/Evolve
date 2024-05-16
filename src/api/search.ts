import request from "@/axios"

export const searchInfo = async (data: any) => {
  return await request.get({
    url: "/search/info",
    params: data,
  });
};

export const searchRes = async (data: any) => {
  return await request.get({
    url: "/search/res",
    params: data,
  });
};

export const searchUser = async (data: any) => {
  return await request.get({
    url: "/search/user",
    params: data,
  });
};
export const searchNode = async (data: any) => {
  return await request.get({
    url: "/search/node",
    params: data,
  });
};
export const searchExp = async (data: any) => {
  return await request.get({
    url: "/search/exp",
    params: data,
  });
};
export const getHistory = async () => {
  return await request.get({
    url: "/search/history",
  });
};
// getProjectSubs
export const getProjectSubs = async (data: any) => {
  return await request.get({
    url: "/search/getProjectSubs",
    params: data,
  });
};
