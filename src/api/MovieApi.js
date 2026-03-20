import axiosClient from "./axiosClient";

const MovieApi = {
  // ==================== API MỚI (CÓ ĐẦY ĐỦ THÔNG TIN) ====================

  /**
   * ✅ Lấy phim đang chiếu - API MỚI
   * Endpoint: /movies/now-showing/all
   */
  getNowShowing: async () => {
    try {
      console.log("🔄 Calling: /movies/now-showing/all");

      const response = await axiosClient.get("/movies/now-showing/all");

      console.log("📥 Full Response:", response);
      console.log("📥 Response Data:", response.data);

      const movies = Array.isArray(response.data) ? response.data : [];

      return {
        success: true,
        data: movies,
        total: movies.length,
        message: "Lấy dữ liệu thành công",
      };
    } catch (error) {
      console.error("❌ getNowShowing Error:", error);
      console.error("❌ Error Response:", error.response);

      return {
        success: false,
        data: [],
        total: 0,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy phim sắp chiếu - API MỚI
   * Endpoint: /movies/coming-soon
   */
  getComingSoonMovies: async (limit = 10) => {
    try {
      console.log("🔄 Calling: /movies/coming-soon");

      const response = await axiosClient.get("/movies/coming-soon");

      console.log("📥 Response:", response.data);

      const movies = Array.isArray(response.data) ? response.data : [];

      return {
        success: true,
        data: movies,
        total: movies.length,
        message: "Lấy phim sắp chiếu thành công",
      };
    } catch (error) {
      console.error("❌ getComingSoonMovies Error:", error);

      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy phim mới nhất - API MỚI
   * Endpoint: /movies/latest
   */
  getLatestMovies: async (limit = 10) => {
    try {
      const response = await axiosClient.get("/movies/latest", {
        params: { limit },
      });

      const movies = Array.isArray(response.data) ? response.data : [];

      return {
        success: true,
        data: movies,
        total: movies.length,
        message: "Lấy phim mới nhất thành công",
      };
    } catch (error) {
      console.error("❌ getLatestMovies Error:", error);

      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy chi tiết phim - API MỚI
   * Endpoint: /movies/{id}/detail
   */
  getMovieDetail: async (movieId) => {
    try {
      const response = await axiosClient.get(`/movies/${movieId}/detail`);

      return {
        success: true,
        data: response.data,
        message: "Lấy chi tiết phim thành công",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy lịch chiếu của phim theo movieId
   * Endpoint: /movies/{movieId}/showtimes
   *
   * Backend cần trả về:
   * [
   *   {
   *     Date: "14/03/2026",
   *     Showtimes: [
   *       { TimeId: "...", Time: "09:00", Room: "01",           Format: "2D" },
   *       { TimeId: "...", Time: "10:20", Room: "GOLD Class 8", Format: "2D" },
   *     ]
   *   },
   *   ...
   * ]
   */
  getShowtimes: async (movieId) => {
    try {
      console.log(`🔄 Calling: /movies/${movieId}/showtimes`);

      const response = await axiosClient.get(`/movies/${movieId}/showtimes`);

      console.log("📥 Showtimes Response:", response.data);

      const data = Array.isArray(response.data) ? response.data : [];

      return {
        success: true,
        data,
        message: "Lấy lịch chiếu thành công",
      };
    } catch (error) {
      console.error("❌ getShowtimes Error:", error);

      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Lấy filters
   * Endpoint: /movies/now-showing/filters
   */
  getNowShowingFilters: async () => {
    try {
      const response = await axiosClient.get("/movies/now-showing/filters");

      return {
        success: true,
        data: response.data || {
          genres: [],
          directors: [],
          actors: [],
          total_movies: 0,
        },
        message: "Lấy filters thành công",
      };
    } catch (error) {
      return {
        success: false,
        data: {
          genres: [],
          directors: [],
          actors: [],
          total_movies: 0,
        },
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * ✅ Tìm kiếm phim đang chiếu - API MỚI
   * Endpoint: /movies/now-showing/search
   */
  searchNowShowing: async (keyword) => {
    try {
      const response = await axiosClient.get("/movies/now-showing/search", {
        params: { keyword },
      });

      const movies = Array.isArray(response.data) ? response.data : [];

      return {
        success: true,
        data: movies,
        total: movies.length,
        keyword: keyword,
        message: "Tìm kiếm thành công",
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
   * ✅ Lọc phim đang chiếu - API MỚI
   * Endpoint: /movies/now-showing/filter
   */
  filterNowShowing: async (filters) => {
    try {
      const response = await axiosClient.post(
        "/movies/now-showing/filter",
        filters
      );

      const movies = Array.isArray(response.data) ? response.data : [];

      return {
        success: true,
        data: movies,
        total: movies.length,
        message: "Lọc phim thành công",
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

  // Lấy tất cả phim (không có đầy đủ info)
  getAll: async () => {
    try {
      const response = await axiosClient.get("/movies");

      return {
        success: true,
        data: response.data.data || response.data.movies || response.data,
        message: "Lấy dữ liệu thành công",
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Lấy phim theo ID (không có đầy đủ info)
  getById: async (movieId) => {
    try {
      const response = await axiosClient.get(`/movies/${movieId}`);

      return {
        success: true,
        data: response.data.data || response.data,
        message: "Lấy dữ liệu thành công",
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Tìm kiếm phim (cũ)
  search: async (keyword) => {
    try {
      const response = await axiosClient.get("/movies", {
        params: { search: keyword },
      });

      return {
        success: true,
        data: response.data.data || response.data.movies || response.data,
        message: "Tìm kiếm thành công",
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

export default MovieApi;