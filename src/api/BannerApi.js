import axiosClient from './axiosClient';

const BannerApi = {
  // Lấy danh sách banner theo vị trí
  getBannersByPosition: async (position = 'Home') => {
    try {
      const response = await axiosClient.get('/banners', {
        params: {
          position: position,
          status: 'Active',
          sortBy: 'createdAt',
          order: 'desc'
        }
      });
      
      return {
        success: true,
        data: response.data.banners || response.data,
        message: 'Lấy dữ liệu banner thành công'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message
      };
    }
  },

  // Lấy tất cả banner
  getAllBanners: async () => {
    try {
      const response = await axiosClient.get('/banners');
      
      return {
        success: true,
        data: response.data.banners || response.data,
        message: 'Lấy tất cả banner thành công'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message
      };
    }
  },

  // Lấy banner theo ID
  getBannerById: async (bannerId) => {
    try {
      const response = await axiosClient.get(`/banners/${bannerId}`);
      
      return {
        success: true,
        data: response.data.banner || response.data,
        message: 'Lấy banner thành công'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message
      };
    }
  },

 
};

export default BannerApi;