import axiosClient from "./axiosClient";

const Size = {
  getAll()  {
    const url = "/api/sizes";
    return axiosClient.get(url)
  },
  fineSize(ID) {
    const url = `/api/size/ID=${ID}`;
    return axiosClient.get(url);
  }
}

export default Size;