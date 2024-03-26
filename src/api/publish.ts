import request from '@/axios'
export interface IInfoType {
    userId:string,
	eventId:string,
	typed:number, // 0 info 1 experience
	content:string,
	infoSource:string,
	scopeDetail:string
}
export const getTargetList = async (data: any) => {
    return await request.get({
      url: '/publish/getTargetList',
      params: data
    })
  }
  export const pubInfo = async (data: any) => {
    return await request.upload({
      url: '/publish/info',
      data: data
    })
  }
