import request from "@/axios";

export const getBanner = async () => {
  return await request.get({
    url: "/mode/getBanner",
  });
};
// getVerifyCode
export const getVerifyCode = async () => {
  return await request.get({
    url: "/mode/getVerifyCode"
  });
};
