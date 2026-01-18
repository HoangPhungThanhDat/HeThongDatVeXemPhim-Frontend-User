import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ThongTinCaNhan() {
  

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
                <div className="col-lg-6">
                    <div className="auth-box-right">
                        <h3>Th&#244;ng tin c&#225; nh&#226;n</h3>
                        <div className="login-box">

                            <p>Ho&#224;ng Ph&#249;ng Th&#224;nh Đạt</p>
                            <p>Điện thoại: 0325302054</p>
                            <p>Địa chỉ: Hồ Ch&#237; Minh</p>
                            <p>Email: dat147714@gmail.com</p>
                            
                            <div>
                                <div style={{float:"left", width:"49%"}}>
                                    <p style={{fontWeight:"bold", color:"#f37737"}}>Điểm t&#237;ch lũy</p>
                                    <p>0</p>
                                </div>
                                <div style={{float:"left", width:"49%"}}>
                                    <p style={{fontWeight:"bold", color:"#f37737"}}>Điểm thưởng</p>
                                    <p>0</p>
                                </div>
                            </div>
                            <a href="/doi-mat-khau.html">Đổi mật khẩu</a>
                            <a href="/cap-nhat-tai-khoan.html">Cập nhật th&#244;ng tin</a>


                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="auth-box-left margin-top">
                        <h3>Lịch sử giao dịch</h3>
                        <div className="login-box" style={{textAlign:"left", padding:"0 "}}>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr style={{fontWeight:"bold",color:"#f37737"}}>
                                            <th style={{color:"#f37737"}}>M&#227; giao dịch</th>
                                            <th style={{color:"#f37737"}}>Ng&#224;y đặt</th>
                                            <th style={{color:"#f37737"}}>Th&#224;nh tiền</th>
                                            <th style={{color:"#f37737"}}>Trạng Th&#225;i</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td colspan={4}>Kh&#244;ng c&#243; dữ liệu</td>
                                        </tr>
                                    </tbody>
                                </table>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default ThongTinCaNhan;
