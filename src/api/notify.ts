import request from "@/axios"

export const getNotify = async () => {
  return await request.get({
    url: "/notify/getNotify",
  });
};

