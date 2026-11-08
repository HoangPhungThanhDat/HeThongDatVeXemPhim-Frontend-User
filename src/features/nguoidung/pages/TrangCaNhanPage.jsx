import React, { useState, useEffect } from 'react';
import { useNguoiDung } from '../hooks/useNguoiDung';
import axiosClient from '../../../api/axiosClient'; // Đảm bảo đường dẫn này đúng
import {
  UserInfoCard,
  UserQRCode,
  UserStats,
  UserActions,
  TransactionHistory,
  LoadingState,
  ErrorState,
} from '../components/TrangCaNhan';

function TrangCaNhanPage() {
  // Lấy thông tin user
  const { userInfo, loading: loadingUser, error: errorUser } = useNguoiDung();
  
  // State riêng cho danh sách giao dịch
  const [transactions, setTransactions] = useState([]);
  const [loadingTx, setLoadingTx] = useState(true);
  const [errorTx, setErrorTx] = useState(null);

  // Gọi API lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingTx(true);
        // Gọi API lấy đơn hàng của tôi
        const res = await axiosClient.get('/my-orders'); 
        
        // Bóc tách dữ liệu (tùy thuộc vào API Backend của bạn bọc data hay không)
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

  if (loadingUser || loadingTx) {
    return <LoadingState />;
  }

  if (errorUser) {
    return <ErrorState error={errorUser} />;
  }

  return (
    <section
      className="filmoja-login-area section_70 bg-main"
      style={{
        background: '#e6e7e9',
        maxWidth: '100%',
        borderTop: '1px solid #ccc',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="auth-box-right">
              <UserInfoCard userInfo={userInfo} />
              <UserQRCode userInfo={userInfo} />
              <UserStats userInfo={userInfo} />
              <UserActions />
            </div>
          </div>

          <div className="col-lg-6">
            {/* Truyền danh sách transactions vào */}
            {errorTx ? (
              <div style={{ color: 'red', padding: '20px' }}>{errorTx}</div>
            ) : (
              <TransactionHistory transactions={transactions} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrangCaNhanPage;