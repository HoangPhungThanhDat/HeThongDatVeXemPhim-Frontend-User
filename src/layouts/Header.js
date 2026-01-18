import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/Style.css";
import BannerApi from "../api/BannerApi";

import prev1 from "../assets/images/prev-1.png";
import next1 from "../assets/images/next-1.png";

function Header() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const owlInstanceRef = useRef(null);

  // Fetch banners
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const result = await BannerApi.getBannersByPosition("Home");
      if (result.success) {
        // Lọc chỉ lấy banner có Status = Active
        const activeBanners = result.data.filter(
          (banner) => banner.Status === "Active"
        );
        setBanners(activeBanners);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  // Khởi tạo Owl Carousel sau khi banners đã load
  useEffect(() => {
    // Chỉ khởi tạo khi có banners và jQuery đã load
    if (banners.length > 0 && window.$ && carouselRef.current) {
      // Destroy instance cũ nếu có
      if (owlInstanceRef.current) {
        window.$(carouselRef.current).trigger('destroy.owl.carousel');
        owlInstanceRef.current = null;
      }

      // Đợi một chút để React render xong
      setTimeout(() => {
        const $carousel = window.$(carouselRef.current);
        
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
      }, 100);
    }

    // Cleanup khi component unmount
    return () => {
      if (owlInstanceRef.current && carouselRef.current) {
        try {
          window.$(carouselRef.current).trigger('destroy.owl.carousel');
        } catch (e) {
          console.log('Carousel cleanup error:', e);
        }
      }
    };
  }, [banners]); // Chạy lại khi banners thay đổi

  // // Menu logic
  // useEffect(() => {
  //   const toggle = document.getElementById("navbar-toggle");
  //   const menu = document.getElementById("navbar-menu");
  //   const overlay = document.getElementById("overlay");
  //   const dropdowns = document.querySelectorAll(".dropdown");

  //   const handleToggleClick = () => {
  //     menu?.classList.toggle("active");
  //     overlay?.classList.toggle("active");
  //   };

  //   const handleOverlayClick = () => {
  //     menu?.classList.remove("active");
  //     overlay?.classList.remove("active");
  //   };

  //   const handleDropdownClick = (e) => {
  //     if (window.innerWidth <= 768) {
  //       e.preventDefault();
  //       e.currentTarget.classList.toggle("open");
  //     }
  //   };

  //   if (toggle) {
  //     toggle.addEventListener("click", handleToggleClick);
  //   }

  //   if (overlay) {
  //     overlay.addEventListener("click", handleOverlayClick);
  //   }

  //   dropdowns.forEach((dropdown) => {
  //     dropdown.addEventListener("click", handleDropdownClick);
  //   });

  //   // Cleanup
  //   return () => {
  //     if (toggle) {
  //       toggle.removeEventListener("click", handleToggleClick);
  //     }
  //     if (overlay) {
  //       overlay.removeEventListener("click", handleOverlayClick);
  //     }
  //     dropdowns.forEach((dropdown) => {
  //       dropdown.removeEventListener("click", handleDropdownClick);
  //     });
  //   };
  // }, []);

  return (
    <div>
      <section className="filmoja-slider-area fix">
        {loading ? (
          <div className="banner-loader" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '550px',
            backgroundColor: '#f0f0f0'
          }}>
            <div className="spinner" style={{
              border: '8px solid #f3f3f3',
              borderTop: '8px solid #3498db',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              animation: 'spin 1s linear infinite'
            }}></div>
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
                  <a href={banner.LinkUrl || "#"}>
                    <img
                      src={banner.ImageUrl}
                      alt={banner.Title}
                      style={{ maxHeight: "550px", width: "100%" }}
                    />
                  </a>
                </div>
              ))
            ) : (
              <div className="filmoja-main-slide" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '550px',
                backgroundColor: '#f0f0f0'
              }}>
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