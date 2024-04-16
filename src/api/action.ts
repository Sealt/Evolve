import request from "@/axios"

export const comment = async (data: any) => {
  return await request.post({
    url: "/action/comment",
    data: data,
  });
};
export const getComment = async (data: any) => {
  return await request.get({
    url: "/action/getComment",
    params: data,
  });
};
export const like = async (data: any) => {
  return await request.get({
    url: "/action/like",
    params: data,
  });
};
export const unLike = async (data: any) => {
  return await request.get({
    url: "/action/unLike",
    params: data,
  });
};