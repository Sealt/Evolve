import request from "@/axios"

export const getInfo = async (data: any) => {
  return await request.get({
    url: "/info/getInfo",
    params: data,
  });
};
