import axiosClient from "./axiosClient";

const cartAPI = {
  create(data) {
    const url = "/api/cart/add";
    return axiosClient.post(url, data);
  },

  DeleteOne(Username, MaSP) {
    const url = `/api/cart/delete/Username=${Username}/MaSP=${MaSP}`;
    return axiosClient.delete(url);
  },

  fineAll(Username) {
    const url = `/api/carts/Username=${Username}`;
    return axiosClient.get(url);
  },

  sumProduct(Username) {
    const url = `/api/carts/sumproduct/Username=${Username}`;
    return axiosClient.get(url);
  },

  fineOne(Username, MaSP) {
    const url = `/api/cart/fine/Username=${Username}/MaSP=${MaSP}`;
    return axiosClient.get(url);
  },
  updateOne(data) {
    const url = "/api/cart/update";
    return axiosClient.put(url, data);
  },
};

export default cartAPI;
