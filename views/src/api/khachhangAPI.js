import axiosClient from "./axiosClient";

const KhachHangAPI = {
  create (data){
    const url = "/api/customer/add";
    return axiosClient.post(url, data);
  },
  findAll(Username){
    const url = `/api/customer/Username=${Username}`;
    return axiosClient.get(url);
  },
  findKhacHang(MaKH){
    const url = `/api/customer/MaKH=${MaKH}`;
    return axiosClient.get(url);
  },
  updateKhacHang(data){
    const url = "/api/customer/updateKhachHang";
    return axiosClient.put(url, data);
  },
}

export default KhachHangAPI;