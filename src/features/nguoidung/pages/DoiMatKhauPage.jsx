// src/features/nguoidung/pages/DoiMatKhauPage.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bannergau2 from '../../../assets/images/banners/bannergau2.png';
import { useDoiMatKhau } from '../hooks/useDoiMatKhau';
import { DoiMatKhauForm } from '../components/DoiMatKhau';

function DoiMatKhauPage() {
  const navigate = useNavigate();
  const {
    formData,
    submitting,
    showOldPassword,
    showNewPassword,
    showConfirmPassword,
    handleInputChange,
    handleSubmit,
    toggleShowOldPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
  } = useDoiMatKhau();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/dang-nhap');
      return;
    }
  }, [navigate]);

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

      <div
        className="sign section--bg"
        style={{ background: '#e6e7e9', maxWidth: '100%', borderTop: '1px solid' }}
      >
        <div className="register container" style={{ maxWidth: '100%' }}>
          <div className="row">
            <div className="col-md-3 register-left">
              <img
                src={bannergau2}
                alt="logo"
                style={{
                  width: '2000px',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <p>Đổi mật khẩu để bảo mật tài khoản!</p>
              <br />
            </div>

            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading">Đổi mật khẩu</h3>

                  <DoiMatKhauForm
                    formData={formData}
                    submitting={submitting}
                    showOldPassword={showOldPassword}
                    showNewPassword={showNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    toggleShowOldPassword={toggleShowOldPassword}
                    toggleShowNewPassword={toggleShowNewPassword}
                    toggleShowConfirmPassword={toggleShowConfirmPassword}
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

export default DoiMatKhauPage;
