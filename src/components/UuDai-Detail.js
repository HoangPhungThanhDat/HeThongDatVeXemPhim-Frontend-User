import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import promotionApi from "../api/PromotionApi";
function UuDai() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔧 Format nội dung để tự động ngắt dòng
  const formatDescription = (content) => {
    if (!content) return "";

    return content
      .replace(/\r\n/g, "<br/>")
      .replace(/\n/g, "<br/>")
      .replace(/\r/g, "<br/>");
  };

  // Fetch chi tiết khuyến mãi
  useEffect(() => {
    const fetchPromotionDetail = async () => {
      try {
        setLoading(true);
        console.log("🔍 Đang gọi API với ID:", id); // Debug
        const response = await promotionApi.getById(id);
        console.log("✅ Response từ API:", response); // Debug
        const data = response.data || response;
        console.log("📦 Data sau khi xử lý:", data); // Debug
        setPromotion(data);
        setError(null);
      } catch (err) {
        console.error("❌ Lỗi khi tải chi tiết khuyến mãi:", err);
        console.error("❌ Chi tiết lỗi:", err.response); // Xem response lỗi
        setError("Không thể tải thông tin khuyến mãi");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPromotionDetail();
    }
  }, [id]);

  if (loading) {
    return <div>Đang tải thông tin khuyến mãi...</div>;
  }

  return (
    <section
      className="filmoja-login-area section_15 bg-main"
      style={{
        background: "#e6e7e9",
        maxWidth: "100%",
        borderTop: "1px solid #ccc",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="p-detail" style={{ width: "100%" }}>
            <div
              className="single-blog-page"
              style={{ maxWidth: "1100px", margin: "0 auto" }}
            >
              <div className="single-news-item">
                <div className="news-image" style={{ float: "right" }}>
                  <img src={promotion.ImageUrl} le={{ marginTop: "5px" }} />
                </div>
                <div className="news-text">
                  <div className="post-content" style={{ paddingTop: 0 }}>
                    <h1
                      style={{
                        paddingTop: "20px",
                        fontSize: "35px",
                        textTransform: "uppercase",
                        color: "#f37737",
                      }}
                    >
                      CT U22 RẠP Gấu Phim
                    </h1>
                    <p>
                      <i className="fa fa-clock-o"></i>11-Thg3-2025
                    </p>
                    <div
                      className="fb-share-button"
                      data-href="https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html"
                      data-layout="button"
                      data-size="small"
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.facebook.com/sharer/sharer.php?u=https://starlight.vn/uu-dai/ct-u22-rap-starlight-1047.html"
                        className="fb-xfbml-parse-ignore"
                      >
                        Chia sẻ
                      </a>
                    </div>
                    <p>
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span style={{ fontSize: "16px" }}>
                            <span style={{ color: "#ff0000" }}>
                              <span
                                style={{
                                  fontFamily:
                                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {promotion.Title}
                              </span>
                            </span>
                          </span>
                        </strong>
                      </p>
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span style={{ fontSize: "16px" }}>
                            <span style={{ color: "#ff0000" }}>
                              <span
                                style={{
                                  fontFamily:
                                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                <img src={promotion.ImageUrl} />
                              </span>
                            </span>
                          </span>
                        </strong>
                      </p>
                      <div>
                        {/* Nội dung chi tiết */}
                        {promotion.Description && (
                          <div
                            className="promotion-content"
                            dangerouslySetInnerHTML={{
                              __html: formatDescription(promotion.Description),
                            }}
                          />
                        )}
                      </div>
                      <div>&nbsp;</div>
                    </p>
                  </div>
                </div>
              </div>
              <div className="clearfix" style={{ marginBottom: "20px" }}></div>
              <a
                href="/lich-chieu.html"
                style={{
                  padding: "10px 30px",
                  background: "linear-gradient(45deg, #f27737, #f0a884)",
                  marginTop: "30px",
                  borderRadius: "3px",
                  color: "#e6e7e9",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Đặt vé
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UuDai;
