import axiosClient from "./axiosClient";

const tradeMarkAPI = {
  getAll() {
    const url = "/api/trademarks";
    return axiosClient.get(url);
  },
  findOne(MaTH) {
    const url = `/api/trademark/MaTH=${MaTH}`;
    return axiosClient.get(url);
  },
};

export default tradeMarkAPI;
