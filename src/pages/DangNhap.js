import React, { useState } from "react";
import bannergau2 from "../assets/images/bannergau2.png";
import { Link } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import { jwtDecode } from "jwt-decode";

const DangNhap = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const logIn = async () => {
    // Validate input
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("Đang gửi request với:", {
        Email: email,
        Password: password,
      });

      const response = await AuthApi.Login({
        Email: email,
        Password: password,
      });

      console.log("Response từ server:", response);

      // Kiểm tra cấu trúc response
      const data = response.data || response;
      const { token, user } = data;

      if (!token) {
        throw new Error("Không nhận được token từ server");
      }

      // Giải mã token
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      // Lấy role từ token
      const roleName = decodedToken.role || decodedToken.RoleName;
      console.log("RoleName:", roleName);

      // Lấy fullname từ token hoặc user object
      const fullName =
        user?.FullName || decodedToken.FullName || decodedToken.fullname;

      // Lưu thông tin vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", roleName);
      localStorage.setItem("fullname", fullName);
      localStorage.setItem("UserId", user?.UserId || decodedToken.UserId);

      console.log("Đã lưu vào localStorage:", {
        token,
        role: roleName,
        fullname: fullName,
        UserId: user?.UserId || decodedToken.UserId
      });

      // Chuyển về trang chủ và reload
      window.location.href = "/";

    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      console.error("Response lỗi:", error.response);
      
      // Xử lý các loại lỗi khác nhau
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 401) {
          setError("Email hoặc mật khẩu không đúng");
        } else if (status === 422) {
          // Lỗi validation - hiển thị chi tiết
          const errors = error.response.data?.errors;
          if (errors) {
            const errorMessages = Object.values(errors).flat().join(", ");
            setError(`Dữ liệu không hợp lệ: ${errorMessages}`);
          } else {
            setError("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại email và mật khẩu");
          }
        } else if (status === 500) {
          setError("Lỗi server, vui lòng thử lại sau");
        } else {
          setError(message || "Đăng nhập thất bại");
        }
      } else if (error.request) {
        setError("Không thể kết nối đến server");
      } else {
        setError(error.message || "Đã xảy ra lỗi, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      logIn();
    }
  };

  return (
    <div>
      <div
        className="sign section--bg"
        style={{
          background: "#e6e7e9",
          maxWidth: "100%",
          borderTop: "1px solid",
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
              <p>Đăng nhập với tài khoản của bạn!</p>
            </div>

            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading">Đăng nhập</h3>

                  {/* Hiển thị lỗi */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="row register-form">
                    <div className="col-md-9">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          id="lgUserName"
                          placeholder="Email / Tên đăng nhập"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          minLength="6"
                          maxLength="50"
                          name="txtEmpPhone"
                          className="form-control"
                          id="lgPassword"
                          placeholder="Mật khẩu(*)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <ul style={{ display: "flex", gap: "5px", padding: 0 }}>
                          <li>
                            <Link to="/dang-ky">Đăng ký /</Link>
                          </li>
                          <li>
                            <a href="/quen-mat-khau.html">Quên mật khẩu?</a>
                          </li>
                        </ul>
                      </div>
                      <input
                        type="button"
                        className="btnRegister"
                        onClick={logIn}
                        value={loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        disabled={loading}
                        style={{
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.7 : 1,
                        }}
                      />
                      <div className="clearfix"></div>
                      <p style={{ color: "#333", fontSize: "15px" }}>
                        Hoặc đăng nhập với
                      </p>
                      <div className="clearfix"></div>
                      <div
                        className="row"
                        style={{
                          marginTop: "5px",
                          paddingTop: "20px",
                          borderTop: "1px dotted #f37737",
                          justifyContent: "center",
                        }}
                      >
                        <a href="#" className="fb-btn">
                          <i className="fa fa-facebook" title="Facebook"></i>
                        </a>
                        <a href="#" className="gg-btn">
                          <i className="fa fa-google" title="Google"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangNhap;