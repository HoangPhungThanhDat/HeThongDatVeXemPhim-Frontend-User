import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import '../../../assets/styles/globals.css';
import bannerApi from '../../../api/bannerApi';
import prev1 from '../../../assets/images/icons/prev-1.png';
import next1 from '../../../assets/images/icons/next-1.png';

function Header() {
  const carouselRef = useRef(null);
  const owlInstanceRef = useRef(null);
  const navigate = useNavigate();

  // ─── TanStack Query: tự refetch khi focus cửa sổ ───
  const {
    data: banners = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ['banner', 'home'],
    queryFn: async () => {
      const result = await bannerApi.getBannersByPosition('Home');
      if (!result.success || !result.data) {
        throw new Error(result.message || 'Không tải được banner');
      }
      // Lọc chỉ lấy banner có Status = Active
      return result.data.filter((banner) => banner.Status === 'Active');
    },
    placeholderData: (prev) => prev,
    // Banner ít thay đổi — có thể để staleTime lâu hơn, nhưng mặc định 60s cũng ổn
  });

  // Khởi tạo Owl Carousel sau khi banners đã load
  useEffect(() => {
    if (banners.length > 0 && window.$ && carouselRef.current) {
      if (owlInstanceRef.current) {
        window.$(carouselRef.current).trigger('destroy.owl.carousel');
        owlInstanceRef.current = null;
      }

      const timer = setTimeout(() => {
        const $carousel = window.$(carouselRef.current);
        if (!$carousel.hasClass('owl-loaded')) {
          $carousel.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            nav: true,
            navText: [
              `<img src="${prev1}" style="width:40px;height:40px;" />`,
              `<img src="${next1}" style="width:40px;height:40px;" />`,
            ],
          });
          owlInstanceRef.current = $carousel;
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        if (owlInstanceRef.current && carouselRef.current) {
          try {
            window.$(carouselRef.current).trigger('destroy.owl.carousel');
          } catch (e) {
            console.log('Carousel cleanup error:', e);
          }
        }
      };
    }
  }, [banners]);

  return (
    <div>
      <section className="filmoja-slider-area fix">
        {loading ? (
          <div
            className="banner-loader"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '550px',
              backgroundColor: '#f0f0f0',
            }}
          >
            <div
              className="spinner"
              style={{
                border: '8px solid #f3f3f3',
                borderTop: '8px solid #3498db',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <div className="filmoja-slide owl-carousel" ref={carouselRef}>
            {banners.length > 0 ? (
              banners.map((banner) => (
                <div className="filmoja-main-slide" key={banner.BannerId}>
                  <a href={banner.LinkUrl || '#'}>
                    <img
                      src={banner.ImageUrl}
                      alt={banner.Title}
                      style={{ maxHeight: '550px', width: '100%' }}
                    />
                  </a>
                </div>
              ))
            ) : (
              <div
                className="filmoja-main-slide"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '550px',
                  backgroundColor: '#f0f0f0',
                }}
              >
                <p>Không có banner nào để hiển thị</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Header;