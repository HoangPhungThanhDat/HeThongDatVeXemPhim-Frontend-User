import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsApi from "../api/NewApi";
import tintuc1 from "../assets/images/doraemon.jpg";

function DienAnh() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPublishedNews();
  }, []);

  const fetchAllPublishedNews = async () => {
    try {
      setLoading(true);
      // Lấy tất cả tin tức đã xuất bản (không giới hạn số lượng)
      const result = await NewsApi.getPublishedNews(1000); // Lấy tối đa 1000 bài
      
      if (result.success) {
        setNews(result.data);
      } else {
        console.error("Lỗi:", result.message);
      }
    } catch (error) {
      console.error("Lỗi khi tải tin tức:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm cắt ngắn nội dung
  const truncateContent = (content, maxLength = 150) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // Hàm format ngày
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="filmoja-news-area section_70">
        <div className="container">
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                <div className="news-side-list">
                  <div className="single-news-side">
                    <div 
                      className="news-side-img"
                      style={{
                        background: "#e0e0e0",
                        height: "200px",
                        animation: "pulse 1.5s infinite"
                      }}
                    ></div>
                    <div className="news-side-text">
                      <div
                        style={{
                          background: "#e0e0e0",
                          height: "20px",
                          marginBottom: "10px",
                          animation: "pulse 1.5s infinite"
                        }}
                      ></div>
                      <div
                        style={{
                          background: "#e0e0e0",
                          height: "15px",
                          width: "60%",
                          animation: "pulse 1.5s infinite"
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </section>
    );
  }

  // Nếu không có tin tức
  if (!loading && news.length === 0) {
    return (
      <section className="filmoja-news-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <i className="fa fa-newspaper" style={{ fontSize: "48px", color: "#ccc" }}></i>
              <p className="text-muted mt-3">Chưa có tin tức nào</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="filmoja-news-area section_70">
        <div className="container">
          <div className="row">
            {news.map((article) => (
              <div key={article.NewsId} className="col-lg-4 col-md-6 col-sm-12">
                <div className="news-side-list">
                  <div className="single-news-side">
                    <div className="news-side-img">
                      <Link to={`/tin-tuc/${article.Slug}`}>
                        <img
                          src={article.ImageUrl || tintuc1}
                          alt={article.Slug}
                          onError={(e) => {
                            e.target.src = tintuc1; // Fallback image
                          }}
                        />
                      </Link>
                    </div>
                    <div className="news-side-text">
                      <h4>
                        <Link to={`/tin-tuc/${article.Slug}`}>
                          {article.Title}
                        </Link>
                      </h4>
                      <div className="post-meta">
                        <p>
                          <a href="#">
                            <i className="fa fa-user"></i>
                            {article.AuthorName || "Admin"}
                          </a>
                        </p>
                        <p>
                          <a href="#">
                            <i className="fa fa-tags"></i>
                            {formatDate(article.CreatedAt)}
                          </a>
                        </p>
                      </div>
                      <div className="post-content">
                        <p>{truncateContent(article.Content)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DienAnh;