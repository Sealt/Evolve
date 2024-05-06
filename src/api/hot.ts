import request from "@/axios"

export const getHotList = async (data:any) => {
  return await request.get({
    url: "/hot/getHotList",
    params: data
  });
};

export const getHotFlow = async () => {
  return await request.get({
    url: "/hot/getHotFlow",
  });
};

export const getHotSearch = async () => {
  return await request.get({
    url: "/hot/getHotSearch",
  });
};

export const getHotEvents = async () => {
  return await request.get({
    url: "/hot/getHotEvents",
  });
};
