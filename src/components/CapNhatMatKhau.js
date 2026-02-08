import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import bannergau2 from "../assets/images/bannergau2.png";
import Swal from "sweetalert2";
import "animate.css";

function CapNhatMatKhau() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/dang-nhap");
      return;
    }
  }, [navigate]);

  // Toast thông báo thành công
  const showSuccessToast = (message) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'swal-success-toast'
      },
      showClass: {
        popup: 'animate__animated animate__slideInRight'
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutRight'
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  };

  // Toast thông báo lỗi
  const showErrorToast = (message) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      customClass: {
        popup: 'swal-error-toast'
      },
      showClass: {
        popup: 'animate__animated animate__slideInRight'
      },
      hideClass: {
        popup: 'animate__animated animate__slideOutRight'
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    // Validate mật khẩu cũ
    if (!formData.current_password) {
      showErrorToast("Vui lòng nhập mật khẩu hiện tại");
      return false;
    }

    // Validate mật khẩu mới
    if (!formData.new_password) {
      showErrorToast("Vui lòng nhập mật khẩu mới");
      return false;
    }

    if (formData.new_password.length < 6) {
      showErrorToast("Mật khẩu mới phải có ít nhất 6 ký tự");
      return false;
    }

    // Validate xác nhận mật khẩu
    if (!formData.new_password_confirmation) {
      showErrorToast("Vui lòng xác nhận mật khẩu mới");
      return false;
    }

    if (formData.new_password !== formData.new_password_confirmation) {
      showErrorToast("Mật khẩu xác nhận không khớp");
      return false;
    }

    // Kiểm tra mật khẩu mới khác mật khẩu cũ
    if (formData.current_password === formData.new_password) {
      showErrorToast("Mật khẩu mới phải khác mật khẩu hiện tại");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      // Chuẩn bị dữ liệu gửi đi theo format API của bạn
      const dataToSend = {
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation
      };

      console.log("Đang gửi yêu cầu đổi mật khẩu...");

      // Gọi API đổi mật khẩu - sử dụng PUT method
      const response = await axiosClient.put(
        "/change-password",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Response đầy đủ:", response);
      console.log("Response data:", response.data);
      console.log("Response status:", response.status);

      // Kiểm tra response.data có tồn tại không
      const responseData = response?.data || response;
      const successMessage = responseData?.message || "Đổi mật khẩu thành công!";
      
      showSuccessToast("🎉 " + successMessage);

      // Reset form
      setFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: ""
      });

      // Chuyển về trang thông tin cá nhân sau 2 giây
      setTimeout(() => {
        navigate("/thong-tin-ca-nhan");
      }, 2000);

    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      console.error("Chi tiết lỗi:", error.response);
      
      if (error.response?.status === 401) {
        showErrorToast("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại");
        localStorage.clear();
        setTimeout(() => {
          navigate("/dang-nhap");
        }, 1500);
      } else if (error.response?.status === 422) {
        // Lỗi validation hoặc mật khẩu hiện tại không đúng
        const errorData = error.response.data;
        
        if (errorData.message) {
          showErrorToast(errorData.message);
        } else if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat().join(", ");
          showErrorToast(errorMessages);
        } else {
          showErrorToast("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại");
        }
      } else if (error.response?.status === 500) {
        showErrorToast(error.response?.data?.message || "Lỗi hệ thống. Vui lòng thử lại sau");
      } else {
        showErrorToast(error.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        /* Custom style cho toast success */
        .swal-success-toast {
          background-color: #f0fff4 !important;
          color: #166534 !important;
          font-weight: bold !important;
          border-left: 6px solid #22c55e !important;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3) !important;
          padding: 1rem !important;
          border-radius: 10px !important;
        }
        
        .swal-success-toast .swal2-timer-progress-bar {
          background: #22c55e !important;
          height: 4px !important;
        }

        /* Custom style cho toast error */
        .swal-error-toast {
          background-color: #fef2f2 !important;
          color: #991b1b !important;
          font-weight: bold !important;
          border-left: 6px solid #ef4444 !important;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3) !important;
          padding: 1rem !important;
          border-radius: 10px !important;
        }
        
        .swal-error-toast .swal2-timer-progress-bar {
          background: #ef4444 !important;
          height: 4px !important;
        }

        /* Style cho input password với icon */
        .password-input-wrapper {
          position: relative;
          width: 100%;
        }

        .password-input-wrapper input {
          padding-right: 40px;
        }

        .password-toggle-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #888;
          font-size: 16px;
          transition: color 0.3s;
        }

        .password-toggle-icon:hover {
          color: #f37737;
        }

        /* Style cho password strength indicator */
        .password-strength {
          margin-top: 8px;
          font-size: 12px;
        }

        .strength-weak {
          color: #ef4444;
        }

        .strength-medium {
          color: #f59e0b;
        }

        .strength-strong {
          color: #22c55e;
        }
      `}</style>

      <div className="sign section--bg" style={{ background: "#e6e7e9", maxWidth: "100%", borderTop: "1px solid" }}>
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
              <p>Đổi mật khẩu để bảo mật tài khoản!</p>
              <br />
            </div>

            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <h3 className="register-heading">Đổi mật khẩu</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="row register-form">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="password-input-wrapper">
                            <input 
                              type={showOldPassword ? "text" : "password"}
                              className="form-control" 
                              name="current_password"
                              value={formData.current_password}
                              onChange={handleInputChange}
                              placeholder="Mật khẩu hiện tại (*)"
                              disabled={submitting}
                              required
                            />
                            <i 
                              className={`fa ${showOldPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                              onClick={() => setShowOldPassword(!showOldPassword)}
                            ></i>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="password-input-wrapper">
                            <input 
                              type={showNewPassword ? "text" : "password"}
                              className="form-control" 
                              name="new_password"
                              value={formData.new_password}
                              onChange={handleInputChange}
                              placeholder="Mật khẩu mới (*)"
                              disabled={submitting}
                              required
                            />
                            <i 
                              className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            ></i>
                          </div>
                          {formData.new_password && (
                            <div className="password-strength">
                              {formData.new_password.length < 6 && (
                                <span className="strength-weak">⚠ Mật khẩu yếu (tối thiểu 6 ký tự)</span>
                              )}
                              {formData.new_password.length >= 6 && formData.new_password.length < 10 && (
                                <span className="strength-medium">✓ Mật khẩu trung bình</span>
                              )}
                              {formData.new_password.length >= 10 && (
                                <span className="strength-strong">✓ Mật khẩu mạnh</span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <div className="password-input-wrapper">
                            <input 
                              type={showConfirmPassword ? "text" : "password"}
                              className="form-control" 
                              name="new_password_confirmation"
                              value={formData.new_password_confirmation}
                              onChange={handleInputChange}
                              placeholder="Xác nhận mật khẩu mới (*)"
                              disabled={submitting}
                              required
                            />
                            <i 
                              className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            ></i>
                          </div>
                          {formData.new_password_confirmation && (
                            <div className="password-strength">
                              {formData.new_password === formData.new_password_confirmation ? (
                                <span className="strength-strong">✓ Mật khẩu khớp</span>
                              ) : (
                                <span className="strength-weak">✗ Mật khẩu không khớp</span>
                              )}
                            </div>
                          )}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "20px" }}>
                          <Link 
                            to="/thong-tin-ca-nhan"
                            style={{ 
                              color: "#f37737", 
                              textDecoration: "none",
                              display: "inline-block",
                              fontSize: "14px",
                              whiteSpace: "nowrap"
                            }}
                          >
                            <i className="fa fa-arrow-left"></i> Quay lại trang thông tin
                          </Link>
                          <input 
                            type="submit" 
                            className="btnRegister" 
                            value={submitting ? "Đang cập nhật..." : "Đổi mật khẩu"}
                            disabled={submitting}
                            style={{
                              cursor: submitting ? "not-allowed" : "pointer",
                              opacity: submitting ? 0.7 : 1,
                              margin: 0
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div style={{ 
                          backgroundColor: "#fff3cd", 
                          border: "1px solid #ffc107", 
                          borderRadius: "5px", 
                          padding: "15px", 
                          marginTop: "20px" 
                        }}>
                          <h6 style={{ color: "#856404", marginBottom: "10px" }}>
                            <i className="fa fa-info-circle"></i> Lưu ý khi đổi mật khẩu:
                          </h6>
                          <ul style={{ color: "#856404", fontSize: "13px", marginBottom: 0, paddingLeft: "20px" }}>
                            <li>Mật khẩu phải có ít nhất 6 ký tự</li>
                            <li>Nên sử dụng kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                            <li>Không sử dụng mật khẩu quá đơn giản hoặc dễ đoán</li>
                            <li>Mật khẩu mới phải khác với mật khẩu cũ</li>
                          </ul>
                        </div>
                      </div>

                      <p style={{ color: "#333", width: "100%", marginTop: "10px" }}>
                        Vui lòng nhập đầy đủ thông tin vào các trường có đánh dấu <b style={{ color: "red" }}>(*)</b>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CapNhatMatKhau;