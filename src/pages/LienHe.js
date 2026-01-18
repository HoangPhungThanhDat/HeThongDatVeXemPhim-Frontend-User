import React, { useState, useEffect } from "react";
import tintuc1 from "../assets/images/doraemon.jpg";
import tintuc2 from "../assets/images/tham-tu-kien.jpg";
import tintuc3 from "../assets/images/LAT-MAT-8.jpg";
import tintuc4 from "../assets/images/quy-nhap-trang.jpg";
import tintuc5 from "../assets/images/flow.jpg";
import tintuc6 from "../assets/images/nha-gia-tien.jpg";
function LienHe() {
  return (
    <section
      className="filmoja-login-area section_70 bg-main"
      style={{
        background: "#e6e7e9",
        maxWidth: "100%",
        borderTop: "1px solid #ccc",
      }}
    >
      <div className="container">
        <div className="row">
          {/* <!-- Start of Contact Details --> */}
          <div className="col-md-4 col-sm-12">
            <h3
              className="title"
              style={{
                marginBottom: "15px",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#444444",
                textDecoration: "underline",

                WebkitBackgroundSize: "21px 6px",
                backgroundSize: "21px 6px",
                backgroundPosition: "left center",
                backgroundRepeat: "no-repeat",
                paddingLeft: "30px",
              }}
            >
              Thông tin
            </h3>

            <div className="details-wrapper">
              <ul className="contact-details">
                <li>
                  <i className="icon-phone"></i>
                  <strong>Hotline:</strong>
                  <span>19001722</span>
                </li>
                <li>
                  <i className="icon-printer"></i>
                  <strong>TRỤ SỞ CHÍNH:</strong>
                  <span>
                    {" "}
                    39 TRẦN KHÁNH DƯ, PHƯỜNG TÂN LỢI, TP. BUÔN MA THUỘT, TỈNH
                    ĐẮK LẮK, VIỆT NAM{" "}
                  </span>
                </li>
                <li>
                  <i className="icon-globe"></i>
                  <strong>Web:</strong>
                  <span>
                    <a href="#">www.starlight.vn</a>
                  </span>
                </li>
                <li>
                  <i className="icon-paper-plane"></i>
                  <strong>E-Mail:</strong>
                  <span>
                    <a href="#">Cskh@starlight.vn</a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- Start of Contact Details -->
                        <!-- Start of Contact Form --> */}
          <div className="col-md-8 col-sm-12">
            <h3
              className="title"
              style={{
                marginBottom: "15px",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#444444",
                textDecoration: "underline",
                backgroundImage: "url(/Content/img/tag.png)",
                WebkitBackgroundSize: "21px 6px",
                backgroundSize: "21px 6px",
                backgroundPosition: "left center",
                backgroundRepeat: "no-repeat",
                paddingLeft: "30px",
              }}
            >
              Gửi liên hệ
            </h3>

            {/* <!-- Start of Contact Form --> */}
            <form id="contact-form">
              {/* <!-- contact result --> */}
              <div id="contact-result"></div>
              {/* <!-- end of contact result -->
                                <!-- Form Group --> */}
              <div className="form-group">
                <input
                  className="form-control input-box"
                  type="text"
                  name="name"
                  id="cName"
                  placeholder="Họ tên"
                  autocomplete="off"
                />
              </div>

              {/* <!-- Form Group --> */}
              <div className="form-group">
                <input
                  className="form-control input-box"
                  type="email"
                  name="email"
                  id="cEmail"
                  placeholder="your-email@gmail.com"
                  autocomplete="off"
                />
              </div>

              {/* <!-- Form Group --> */}
              <div className="form-group">
                <input
                  className="form-control input-box"
                  type="text"
                  name="subject"
                  id="cPhone"
                  placeholder="SĐT"
                  autocomplete="off"
                />
              </div>

              {/* <!-- Form Group --> */}
              <div className="form-group mb20">
                <textarea
                  className="form-control textarea-box"
                  rows="8"
                  id="cContent"
                  name="message"
                  placeholder="Nội dung cần liên hệ..."
                ></textarea>
              </div>

              {/* <!-- Form Group --> */}
              <div className="form-group text-center">
                <button
                  className="btn btn-main btn-effect"
                  type="submit"
                  style={{ background: "#f37a3b", color: "#fff" }}
                  onclick="sendContact()"
                >
                  Send
                </button>
              </div>
            </form>
            {/* <!-- End of Contact Form --> */}
          </div>
          {/* <!-- Start of Contact Form --> */}
        </div>
      </div>
    </section>
  );
}

export default LienHe;
