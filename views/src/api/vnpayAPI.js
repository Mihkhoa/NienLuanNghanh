import axiosClient from "./axiosClient";

const vnPayAPI = {
  create (data) {
    const url = `/create_payment_url`;
    return axiosClient.post(url, data);
  },
  getData (params) {
    const url = "/vnpay_return";
    return axiosClient.get(url, {params});
  }
}
  
export default vnPayAPI;