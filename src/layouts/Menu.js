import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bannergau from "../assets/images/bannergau21.png";
import "../assets/css/Style.css";

function Menu() {
  return (
    <div>
      <header className="filmoja-header-area">
        {/* Header Top Area Start */}
        <div className="header-top-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-3 col-sm-12">
                <div className="header-top-social">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-google-plus-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-pinterest-square"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-7 col-md-9 col-sm-12">
                <div className="header-top-menu">
                  <ul>
                    <li>
                      <a href="/cau-hoi-thuong-gap.html">FAQ's</a>
                    </li>
                    <li className="btn-member">
                      <Link to="/dang-nhap">
                        <i
                          className="fa fa-sign-in-alt"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Đăng Nhập
                      </Link>
                    </li>
                    <li className="btn-member">
                      <Link to="/dang-ky">
                        <i
                          className="fa fa-user-plus"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Đăng ký
                      </Link>
                    </li>

                    {/* <li>
                      <button onClick={logOut} className="btn-member">
                        Đăng xuất
                      </button>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <header className="main-header-area">
          <div className="navbar-container">
            {/* Logo */}
            <div className="navbar-logo">
              <Link to="/">
                <img src={bannergau} alt="Starlight" />
              </Link>
            </div>

            {/* Hamburger (Mobile) */}
            <div className="navbar-toggle" id="navbar-toggle">
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Overlay cho mobile menu */}
            <div id="overlay" className="overlay"></div>

            {/* Off-canvas menu */}
            <nav className="navbar-menu" id="navbar-menu">
              <ul className="menu-list">
                <li>
                  <Link to="/">
                    <i className="fa fa-home"></i>Trang chủ{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/lich-chieu">
                    <i className="fa fa-calendar"></i>Lịch chiếu
                  </Link>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <i className="fa fa-film"></i>Phim
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/phim-dang-chieu">
                        <i className="fa fa-play-circle"></i>Phim Đang Chiếu
                      </Link>
                    </li>
                    <li>
                      <a href="phim.html">
                        <i className="fa fa-clock-o"></i>Phim Sắp Chiếu
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/khuyen-mai">
                    <i className="fa fa-tags"></i>Khuyến mãi
                  </Link>
                </li>
                <li>
                  <Link to="/dien-anh">
                    <i className="fa fa-video-camera"></i>Điện ảnh{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/lien-he">
                    <i className="fa fa-envelope"></i>Liên hệ{" "}
                  </Link>
                </li>
                <li>
                  <a href="tuyen-dung.html">
                    <i className="fa fa-briefcase"></i>Tuyển dụng
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </header>
    </div>
  );
}

export default Menu;
