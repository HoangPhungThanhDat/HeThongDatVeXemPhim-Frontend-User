import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import promotionApi from "../api/PromotionApi";
import bg from "../assets/images/bgs5.jpg";

function KhuyenMai() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carouselRef = useRef(null);

  // 1️⃣ Fetch data
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const response = await promotionApi.getAll();
        const data = response.data || response;
        setPromotions(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải khuyến mãi:", err);
        setError("Không thể tải danh sách khuyến mãi");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // 2️⃣ Init + destroy Owl Carousel (CHỐNG LỖI)
  useEffect(() => {
    if (!carouselRef.current || promotions.length === 0) return;
    if (!window.$) return;

    const $carousel = window.$(carouselRef.current);

    // Nếu đã init → destroy trước
    if ($carousel.data("owl.carousel")) {
      $carousel.trigger("destroy.owl.carousel");
      $carousel.removeClass("owl-loaded owl-drag");
      $carousel.find(".owl-stage-outer").children().unwrap();
    }

    // Init
    $carousel.owlCarousel({
      loop: true,
      margin: 15,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 }
      }
    });

    // ✅ Cleanup khi component unmount / promotions đổi
    return () => {
      if ($carousel.data("owl.carousel")) {
        $carousel.trigger("destroy.owl.carousel");
        $carousel.removeClass("owl-loaded owl-drag");
        $carousel.find(".owl-stage-outer").children().unwrap();
      }
    };
  }, [promotions]);

  return (
    <section
      className="filmoja-top-movies-area section_30"
      style={{
        background: `url(${bg}) no-repeat center`,
        backgroundSize: "cover"
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="filmoja-heading">
              <h2>Khuyến mãi và sự kiện</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {loading && (
              <div className="text-center py-5">
                <p>Đang tải khuyến mãi...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-5">
                <p className="text-danger">{error}</p>
              </div>
            )}

            {!loading && !error && promotions.length === 0 && (
              <div className="text-center py-5">
                <p>Hiện tại chưa có khuyến mãi nào</p>
              </div>
            )}

            {!loading && !error && promotions.length > 0 && (
              <div
                ref={carouselRef}
                className="top-movie-slider-1 owl-carousel"
              >
                {promotions.map((promotion) => {
                  console.log("🎯 Promotion data:", promotion); // Debug để xem data
                  return (
                    <div key={promotion.PromotionId}>
                      <Link
                        to={`/uu-dai/${promotion.PromotionId}`}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={promotion.ImageUrl}
                          alt={promotion.Title}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KhuyenMai;