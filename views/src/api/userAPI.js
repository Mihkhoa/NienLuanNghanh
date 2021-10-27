import axiosClient from './axiosClient';

const userAPI = {
  register (data){
    const url = '/api/user/signup';
    return axiosClient.post(url,data);
  },
  login (data){
    const url = '/api/user/signin';
    return axiosClient.post(url,data);
  },
  findUser (data){
    const params = data.username;
    const url = `/api/user/${params}`;
    return axiosClient.get(url);
  }
}

export default userAPI;