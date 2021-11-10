import axiosClient from "./axiosClient";

const KhachHangAPI = {
  create (data){
    const url = "/api/customer/add";
    return axiosClient.post(url, data);
  },
  findAll(Username){
    const url = `/api/customer/Username=${Username}`;
    return axiosClient.get(url);
  }
}

export default KhachHangAPI;