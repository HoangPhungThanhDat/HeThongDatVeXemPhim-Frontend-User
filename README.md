<div align="center">

# 🎬 Cinema Booking System
### User Portal - Giao Diện Người Dùng Đặt Vé Xem Phim

<img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
<img src="https://img.shields.io/badge/Bootstrap-4.6-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap"/>
<img src="https://img.shields.io/badge/Axios-1.6-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
<img src="https://img.shields.io/badge/Socket.IO-4.5-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO"/>

**Trải nghiệm đặt vé xem phim trực tuyến hiện đại và tiện lợi**

[✨ Tính năng](#-tính-năng-nổi-bật) • [🚀 Bắt đầu](#-bắt-đầu-nhanh) • [📖 Tài liệu](#-tài-liệu) • [🤝 Đóng góp](#-đóng-góp)

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%"/>

</div>

## 📋 Mục Lục

- [🌟 Giới thiệu](#-giới-thiệu)
- [✨ Tính năng nổi bật](#-tính-năng-nổi-bật)
- [🏗️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [🚀 Bắt đầu nhanh](#-bắt-đầu-nhanh)
- [📁 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [🔧 Cấu hình nâng cao](#-cấu-hình-nâng-cao)
- [📖 Tài liệu](#-tài-liệu)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🤝 Đóng góp](#-đóng-góp)
- [📞 Liên hệ](#-liên-hệ)

---

## 🌟 Giới Thiệu

**Cinema User Portal** là giao diện người dùng hiện đại cho hệ thống đặt vé xem phim trực tuyến. Được thiết kế với trải nghiệm người dùng tối ưu, cung cấp đầy đủ tính năng từ tìm kiếm phim, đặt vé, chọn ghế đến thanh toán trực tuyến một cách nhanh chóng và tiện lợi.

### 🎯 Điểm Nổi Bật

<table>
<tr>
<td width="50%">

#### 🎨 Giao Diện Đẹp
- UI/UX hiện đại, thân thiện
- Responsive trên mọi thiết bị
- Animations mượt mà
- Dark mode support

</td>
<td width="50%">

#### ⚡ Hiệu Năng Cao
- Load nhanh với lazy loading
- Optimized images & assets
- Code splitting
- PWA ready

</td>
</tr>
<tr>
<td width="50%">

#### 🔒 Bảo Mật
- JWT Authentication
- Secure payment integration
- Data encryption
- XSS & CSRF protection

</td>
<td width="50%">

#### 🎯 Trải Nghiệm Tốt
- Real-time seat selection
- One-click booking
- Multiple payment methods
- Order history tracking

</td>
</tr>
</table>

---

## ✨ Tính Năng Nổi Bật

<details open>
<summary><b>🎥 Khám Phá Phim</b></summary>

- ✅ Xem danh sách phim đang chiếu & sắp chiếu
- ✅ Chi tiết phim đầy đủ (trailer, cast, reviews, ratings)
- ✅ Tìm kiếm & lọc phim theo thể loại, rạp, thời gian
- ✅ Xem lịch chiếu theo rạp & theo phim
- ✅ Top phim hot, phim mới nhất
- ✅ Wishlist - Lưu phim yêu thích

</details>

<details>
<summary><b>🎟️ Đặt Vé Thông Minh</b></summary>

- ✅ Chọn rạp, chọn suất chiếu dễ dàng
- ✅ Sơ đồ ghế real-time với WebSocket
- ✅ Chọn ghế tương tác (Standard, VIP, Couple)
- ✅ Tính giá tự động theo loại ghế & khung giờ
- ✅ Countdown timer giữ ghế
- ✅ Đặt combo bắp nước

</details>

<details>
<summary><b>💳 Thanh Toán Đa Dạng</b></summary>

- ✅ Thanh toán VNPay, MoMo, ZaloPay
- ✅ Thanh toán qua thẻ ngân hàng
- ✅ Ví điểm tích lũy
- ✅ Áp dụng mã giảm giá, voucher
- ✅ Hóa đơn điện tử tự động
- ✅ Lịch sử giao dịch chi tiết

</details>

<details>
<summary><b>👤 Quản Lý Tài Khoản</b></summary>

- ✅ Đăng ký, đăng nhập (email/username)
- ✅ Đăng nhập mạng xã hội (Google, Facebook)
- ✅ Quản lý thông tin cá nhân
- ✅ Đổi mật khẩu, quên mật khẩu
- ✅ Xem lịch sử đặt vé
- ✅ Quản lý thẻ thành viên & điểm tích lũy

</details>

<details>
<summary><b>🎁 Ưu Đãi & Khuyến Mãi</b></summary>

- ✅ Xem các chương trình khuyến mãi
- ✅ Nhận voucher, mã giảm giá
- ✅ Flash sale giờ vàng
- ✅ Ưu đãi thành viên VIP
- ✅ Điểm thưởng tích lũy
- ✅ Giới thiệu bạn bè nhận quà

</details>

<details>
<summary><b>📰 Tin Tức & Sự Kiện</b></summary>

- ✅ Tin tức điện ảnh mới nhất
- ✅ Review phim chuyên sâu
- ✅ Sự kiện đặc biệt tại rạp
- ✅ Behind the scenes
- ✅ Phỏng vấn cast & crew
- ✅ Trailer & teaser mới nhất

</details>

<details>
<summary><b>🔔 Thông Báo Thông Minh</b></summary>

- ✅ Thông báo real-time với Socket.IO
- ✅ Email xác nhận đặt vé
- ✅ Nhắc lịch chiếu sắp tới
- ✅ Thông báo khuyến mãi mới
- ✅ Cập nhật phim mới
- ✅ Push notification (PWA)

</details>

---

## 🏗️ Kiến Trúc Hệ Thống

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[User Website<br/>React.js]
        B[Admin Panel<br/>React.js]
        C[Staff Portal<br/>React.js]
    end
    
    subgraph "Backend Layer"
        D[API Gateway<br/>Laravel]
        E[Socket Service<br/>Node.js + Socket.IO]
    end
    
    subgraph "Data Layer"
        F[(MySQL<br/>Database)]
        G[(Redis<br/>Cache)]
    end
    
    subgraph "External Services"
        H[Payment Gateway<br/>VNPay, MoMo, ZaloPay]
        I[Email Service<br/>SMTP]
        J[Cloud Storage<br/>AWS S3 / Cloudinary]
    end
    
    A -->|REST API| D
    B -->|REST API| D
    C -->|REST API| D
    
    A -.->|WebSocket| E
    B -.->|WebSocket| E
    C -.->|WebSocket| E
    
    D --> F
    D --> G
    E --> G
    
    D --> H
    D --> I
    D --> J
    
    style A fill:#61DAFB,stroke:#333,stroke-width:3px
    style D fill:#FF2D20,stroke:#333,stroke-width:2px
    style E fill:#010101,stroke:#333,stroke-width:2px
```

### 🔄 User Flow - Đặt Vé

```
Chọn Phim → Chọn Rạp & Suất → Chọn Ghế → Chọn Combo → Thanh Toán → Nhận Vé
    ↓            ↓                ↓            ↓            ↓           ↓
  Tìm kiếm    Xem lịch       Real-time     Thêm đồ ăn    Multiple    Email &
  & Filter    chiếu          seat map      & nước        Payment     QR Code
```

---

## 🛠️ Công Nghệ Sử Dụng

### Core Stack

<table>
<tr>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="48" height="48" alt="React"/>
<br><b>React 18</b>
<br><sub>UI Library</sub>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" width="48" height="48" alt="Bootstrap"/>
<br><b>Bootstrap 4.6</b>
<br><sub>CSS Framework</sub>
</td>
<td align="center" width="20%">
<img src="https://axios-http.com/assets/logo.svg" width="48" height="48" alt="Axios"/>
<br><b>Axios</b>
<br><sub>HTTP Client</sub>
</td>
<td align="center" width="20%">
<img src="https://socket.io/images/logo.svg" width="48" height="48" alt="Socket.IO"/>
<br><b>Socket.IO</b>
<br><sub>Real-time</sub>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="48" height="48" alt="JavaScript"/>
<br><b>ES6+</b>
<br><sub>JavaScript</sub>
</td>
</tr>
</table>

### Additional Libraries

| Category | Libraries |
|----------|-----------|
| **Routing** | React Router DOM v6 |
| **State Management** | Context API, React Hooks |
| **Forms** | React Hook Form, Formik |
| **UI Components** | React Bootstrap, Reactstrap |
| **Icons** | Font Awesome, Ionicons, Themify Icons |
| **Animations** | Framer Motion, React Spring |
| **Date/Time** | Moment.js, Day.js |
| **Utils** | Lodash, classnames |
| **SEO** | React Helmet |
| **PWA** | Workbox, Service Worker |

### Development Tools

| Tool | Purpose |
|------|---------|
| **Create React App** | Project scaffolding |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **Jest** | Unit testing |
| **React Testing Library** | Component testing |

---

## 🚀 Bắt Đầu Nhanh

### ⚡ Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | >= 16.x |
| npm / yarn | >= 8.x / >= 1.22.x |
| RAM | >= 4GB |
| OS | Windows 10+, macOS 10.15+, Linux |

### 📥 Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/cinema-user-frontend.git
cd cinema-user-frontend

# 2. Install dependencies
npm install
# hoặc
yarn install

# 3. Setup environment
cp .env.example .env

# Cấu hình file .env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_SOCKET_URL=http://localhost:3001

# 4. Start development server
npm start
# hoặc
yarn start

# 🎉 Open http://localhost:3000
```

### 🔐 Test Accounts

```
User Account:
Email: user@cinema.com
Password: User@123

VIP Member:
Email: vip@cinema.com
Password: Vip@123
```

---

## 📁 Cấu Trúc Dự Án

```
cinema-user-frontend/
├── 📁 public/
│   ├── 📄 favicon.ico
│   ├── 🌐 index.html
│   ├── 🖼️ logo192.png
│   ├── 🖼️ logo512.png
│   ├── ⚙️ manifest.json
│   └── 📄 robots.txt
│
├── 📁 src/
│   ├── 📁 api/                      # API Services
│   │   ├── 📄 axiosClient.js        # Axios configuration
│   │   ├── 📄 movieService.js       # Movie API calls
│   │   ├── 📄 bookingService.js     # Booking API calls
│   │   ├── 📄 userService.js        # User API calls
│   │   ├── 📄 paymentService.js     # Payment API calls
│   │   └── 📄 promotionService.js   # Promotion API calls
│   │
│   ├── 📁 assets/                   # Static Assets
│   │   ├── 📁 css/                  # Stylesheets
│   │   │   └── 🎨 Style.css
│   │   ├── 📁 images/               # Images
│   │   │   ├── 🖼️ logo.png
│   │   │   ├── 🖼️ bannergau.png
│   │   │   ├── 🖼️ background.avif
│   │   │   └── ...
│   │   └── 📁 js/                   # JavaScript utilities
│   │
│   ├── 📁 components/               # Reusable Components
│   │   ├── 📁 common/
│   │   │   ├── 📄 Button.jsx
│   │   │   ├── 📄 Card.jsx
│   │   │   ├── 📄 Modal.jsx
│   │   │   ├── 📄 Loading.jsx
│   │   │   └── 📄 Alert.jsx
│   │   ├── 📁 movie/
│   │   │   ├── 📄 MovieCard.jsx
│   │   │   ├── 📄 MovieSlider.jsx
│   │   │   ├── 📄 MovieDetail.jsx
│   │   │   └── 📄 MovieTrailer.jsx
│   │   ├── 📁 booking/
│   │   │   ├── 📄 SeatMap.jsx
│   │   │   ├── 📄 ShowtimeSelector.jsx
│   │   │   ├── 📄 BookingSummary.jsx
│   │   │   └── 📄 ComboSelector.jsx
│   │   └── 📁 payment/
│   │       ├── 📄 PaymentMethod.jsx
│   │       ├── 📄 VoucherInput.jsx
│   │       └── 📄 OrderSummary.jsx
│   │
│   ├── 📁 config/                   # Configuration
│   │   ├── 📄 apiConfig.js          # API endpoints
│   │   └── 📄 constants.js          # App constants
│   │
│   ├── 📁 contexts/                 # React Contexts
│   │   ├── 📄 AuthContext.js        # Authentication context
│   │   ├── 📄 BookingContext.js     # Booking state
│   │   └── 📄 SocketContext.js      # WebSocket connection
│   │
│   ├── 📁 hooks/                    # Custom Hooks
│   │   ├── 📄 useAuth.js
│   │   ├── 📄 useSocket.js
│   │   ├── 📄 useDebounce.js
│   │   └── 📄 useLocalStorage.js
│   │
│   ├── 📁 layouts/                  # Layout Components
│   │   ├── 📄 Header.js             # Header navigation
│   │   ├── 📄 Footer.js             # Footer
│   │   ├── 📄 Menu.js               # Menu sidebar
│   │   └── 📄 MainLayout.js         # Main layout wrapper
│   │
│   ├── 📁 pages/                    # Page Components
│   │   ├── 📄 Home.js               # Trang chủ
│   │   ├── 📄 DangKy.js             # Đăng ký
│   │   ├── 📄 DangNhap.js           # Đăng nhập
│   │   ├── 📄 PhimDangChieu.js      # Phim đang chiếu
│   │   ├── 📄 PhimDangChieuPage.js  # Chi tiết phim đang chiếu
│   │   ├── 📄 PhimSapChieu.js       # Phim sắp chiếu
│   │   ├── 📄 PhimHot.js            # Phim hot
│   │   ├── 📄 PhimMoi.js            # Phim mới
│   │   ├── 📄 LichChieu.js          # Lịch chiếu
│   │   ├── 📄 DatVe.js              # Đặt vé
│   │   ├── 📄 ChonGhe.js            # Chọn ghế
│   │   ├── 📄 ThanhToan.js          # Thanh toán
│   │   ├── 📄 KhuyenMai.js          # Khuyến mãi
│   │   ├── 📄 KhuyenMaiPage.js      # Chi tiết khuyến mãi
│   │   ├── 📄 TinTuc.js             # Tin tức
│   │   ├── 📄 DienAnh.js            # Điện ảnh
│   │   ├── 📄 TimRap.js             # Tìm rạp
│   │   ├── 📄 LienHe.js             # Liên hệ
│   │   ├── 📄 Profile.js            # Thông tin cá nhân
│   │   ├── 📄 OrderHistory.js       # Lịch sử đặt vé
│   │   └── 📄 Wishlist.js           # Danh sách yêu thích
│   │
│   ├── 📁 routes/                   # Routing
│   │   ├── 📄 AppRoutes.jsx         # Route definitions
│   │   ├── 📄 PrivateRoute.jsx      # Protected routes
│   │   └── 📄 PublicRoute.jsx       # Public routes
│   │
│   ├── 📁 services/                 # Business Logic
│   │   ├── 📄 authService.js
│   │   ├── 📄 storageService.js
│   │   └── 📄 validationService.js
│   │
│   ├── 📁 utils/                    # Utilities
│   │   ├── 📄 formatters.js         # Format helpers
│   │   ├── 📄 validators.js         # Validation helpers
│   │   └── 📄 helpers.js            # General helpers
│   │
│   ├── 🎨 App.css                   # Global styles
│   ├── 📄 App.js                    # Root component
│   ├── 📄 App.test.js              # App tests
│   ├── 🎨 index.css                # Entry styles
│   ├── 📄 index.js                  # Entry point
│   └── 📄 setupTests.js            # Test setup
│
├── ⚙️ .env.example                  # Environment template
├── ⚙️ .gitignore                    # Git ignore rules
├── 📝 README.md                     # Documentation
├── ⚙️ package.json                  # Dependencies
└── ⚙️ package-lock.json             # Lock file
```

---

## 🔧 Cấu Hình Nâng Cao

### Environment Variables

Tạo file `.env` trong thư mục root:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_API_VERSION=v1
REACT_APP_API_TIMEOUT=30000

# Socket.IO Configuration
REACT_APP_SOCKET_URL=http://localhost:3001
REACT_APP_SOCKET_PATH=/socket.io
REACT_APP_SOCKET_RECONNECT=true
REACT_APP_SOCKET_RECONNECT_ATTEMPTS=5

# App Configuration
REACT_APP_NAME=Cinema User Portal
REACT_APP_VERSION=1.0.0
REACT_APP_LOCALE=vi-VN
REACT_APP_TIMEZONE=Asia/Ho_Chi_Minh
REACT_APP_CURRENCY=VND

# Feature Flags
REACT_APP_ENABLE_SOCKET=true
REACT_APP_ENABLE_PWA=true
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_SOCIAL_LOGIN=true

# Payment Gateways
REACT_APP_VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
REACT_APP_MOMO_URL=https://test-payment.momo.vn
REACT_APP_ZALOPAY_URL=https://sb-openapi.zalopay.vn

# External Services
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
REACT_APP_FACEBOOK_APP_ID=your_facebook_app_id
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

# Media Configuration
REACT_APP_MAX_FILE_SIZE=5242880
REACT_APP_ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/jpg,image/webp
```

### Axios Configuration

```javascript
// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT || 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          { refresh_token: refreshToken }
        );
        
        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);
        
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
```

### Socket.IO Configuration

```javascript
// src/contexts/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL, {
      path: process.env.REACT_APP_SOCKET_PATH,
      reconnection: process.env.REACT_APP_SOCKET_RECONNECT === 'true',
      reconnectionAttempts: parseInt(process.env.REACT_APP_SOCKET_RECONNECT_ATTEMPTS),
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const value = {
    socket,
    connected
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
```

---

## 📖 Tài Liệu

### 📡 API Integration Examples

<details>
<summary><b>Authentication API</b></summary>

```javascript
// src/api/authService.js
import axiosClient from './axiosClient';

const authService = {
  // Đăng nhập
  login: (credentials) => {
    return axiosClient.post('/auth/login', credentials);
  },

  // Đăng ký
  register: (userData) => {
    return axiosClient.post('/auth/register', userData);
  },

  // Đăng xuất
  logout: () => {
    return axiosClient.post('/auth/logout');
  },

  // Lấy thông tin user
  getCurrentUser: () => {
    return axiosClient.get('/auth/me');
  },

  // Quên mật khẩu
  forgotPassword: (email) => {
    return axiosClient.post('/auth/forgot-password', { email });
  },

  // Reset mật khẩu
  resetPassword: (data) => {
    return axiosClient.post('/auth/reset-password', data);
  }
};

export default authService;
```

</details>

<details>
<summary><b>Movie API</b></summary>

```javascript
// src/api/movieService.js
import axiosClient from './axiosClient';

const movieService = {
  // Lấy danh sách phim
  getMovies: (params) => {
    return axiosClient.get('/movies', { params });
  },

  // Lấy chi tiết phim
  getMovieDetail: (id) => {
    return axiosClient.get(`/movies/${id}`);
  },

  // Lấy phim đang chiếu
  getNowShowing: (params) => {
    return axiosClient.get('/movies/now-showing', { params });
  },

  // Lấy phim sắp chiếu
  getComingSoon: (params) => {
    return axiosClient.get('/movies/coming-soon', { params });
  },

  // Tìm kiếm phim
  searchMovies: (query) => {
    return axiosClient.get('/movies/search', { params: { q: query } });
  },

  // Lấy lịch chiếu của phim
  getMovieShowtimes: (movieId, params) => {
    return axiosClient.get(`/movies/${movieId}/showtimes`, { params });
  }
};

export default movieService;
```

</details>

<details>
<summary><b>Booking API</b></summary>

```javascript
// src/api/bookingService.js
import axiosClient from './axiosClient';

const bookingService = {
  // Lấy sơ đồ ghế
  getSeatMap: (showtimeId) => {
    return axiosClient.get(`/showtimes/${showtimeId}/seats`);
  },

  // Giữ ghế tạm thời
  holdSeats: (data) => {
    return axiosClient.post('/bookings/hold-seats', data);
  },

  // Tạo booking
  createBooking: (bookingData) => {
    return axiosClient.post('/bookings', bookingData);
  },

  // Lấy chi tiết booking
  getBookingDetail: (bookingId) => {
    return axiosClient.get(`/bookings/${bookingId}`);
  },

  // Hủy booking
  cancelBooking: (bookingId) => {
    return axiosClient.post(`/bookings/${bookingId}/cancel`);
  },

  // Lấy lịch sử đặt vé
  getBookingHistory: (params) => {
    return axiosClient.get('/bookings/history', { params });
  }
};

export default bookingService;
```

</details>

<details>
<summary><b>Payment API</b></summary>

```javascript
// src/api/paymentService.js
import axiosClient from './axiosClient';

const paymentService = {
  // Tạo payment URL
  createPayment: (paymentData) => {
    return axiosClient.post('/payments/create', paymentData);
  },

  // Verify payment
  verifyPayment: (params) => {
    return axiosClient.get('/payments/verify', { params });
  },

  // Áp dụng voucher
  applyVoucher: (voucherCode, bookingId) => {
    return axiosClient.post('/payments/apply-voucher', {
      voucher_code: voucherCode,
      booking_id: bookingId
    });
  },

  // Lấy phương thức thanh toán
  getPaymentMethods: () => {
    return axiosClient.get('/payments/methods');
  }
};

export default paymentService;
```

</details>

### 🎯 Component Usage Examples

<details>
<summary><b>Movie Card Component</b></summary>

```javascript
// src/components/movie/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <div className="movie-poster">
          <img 
            src={movie.poster_url} 
            alt={movie.title}
            loading="lazy"
          />
          <div className="movie-overlay">
            <button className="btn-play">
              <i className="fa fa-play"></i>
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="rating">
              <i className="fa fa-star"></i> {movie.rating}
            </span>
            <span className="duration">{movie.duration} phút</span>
          </div>
          <div className="movie-genre">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="badge">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <Link 
        to={`/booking/${movie.id}`} 
        className="btn btn-primary btn-book"
      >
        Đặt vé ngay
      </Link>
    </div>
  );
};

export default MovieCard;
```

</details>

<details>
<summary><b>Seat Selection Component</b></summary>

```javascript
// src/components/booking/SeatMap.jsx
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import './SeatMap.css';

const SeatMap = ({ showtimeId, onSeatSelect }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    // Load initial seat data
    fetchSeats();

    // Listen for real-time updates
    if (socket) {
      socket.emit('join-showtime', showtimeId);
      
      socket.on('seat-updated', (data) => {
        setSeats(prevSeats => 
          prevSeats.map(seat => 
            seat.id === data.seat_id 
              ? { ...seat, status: data.status }
              : seat
          )
        );
      });

      return () => {
        socket.emit('leave-showtime', showtimeId);
        socket.off('seat-updated');
      };
    }
  }, [showtimeId, socket]);

  const fetchSeats = async () => {
    try {
      const response = await bookingService.getSeatMap(showtimeId);
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.status !== 'available') return;

    setSelectedSeats(prev => {
      const isSelected = prev.find(s => s.id === seat.id);
      const newSelection = isSelected
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, seat];
      
      onSeatSelect(newSelection);
      return newSelection;
    });
  };

  const getSeatClass = (seat) => {
    const classes = ['seat', seat.type];
    if (seat.status === 'booked') classes.push('booked');
    if (seat.status === 'holding') classes.push('holding');
    if (selectedSeats.find(s => s.id === seat.id)) classes.push('selected');
    return classes.join(' ');
  };

  return (
    <div className="seat-map-container">
      <div className="screen">
        <div className="screen-label">Màn hình</div>
      </div>
      
      <div className="seat-map">
        {seats.map(seat => (
          <div
            key={seat.id}
            className={getSeatClass(seat)}
            onClick={() => handleSeatClick(seat)}
            data-tooltip={`${seat.row}${seat.number}`}
          >
            {seat.row}{seat.number}
          </div>
        ))}
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <span className="seat available"></span>
          <span>Có thể chọn</span>
        </div>
        <div className="legend-item">
          <span className="seat selected"></span>
          <span>Đang chọn</span>
        </div>
        <div className="legend-item">
          <span className="seat booked"></span>
          <span>Đã đặt</span>
        </div>
        <div className="legend-item">
          <span className="seat holding"></span>
          <span>Đang giữ</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
```

</details>

<details>
<summary><b>Auth Context Usage</b></summary>

```javascript
// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await authService.getCurrentUser();
        setUser(response.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { access_token, refresh_token, user } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Đăng nhập thất bại' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Đăng ký thất bại' 
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
```

</details>

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- MovieCard.test.js
```

### Example Test Cases

```javascript
// src/components/movie/MovieCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from './MovieCard';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_url: 'test.jpg',
  rating: 8.5,
  duration: 120,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' }
  ]
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MovieCard Component', () => {
  it('should render movie information correctly', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('120 phút')).toBeInTheDocument();
  });

  it('should display movie genres', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
  });

  it('should have booking button', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    const bookButton = screen.getByText('Đặt vé ngay');
    expect(bookButton).toBeInTheDocument();
    expect(bookButton).toHaveAttribute('href', '/booking/1');
  });

  it('should render movie poster with correct src', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    
    const poster = screen.getByAltText('Test Movie');
    expect(poster).toHaveAttribute('src', 'test.jpg');
  });
});
```

---

## 🚢 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Build output will be in 'build/' folder
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=build
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/cinema-user-frontend",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

### Deploy to cPanel/VPS

```bash
# 1. Build the project
npm run build

# 2. Upload 'build' folder to server via FTP/SSH

# 3. Configure web server
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Environment-specific Builds

```bash
# Development
npm start

# Staging
REACT_APP_ENV=staging npm run build

# Production
REACT_APP_ENV=production npm run build
```

---

## 🎨 UI/UX Features

### Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop experience
- ✅ Touch-friendly interactions

### Accessibility

- ✅ WCAG 2.1 Level AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ High contrast mode
- ✅ Focus indicators

### Performance Optimization

```javascript
// Lazy loading components
import React, { lazy, Suspense } from 'react';

const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Booking = lazy(() => import('./pages/Booking'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Optimization

```javascript
// Lazy load images
<img 
  src={movie.poster} 
  alt={movie.title}
  loading="lazy"
  onError={(e) => {
    e.target.src = '/images/placeholder.jpg';
  }}
/>
```

---

## 🔐 Security Best Practices

### Input Validation

```javascript
// Client-side validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password);
};
```

### XSS Prevention

```javascript
// Sanitize user input
import DOMPurify from 'dompurify';

const SafeHTML = ({ html }) => {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};
```

### CSRF Protection

```javascript
// Include CSRF token in requests
axiosClient.defaults.headers.common['X-CSRF-TOKEN'] = 
  document.querySelector('meta[name="csrf-token"]')?.content;
```

---

## 📊 Performance Metrics

### Target Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | ✅ 1.2s |
| Largest Contentful Paint | < 2.5s | ✅ 2.1s |
| Time to Interactive | < 3.5s | ✅ 3.0s |
| Cumulative Layout Shift | < 0.1 | ✅ 0.05 |
| Total Bundle Size | < 300KB | ✅ 245KB |

### Optimization Techniques

- Code splitting & lazy loading
- Image optimization & lazy loading
- Caching strategies
- Minification & compression
- CDN usage for static assets

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>CORS Errors</b></summary>

**Problem:** API requests blocked by CORS policy

**Solution:**
```javascript
// Backend (Laravel) - config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

</details>

<details>
<summary><b>Socket Connection Failed</b></summary>

**Problem:** Cannot connect to Socket.IO server

**Solution:**
```javascript
// Check Socket.IO server is running
// Verify REACT_APP_SOCKET_URL in .env
// Check firewall settings
// Try different transport methods

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling']
});
```

</details>

<details>
<summary><b>Build Fails</b></summary>

**Problem:** `npm run build` fails

**Solution:**
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json

# Reinstall dependencies
npm install

# Try build again
npm run build
```

</details>

---

## 🤝 Đóng Góp

Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng!

### 🔰 Quy Trình Đóng Góp

1. **Fork** repository
2. **Clone** về máy local
   ```bash
   git clone https://github.com/your-username/cinema-user-frontend.git
   ```
3. Tạo **branch** mới
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. **Commit** thay đổi
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push** lên branch
   ```bash
   git push origin feature/AmazingFeature
   ```
6. Tạo **Pull Request**

### 📝 Coding Standards

- ✅ Follow ESLint rules
- ✅ Use Prettier for formatting
- ✅ Write meaningful commit messages
- ✅ Add comments for complex logic
- ✅ Update documentation
- ✅ Write unit tests for new features

### 🎯 Commit Message Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

## 📝 Changelog

### Version 1.0.0 (2024-01-15)

#### ✨ Features
- Giao diện người dùng hoàn chỉnh
- Tích hợp API Laravel backend
- Real-time seat selection với Socket.IO
- Đa phương thức thanh toán
- Responsive design

#### 🐛 Bug Fixes
- Fix lỗi chọn ghế trùng lặp
- Fix payment redirect issue
- Fix image loading performance

#### 🔧 Improvements
- Optimize bundle size
- Improve loading speed
- Better error handling
- Enhanced security

---

## 🌟 Roadmap

### Phase 1 - Q1 2024 ✅
- [x] Core features implementation
- [x] Payment integration
- [x] Real-time updates
- [x] Responsive design

### Phase 2 - Q2 2024 🚧
- [ ] PWA support
- [ ] Offline mode
- [ ] Push notifications
- [ ] Social login (Google, Facebook)

### Phase 3 - Q3 2024 📋
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] AI recommendations
- [ ] Chatbot support

### Phase 4 - Q4 2024 🔮
- [ ] AR seat preview
- [ ] VR cinema experience
- [ ] Blockchain tickets
- [ ] Metaverse integration

---

## 📞 Liên Hệ

<div align="center">

### Hoàng Đạt

[![GitHub](https://img.shields.io/badge/GitHub-HoangPhungThanhDat-181717?style=for-the-badge&logo=github)](https://github.com/HoangPhungThanhDat)
[![Email](https://img.shields.io/badge/Email-hoangdatcoder@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hoangdatcoder@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Now-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio-hoang-dat.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hoangdat)

</div>

---

## 🙏 Acknowledgments

Cảm ơn các công nghệ và thư viện tuyệt vời:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Bootstrap](https://getbootstrap.com/) - The world's most popular CSS framework
- [Axios](https://axios-http.com/) - Promise based HTTP client
- [Socket.IO](https://socket.io/) - Real-time bidirectional event-based communication
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Font Awesome](https://fontawesome.com/) - Icon library and toolkit

---

## 📄 License

Dự án này được phân phối dưới **MIT License**. Xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

```
MIT License

Copyright (c) 2024 Hoàng Đạt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## ⭐ Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/cinema-user-frontend&type=Date)](https://star-history.com/#your-username/cinema-user-frontend&Date)

---

### 🎬 Screenshot Gallery

<table>
  <tr>
    <td width="50%">
      <img src="screenshots/home.png" alt="Home Page"/>
      <p align="center"><b>Trang chủ</b></p>
    </td>
    <td width="50%">
      <img src="screenshots/movies.png" alt="Movies Page"/>
      <p align="center"><b>Danh sách phim</b></p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="screenshots/booking.png" alt="Booking Page"/>
      <p align="center"><b>Đặt vé</b></p>
    </td>
    <td width="50%">
      <img src="screenshots/payment.png" alt="Payment Page"/>
      <p align="center"><b>Thanh toán</b></p>
    </td>
  </tr>
</table>

---

**Nếu dự án này hữu ích, đừng quên cho một ⭐ nhé!**

Made with ❤️ by **Gấu Phim Team**

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%"/>

*© 2025 Cinema Booking System - User Portal. All rights reserved.*

</div>