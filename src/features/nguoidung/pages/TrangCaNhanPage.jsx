import React from 'react';
import { useNguoiDung } from '../hooks/useNguoiDung';
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
  const { userInfo, transactions, loading, error } = useNguoiDung();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
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
            <TransactionHistory transactions={transactions} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrangCaNhanPage;
