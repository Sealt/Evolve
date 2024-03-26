import request from '@/axios'

export interface ILoginByAccountType {
	userAccount:string,
	userPassword:string
}

export interface ILoginBySmsType {
	code?:string,
  mobile?:string,
  scene?:string
}
export interface IUserRequestType{
  id?: number;
  infoType?: string;
  userName?: string;
  gender?: number;
  bio?: string;
  userPassword?: string;
  checkToken?: string;
}

/**
 * 获取测试数据
 * @param params 分页参数
 * @returns
 */
export const loginByAccount = async (data: ILoginByAccountType) => {
  return await request.post({
    url: '/user/loginByAccount',
    data: data
  })
}
export const loginBySms = async (data: ILoginBySmsType) => {
  return await request.post({
    url: '/user/loginBySms',
    data: data
  })
}
export const getSms = async (data: ILoginBySmsType) => {
  return await request.post({
    url: '/user/getSms',
    data: data
  })
}
export const checkSms = async (data: any) => {
  return await request.post({
    url: '/user/checkSms',
    data: data
  })
}
export const getUniversity = async (data:any) => {
  return await request.get({
    url: '/user/getUniversity',
    params: data
  })
}
export const signWithUniversity = async (data:any) => {
  return await request.get({
    url: '/user/signWithUniversity',
    params: data
  })
}
export const logout = async () => {
  return await request.get({
    url: '/user/logout',
  })
}
export const uploadAvatar = async (data:any) => {
  return await request.upload({
    url: '/user/uploadAvatar',
    data: data
  })
}
export const uploadBgImg = async (data:any) => {
  return await request.upload({
    url: '/user/uploadBgImg',
    data: data
  })
}
export const submitAuth = async (data:any) => {
  return await request.upload({
    url: '/user/submitAuth',
    data: data
  })
}
export const editUserName = async (data:any) => {
  return await request.post({
    url: '/user/editUserName',
    data: data
  })
}
export const editGender = async (data:any) => {
  return await request.post({
    url: '/user/editGender',
    data: data
  })
}
export const editBio = async (data:any) => {
  return await request.post({
    url: '/user/editBio',
    data: data
  })
}
export const editPassword = async (data:any) => {
  return await request.post({
    url: '/user/editPassword',
    data: data
  })
}
export const getFollow = async (data:any) => {
  return await request.get({
    url: '/user/getFollow',
    params: data
  })
}
export const getFans = async (data:any) => {
  return await request.get({
    url: '/user/getFans',
    params: data
  })
}
export const getUserInfo = async (data:any) => {
  return await request.post({
    url: '/user/getUserInfo',
    data: data
  })
}
