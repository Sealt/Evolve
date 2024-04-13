import request from "@/axios"

export const getInfos = async (data: any) => {
  return await request.get({
    url: "/flow/getInfos",
    params: data,
  });
};
export const getExps = async (data: any) => {
  return await request.get({
    url: "/flow/getExps",
    params: data,
  });
};
export const getRes = async (data: any) => {
  return await request.get({
    url: "/flow/getRes",
    params: data,
  });
};
export const getByEvent = async (data: any) => {
  return await request.get({
    url: "/flow/getByEvent",
    params: data,
  });
};
export const getByUser = async (data: any) => {
  return await request.get({
    url: "/flow/getByUser",
    params: data,
  });
};
export const getByProject = async (data: any) => {
  return await request.get({
    url: "/flow/getByProject",
    params: data,
  });
};
