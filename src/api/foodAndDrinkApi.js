import axiosClient from './axiosClient';

const foodAndDrinkApi = {
  // Lấy tất cả sản phẩm (chỉ Active + IsAvailable)
  getAll: () => axiosClient.get('/foodanddrinks'),

  getById: (id) => axiosClient.get(`/foodanddrinks/${id}`),
};

export default foodAndDrinkApi;
