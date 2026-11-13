import React, { useState, useEffect } from 'react';
import { useNguoiDung } from '../hooks/useNguoiDung';
import axiosClient from '../../../api/axiosClient';
import {
  UserInfoCard,
  TransactionHistory,
  LoadingState,
  ErrorState,
} from '../components/TrangCaNhan';

// CSS bổ sung để fix responsive cho bảng
const customStyles = `
  @media (max-width: 768px) {
    .filmoja-login-area {
      padding: 20px 0 !important;
    }
    .auth-box-left h3 {
      font-size: 18px !important;
    }
    .table-responsive-mobile {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .table-responsive-mobile table {
      min-width: 500px; /* Ép bảng rộng ra để cuộn ngang thay vì bóp méo chữ */
    }
    .membership-table table {
      min-width: 600px;
    }
  }
`;

function TrangCaNhanPage() {
  const { userInfo, loading: loadingUser, error: errorUser } = useNguoiDung();
  
  const [transactions, setTransactions] = useState([]);
  const [loadingTx, setLoadingTx] = useState(true);
  const [errorTx, setErrorTx] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingTx(true);
        const res = await axiosClient.get('/my-orders'); 
        const data = res?.data?.data ?? res?.data ?? res;
        setTransactions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Lỗi lấy lịch sử giao dịch:', err);
        setErrorTx('Không thể tải lịch sử giao dịch');
      } finally {
        setLoadingTx(false);
      }
    };
    fetchOrders();
  }, []);

  if (loadingUser || loadingTx) return <LoadingState />;
  if (errorUser) return <ErrorState error={errorUser} />;

  const membershipData = {
    cardCode: '74157629',
    rank: 'STAR YOUNG',
    expiryDate: '12/11/2026',
    pointsUsed: '0.00',
    accumulatedPoints: userInfo?.Points || 0, 
  };

  return (
    <section
      className="filmoja-login-area section_70 bg-main"
      style={{ background: '#e6e7e9', maxWidth: '100%', borderTop: '1px solid #ccc', padding: '40px 0' }}
    >
      <style>{customStyles}</style>
      
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -15px' }}>
          
          {/* CỘT TRÁI: THÔNG TIN CÁ NHÂN */}
          <div className="col-lg-5 col-md-12 mb-4" style={{ padding: '0 15px', width: '100%', maxWidth: '41.666667%', flex: '0 0 41.666667%' }}>
            <div className="mobile-col-fix" style={{ width: '100%' }}>
              <UserInfoCard userInfo={userInfo} />
            </div>
          </div>

          {/* CỘT PHẢI: GIAO DỊCH, THẺ THÀNH VIÊN, LỊCH SỬ ĐIỂM */}
          <div className="col-lg-7 col-md-12" style={{ padding: '0 15px', width: '100%', maxWidth: '58.333333%', flex: '0 0 58.333333%' }}>
            
            {/* 1. Lịch sử giao dịch */}
            <div className="auth-box-left mb-4">
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Lịch Sử Giao Dịch</h3>
              {errorTx ? (
                <div style={{ color: 'red' }}>{errorTx}</div>
              ) : (
                <div className="table-responsive-mobile">
                  <TransactionHistory transactions={transactions} />
                </div>
              )}
            </div>

            {/* 2. Thông tin thẻ thành viên */}
            <div className="auth-box-left mb-4">
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Thông Tin Thẻ Thành Viên</h3>
              <div className="table-responsive-mobile membership-table" style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
                <table className="table" style={{ width: '100%', textAlign: 'center', marginBottom: 0 }}>
                  <thead>
                    <tr style={{ color: '#f37737', borderBottom: '1px solid #ddd' }}>
                      <th style={{ padding: '10px' }}>Mã Thẻ</th>
                      <th style={{ padding: '10px' }}>Loại Thành Viên</th>
                      <th style={{ padding: '10px' }}>Tính Đến Ngày</th>
                      <th style={{ padding: '10px' }}>Điểm Đổi Thưởng</th>
                      <th style={{ padding: '10px' }}>Điểm Tích Lũy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px' }}>{membershipData.cardCode}</td>
                      <td style={{ padding: '10px' }}></td>
                      <td style={{ padding: '10px' }}>{membershipData.expiryDate}</td>
                      <td style={{ padding: '10px' }}>{membershipData.pointsUsed}</td>
                      <td style={{ padding: '10px' }}>{membershipData.accumulatedPoints}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Lịch sử tích điểm */}
            <div className="auth-box-left mb-4">
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Lịch Sử Tích Điểm</h3>
              <div className="table-responsive-mobile" style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
                <table className="table" style={{ width: '100%', textAlign: 'center', marginBottom: 0 }}>
                  <thead>
                    <tr style={{ color: '#f37737', borderBottom: '1px solid #ddd' }}>
                      <th style={{ padding: '10px' }}>Thời Gian</th>
                      <th style={{ padding: '10px' }}>Tên Loại</th>
                      <th style={{ padding: '10px' }}>Số Điểm</th>
                      <th style={{ padding: '10px' }}>Lý Do</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} style={{ padding: '20px', color: '#666' }}>
                        Chưa có lịch sử tích điểm.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Khung thông báo hạng thành viên */}
            <div style={{ 
              border: '1px solid #f37737', 
              borderRadius: '8px', 
              padding: '15px 20px', 
              backgroundColor: '#fff', 
              color: '#333',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              Bạn đang hạng <strong>STAR YOUNG</strong> (ưu đãi 5%). Cần thêm <strong>200 điểm tích lũy</strong> để lên <strong>STAR GOLD</strong> và nhận quyền lợi, ưu đãi thành viên <strong>STARLIGHT</strong>.
            </div>

          </div>
        </div>
      </div>
      
      {/* Thêm media query inline để fix grid cột trên mobile (do đang dùng style inline) */}
      <style>{`
        @media (max-width: 991px) {
          .col-lg-5, .col-lg-7 {
            max-width: 100% !important;
            flex: 0 0 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

export default TrangCaNhanPage;