import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import promotionApi from '../../../api/promotionApi';
import bg from '../../../assets/images/backgrounds/bgs5.jpg';

function KhuyenMai() {
  const carouselRef = useRef(null);

  // ─── TanStack Query: tự refetch khi focus cửa sổ ───
  const {
    data: promotions = [],
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ['khuyen-mai', 'trang-chu'],
    queryFn: async () => {
      const response = await promotionApi.getAll();
      const data = response.data || response;
      return Array.isArray(data) ? data : [];
    },
    placeholderData: (prev) => prev,
  });

  const error = queryError ? 'Không thể tải danh sách khuyến mãi' : null;

  // ─── Init + destroy Owl Carousel ───
  useEffect(() => {
    if (!carouselRef.current || promotions.length === 0) return;
    if (!window.$) return;

    const $carousel = window.$(carouselRef.current);

    // Nếu đã init → destroy trước
    if ($carousel.data('owl.carousel')) {
      $carousel.trigger('destroy.owl.carousel');
      $carousel.removeClass('owl-loaded owl-drag');
      $carousel.find('.owl-stage-outer').children().unwrap();
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
        1000: { items: 4 },
      },
    });

    // Cleanup
    return () => {
      if ($carousel.data('owl.carousel')) {
        $carousel.trigger('destroy.owl.carousel');
        $carousel.removeClass('owl-loaded owl-drag');
        $carousel.find('.owl-stage-outer').children().unwrap();
      }
    };
  }, [promotions]);

  return (
    <section
      className="filmoja-top-movies-area section_30"
      style={{
        background: `url(${bg}) no-repeat center`,
        backgroundSize: 'cover',
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
              <div className="py-5 text-center">
                <p>Đang tải khuyến mãi...</p>
              </div>
            )}

            {error && (
              <div className="py-5 text-center">
                <p className="text-danger">{error}</p>
              </div>
            )}

            {!loading && !error && promotions.length === 0 && (
              <div className="py-5 text-center">
                <p>Hiện tại chưa có khuyến mãi nào</p>
              </div>
            )}

            {!loading && !error && promotions.length > 0 && (
              <div ref={carouselRef} className="top-movie-slider-1 owl-carousel">
                {promotions.map((promotion) => (
                  <div key={promotion.PromotionId}>
                    <Link to={`/uu-dai/${promotion.PromotionId}`} style={{ cursor: 'pointer' }}>
                      <img
                        src={promotion.ImageUrl}
                        alt={promotion.Title}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KhuyenMai;