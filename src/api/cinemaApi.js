// src/api/cinemaApi.js
import axiosClient from './axiosClient';

const cinemaApi = {
  // ========================================================
  // 🏢 CINEMAS - Các method cũ
  // ========================================================

  // Lấy tất cả rạp chiếu
  getAll: async () => {
    try {
      const response = await axiosClient.get('/cinemas');

      let allCinemas = [];

      if (response.data) {
        if (Array.isArray(response.data.data)) {
          allCinemas = response.data.data;
        } else if (Array.isArray(response.data.cinemas)) {
          allCinemas = response.data.cinemas;
        } else if (Array.isArray(response.data)) {
          allCinemas = response.data;
        }
      }

      return {
        success: true,
        data: allCinemas,
        message: 'Lấy danh sách rạp thành công',
      };
    } catch (error) {
      console.error('❌ Error getAll:', error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Lấy các rạp đang hoạt động (Active)
  getActiveCinemas: async () => {
    try {
      const response = await axiosClient.get('/cinemas');

      let allCinemas = [];

      if (response.data) {
        if (Array.isArray(response.data.data)) {
          allCinemas = response.data.data;
        } else if (Array.isArray(response.data.cinemas)) {
          allCinemas = response.data.cinemas;
        } else if (Array.isArray(response.data)) {
          allCinemas = response.data;
        }
      }

      // Lọc các rạp có Status = "Active"
      const activeCinemas = allCinemas.filter((cinema) => cinema.Status === 'Active');

      return {
        success: true,
        data: activeCinemas,
        message: `Lấy ${activeCinemas.length} rạp đang hoạt động thành công`,
      };
    } catch (error) {
      console.error('❌ Error getActiveCinemas:', error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Lấy lịch chiếu theo rạp và ngày
  getShowtimes: async (cinemaId, date) => {
    try {
      const response = await axiosClient.get(`/cinemas/${cinemaId}/showtimes`, {
        params: { date },
      });

      return {
        success: true,
        data: response.data,
        message: 'Lấy lịch chiếu thành công',
      };
    } catch (error) {
      console.error('❌ Error getShowtimes:', error);
      return {
        success: false,
        data: { movies: [] },
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // ========================================================
  // 🆕 CÁC METHOD MỚI CHO TIMRAP
  // ========================================================

  /**
   * Lấy danh sách phim theo rạp
   * @param {number|string} cinemaId - ID của rạp
   * @returns {Promise<{success: boolean, data: Array, message: string}>}
   */
  getMoviesByCinema: async (cinemaId) => {
    try {
      const response = await axiosClient.get(`/cinemas/${cinemaId}/movies`);

      let movies = [];

      if (response.data) {
        if (Array.isArray(response.data.data)) {
          movies = response.data.data;
        } else if (Array.isArray(response.data.movies)) {
          movies = response.data.movies;
        } else if (Array.isArray(response.data)) {
          movies = response.data;
        }
      }

      return {
        success: true,
        data: movies,
        message: `Lấy ${movies.length} phim thành công`,
      };
    } catch (error) {
      console.error('❌ Error getMoviesByCinema:', error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Lấy danh sách ngày chiếu theo rạp và phim
   * @param {number|string} cinemaId - ID của rạp
   * @param {number|string} movieId - ID của phim
   * @returns {Promise<{success: boolean, data: Array, message: string}>}
   */
  getDatesByCinemaAndMovie: async (cinemaId, movieId) => {
    try {
      const response = await axiosClient.get(`/cinemas/${cinemaId}/movies/${movieId}/dates`);

      let dates = [];

      if (response.data) {
        if (Array.isArray(response.data.data)) {
          dates = response.data.data;
        } else if (Array.isArray(response.data.dates)) {
          dates = response.data.dates;
        } else if (Array.isArray(response.data)) {
          dates = response.data;
        }
      }

      return {
        success: true,
        data: dates,
        message: `Lấy ${dates.length} ngày chiếu thành công`,
      };
    } catch (error) {
      console.error('❌ Error getDatesByCinemaAndMovie:', error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Lấy danh sách suất chiếu theo rạp, phim và ngày
   * @param {number|string} cinemaId - ID của rạp
   * @param {number|string} movieId - ID của phim
   * @param {string} date - Ngày chiếu (YYYY-MM-DD)
   * @returns {Promise<{success: boolean, data: Array, message: string}>}
   */
  getShowtimesByMovieAndDate: async (cinemaId, movieId, date) => {
    try {
      const response = await axiosClient.get(`/cinemas/${cinemaId}/movies/${movieId}/showtimes`, {
        params: { date },
      });

      let showtimes = [];

      if (response.data) {
        if (Array.isArray(response.data.data)) {
          showtimes = response.data.data;
        } else if (Array.isArray(response.data.showtimes)) {
          showtimes = response.data.showtimes;
        } else if (Array.isArray(response.data)) {
          showtimes = response.data;
        }
      }

      return {
        success: true,
        data: showtimes,
        message: `Lấy ${showtimes.length} suất chiếu thành công`,
      };
    } catch (error) {
      console.error('❌ Error getShowtimesByMovieAndDate:', error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Lấy chi tiết một rạp
   * @param {number|string} cinemaId - ID của rạp
   * @returns {Promise<{success: boolean, data: Object|null, message: string}>}
   */
  getCinemaDetail: async (cinemaId) => {
    try {
      const response = await axiosClient.get(`/cinemas/${cinemaId}`);

      let cinema = null;

      if (response.data) {
        if (response.data.data) {
          cinema = response.data.data;
        } else if (response.data.cinema) {
          cinema = response.data.cinema;
        } else {
          cinema = response.data;
        }
      }

      return {
        success: true,
        data: cinema,
        message: 'Lấy chi tiết rạp thành công',
      };
    } catch (error) {
      console.error('❌ Error getCinemaDetail:', error);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Lấy danh sách phòng của rạp
   * @param {number|string} cinemaId - ID của rạp
   * @returns {Promise<{success: boolean, data: Array, message: string}>}
   */
  getRoomsByCinema: async (cinemaId) => {
    try {
      const response = await axiosClient.get(`/cinemas/${cinemaId}/rooms`);

      let rooms = [];

      if (response.data) {
        if (Array.isArray(response.data.data)) {
          rooms = response.data.data;
        } else if (Array.isArray(response.data.rooms)) {
          rooms = response.data.rooms;
        } else if (Array.isArray(response.data)) {
          rooms = response.data;
        }
      }

      return {
        success: true,
        data: rooms,
        message: `Lấy ${rooms.length} phòng thành công`,
      };
    } catch (error) {
      console.error('❌ Error getRoomsByCinema:', error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },
};

export default cinemaApi;
