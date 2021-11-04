import axiosClient from "./axiosClient";

const exportInvoiceAPI = {
  create (data){
    const url = "/api/exportInvoice/add";
    return axiosClient.post(url, data);
  },
  fineOne(MaSP){
    const url = `/api/exportInvoice/MaSP=${MaSP}`;
    return axiosClient.get(url);
  }
}

export default exportInvoiceAPI;