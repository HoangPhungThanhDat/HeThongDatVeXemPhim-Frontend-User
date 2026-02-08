import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { QRCodeSVG } from 'qrcode.react';

function ThongTinCaNhan() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Kiểm tra đăng nhập
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/dang-nhap");
      return;
    }

    fetchUserInfo();
    fetchTransactions();
  }, [navigate]);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("UserId");

      // Gọi API lấy thông tin user
      const response = await axiosClient.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUserInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
      
      if (error.response?.status === 401) {
        // Token hết hạn, yêu cầu đăng nhập lại
        localStorage.clear();
        navigate("/dang-nhap");
      } else {
        setError("Không thể tải thông tin cá nhân");
        setLoading(false);
      }
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("UserId");

      // Gọi API lấy lịch sử giao dịch
      const response = await axiosClient.get(`/users/${userId}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTransactions(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử giao dịch:", error);
      // Không hiển thị lỗi nếu chỉ là không có giao dịch
      if (error.response?.status !== 404) {
        setTransactions([]);
      }
    }
  };

  // Tạo dữ liệu cho QR Code
  const generateQRData = () => {
    if (!userInfo) return "";
    
    const qrData = {
      name: userInfo.FullName,
      phone: userInfo.PhoneNumber || "N/A",
      email: userInfo.Email,
      address: userInfo.Address || "N/A",
      userId: userInfo.UserId
    };
    
    return JSON.stringify(qrData);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { text: 'Chờ xử lý', class: 'badge-warning' },
      'paid': { text: 'Đã thanh toán', class: 'badge-success' },
      'cancelled': { text: 'Đã hủy', class: 'badge-danger' },
      'completed': { text: 'Hoàn thành', class: 'badge-info' }
    };
    
    const statusInfo = statusMap[status] || { text: status, class: 'badge-secondary' };
    return <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  if (loading) {
    return (
      <section className="filmoja-login-area section_70 bg-main"
        style={{
          background: "#e6e7e9",
          maxWidth: "100%",
          borderTop: "1px solid #ccc",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Đang tải...</span>
          </div>
          <p style={{ marginTop: "10px" }}>Đang tải thông tin...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="filmoja-login-area section_70 bg-main"
        style={{
          background: "#e6e7e9",
          maxWidth: "100%",
          borderTop: "1px solid #ccc",
        }}>
        <div className="container">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </section>
    );
  }

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
              <h3>Thông tin cá nhân</h3>
              <div className="login-box">
                <p><strong>Họ tên:</strong> {userInfo?.FullName || 'N/A'}</p>
                <p><strong>Điện thoại:</strong> {userInfo?.PhoneNumber || 'Chưa cập nhật'}</p>
                <p><strong>Địa chỉ:</strong> {userInfo?.Address || 'Chưa cập nhật'}</p>
                <p><strong>Email:</strong> {userInfo?.Email || 'N/A'}</p>
                
                {/* QR Code Section */}
                <div style={{ 
                  marginTop: "30px", 
                  marginBottom: "20px",
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                  <p style={{ 
                    fontWeight: "bold", 
                    color: "#333", 
                    marginBottom: "15px",
                    fontSize: "16px"
                  }}>
                    Mã QR Thông Tin Cá Nhân
                  </p>
                  <div style={{ 
                    display: "inline-block",
                    padding: "15px",
                    backgroundColor: "#fff",
                    border: "2px solid #f37737",
                    borderRadius: "8px"
                  }}>
                    <QRCodeSVG 
                      value={generateQRData()}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p style={{ 
                    fontSize: "12px", 
                    color: "#666", 
                    marginTop: "10px",
                    fontStyle: "italic"
                  }}>
                    Quét mã để xem thông tin
                  </p>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <div style={{ float: "left", width: "49%" }}>
                    <p style={{ fontWeight: "bold", color: "#f37737" }}>Điểm tích lũy</p>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {userInfo?.LoyaltyPoints || 0}
                    </p>
                  </div>
                  <div style={{ float: "left", width: "49%" }}>
                    <p style={{ fontWeight: "bold", color: "#f37737" }}>Điểm thưởng</p>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {userInfo?.RewardPoints || 0}
                    </p>
                  </div>
                  <div style={{ clear: "both" }}></div>
                </div>

                <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                  <a 
                    href="/cap-nhat-mat-khau" 
                    className="btn btn-primary"
                    style={{ 
                      flex: "1",
                      padding: "10px",
                      textAlign: "center",
                      backgroundColor: "#f37737",
                      color: "white",
                      borderRadius: "5px",
                      textDecoration: "none"
                    }}
                  >
                    Đổi mật khẩu
                  </a>
                  <a 
                    href="/cap-nhat-tai-khoan"
                    className="btn btn-secondary"
                    style={{ 
                      flex: "1",
                      padding: "10px",
                      textAlign: "center",
                      backgroundColor: "#6c757d",
                      color: "white",
                      borderRadius: "5px",
                      textDecoration: "none"
                    }}
                  >
                    Cập nhật thông tin
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="auth-box-left margin-top">
              <h3>Lịch sử giao dịch</h3>
              <div className="login-box" style={{ textAlign: "left", padding: "0" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="table">
                    <thead>
                      <tr style={{ fontWeight: "bold", color: "#f37737" }}>
                        <th style={{ color: "#f37737" }}>Mã giao dịch</th>
                        <th style={{ color: "#f37737" }}>Ngày đặt</th>
                        <th style={{ color: "#f37737" }}>Thành tiền</th>
                        <th style={{ color: "#f37737" }}>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                          <tr key={transaction.TransactionId || transaction.id}>
                            <td>{transaction.TransactionCode || transaction.id}</td>
                            <td>{formatDate(transaction.CreatedAt || transaction.date)}</td>
                            <td>{formatCurrency(transaction.TotalAmount || transaction.amount)}</td>
                            <td>{getStatusBadge(transaction.Status || transaction.status)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
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