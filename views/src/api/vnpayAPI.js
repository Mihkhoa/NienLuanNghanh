import axiosClient from "./axiosClient";

const vnPayAPI = {
  create (data) {
    const url = "/create_payment_url";
    return axiosClient.post(url, data);
  },
  getData () {
    const url = "/vnpay_return";
    return axiosClient.get(url);
  }
}
  
export default vnPayAPI;