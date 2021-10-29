import axiosClient from "./axiosClient";

const importIncoiceAPI = {
  create (data){
    const url = "/api/importInvoice/add";
    return axiosClient.post(url, data);
  },
  fineOne(MaSP){
    const url = `/api/importInvoice/MaSP=${MaSP}`;
    return axiosClient.get(url);
  }
}

export default importIncoiceAPI;