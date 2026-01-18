import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bannergau2 from "../assets/images/bannergau2.png";
import AuthApi from "../api/AuthApi";

const DangKy = () => {
  const navigate = useNavigate();

  // State cho form
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    PasswordConfirm: "",
    PhoneNumber: "",
    Gender: "Male",
    DateOfBirth: "",
    Address: "",
    StoreId: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi radio gender
  const handleGenderChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Gender: e.target.value,
    }));
  };

  // Validate form
  const validateForm = () => {
    // Kiểm tra các trường bắt buộc
    if (!formData.FullName.trim()) {
      setError("Vui lòng nhập họ tên");
      return false;
    }

    if (!formData.Email.trim()) {
      setError("Vui lòng nhập email");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      setError("Email không hợp lệ");
      return false;
    }

    if (!formData.PhoneNumber.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return false;
    }

    // Validate phone number (10 số)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.PhoneNumber)) {
      setError("Số điện thoại phải có 10 chữ số");
      return false;
    }

    if (!formData.Password) {
      setError("Vui lòng nhập mật khẩu");
      return false;
    }

    if (formData.Password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    if (formData.Password !== formData.PasswordConfirm) {
      setError("Mật khẩu nhập lại không khớp");
      return false;
    }

    if (!formData.Address.trim()) {
      setError("Vui lòng nhập địa chỉ");
      return false;
    }

    return true;
  };

  // Xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("Đang gửi request đăng ký:", formData);

      const registerData = {
        FullName: formData.FullName,
        Email: formData.Email,
        Password: formData.Password,
        PhoneNumber: formData.PhoneNumber,
        Gender: formData.Gender,
        DateOfBirth: formData.DateOfBirth || null,
        Address: formData.Address,
        StoreId: formData.StoreId || null,

        RoleId: 2,
        Status: "Active",
      };

      const response = await AuthApi.Register(registerData);

      // Chuyển đến trang đăng nhập
      navigate("/dang-nhap");
    } catch (error) {
      // Xử lý lỗi
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 422) {
          // Lỗi validation từ server
          const errors = error.response.data?.errors;
          if (errors) {
            const errorMessages = Object.values(errors).flat().join(", ");
            setError(errorMessages);
          } else {
            setError(message || "Dữ liệu không hợp lệ");
          }
        } else if (status === 409) {
          setError("Email đã được sử dụng");
        } else if (status === 500) {
          setError("Lỗi server, vui lòng thử lại sau");
        } else {
          setError(message || "Đăng ký thất bại");
        }
      } else if (error.request) {
        setError("Không thể kết nối đến server");
      } else {
        setError("Đã xảy ra lỗi, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="sign section--bg"
        style={{
          background: "#e6e7e9",
          maxWidth: "100%",
          borderTop: "1px solid #000",
        }}
      >
        <div className="container register" style={{ maxWidth: "100%" }}>
          <div className="row">
            <div className="col-md-3 register-left">
              <img
                src={bannergau2}
                alt="logo"
                style={{
                  width: "2000px",
                  height: "auto",
                  display: "block",
                }}
              />
              <p>Đăng ký tài khoản thành viên và nhận ngay ưu đãi!</p>
              <br />
            </div>

            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading">Thông tin tài khoản</h3>

                  {/* Hiển thị lỗi */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleRegister}>
                    <div className="row register-form">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="FullName"
                            placeholder="Họ & tên(*)"
                            value={formData.FullName}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="Address"
                            placeholder="Địa chỉ(*)"
                            value={formData.Address}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="date"
                            name="DateOfBirth"
                            className="form-control"
                            placeholder="Ngày sinh"
                            value={formData.DateOfBirth}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="tel"
                            minLength="10"
                            maxLength="10"
                            name="PhoneNumber"
                            className="form-control"
                            placeholder="Điện thoại(*)"
                            value={formData.PhoneNumber}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="Email"
                            placeholder="Email (*)"
                            value={formData.Email}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            name="Password"
                            placeholder="Mật khẩu(*)"
                            minLength="6"
                            value={formData.Password}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            name="PasswordConfirm"
                            placeholder="Mật khẩu nhập lại(*)"
                            minLength="6"
                            value={formData.PasswordConfirm}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-group">
                          <div className="maxl">
                            <label className="radio inline">
                              <input
                                type="radio"
                                name="Gender"
                                value="Male"
                                checked={formData.Gender === "Male"}
                                onChange={handleGenderChange}
                                disabled={loading}
                              />
                              <span> Nam </span>
                            </label>
                            <label className="radio inline">
                              <input
                                type="radio"
                                name="Gender"
                                value="Female"
                                checked={formData.Gender === "Female"}
                                onChange={handleGenderChange}
                                disabled={loading}
                              />
                              <span> Nữ </span>
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="maxl">
                            <select
                              className="form-control"
                              name="StoreId"
                              value={formData.StoreId}
                              onChange={handleChange}
                              disabled={loading}
                            >
                              <option value="">-- Chọn rạp --</option>
                              <option value="38">
                                STARLIGHT BUÔN MA THUỘT
                              </option>
                              <option value="39">STARLIGHT ĐÀ NẴNG</option>
                              <option value="42">STARLIGHT QUY NHƠN</option>
                              <option value="43">STARLIGHT BẢO LỘC</option>
                              <option value="44">STARLIGHT LONG AN</option>
                              <option value="46">STARLIGHT GIA LAI</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btnRegister"
                          disabled={loading}
                          style={{
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1,
                          }}
                        >
                          {loading ? "Đang xử lý..." : "Đăng ký"}
                        </button>
                      </div>

                      <p style={{ color: "#333", marginTop: "15px" }}>
                        Vui lòng nhập đầy đủ thông tin vào các trường có đánh
                        dấu <b style={{ color: "red" }}>(*)</b>
                      </p>

                      <p style={{ color: "#333", marginTop: "10px" }}>
                        Đã có tài khoản?{" "}
                        <Link
                          to="/dang-nhap"
                          style={{ color: "#f37737", fontWeight: "bold" }}
                        >
                          Đăng nhập ngay
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangKy;
