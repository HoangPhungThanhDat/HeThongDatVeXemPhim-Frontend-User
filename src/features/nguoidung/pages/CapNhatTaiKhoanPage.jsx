// src/features/nguoidung/pages/CapNhatTaiKhoanPage.jsx

import React from 'react';
import { useCapNhatTaiKhoan } from '../hooks/useCapNhatTaiKhoan';
import { CapNhatTaiKhoanForm, ProfileImage, LoadingState } from '../components/CapNhatTaiKhoan';

function CapNhatTaiKhoanPage() {
  const { formData, loading, submitting, handleInputChange, handleGenderChange, handleSubmit } =
    useCapNhatTaiKhoan();

  if (loading) {
    return <LoadingState />;
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

      <div
        className="sign section--bg"
        style={{ background: '#e6e7e9', maxWidth: '100%', borderTop: '1px solid' }}
      >
        <div className="register container" style={{ maxWidth: '100%' }}>
          <div className="row">
            <ProfileImage />

            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading">Thông tin tài khoản</h3>

                  <CapNhatTaiKhoanForm
                    formData={formData}
                    submitting={submitting}
                    handleInputChange={handleInputChange}
                    handleGenderChange={handleGenderChange}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CapNhatTaiKhoanPage;
