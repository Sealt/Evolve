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
