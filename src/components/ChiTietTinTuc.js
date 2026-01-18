import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewsApi from "../api/NewApi";
import tintuc1 from "../assets/images/doraemon.jpg";

function ChiTietTinTuc() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await NewsApi.getBySlug(slug);

      if (result.success) {
        setNews(result.data);
      }
    } catch (err) {
      setError("Không tìm thấy tin tức hoặc đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  if (error || !news) {
    return (
      <div className="news-detail-wrapper">
        <div className="container">
          <div className="error-state">
            <i className="fa fa-exclamation-circle"></i>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="news-detail-wrapper">
        <div className="container">
          <div className="news-detail-container">
            {/* Featured Image */}
            {news.ImageUrl && (
              <div className="news-detail-image zoom-box">
                <img
                  src={news.ImageUrl}
                  alt={news.Title}
                  onError={(e) => {
                    e.target.src = tintuc1;
                  }}
                />
              </div>
            )}
            {/* Title */}
            <h1 className="news-detail-title">{news.Title}</h1>

            {/* Content */}
            <div className="news-detail-content">
              {news.Content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChiTietTinTuc;
