// src/pages/LienHe.js
import React, { useState } from "react";
import ContactApi from "../api/ContactApi";

function LienHe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Xin hãy nhập Họ tên." });
      return;
    }
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Xin hãy nhập Email." });
      return;
    }
    if (!formData.phone.trim()) {
      setMessage({ type: "error", text: "Xin hãy nhập Số điện thoại." });
      return;
    }
    if (!formData.message.trim()) {
      setMessage({ type: "error", text: "Xin hãy nhập Nội dung." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Lấy UserId từ localStorage (đã save khi login)
      const UserId = localStorage.getItem("UserId");

      const payload = {
        UserId: UserId,
        FullName: formData.name,
        Email: formData.email,
        Phone: formData.phone,
        Message: formData.message,
        Status: "New",
      };

      await ContactApi.create(payload);

      setMessage({ type: "success", text: "Liên hệ đã được gửi thành công!" });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Lỗi gửi liên hệ:", error);
      // axiosClient đã return response.data nên errors có thể ở error.errors
      if (error.errors) {
        const firstError = Object.values(error.errors)[0][0];
        setMessage({ type: "error", text: firstError });
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0][0];
        setMessage({ type: "error", text: firstError });
      } else {
        setMessage({ type: "error", text: "Gửi liên hệ thất bại. Thử lại sau." });
      }
    } finally {
      setLoading(false);
    }
  };

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
          {/* Contact Details */}
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
                    39 TRẦN KHÁNH DƯ, PHƯỜNG TÂN LỢI, TP. BUÔN MA THUỘT, TỈNH
                    ĐẮK LẮK, VIỆT NAM
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

          {/* Contact Form */}
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

            {/* Message display */}
            <div id="contact-result">
              {message.text && (
                <div
                  style={{
                    padding: "10px 15px",
                    marginBottom: "15px",
                    borderRadius: "4px",
                    color: message.type === "success" ? "#155724" : "#842029",
                    backgroundColor:
                      message.type === "success" ? "#d4edda" : "#f8d7da",
                    border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
                  }}
                >
                  {message.text}
                </div>
              )}
            </div>

            <form id="contact-form" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-group">
                <input
                  className="form-control input-box"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Họ tên"
                  autoComplete="off"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <input
                  className="form-control input-box"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your-email@gmail.com"
                  autoComplete="off"
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <input
                  className="form-control input-box"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="SĐT"
                  autoComplete="off"
                />
              </div>

              {/* Message */}
              <div className="form-group mb20">
                <textarea
                  className="form-control textarea-box"
                  rows="8"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nội dung cần liên hệ..."
                ></textarea>
              </div>

              {/* Submit */}
              <div className="form-group text-center">
                <button
                  className="btn btn-main btn-effect"
                  type="submit"
                  disabled={loading}
                  style={{ background: "#f37a3b", color: "#fff" }}
                >
                  {loading ? "Đang gửi..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LienHe;