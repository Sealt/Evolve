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
export const follow = async (data: any) => {
  return await request.get({
    url: "/action/follow",
    params: data,
  });
};
export const unFollow = async (data: any) => {
  return await request.get({
    url: "/action/unFollow",
    params: data,
  });
};
export const gain = async (data: any) => {
  return await request.get({
    url: "/action/gain",
    params: data,
  });
};
// star
export const star = async (data: any) => {
  return await request.get({
    url: "/action/star",
    params: data,
  });
};
export const unStar = async (data: any) => {
  return await request.get({
    url: "/action/unStar",
    params: data,
  });
};
// linkToNode
export const linkToNode = async (data: any) => {
  return await request.get({
    url: "/action/linkToNode",
    params: data,
  });
};
// unLinkFromNode
export const unLinkFromNode = async (data: any) => {
  return await request.get({
    url: "/action/unLinkFromNode",
    params: data,
  });
};
// linkToDatabase
export const linkToDatabase = async (data: any) => {
  return await request.get({
    url: "/action/linkToDatabase",
    params: data,
  });
};
// unLinkFromDatabase
export const unLinkFromDatabase = async (data: any) => {
  return await request.get({
    url: "/action/unLinkFromDatabase",
    params: data,
  });
};
