import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import bannergau from '../../../assets/images/banners/bannergau21.png'; 
import '../../../assets/styles/globals.css';

function Menu() {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullname, setFullname] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentPath = location.pathname;

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('fullname');
    if (token) {
      setIsLoggedIn(true);
      setFullname(name || 'User');
    } else {
      setIsLoggedIn(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fullname');
    localStorage.removeItem('UserId');
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setFullname('');
    setShowDropdown(false);
    navigate('/');
    window.location.reload();
  };

  // Hàm kiểm tra xem đường dẫn hiện tại có khớp với menu không
  const checkActive = (path) => {
    if (path === '/') {
      return currentPath === '/';
    }
    // Ví dụ: đường dẫn /phim-dang-chieu/123 sẽ active menu /phim-dang-chieu
    return currentPath.startsWith(path);
  };

  // Kiểm tra xem menu Phim có đang active không (để tô sáng cả menu cha)
  const isPhimActive = checkActive('/phim-dang-chieu') || checkActive('/phim-sap-chieu');

  return (
    <>
      <header className="filmoja-header-area">
        {/* Header Top Area Start */}
        <div className="header-top-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-3 col-sm-12">
                <div className="header-top-social">
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook-square"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter-square"></i></a></li>
                    <li><a href="#"><i className="fa fa-google-plus-square"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin-square"></i></a></li>
                    <li><a href="#"><i className="fa fa-pinterest-square"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-7 col-md-9 col-sm-12">
                <div className="header-top-menu">
                  <ul>
                    <li><a href="/cau-hoi-thuong-gap.html">FAQ's</a></li>
                    {isLoggedIn ? (
                      <li
                        className="user-dropdown-container"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                        style={{ position: 'relative' }}
                      >
                        <a href="#" className="btn-member" onClick={(e) => e.preventDefault()}>
                          <i className="fa fa-user" style={{ marginRight: '5px' }}></i>
                          {fullname}
                          <i className="fa fa-chevron-down" style={{ marginLeft: '5px', fontSize: '10px' }}></i>
                        </a>
                        {showDropdown && (
                          <div className="user-dropdown-menu">
                            <Link to="/thong-tin-ca-nhan" className="dropdown-item">
                              <i className="fa fa-user-circle"></i> Thông Tin
                            </Link>
                            <div className="dropdown-divider"></div>
                            <a href="#" onClick={(e) => { e.preventDefault(); logOut(); }} className="dropdown-item logout-item">
                              <i className="fa fa-sign-out"></i> Đăng Xuất
                            </a>
                          </div>
                        )}
                      </li>
                    ) : (
                      <>
                        <li><Link to="/dang-nhap" className="btn-member">Đăng nhập</Link></li>
                        <li><Link to="/dang-ky" className="btn-member">Đăng ký</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Header Top Area End */}

        {/* Main Header Area Start */}
        <div className="main-header-area">
          <div className="container">
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
              }}
            >
              {/* Logo */}
              <div className="site-logo" style={{ margin: 0 }}>
                <Link to="/">
                  <img 
                    src={bannergau} 
                    alt="filmoja" 
                    style={{ 
                      height: 'auto', 
                      maxHeight: '70px', 
                      width: 'auto', 
                      maxWidth: '200px', 
                      objectFit: 'contain' 
                    }} 
                  />
                </Link>
              </div>

              {/* Menu Desktop (Ẩn trên Mobile) */}
              <div className="d-none d-lg-block" style={{ flex: 1 }}>
                <div className="mainmenu">
                  <nav>
                    <ul id="responsive_navigation" style={{ display: 'flex', justifyContent: 'flex-end', margin: 0 }}>
                      <li className={checkActive('/') ? 'active' : ''}>
                        <Link to="/">Trang chủ</Link>
                      </li>
                      
                      <li className={checkActive('/lich-chieu') ? 'active' : ''}>
                        <Link to="/lich-chieu">Lịch chiếu</Link>
                      </li>
                      
                      <li className={isPhimActive ? 'active' : ''}>
                        <a href="#">Phim</a>
                        <ul>
                          <li><Link to="/phim-dang-chieu">Phim Đang Chiếu</Link></li>
                          <li><Link to="/phim-sap-chieu">Phim Sắp Chiếu</Link></li>
                        </ul>
                      </li>
                      
                      <li className={checkActive('/khuyen-mai') ? 'active' : ''}>
                        <Link to="/khuyen-mai">Khuyến Mãi</Link>
                      </li>
                      
                      <li className={checkActive('/dien-anh') ? 'active' : ''}>
                        <Link to="/dien-anh">Điện Ảnh</Link>
                      </li>
                      
                      <li className={checkActive('/lien-he') ? 'active' : ''}>
                        <Link to="/lien-he">Liên hệ</Link>
                      </li>
                      
                      <li className={checkActive('/tuyen-dung') ? 'active' : ''}>
                        <Link to="/tuyen-dung">Tuyển dụng</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* Nút Hamburger (Chỉ hiện trên Mobile, nằm sát phải) */}
              <div className="d-lg-none">
                <button 
                  type="button" 
                  onClick={() => setIsMobileMenuOpen(true)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px' }}
                >
                  <i className="fa fa-bars" style={{ fontSize: '30px', color: '#333' }}></i>
                </button>
              </div>

            </div>
          </div>
        </div>
        {/* Main Header Area End */}
      </header>

      {/* Overlay mờ nền khi mở menu mobile */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9998, backdropFilter: 'blur(2px)'
          }}
        ></div>
      )}

      {/* Off-canvas Menu Mobile */}
      <div 
        style={{ 
          position: 'fixed', top: 0, left: 0, height: '100vh', width: '280px', zIndex: 9999, 
          transition: 'transform 0.3s ease-in-out', 
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          backgroundColor: '#111', color: '#fff', display: 'flex', flexDirection: 'column',
          boxShadow: '2px 0 10px rgba(0,0,0,0.5)'
        }}
      >
        {/* Nút đóng */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '28px', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        {/* Danh sách Menu Mobile */}
        <ul style={{ listStyle: 'none', padding: '0 15px', margin: 0, overflowY: 'auto', flex: 1 }}>
          
          <li style={{ borderBottom: '1px solid #333' }}>
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ 
                display: 'block', padding: '15px 0', 
                color: checkActive('/') ? '#f37737' : '#fff', // Đổi màu nếu active
                textDecoration: 'none', fontSize: '16px', fontWeight: '500' 
              }}
            >
              Trang chủ
            </Link>
          </li>
          
          <li style={{ borderBottom: '1px solid #333' }}>
            <Link 
              to="/lich-chieu" 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ 
                display: 'block', padding: '15px 0', 
                color: checkActive('/lich-chieu') ? '#f37737' : '#fff', 
                textDecoration: 'none', fontSize: '16px', fontWeight: '500' 
              }}
            >
              Lịch chiếu
            </Link>
          </li>
          
          {/* Menu Phim Mobile */}
          <li style={{ borderBottom: '1px solid #333' }}>
            <div style={{ 
              padding: '15px 0', 
              color: isPhimActive ? '#f37737' : '#fff', // Nếu đang ở trang phim con thì chữ "Phim" đổi màu
              fontSize: '16px', 
              fontWeight: 'bold' 
            }}>
              Phim
            </div>
            <ul style={{ listStyle: 'none', padding: '0 0 15px 15px', margin: 0 }}>
              <li style={{ padding: '10px 0' }}>
                <Link 
                  to="/phim-dang-chieu" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  style={{ 
                    color: checkActive('/phim-dang-chieu') ? '#f37737' : '#ccc', 
                    textDecoration: 'none', fontSize: '15px' 
                  }}
                >
                  - Phim Đang Chiếu
                </Link>
              </li>
              <li style={{ padding: '10px 0' }}>
                <Link 
                  to="/phim-sap-chieu" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  style={{ 
                    color: checkActive('/phim-sap-chieu') ? '#f37737' : '#ccc', 
                    textDecoration: 'none', fontSize: '15px' 
                  }}
                >
                  - Phim Sắp Chiếu
                </Link>
              </li>
            </ul>
          </li>

          <li style={{ borderBottom: '1px solid #333' }}>
            <Link 
              to="/khuyen-mai" 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ 
                display: 'block', padding: '15px 0', 
                color: checkActive('/khuyen-mai') ? '#f37737' : '#fff', 
                textDecoration: 'none', fontSize: '16px', fontWeight: '500' 
              }}
            >
              Khuyến Mãi
            </Link>
          </li>
          
          <li style={{ borderBottom: '1px solid #333' }}>
            <Link 
              to="/dien-anh" 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ 
                display: 'block', padding: '15px 0', 
                color: checkActive('/dien-anh') ? '#f37737' : '#fff', 
                textDecoration: 'none', fontSize: '16px', fontWeight: '500' 
              }}
            >
              Điện Ảnh
            </Link>
          </li>
          
          <li style={{ borderBottom: '1px solid #333' }}>
            <Link 
              to="/lien-he" 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ 
                display: 'block', padding: '15px 0', 
                color: checkActive('/lien-he') ? '#f37737' : '#fff', 
                textDecoration: 'none', fontSize: '16px', fontWeight: '500' 
              }}
            >
              Liên hệ
            </Link>
          </li>
          
          <li>
            <Link 
              to="/tuyen-dung" 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ 
                display: 'block', padding: '15px 0', 
                color: checkActive('/tuyen-dung') ? '#f37737' : '#fff', 
                textDecoration: 'none', fontSize: '16px', fontWeight: '500' 
              }}
            >
              Tuyển dụng
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;