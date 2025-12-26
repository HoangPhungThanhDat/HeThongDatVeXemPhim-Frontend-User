import React, { useState, useEffect } from "react";

function PhimMoi() {
  useEffect(() => {
    $(".top-movie-slider").owlCarousel({
      loop: true,
      margin: 10,
      nav: true, // có mũi tên điều hướng
      dots: false, // tắt chấm tròn
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: {
        0: { items: 1 },
        600: { items: 3 },
        1000: { items: 5 },
      },
    });
  }, []); // chạy 1 lần sau khi render

  return (
    <div>
      {/* <!-- Top phim mới  --> */}
      <section className="filmoja-top-movies-area section_30">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="filmoja-heading">
                <h2>
                  Phim:<span> Mới </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="top-movie-slider owl-carousel">
                <div className="single-top-movie">
                  <div className="top-movie-wrap">
                    <div className="top-movie-img">
                      <a href="/film/bebefinn-lt-lac-vao-xu-so-pinkfong-dieu-ky-p/bf7c52c5-86fb-4796-a4c1-bce28e543ae3.html">
                        <img
                          src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/Lac-vao-xu-so-Pinkfong.jpg"
                          alt="bebefinn-lt-lac-vao-xu-so-pinkfong-dieu-ky-p"
                        />
                      </a>
                    </div>
                    <div className="thumb-hover">
                      <a
                        className="play-video"
                        href="https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=H43myspCWxI"
                      >
                        <i className="fa fa-play"></i>
                      </a>
                      <div className="thumb-date"></div>
                    </div>
                  </div>
                  <div className="top-movie-details">
                    <h4>
                      <a href="/film/bebefinn-lt-lac-vao-xu-so-pinkfong-dieu-ky-p/bf7c52c5-86fb-4796-a4c1-bce28e543ae3.html">
                        BEBEFINN (LT): LẠC V&#192;O XỨ SỞ PINKFONG DIỆU KỲ (P)
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="single-top-movie">
                  <div className="top-movie-wrap">
                    <div className="top-movie-img">
                      <a href="/film/em-xinh-tinh-quai-pd-t13/658f8077-4f17-4b2d-a7e9-71ecc47a5121.html">
                        <img
                          src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/Em-xinh-tinh-quai.jpg"
                          alt="em-xinh-tinh-quai-pd-t13"
                        />
                      </a>
                    </div>
                    <div className="thumb-hover">
                      <a
                        className="play-video"
                        href="https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=qKyKnhb9E9w"
                      >
                        <i className="fa fa-play"></i>
                      </a>
                      <div className="thumb-date"></div>
                    </div>
                  </div>
                  <div className="top-movie-details">
                    <h4>
                      <a href="/film/em-xinh-tinh-quai-pd-t13/658f8077-4f17-4b2d-a7e9-71ecc47a5121.html">
                        EM XINH TINH QU&#193;I (PD) (T13)
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="single-top-movie">
                  <div className="top-movie-wrap">
                    <div className="top-movie-img">
                      <a href="/film/em-xinh-tinh-quai-lt-t13/d890049a-38df-4c6a-bb1e-200776f32ea0.html">
                        <img
                          src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/Em-xinh-tinh-quai.jpg"
                          alt="em-xinh-tinh-quai-lt-t13"
                        />
                      </a>
                    </div>
                    <div className="thumb-hover">
                      <a
                        className="play-video"
                        href="https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=qKyKnhb9E9w"
                      >
                        <i className="fa fa-play"></i>
                      </a>
                      <div className="thumb-date"></div>
                    </div>
                  </div>
                  <div className="top-movie-details">
                    <h4>
                      <a href="/film/em-xinh-tinh-quai-lt-t13/d890049a-38df-4c6a-bb1e-200776f32ea0.html">
                        EM XINH TINH QU&#193;I (LT) (T13)
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="single-top-movie">
                  <div className="top-movie-wrap">
                    <div className="top-movie-img">
                      <a href="/film/pha-dam-sinh-nhat-me/084aaa40-357e-4a8d-b000-b147a4a1371e.html">
                        <img
                          src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/Pha-dam-sinh-nhat-me.jpg"
                          alt="pha-dam-sinh-nhat-me"
                        />
                      </a>
                    </div>
                    <div className="thumb-hover">
                      <a
                        className="play-video"
                        href="https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=49jApA-qvpE"
                      >
                        <i className="fa fa-play"></i>
                      </a>
                      <div className="thumb-date"></div>
                    </div>
                  </div>
                  <div className="top-movie-details">
                    <h4>
                      <a href="/film/pha-dam-sinh-nhat-me/084aaa40-357e-4a8d-b000-b147a4a1371e.html">
                        PH&#193; Đ&#193;M SINH NHẬT MẸ
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="single-top-movie">
                  <div className="top-movie-wrap">
                    <div className="top-movie-img">
                      <a href="/film/the-conjuring-nghi-le-cuoi-cung/ef0276af-808a-4982-be37-6f81ec1d27a1.html">
                        <img
                          src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/The-conjuring-Nghi-le-cuoi-cung.jpg"
                          alt="the-conjuring-nghi-le-cuoi-cung"
                        />
                      </a>
                    </div>
                    <div className="thumb-hover">
                      <a
                        className="play-video"
                        href="https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=sbsNPOzdBg0"
                      >
                        <i className="fa fa-play"></i>
                      </a>
                      <div className="thumb-date"></div>
                    </div>
                  </div>
                  <div className="top-movie-details">
                    <h4>
                      <a href="/film/the-conjuring-nghi-le-cuoi-cung/ef0276af-808a-4982-be37-6f81ec1d27a1.html">
                        THE CONJURING: NGHI LỄ CUỐI C&#217;NG
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="single-top-movie">
                  <div className="top-movie-wrap">
                    <div className="top-movie-img">
                      <a href="/film/khe-uoc-ban-dau/2941d117-a1dd-4a1e-8afd-0591f7833c90.html">
                        <img
                          src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/Khe-uoc-ban-dau.jpg"
                          alt="khe-uoc-ban-dau"
                        />
                      </a>
                    </div>
                    <div className="thumb-hover">
                      <a
                        className="play-video"
                        href="https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=fIRCSWunw-8"
                      >
                        <i className="fa fa-play"></i>
                      </a>
                      <div className="thumb-date"></div>
                    </div>
                  </div>
                  <div className="top-movie-details">
                    <h4>
                      <a href="/film/khe-uoc-ban-dau/2941d117-a1dd-4a1e-8afd-0591f7833c90.html">
                        KHẾ ƯỚC B&#193;N D&#194;U
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="single-top-movie">
                  <div className="top-movie-wrap">
                    <div className="top-movie-img">
                      <a href="/film/tram-dam-tu-than-t18/299e0984-8894-46d6-86cf-25089fb71bcf.html">
                        <img
                          src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/Tram-dam-tu-than.jpg"
                          alt="tram-dam-tu-than-t18"
                        />
                      </a>
                    </div>
                    <div className="thumb-hover">
                      <a
                        className="play-video"
                        href="https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=j_FghUMcBP0"
                      >
                        <i className="fa fa-play"></i>
                      </a>
                      <div className="thumb-date"></div>
                    </div>
                  </div>
                  <div className="top-movie-details">
                    <h4>
                      <a href="/film/tram-dam-tu-than-t18/299e0984-8894-46d6-86cf-25089fb71bcf.html">
                        TRĂM DẶM TỬ THẦN (T18)
                      </a>
                    </h4>
                  </div>
                </div>
                <div className="single-top-movie">
                  <div className="top-movie-wrap">
                    <div className="top-movie-img">
                      <a href="/film/tu-chien-tren-khong/09072faf-ff45-4939-8452-d19135ded86d.html">
                        <img
                          src="https://starlight.vn/Areas/Admin/Content/Fileuploads/images/Poster2024/Tu-chien-tren-khong.jpg"
                          alt="tu-chien-tren-khong"
                        />
                      </a>
                    </div>
                    <div className="thumb-hover">
                      <a
                        className="play-video"
                        href="https://www.youtube.com/watch?v=https://www.youtube.com/watch?v=Q-Zf8KhyS6E"
                      >
                        <i className="fa fa-play"></i>
                      </a>
                      <div className="thumb-date"></div>
                    </div>
                  </div>
                  <div className="top-movie-details">
                    <h4>
                      <a href="/film/tu-chien-tren-khong/09072faf-ff45-4939-8452-d19135ded86d.html">
                        TỬ CHIẾN TR&#202;N KH&#212;NG
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PhimMoi;
