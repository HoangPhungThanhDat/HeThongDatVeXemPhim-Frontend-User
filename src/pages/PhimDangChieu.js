import React, { useState, useEffect } from "react";
import mdv from "../assets/images/mdv.jpg";
import bd1 from "../assets/images/bd1.jpg";
import bd from "../assets/images/bd.jpg";
import bd2 from "../assets/images/bd2.jpg";
import bd3 from "../assets/images/bd3.jpg";
function PhimDangChieu() {
  //phim đang chiếu
  useEffect(() => {
    const movieSwiper = new Swiper(".mySwiper", {
      loop: true,
      centeredSlides: true,
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      speed: 800,
      grabCursor: true,
      effect: "slide",
      breakpoints: {
        0: {
          slidesPerView: 2, // Mobile
        },
        768: {
          slidesPerView: 3, // Tablet
        },
        1024: {
          slidesPerView: 3, // Desktop
        },
      },
    });

    // cleanup khi component unmount
    return () => {
      movieSwiper.destroy();
    };
  }, []);
  return (
    <div>
      <section className="phimdangchieu">
        <div className="col-md-12">
          <div className="filmoja-heading">
            <h2>
              Phim:<span> Đang chiếu</span>
            </h2>
          </div>
        </div>
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {/* <!-- Slide 1 --> */}
            <div className="swiper-slide">
              <div className="movie-card">
                {/* <!-- Poster bên trái --> */}
                <div className="movie-poster">
                  <img src={mdv} alt="Poster phim 1" />
                </div>

                {/* <!-- Thông tin bên phải --> */}
                <div className="movie-info">
                  <h3>MƯA ĐỎ (T13)</h3>
                  <div className="tags">
                    <span className="tag">2D</span>
                    <span className="tag">⏱ 2 giờ 4 phút</span>
                    <span className="tag age">T13</span>
                  </div>
                  <p>
                    <b>Thể loại:</b> Hành động, Lịch sử
                  </p>
                  <p>
                    <b>Đạo diễn:</b> NSUT Đặng Thái Huyền
                  </p>
                  <p>
                    <b>Diễn viên:</b> Đỗ Nhật Hoàng, Phương Nam...
                  </p>
                  <p className="desc">
                    "Mưa Đỏ" – Phim về chiến tranh cách mạng, lấy cảm hứng từ sự
                    kiện 81 ngày đêm...
                  </p>
                  <a href="#" className="btn-book">
                    🎟 Đặt vé
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Slide 2 --> */}
            <div className="swiper-slide">
              <div className="movie-card">
                {/* <!-- Poster bên trái --> */}
                <div className="movie-poster">
                  <img src={bd1} alt="Poster phim 1" />
                </div>

                {/* <!-- Thông tin bên phải --> */}
                <div className="movie-info">
                  <h3>MƯA ĐỎ (T13)</h3>
                  <div className="tags">
                    <span className="tag">2D</span>
                    <span className="tag">⏱ 2 giờ 4 phút</span>
                    <span className="tag age">T13</span>
                  </div>
                  <p>
                    <b>Thể loại:</b> Hành động, Lịch sử
                  </p>
                  <p>
                    <b>Đạo diễn:</b> NSUT Đặng Thái Huyền
                  </p>
                  <p>
                    <b>Diễn viên:</b> Đỗ Nhật Hoàng, Phương Nam...
                  </p>
                  <p className="desc">
                    "Mưa Đỏ" – Phim về chiến tranh cách mạng, lấy cảm hứng từ sự
                    kiện 81 ngày đêm...
                  </p>
                  <a href="#" className="btn-book">
                    🎟 Đặt vé
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Slide 2 --> */}
            <div className="swiper-slide">
              <div className="movie-card">
                {/* <!-- Poster bên trái --> */}
                <div className="movie-poster">
                  <img src={bd} alt="Poster phim 1" />
                </div>

                {/* <!-- Thông tin bên phải --> */}
                <div className="movie-info">
                  <h3>MƯA ĐỎ (T13)</h3>
                  <div className="tags">
                    <span className="tag">2D</span>
                    <span className="tag">⏱ 2 giờ 4 phút</span>
                    <span className="tag age">T13</span>
                  </div>
                  <p>
                    <b>Thể loại:</b> Hành động, Lịch sử
                  </p>
                  <p>
                    <b>Đạo diễn:</b> NSUT Đặng Thái Huyền
                  </p>
                  <p>
                    <b>Diễn viên:</b> Đỗ Nhật Hoàng, Phương Nam...
                  </p>
                  <p className="desc">
                    "Mưa Đỏ" – Phim về chiến tranh cách mạng, lấy cảm hứng từ sự
                    kiện 81 ngày đêm...
                  </p>
                  <a href="#" className="btn-book">
                    🎟 Đặt vé
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Slide 2 --> */}
            <div className="swiper-slide">
              <div className="movie-card">
                {/* <!-- Poster bên trái --> */}
                <div className="movie-poster">
                  <img src={bd2} alt="Poster phim 1" />
                </div>

                {/* <!-- Thông tin bên phải --> */}
                <div className="movie-info">
                  <h3>MƯA ĐỎ (T13)</h3>
                  <div className="tags">
                    <span className="tag">2D</span>
                    <span className="tag">⏱ 2 giờ 4 phút</span>
                    <span className="tag age">T13</span>
                  </div>
                  <p>
                    <b>Thể loại:</b> Hành động, Lịch sử
                  </p>
                  <p>
                    <b>Đạo diễn:</b> NSUT Đặng Thái Huyền
                  </p>
                  <p>
                    <b>Diễn viên:</b> Đỗ Nhật Hoàng, Phương Nam...
                  </p>
                  <p className="desc">
                    "Mưa Đỏ" – Phim về chiến tranh cách mạng, lấy cảm hứng từ sự
                    kiện 81 ngày đêm...
                  </p>
                  <a href="#" className="btn-book">
                    🎟 Đặt vé
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Slide 2 --> */}
            <div className="swiper-slide">
              <div className="movie-card">
                {/* <!-- Poster bên trái --> */}
                <div className="movie-poster">
                  <img src={bd3} alt="Poster phim 1" />
                </div>

                {/* <!-- Thông tin bên phải --> */}
                <div className="movie-info">
                  <h3>MƯA ĐỎ (T13)</h3>
                  <div className="tags">
                    <span className="tag">2D</span>
                    <span className="tag">⏱ 2 giờ 4 phút</span>
                    <span className="tag age">T13</span>
                  </div>
                  <p>
                    <b>Thể loại:</b> Hành động, Lịch sử
                  </p>
                  <p>
                    <b>Đạo diễn:</b> NSUT Đặng Thái Huyền
                  </p>
                  <p>
                    <b>Diễn viên:</b> Đỗ Nhật Hoàng, Phương Nam...
                  </p>
                  <p className="desc">
                    "Mưa Đỏ" – Phim về chiến tranh cách mạng, lấy cảm hứng từ sự
                    kiện 81 ngày đêm...
                  </p>
                  <a href="#" className="btn-book">
                    🎟 Đặt vé
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- Thêm slide khác --> */}
          </div>
          {/* <!-- Nút điều hướng --> */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </section>
    </div>
  );
}

export default PhimDangChieu;
