import axiosClient from "./axiosClient";

const promotionApi = {
  // Lấy tất cả khuyến mãi
  getAll: () => {
    const url = "/promotions";
    return axiosClient.get(url);
  },

  // Lấy chi tiết 1 khuyến mãi
  getById: (id) => {
    const url = `/promotions/${id}`;
    return axiosClient.get(url);
  },
};

export default promotionApi;