import axiosClient from "./axiosClient";

const imageAPI = {
  create(data) {
    const url = "/api/image/add";
    return axiosClient.post(url, data);
  },
  findOne(MaSP) {
    const url = `/api/image/MaSP=${MaSP}`;
    return axiosClient.get(url);
  },
};

export default imageAPI;
