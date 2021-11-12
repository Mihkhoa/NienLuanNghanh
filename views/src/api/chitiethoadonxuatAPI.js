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
  },
  findMaSP(MaSP){
    const url = `/api/chitiethoadonxuat/findMaSP/MaSP=${MaSP}`;
    return axiosClient.get(url);
  },
  groupByMaSP(){
    const url = "/api/chitiethoadonxuat/GroupBy/MaSP";
    return axiosClient.get(url);
  }
};

export default ChiTietHoaDonXuatAPI;
