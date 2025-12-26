import React, { useState } from "react";
import app2 from "../assets/images/app-2.jpg";
import app1 from "../assets/images/app-1.jpg";
import congthuong from "../assets/images/congthuong.png";
import bannergau2 from "../assets/images/bannergau2.png";


function Footer() {
  const [isBookingVisible, setBookingVisible] = useState(false);

  const toggleMBooking = () => {
    setBookingVisible(!isBookingVisible);
  };

  return (
    <div>
      <footer className="filmoja-footer-area">
        <div className="footer-top-area section_70">
          <div className="container">
            <div className="row">
              {/* Cột logo + liên hệ */}
              <div className="col-lg-4 col-sm-6">
                <div className="single-footer-widget">
                  <a href="#">
                    <img src={bannergau2} alt="footer logo" />
                  </a>
                  <div className="footer-contact">
                    <p>
                      Support: <a href="#">Cskh@starlight.vn</a>
                    </p>
                    <p>
                      Hotline: <a href="tel:19001722">1900 1722</a>
                    </p>
                    <ul>
                      <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                      <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                      <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cột chính sách */}
              <div className="col-lg-4 col-sm-6">
                <div className="single-footer-widget">
                  <h3><b>Chính sách</b></h3>
                  <ul>
                    <li><a href="/chinh-sach/dieu-khoan-chung-1.html"><i className="fa fa-angle-double-right"></i>Điều khoản chung</a></li>
                    <li><a href="/chinh-sach/chinh-sach-thanh-toan-2.html"><i className="fa fa-angle-double-right"></i>Chính sách thanh toán</a></li>
                    <li><a href="/chinh-sach/chinh-sach-giao-nhan-3.html"><i className="fa fa-angle-double-right"></i>Chính sách giao nhận</a></li>
                    <li><a href="/chinh-sach/bao-mat-thong-tin-4.html"><i className="fa fa-angle-double-right"></i>Bảo mật thông tin</a></li>
                    <li><a href="/chinh-sach/kiem-hang-doi-tra-hoan-tien-5.html"><i className="fa fa-angle-double-right"></i>Đổi trả / Hoàn tiền</a></li>
                  </ul>
                </div>
              </div>

              {/* Cột tải app */}
              <div className="col-lg-4 col-sm-6">
                <div className="single-footer-widget">
                  <h3><b>Download App</b></h3>
                  <div className="footer-app-box">
                    <p><b>Tải ngay ứng dụng đặt vé online cho dế yêu của bạn!</b></p>
                    <ul className="apps-list">
                      <li>
                        <a href="https://play.google.com/store/apps/details?id=com.kingprocompany.starlightcinemas">
                          <img src={app1} alt="app google play" />
                        </a>
                      </li>
                      <li>
                        <a href="https://apps.apple.com/us/app/starlight-cinemas/id1588865280">
                          <img src={app2} alt="app ios" />
                        </a>
                      </li>
                    </ul>
                    <ul className="apps-list">
                      <li>
                        <a href="http://online.gov.vn/Home/WebDetails/118483" target="_blank">
                          <img alt="bộ công thương" src={congthuong} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin công ty */}
            <div className="container">
              <h3><b>CÔNG TY CỔ PHẦN ENTERTAINMENT 2020</b></h3>
              <p><b>Giấy chứng nhận đăng kí doanh nghiệp công ty cổ phần: 0402021264 đăng ký lần đầu ngày 03/01/2020</b></p>
              <p><b>Cơ quan cấp: Phòng Đăng ký kinh doanh - Sở kế hoạch và đầu tư Thành phố Đà Nẵng</b></p>
              <p><b>Địa chỉ: Tầng 4, Tòa nhà Nguyễn Kim, 46 Điện Biên Phủ, TP. Đà Nẵng, Việt Nam</b></p>
              <p><b>Hotline (Đường dây nóng): <a href="tel:19001722">19001722</a></b></p>
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-box">
                  <p><b>2025 © Gấu Phim - Nhóm Hoàng Đạt <a href="#">KingPro</a></b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Menu Mobile */}
      <section>
        <div id="mobile-menu">
          <ul>
            <li>
              <a href="/" style={{ backgroundColor: "#2b2b31" }}>
                <i className="fa fa-home"></i><br />Trang Chủ
              </a>
            </li>
            <li>
              <p onClick={toggleMBooking} style={{ backgroundColor: "#2b2b31", cursor: "pointer" }}>
                <i className="fa fa-ticket"></i><br />Đặt Vé
              </p>
            </li>
            <li>
              <a href="/lich-chieu.html" style={{ backgroundColor: "#2b2b31" }}>
                <i className="fa fa-film"></i><br />Lịch Chiếu
              </a>
            </li>
            <li>
              <a href="/uu-dai.html" style={{ backgroundColor: "#2b2b31" }}>
                <i className="fa fa-gift"></i><br />Ưu Đãi
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Form Đặt Vé Mobile */}
      <section>
        <div className={`mobile-book ${isBookingVisible ? "show-mobile-book" : ""}`}>
          <select className="slMTheater">
            <option value="0">Rạp</option>
          </select>
          <select className="slMFilm">
            <option value="0">Phim</option>
          </select>
          <select className="slMDate">
            <option value="0">Ngày chiếu</option>
          </select>
          <select className="slMTime">
            <option value="0">Suất chiếu</option>
          </select>
          <a id="btnMBooking" href="#">
            Mua Vé Ngay
          </a>
        </div>
      </section>
    </div>
  );
}

export default Footer;
