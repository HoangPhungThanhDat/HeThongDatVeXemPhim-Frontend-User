import axiosClient from './axiosClient';

const movieApi = {
  // ==================== API MỚI (CÓ ĐẦY ĐỦ THÔNG TIN) ====================

  /**
   * ✅ Lấy phim đang chiếu
   * Endpoint: GET /movies/now-showing/all
   */
  getNowShowing: async () => {
    try {
      const response = await axiosClient.get('/movies/now-showing/all');
      const movies = Array.isArray(response.data) ? response.data : [];
      return {
        success: true,
        data: movies,
        total: movies.length,
        message: 'Lấy dữ liệu thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        total: 0,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy phim sắp chiếu
   * Endpoint: GET /movies/coming-soon
   */
  getComingSoonMovies: async (limit = 10) => {
    try {
      const response = await axiosClient.get('/movies/coming-soon');
      const movies = Array.isArray(response.data) ? response.data : [];
      return {
        success: true,
        data: movies,
        total: movies.length,
        message: 'Lấy phim sắp chiếu thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy phim mới nhất
   * Endpoint: GET /movies/latest
   */
  getLatestMovies: async (limit = 10) => {
    try {
      const response = await axiosClient.get('/movies/latest', {
        params: { limit },
      });
      const movies = Array.isArray(response.data) ? response.data : [];
      return {
        success: true,
        data: movies,
        total: movies.length,
        message: 'Lấy phim mới nhất thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy chi tiết phim
   * Endpoint: GET /movies/{id}/detail (nhận cả ID số lẫn slug)
   */
  getMovieDetail: async (slugOrId) => {
    try {
      const data = await axiosClient.get(`/movies/${slugOrId}/detail`);
      return {
        success: true,
        data: data?.data || data, // handle cả 2 dạng response
        message: 'Lấy chi tiết phim thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  
  getShowtimes: async (movieId) => {
    try {
      const res = await axiosClient.get(`/movies/${movieId}/showtimes`);
      return { 
        success: true, 
        data: res, 
        message: 'Lấy lịch chiếu thành công' 
      };
    } catch (error) {
      return {
        success: false,
        data: { CinemasByCity: {} },
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy filters phim đang chiếu
   * Endpoint: GET /movies/now-showing/filters
   */
  getNowShowingFilters: async () => {
    try {
      const response = await axiosClient.get('/movies/now-showing/filters');
      return {
        success: true,
        data: response.data || { genres: [], directors: [], actors: [], total_movies: 0 },
        message: 'Lấy filters thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: { genres: [], directors: [], actors: [], total_movies: 0 },
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Tìm kiếm phim đang chiếu
   * Endpoint: GET /movies/now-showing/search?keyword=...
   */
  searchNowShowing: async (keyword) => {
    try {
      const response = await axiosClient.get('/movies/now-showing/search', {
        params: { keyword },
      });
      const movies = Array.isArray(response.data) ? response.data : [];
      return {
        success: true,
        data: movies,
        total: movies.length,
        keyword,
        message: 'Tìm kiếm thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lọc phim đang chiếu
   * Endpoint: POST /movies/now-showing/filter
   */
  filterNowShowing: async (filters) => {
    try {
      const response = await axiosClient.post('/movies/now-showing/filter', filters);
      const movies = Array.isArray(response.data) ? response.data : [];
      return {
        success: true,
        data: movies,
        total: movies.length,
        message: 'Lọc phim thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // ==================== API CŨ (GIỮ LẠI ĐỂ TƯƠNG THÍCH) ====================

  /** Lấy tất cả phim — Endpoint: GET /movies */
  getAll: async () => {
    try {
      const response = await axiosClient.get('/movies');
      return {
        success: true,
        data: response.data.data || response.data.movies || response.data,
        message: 'Lấy dữ liệu thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /** Lấy phim theo ID — Endpoint: GET /movies/{id} */
  getById: async (movieId) => {
    try {
      const response = await axiosClient.get(`/movies/${movieId}`);
      return {
        success: true,
        data: response.data.data || response.data,
        message: 'Lấy dữ liệu thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /** Tìm kiếm phim (cũ) — Endpoint: GET /movies?search=... */
  search: async (keyword) => {
    try {
      const response = await axiosClient.get('/movies', {
        params: { search: keyword },
      });
      return {
        success: true,
        data: response.data.data || response.data.movies || response.data,
        message: 'Tìm kiếm thành công',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },
};

export default movieApi;