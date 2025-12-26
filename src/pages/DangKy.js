import React from "react";
import bannergau2 from "../assets/images/bannergau2.png";

const DangKy = () => {
  return (
    <div>
      <div
        class="sign section--bg"
        data-bg=""
        style={{
          background: "#e6e7e9",
          maxWidth: "100%",
          borderTop: "1px solid #000", // nhớ thêm màu cho border
        }}
      >
        <div class="container register" style={{ maxWidth: "100%" }}>
          <div class="row">
            <div class="col-md-3 register-left">
              <img
                src={bannergau2}
                alt="logo"
                style={{
                  width: "2000px", // chỉnh chiều rộng
                  height: "auto", // giữ đúng tỉ lệ
                  display: "block", // giúp logo gọn gàng
                }}
              />

              <p>Đăng ký tài khoản thành viên và nhận ngay ưu đãi!</p>
              <br />
            </div>
            <div class="col-md-9 register-right">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 class="register-heading">Thông tin tài khoản</h3>
                  <div class="row register-form">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="rgFullName"
                          placeholder="Họ &amp; t&#234;n(*)"
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="rgAddress"
                          placeholder="Địa chỉ(*)"
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="rgCMND"
                          placeholder="CMND(*)"
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          id="rgBirthDay"
                          class="form-control"
                          placeholder="Ng&#224;y sinh"
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="tel"
                          minlength="10"
                          maxlength="10"
                          id="rgPhone"
                          name="txtEmpPhone"
                          class="form-control"
                          placeholder="Điện thoại(*)"
                          value=""
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="rgEmail"
                          placeholder="Email (*)"
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="rgUserName"
                          placeholder="Email / T&#234;n đăng nhập (*)"
                          value=""
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          id="rgPassword"
                          placeholder="Mật khẩu(*)"
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          id="rgPasswordConfirm"
                          placeholder="Mật khẩu nhập lại(*)"
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <div class="maxl">
                          <label class="radio inline">
                            <input
                              type="radio"
                              id="rgGenderTrue"
                              name="optradio"
                              value="Nam"
                              checked
                            />
                            <span> Nam </span>
                          </label>
                          <label class="radio inline">
                            <input
                              type="radio"
                              id="rgGenderFalse"
                              name="optradio"
                              value="Nữ"
                            />
                            <span> Nữ </span>
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="maxl">
                          <select class="form-control" id="rgStore">
                            <option value="38">
                              STARLIGHT BU&#212;N MA THUỘT
                            </option>
                            <option value="39">STARLIGHT Đ&#192; NẴNG</option>
                            <option value="42">STARLIGHT QUY NHƠN</option>
                            <option value="43">STARLIGHT BẢO LỘC</option>
                            <option value="44">STARLIGHT LONG AN</option>
                            <option value="46">STARLIGHT GIA LAI</option>
                          </select>
                        </div>
                      </div>
                      <input
                        type="submit"
                        class="btnRegister"
                        onclick="register()"
                        value="Đăng k&#253;"
                      />
                    </div>
                    <p style={{ color: "#333" }}>
                      Vui lòng nhập đầy đủ thông tin vào các trường có đánh dấu{" "}
                      <b style={{ color: "red" }}>(*)</b>
                    </p>
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

export default DangKy;
