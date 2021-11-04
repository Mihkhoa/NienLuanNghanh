import axiosClient from "./axiosClient";

const cartAPI = {
  create(data) {
    const url = "/api/cart/add";
    return axiosClient.post(url, data);
  },

  DeleteOne(MaGH) {
    const url = `/api/cart/delete/MaGH=${MaGH}`;
    return axiosClient.delete(url);
  },

  DeleteAll(Username) {
    const url = `/api/cart/delete/Username=${Username}`;
    return axiosClient.delete(url);
  },

  findAll(Username) {
    const url = `/api/carts/Username=${Username}`;
    return axiosClient.get(url);
  },

  sumProduct(Username) {
    const url = `/api/carts/sumproduct/Username=${Username}`;
    return axiosClient.get(url);
  },

  sumOrder(Username){
    const url = `/api/cart/sumorder/Username=${Username}`;
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

  innerJoinProduct(Username){
    const url = `/api/cart/innerjoin/product/Username=${Username}`;
    return axiosClient.get(url);
  }
};

export default cartAPI;
