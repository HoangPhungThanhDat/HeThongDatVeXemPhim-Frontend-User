import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import bannergau2 from '../../../assets/images/banners/bannergau2.png';
import AuthApi from '../../../api/authApi';
import { jwtDecode } from 'jwt-decode';

const DangNhapPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  // ⭐ 1. XỬ LÝ GOOGLE CALLBACK TOKEN
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const err = params.get('error');

    if (err) {
      setError(decodeURIComponent(err));
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (token) {
      setLoading(true);
      const processGoogle = async () => {
        try {
          const res = await AuthApi.verifyGoogleToken(token);
          const data = res?.data ?? res;
          const user = data?.user ?? data?.User;
          
          if (!user) throw new Error('Không lấy được thông tin user');

          saveUserToStorage(token, user);
          
          window.history.replaceState({}, document.title, window.location.pathname);
          navigate(redirectTo, { replace: true });
        } catch (e) {
          console.error(e);
          setError('Xác thực Google thất bại. Vui lòng thử lại!');
        } finally {
          setLoading(false);
        }
      };
      processGoogle();
    }
  }, [navigate, redirectTo]);

  // Hàm phụ lưu thông tin
  const saveUserToStorage = (token, user) => {
    let decoded = {};
    try { decoded = jwtDecode(token) || {}; } catch (e) {}
    
    const roleName = user?.RoleName || user?.role || decoded.role || decoded.RoleName || '';
    const fullName = user?.FullName || user?.fullName || decoded.FullName || decoded.fullname || '';
    const userId = user?.UserId || user?.userId || decoded.UserId || decoded.userId || '';
    const userEmail = user?.Email || user?.email || decoded.Email || decoded.email || '';
    const userPhone = user?.PhoneNumber || user?.Phone || user?.phone || decoded.PhoneNumber || decoded.Phone || '';

    localStorage.setItem('access_token', token);
    localStorage.setItem('token', token);
    localStorage.setItem('role', roleName);
    localStorage.setItem('fullname', fullName);
    localStorage.setItem('UserId', userId ?? '');
    localStorage.setItem('email', userEmail);
    localStorage.setItem('phone', userPhone);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  };

  // ⭐ 2. ĐĂNG NHẬP BẰNG EMAIL/PASSWORD
  const logIn = async () => {
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await AuthApi.Login({ Email: email, Password: password });
      const data = response?.data ?? response;
      const token = data?.access_token || data?.token;
      const user = data?.user || data?.User;

      if (!token) throw new Error('Không nhận được access token từ server');

      saveUserToStorage(token, user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      const res = err.response;
      if (res) {
        if (res.status === 401) setError('Email hoặc mật khẩu không đúng');
        else if (res.status === 403) setError(res.data?.error || 'Tài khoản đã bị khóa');
        else setError(res.data?.message || 'Đăng nhập thất bại');
      } else {
        setError('Không thể kết nối đến server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="sign section--bg" style={{ background: '#e6e7e9', maxWidth: '100%', borderTop: '1px solid' }}>
        <div className="register container" style={{ maxWidth: '100%' }}>
          <div className="row">
            <div className="col-md-3 register-left">
              <img src={bannergau2} alt="logo" style={{ width: '2000px', height: 'auto', display: 'block' }} />
              <p>Đăng nhập với tài khoản của bạn!</p>
            </div>

            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel">
                  <h3 className="register-heading">Đăng nhập</h3>

                  {error && <div className="alert alert-danger" role="alert">{error}</div>}

                  <div className="row register-form">
                    <div className="col-md-9">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email / Tên đăng nhập"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && logIn()}
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mật khẩu(*)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && logIn()}
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <ul style={{ display: 'flex', gap: '5px', padding: 0 }}>
                          <li><Link to="/dang-ky">Đăng ký /</Link></li>
                          <li><Link to="/quen-mat-khau">Quên mật khẩu?</Link></li>
                        </ul>
                      </div>
                      <input
                        type="button"
                        className="btnRegister"
                        onClick={logIn}
                        value={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        disabled={loading}
                        style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                      />
                      
                      <div className="clearfix"></div>
                      <p style={{ color: '#333', fontSize: '15px' }}>Hoặc đăng nhập với</p>
                      <div className="clearfix"></div>
                      <div className="row" style={{ marginTop: '5px', paddingTop: '20px', borderTop: '1px dotted #f37737', justifyContent: 'center' }}>
                        {/* ⭐ 3. ĐỔI NÚT FACEBOOK/GOOGLE THÀNH NÚT GỌI HÀM */}
                        <a 
                          href="#" 
                          className="gg-btn" 
                          onClick={(e) => { e.preventDefault(); AuthApi.googleLogin(); }}
                        >
                          <i className="fa fa-google" title="Google"></i>
                        </a>
                      </div>
                    </div>
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

export default DangNhapPage;