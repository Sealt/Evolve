import request from "@/axios"

export const getEvent = async (data: any) => {
  return await request.get({
    url: "/event/getEvent",
    params: data,
  });
};
export const getEvents = async (data: any) => {
  return await request.get({
    url: "/event/getEvents",
    params: data,
  });
};
export const getNode = async (data: any) => {
  return await request.get({
    url: "/event/getNode",
    params: data,
  });
};
export const getNodes = async (data: any) => {
  return await request.get({
    url: "/event/getNodes",
    params: data,
  });
};
export const getSorts = async (data: any) => {
  return await request.get({
    url: "/event/getSorts",
    params: data,
  });
};
