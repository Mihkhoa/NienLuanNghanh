import axiosClient from "./axiosClient";

const ChiTietHoaDonXuatAPI = {
  create(data) {
    const url = "/api/chitiethoadonxuat/add";
    return axiosClient.post(url, data);
  },
  findMHD(MaHDX){
    const url = `/api/chitiethoadonxuat/MaHDX=${MaHDX}`;
    return axiosClient.get(url);
  },
  sumOrder(MaHDX){
    const url = `/api/chitiethoadonxuat/SumOrder/MaHDX=${MaHDX}`;
    return axiosClient.get(url);
  }
};

export default ChiTietHoaDonXuatAPI;
