import axiosClient from "./axiosClient";

const productAPI = {
  create(data) {
    const url = "/api/product/add";
    return axiosClient.post(url, data);
  },
  findOne(MaSP) {
    const url = `/api/product/MaSP=${MaSP}`;
    return axiosClient.get(url);
  },
  searchProduct(TenSP) {
    const url = `/api/product/search/TenSP=${TenSP}`;
    return axiosClient.get(url);
  },
  getAll() {
    const url = "/api/products";
    return axiosClient.get(url);
  },
  sortByProduct(Sort) {
    const url = `/api/products/Sort=${Sort}`;
    return axiosClient.get(url);
  },
  filterMaTH_Sort(Sort, MaTH) {
    const url = `/api/products/Sort=${Sort}/MaTH=${MaTH}`;
    return axiosClient.get(url);
  },
  getInnerJoinImage(){
    const url = "/api/innerjoin/image";
    return axiosClient.get(url);
  },
  getInnerJoinTrademark() {
    const url = "/api/innerjoin/iminvoice";
    return axiosClient.get(url);
  },
  findOneIJTrademark(MaSP) {
    const url = `/api/innerjoin/iminvoice=${MaSP}`;
    return axiosClient.get(url);
  },
  delete(MaSP) {
    const url = `/api/product/MaSP=${MaSP}`;
    return axiosClient.delete(url);
  },
};

export default productAPI;
