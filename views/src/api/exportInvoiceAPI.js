import axiosClient from "./axiosClient";

const exportInvoiceAPI = {
  create (data){
    const url = "/api/exportInvoice/add";
    return axiosClient.post(url, data);
  },
  findAll(){
    const url = `/api/exportInvoices`;
    return axiosClient.get(url);
  },
  findMaKH(MaKH){
    const url = `/api/exportInvoices/MaKH=${MaKH}`;
    return axiosClient.get(url);
  },
  findMaHDX(){
    const url = "/api/exportInvoice/MaHDX";
    return axiosClient.get(url);
  },
  findMaKH(MaKH){
    const url = `/api/exportInvoice/MaKH=${MaKH}`;
    return axiosClient.get(url);
  },
  updateTTHD(MaHDX, data){
    const url = `/api/exportInvoice/updateTTHD/MaHDX=${MaHDX}`;
    return axiosClient.put(url, data);
  }
}

export default exportInvoiceAPI;