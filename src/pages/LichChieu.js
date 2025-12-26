import React from "react";
import bmt from "../assets/images/bmt.jpg";
import đn from "../assets/images/đn.jpg";
import qn from "../assets/images/qn.jpg";
import GL from "../assets/images/GL(1).jpg";
import bl from "../assets/images/bl.jpg";
import la from "../assets/images/la.jpg";

const LichChieu = () => {
  return (
    <div>
      <section
        className="filmoja-blog-page section_30 bg-main"
        style={{
          minHeight: "500px",
          background: "#e6e7e9",
          maxWidth: "100%",
          borderTop: "1px solid"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="blog-page-list row">

                {/* === START: 1 === */}
                <div className="single-news-item col-lg-6 col-md-6 col-sm-12" style={{ padding: "10px" }}>
                  <a href="/lich-chieu/starlight-buon-ma-thuot-1.html">
                    <div className="news-image">
                      <img src={bmt} alt="starlight-buon-ma-thuot" />
                      <div
                        style={{
                          position: "relative",
                          bottom: 0,
                          padding: "5px",
                          backgroundImage: "linear-gradient(to top, #000000 , #141415cc)",
                          width: "100%",
                          color: "#fff",
                          letterSpacing: "2px"
                        }}
                      >
                        <p style={{ color: "#f37737", fontWeight: 600, fontSize: "20px" }}>
                          STARLIGHT BUÔN MA THUỘT
                        </p>
                        <p style={{ color: "#fff", minHeight: "45px" }}>
                          Tầng 6 Tòa Nhà Vincom - 78 Lý Thường Kiệt - TP.BMT
                        </p>
                        <p style={{ color: "#fff" }}>
                          <b>Hotline: </b> 1900 1722
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* === START: 2 === */}
                <div className="single-news-item col-lg-6 col-md-6 col-sm-12" style={{ padding: "10px" }}>
                  <a href="/lich-chieu/starlight-da-nang-2.html">
                    <div className="news-image">
                      <img src={đn} alt="starlight-da-nang" />
                      <div
                        style={{
                          position: "relative",
                          bottom: 0,
                          padding: "5px",
                          backgroundImage: "linear-gradient(to top, #000000 , #141415cc)",
                          width: "100%",
                          color: "#fff",
                          letterSpacing: "2px"
                        }}
                      >
                        <p style={{ color: "#f37737", fontWeight: 600, fontSize: "20px" }}>
                          STARLIGHT ĐÀ NẴNG
                        </p>
                        <p style={{ color: "#fff", minHeight: "45px" }}>
                          Tầng 4 Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng
                        </p>
                        <p style={{ color: "#fff" }}>
                          <b>Hotline: </b> 1900 1722
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* === Các khối tương tự bạn chỉ cần copy/paste và thay đổi ảnh + nội dung === */}

                {/* === Quy Nhơn === */}
                <div className="single-news-item col-lg-6 col-md-6 col-sm-12" style={{ padding: "10px" }}>
                  <a href="/lich-chieu/starlight-quy-nhon-3.html">
                    <div className="news-image">
                      <img src={qn} alt="starlight-quy-nhon" />
                      <div
                        style={{
                          position: "relative",
                          bottom: 0,
                          padding: "5px",
                          backgroundImage: "linear-gradient(to top, #000000 , #141415cc)",
                          width: "100%",
                          color: "#fff",
                          letterSpacing: "2px"
                        }}
                      >
                        <p style={{ color: "#f37737", fontWeight: 600, fontSize: "20px" }}>
                          STARLIGHT QUY NHƠN
                        </p>
                        <p style={{ color: "#fff", minHeight: "45px" }}>
                          52A Tăng Bạt Hổ, P. Lê Lợi, TP. Quy Nhơn, Bình Định
                        </p>
                        <p style={{ color: "#fff" }}>
                          <b>Hotline: </b> 1900 1722
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* === Gia Lai === */}
                <div className="single-news-item col-lg-6 col-md-6 col-sm-12" style={{ padding: "10px" }}>
                  <a href="/lich-chieu/starlight-gia-lai-7.html">
                    <div className="news-image">
                      <img src={GL} alt="starlight-gia-lai" />
                      <div
                        style={{
                          position: "relative",
                          bottom: 0,
                          padding: "5px",
                          backgroundImage: "linear-gradient(to top, #000000 , #141415cc)",
                          width: "100%",
                          color: "#fff",
                          letterSpacing: "2px"
                        }}
                      >
                        <p style={{ color: "#f37737", fontWeight: 600, fontSize: "20px" }}>
                          STARLIGHT GIA LAI
                        </p>
                        <p style={{ color: "#fff", minHeight: "45px" }}>
                          Tầng 5, Kim Center, 53 Quang Trung, TP. Pleiku, Gia Lai
                        </p>
                        <p style={{ color: "#fff" }}>
                          <b>Hotline: </b> 1900 1722
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* === Bảo Lộc === */}
                <div className="single-news-item col-lg-6 col-md-6 col-sm-12" style={{ padding: "10px" }}>
                  <a href="/lich-chieu/starlight-bao-loc-5.html">
                    <div className="news-image">
                      <img src={bl} alt="starlight-bao-loc" />
                      <div
                        style={{
                          position: "relative",
                          bottom: 0,
                          padding: "5px",
                          backgroundImage: "linear-gradient(to top, #000000 , #141415cc)",
                          width: "100%",
                          color: "#fff",
                          letterSpacing: "2px"
                        }}
                      >
                        <p style={{ color: "#f37737", fontWeight: 600, fontSize: "20px" }}>
                          STARLIGHT BẢO LỘC
                        </p>
                        <p style={{ color: "#fff", minHeight: "45px" }}>
                          729 Trần Phú, P. B’Lao, TP. Bảo Lộc, tỉnh Lâm Đồng
                        </p>
                        <p style={{ color: "#fff" }}>
                          <b>Hotline: </b> 1900 1722
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* === Long An === */}
                <div className="single-news-item col-lg-6 col-md-6 col-sm-12" style={{ padding: "10px" }}>
                  <a href="/lich-chieu/starlight-long-an-6.html">
                    <div className="news-image">
                      <img src={la} alt="starlight-long-an" />
                      <div
                        style={{
                          position: "relative",
                          bottom: 0,
                          padding: "5px",
                          backgroundImage: "linear-gradient(to top, #000000 , #141415cc)",
                          width: "100%",
                          color: "#fff",
                          letterSpacing: "2px"
                        }}
                      >
                        <p style={{ color: "#f37737", fontWeight: 600, fontSize: "20px" }}>
                          STARLIGHT LONG AN
                        </p>
                        <p style={{ color: "#fff", minHeight: "45px" }}>
                          Lầu 1 & 3, Vincom Plaza LA, góc Hùng Vương & Mai Thị Tốt, P. 2, TP. Tân An
                        </p>
                        <p style={{ color: "#fff" }}>
                          <b>Hotline: </b> 1900 1722
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                {/* === END === */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LichChieu;
