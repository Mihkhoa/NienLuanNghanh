import axiosClient from "./axiosClient";

const productTypeAPI = {
  innerJoinWareHouse (MaSP) {
    const url = `/api/productType/innerJoin/MaLSP=${MaSP}`;
    return axiosClient.get(url);
  }
}

export default productTypeAPI;