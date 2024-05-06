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
export const getSorts = async () => {
  return await request.get({
    url: "/event/getSorts"
  });
};
// getFollowByUser
export const getFollowByUser = async () => {
  return await request.get({
    url: "/event/getFollowByUser"
  });
};
// getSortCard
export const getSortCard = async () => {
  return await request.get({
    url: "/event/getSortCard"
  });
};
// getNewNodes
export const getNewNodes = async () => {
  return await request.get({
    url: "/event/getNewNodes"
  });
};
// getNewEvents
export const getNewEvents = async () => {
  return await request.get({
    url: "/event/getNewEvents"
  });
};
// getHotEvents
export const getHotEvents = async () => {
  return await request.get({
    url: "/event/getHotEvents"
  });
};
