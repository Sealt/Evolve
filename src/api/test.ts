import request from '@/axios'

export interface ITestDataType {
    userAccount: string,
    userPassword: string
}

/**
 * 获取测试数据
 * @param params 分页参数
 * @returns
 */
export const getTestData = async (data: ITestDataType) => {
  return await request.get({
    url: '/user/getLoginUser',
  })
}
