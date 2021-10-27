import axiosClient from "./axiosClient";

const importIncoiceAPI = {
  create (data){
    const url = "/api/importInvoice/add";
    return axiosClient.post(url, data);
  }
}

export default importIncoiceAPI;