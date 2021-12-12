import axiosClient from "./axiosClient";

const importIncoiceAPI = {
  create(data) {
    const url = "/api/importInvoice/add";
    return axiosClient.post(url, data);
  },
  fineOne(MaSP) {
    const url = `/api/importInvoice/MaSP=${MaSP}`;
    return axiosClient.get(url);
  },
  sumGiaSPN() {
    const url = "/api/importInvoice/sumGiaSPN";
    return axiosClient.get(url);
  },
  update(data){
    const url = "/api/importInvoice/update";
    return axiosClient.put(url, data);
  }
};

export default importIncoiceAPI;
