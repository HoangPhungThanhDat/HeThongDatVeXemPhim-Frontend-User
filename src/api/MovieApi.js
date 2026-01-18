import axiosClient from './axiosClient';

const MovieApi = {
  // Lấy tất cả phim
  getAll: async () => {
    try {
      const response = await axiosClient.get('/movies');
      
      return {
        success: true,
        data: response.data.data || response.data.movies || response.data,
        message: 'Lấy dữ liệu thành công'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message
      };
    }
  },

  // Lấy phim theo ID
  getById: async (movieId) => {
    try {
      const response = await axiosClient.get(`/movies/${movieId}`);
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: 'Lấy dữ liệu thành công'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message
      };
    }
  },

  // Lấy danh sách phim mới nhất
  getLatestMovies: async (limit = 10) => {
    try {
      const response = await axiosClient.get('/movies', {
        params: {
          status: 'NowShowing',
          limit: limit,
          sortBy: 'createdAt',
          order: 'desc'
        }
      });
      
      return {
        success: true,
        data: response.data.movies || response.data.data || response.data,
        message: 'Lấy dữ liệu thành công'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message
      };
    }
  },

  // Lấy phim đang chiếu
  getNowShowing: async () => {
    try {
      const response = await axiosClient.get('/movies');
      const allMovies = response.data.data || response.data.movies || response.data;
      
      // Filter phim đang chiếu
      const nowShowingMovies = allMovies.filter(
        movie => movie.Status === 'NowShowing'
      );
      
      return {
        success: true,
        data: nowShowingMovies,
        message: 'Lấy dữ liệu thành công'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message
      };
    }
  },

 //Lấy phim SẮP CHIẾU 
 getComingSoonMovies: async (limit = 10) => {
  try {

    const response = await axiosClient.get('/movies');
    
    let allMovies = [];
    
   
    if (response.data) {
      if (Array.isArray(response.data.data)) {
        allMovies = response.data.data;
      } else if (Array.isArray(response.data.movies)) {
        allMovies = response.data.movies;
      } else if (Array.isArray(response.data)) {
        allMovies = response.data;
      }
    }
    const comingSoonMovies = allMovies
      .filter(movie => movie.Status === 'ComingSoon')
      .sort((a, b) => new Date(a.ReleaseDate) - new Date(b.ReleaseDate))
      .slice(0, limit);
    return {
      success: true,
      data: comingSoonMovies,
      message: `Lấy ${comingSoonMovies.length} phim sắp chiếu thành công`
    };
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || error.message
    };
  }
},

  // Tìm kiếm phim
  search: async (keyword) => {
    try {
      const response = await axiosClient.get('/movies', {
        params: { search: keyword }
      });
      
      return {
        success: true,
        data: response.data.data || response.data.movies || response.data,
        message: 'Tìm kiếm thành công'
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message
      };
    }
  }
};

export default MovieApi;