import request from '@/axios'

export interface ILoginByAccountType {
	userAccount:string,
	userPassword:string
}

export interface ILoginBySmsType {
	code?:string,
  mobile:string,
  scene?:string
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
