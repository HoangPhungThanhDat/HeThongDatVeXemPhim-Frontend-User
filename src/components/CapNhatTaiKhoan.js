import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import bannergau2 from "../assets/images/bannergau2.png";
import Swal from "sweetalert2";
import "animate.css";

function CapNhatTaiKhoan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    DateOfBirth: "",
    Gender: "Male"
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/dang-nhap");
      return;
    }
    fetchUserProfile();
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

  // Lấy thông tin user từ endpoint /profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axiosClient.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data.data || response.data;
      
      console.log("User data:", userData);
      
      // Format date từ YYYY-MM-DD sang DD/MM/YYYY
      let formattedDate = "";
      if (userData.DateOfBirth) {
        const date = new Date(userData.DateOfBirth);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        formattedDate = `${day}/${month}/${year}`;
      }

      setFormData({
        FullName: userData.FullName || "",
        Email: userData.Email || "",
        PhoneNumber: userData.PhoneNumber || "",
        Address: userData.Address || "",
        DateOfBirth: formattedDate,
        Gender: userData.Gender || "Male"
      });

      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/dang-nhap");
      } else {
        showErrorToast("Không thể tải thông tin cá nhân");
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      Gender: e.target.value
    });
  };

  const validateForm = () => {
    // Validate họ tên
    if (!formData.FullName || formData.FullName.trim().length < 2) {
      showErrorToast("Họ tên phải có ít nhất 2 ký tự");
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.Email || !emailRegex.test(formData.Email)) {
      showErrorToast("Email không hợp lệ");
      return false;
    }

    // Validate số điện thoại
    if (!formData.PhoneNumber) {
      showErrorToast("Vui lòng nhập số điện thoại");
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.PhoneNumber.replace(/\s/g, ''))) {
      showErrorToast("Số điện thoại phải có đúng 10 chữ số");
      return false;
    }

    // Validate ngày sinh (nếu có)
    if (formData.DateOfBirth) {
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      if (!dateRegex.test(formData.DateOfBirth)) {
        showErrorToast("Ngày sinh phải có định dạng DD/MM/YYYY");
        return false;
      }
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

      // Convert date từ DD/MM/YYYY sang YYYY-MM-DD cho API
      let apiDateOfBirth = null;
      if (formData.DateOfBirth) {
        const [day, month, year] = formData.DateOfBirth.split('/');
        apiDateOfBirth = `${year}-${month}-${day}`;
      }

      // Chuẩn bị dữ liệu gửi đi
      const dataToSend = {
        FullName: formData.FullName,
        Email: formData.Email,
        PhoneNumber: formData.PhoneNumber,
        Address: formData.Address,
        DateOfBirth: apiDateOfBirth,
        Gender: formData.Gender
      };

      console.log("Đang gửi dữ liệu:", dataToSend);

      // Gọi API updateProfile
      const response = await axiosClient.put(
        "/profile",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Cập nhật thành công:", response.data);

      // Cập nhật fullname trong localStorage nếu thay đổi
      if (response.data.data) {
        localStorage.setItem("fullname", response.data.data.FullName);
      }

      showSuccessToast("🎉 " + (response.data.message || "Cập nhật thông tin thành công!"));

      // Chuyển về trang thông tin cá nhân sau 2 giây
      setTimeout(() => {
        navigate("/thong-tin-ca-nhan");
      }, 2000);

    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      console.error("Chi tiết lỗi:", error.response);
      
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/dang-nhap");
      } else if (error.response?.status === 422) {
        // Lỗi validation
        const errorData = error.response.data;
        
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat().join(", ");
          showErrorToast(errorMessages);
        } else if (errorData.message) {
          showErrorToast(errorData.message);
        } else {
          showErrorToast("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin");
        }
      } else {
        showErrorToast(error.response?.data?.message || "Cập nhật thất bại. Vui lòng thử lại");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="sign section--bg" style={{ 
        background: "#e6e7e9", 
        maxWidth: "100%", 
        borderTop: "1px solid", 
        minHeight: "400px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Đang tải...</span>
          </div>
          <p style={{ marginTop: "10px", color: "black" }}>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

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
              <p>Cập nhật thông tin tài khoản của bạn!</p>
              <br />
            </div>

            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <h3 className="register-heading">Thông tin tài khoản</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="row register-form">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input 
                            type="text" 
                            className="form-control" 
                            name="FullName"
                            value={formData.FullName}
                            onChange={handleInputChange}
                            placeholder="Họ & tên (*)"
                            disabled={submitting}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input 
                            type="text" 
                            className="form-control" 
                            name="Address"
                            value={formData.Address}
                            onChange={handleInputChange}
                            placeholder="Địa chỉ"
                            disabled={submitting}
                          />
                        </div>
                        <div className="form-group">
                          <input 
                            type="text" 
                            className="form-control" 
                            name="DateOfBirth"
                            value={formData.DateOfBirth}
                            onChange={handleInputChange}
                            placeholder="Ngày sinh (DD/MM/YYYY)"
                            disabled={submitting}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <input 
                            type="tel" 
                            minLength="10" 
                            maxLength="10" 
                            className="form-control" 
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={handleInputChange}
                            placeholder="Điện thoại (*)"
                            disabled={submitting}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input 
                            type="email" 
                            className="form-control" 
                            name="Email"
                            value={formData.Email}
                            onChange={handleInputChange}
                            placeholder="Email (*)"
                            disabled={submitting}
                            required
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
                                disabled={submitting}
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
                                disabled={submitting}
                              />
                              <span> Nữ </span>
                            </label>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
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
                            value={submitting ? "Đang cập nhật..." : "Cập nhật"}
                            disabled={submitting}
                            style={{
                              cursor: submitting ? "not-allowed" : "pointer",
                              opacity: submitting ? 0.7 : 1,
                              margin: 0
                            }}
                          />
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

export default CapNhatTaiKhoan;