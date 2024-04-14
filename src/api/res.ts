import request from "@/axios"

export const getSorts = async () => {
  return await request.get({
    url: "/res/getSorts",
  });
};
export const getDatabase = async (data: any) => {
    return await request.get({
      url: "/res/getDatabase",
      params: data,
    });
  };
  export const getFiles = async (data: any) => {
    return await request.get({
      url: "/res/getFiles",
      params: data,
    });
  };
  export const getResource = async (data: any) => {
    return await request.get({
      url: "/res/getResource",
      params: data,
    });
  };
  export const getProject = async (data: any) => {
    return await request.get({
      url: "/res/getProject",
      params: data,
    });
  };
  export const getProjects = async (data: any) => {
    return await request.get({
      url: "/res/getProjects",
      params: data,
    });
  };
