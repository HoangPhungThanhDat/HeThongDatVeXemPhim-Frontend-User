import axiosClient from "./axiosClient";

const NewsApi = {
  // Lấy tin tức đã xuất bản (Published)
  getPublishedNews: async (limit = 10) => {
    try {
      const response = await axiosClient.get("/news");

      let allNews = [];

      // Xử lý nhiều format response khác nhau
      if (response.data) {
        if (Array.isArray(response.data.data)) {
          allNews = response.data.data;
        } else if (Array.isArray(response.data.news)) {
          allNews = response.data.news;
        } else if (Array.isArray(response.data)) {
          allNews = response.data;
        }
      }

      // Lọc tin tức có Status = "Published" và sắp xếp theo ngày tạo mới nhất
      const publishedNews = allNews
        .filter((news) => news.Status === "Published")
        .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
        .slice(0, limit);

      return {
        success: true,
        data: publishedNews,
        message: `Lấy ${publishedNews.length} tin tức đã xuất bản thành công`,
      };
    } catch (error) {
      console.error("❌ Error:", error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // Lấy tin tức mới nhất (đã xuất bản)
  getLatestNews: async (limit = 6) => {
    try {
      const response = await axiosClient.get("/news", {
        params: {
          status: "Published",
          limit: limit,
          sortBy: "CreatedAt",
          order: "desc",
        },
      });

      let allNews = [];

      if (response.data) {
        if (Array.isArray(response.data.data)) {
          allNews = response.data.data;
        } else if (Array.isArray(response.data.news)) {
          allNews = response.data.news;
        } else if (Array.isArray(response.data)) {
          allNews = response.data;
        }
      }

      return {
        success: true,
        data: allNews,
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

  getBySlug: async (slug) => {
    // Lấy chi tiết tin tức theo slug
    try {
      const allNewsResponse = await axiosClient.get("/news");
      let allNews = [];

      if (allNewsResponse.data) {
        if (Array.isArray(allNewsResponse.data.data)) {
          allNews = allNewsResponse.data.data;
        } else if (Array.isArray(allNewsResponse.data.news)) {
          allNews = allNewsResponse.data.news;
        } else if (Array.isArray(allNewsResponse.data)) {
          allNews = allNewsResponse.data;
        }
      }

      const news = allNews.find((item) => item.Slug === slug);

      if (news) {
        return {
          success: true,
          data: news,
        };
      } else {
        throw new Error("Không tìm thấy tin tức");
      }
    } catch (fallbackError) {
      throw fallbackError;
    }
  },
};

export default NewsApi;
