import React, { useState, useEffect } from "react";
import khuyenmai1 from "../assets/images/z6946906281651_c276ac03ef415a6b9b92de2358670bd1.jpg";
import khuyenmai2 from "../assets/images/u22-fb-640x960.jpg";
import khuyenmai3 from "../assets/images/z3970954913942_5553a1bb37330ee79929701b4eb55b53.jpg";
import khuyenmai4 from "../assets/images/z6057107298197_1deb166a52863f663f624695d88647d4.jpg";
import khuyenmai5 from "../assets/images/banggia.jpg";
import khuyenmai6 from "../assets/images/z5122303837558_7d7bc7bd94c57b848d3ca4eb8c7b3221.jpg";
import bg from "../assets/images/bgs5.jpg";

function KhuyenMai() {
  useEffect(() => {
    // Owl Carousel
    $(".top-movie-slider-1").owlCarousel({
      loop: true,
      margin: 15,
      nav: true, // có mũi tên điều hướng
      dots: true, // có chấm tròn
      autoplay: true,
      autoplayTimeout: 4000,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 }, // Desktop hiện 4 cái
      },
    });

    // Slick Carousel
    $(".amy-movie-items").slick({
      slidesToShow: 4, // hiện 4 phim cùng lúc
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    });
  }, []);
  return (
    <div>
      <section
        className="filmoja-top-movies-area section_30"
        style={{
          background: `url(${bg}) no-repeat scroll 0 0`,
          backgroundSize: "cover",
        }}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="filmoja-heading">
                <h2>Khuyến m&#227;i v&#224; sự kiện</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="top-movie-slider-1 owl-carousel">
                <div>
                  <a
                    href="/uu-dai/gia-ve-le-2-9-1052.html"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={khuyenmai1} />
                  </a>
                </div>
                <div>
                  <a
                    href="/uu-dai/ct-u22-rap-starlight-1047.html"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={khuyenmai2} />
                  </a>
                </div>
                <div>
                  <a
                    href="/uu-dai/thu-3-phim-viet-1046.html"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={khuyenmai3} />
                  </a>
                </div>
                <div>
                  <a
                    href="/uu-dai/thong-bao-tien-hanh-reset-diem-theo-thong-le-nam-2024-1044.html"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={khuyenmai4} />
                  </a>
                </div>
                <div>
                  <a
                    href="/uu-dai/bang-gia-ve-ap-dung-hien-hanh-cac-rap-starlight-cinema-1043.html"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={khuyenmai5} />
                  </a>
                </div>
                <div>
                  <a
                    href="/uu-dai/bang-gia-rap-gold-1033.html"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={khuyenmai6} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KhuyenMai;
