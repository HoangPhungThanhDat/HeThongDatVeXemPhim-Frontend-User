import React, { useState } from "react";
import bannergau2 from "../assets/images/bannergau2.png";
import { Link, useNavigate } from "react-router-dom";
const DangNhap = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = () => {
    // Xử lý đăng nhập ở đây
    console.log("Email:", email);
    console.log("Password:", password);
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
                  width: "2000px", // chỉnh chiều rộng
                  height: "auto", // giữ đúng tỉ lệ
                  display: "block", // giúp logo gọn gàng
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
                        value="Đăng nhập"
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
