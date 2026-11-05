<div align="center">

# Hệ thống đặt vé rạp chiếu phim
### Gấu Phim - Frontend Client (User Portal)

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
<img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Vitest-Testing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest"/>
<img src="https://img.shields.io/badge/Feature--Based-Architecture-orange?style=for-the-badge" alt="Architecture"/>

**Giao diện người dùng cho hệ thống đặt vé xem phim trực tuyến Gấu Phim**

[✨ Tính năng](#-tính-năng-nổi-bật) • [🏗️ Kiến trúc](#️-kiến-trúc--quy-ước) • [🚀 Bắt đầu](#-bắt-đầu-nhanh) • [📁 Cấu trúc](#-cấu-trúc-dự-án) • [🤝 Đóng góp](#-đóng-góp)

</div>

---

## 📋 Mục Lục

- [🌟 Giới thiệu](#-giới-thiệu)
- [✨ Tính năng nổi bật](#-tính-năng-nổi-bật)
- [🏗️ Kiến trúc & Quy ước](#️-kiến-trúc--quy-ước)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [🚀 Bắt đầu nhanh](#-bắt-đầu-nhanh)
- [📁 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [🧩 Chi tiết các module (features)](#-chi-tiết-các-module-features)
- [🔧 Cấu hình môi trường](#-cấu-hình-môi-trường)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🤝 Đóng góp](#-đóng-góp)
- [📞 Liên hệ](#-liên-hệ)

---

## 🌟 Giới Thiệu

**Gấu Phim** là giao diện người dùng (user-facing frontend) của hệ thống đặt vé xem phim trực tuyến, được tổ chức theo kiến trúc **feature-based**. Toàn bộ nghiệp vụ (đặt vé, chọn ghế, combo bắp nước, thanh toán, khuyến mãi, lịch chiếu...) được đóng gói theo từng feature độc lập trong `src/features`, giúp dễ mở rộng và bảo trì.

Dự án là một trong ba codebase của hệ thống Gấu Phim (cùng với Admin/Back-office frontend và Laravel backend).

---

## ✨ Tính Năng Nổi Bật

<details open>
<summary><b>🎥 Khám phá phim (feature: phim)</b></summary>

- Phim đang chiếu, phim sắp chiếu, chi tiết phim
- Trailer modal, danh sách suất chiếu theo rạp
- Trang chủ tổng hợp: phim hot, phim mới, banner khuyến mãi, tìm rạp, tin tức

</details>

<details>
<summary><b>🎟️ Đặt vé (feature: datve)</b></summary>

- **Chọn ghế** (`ghe/`): sơ đồ ghế, đếm ngược giữ ghế, chọn/bỏ chọn ghế
- **Chọn combo** (`combo/`): giỏ hàng combo bắp nước, bộ đếm thời gian, hiệu ứng UI
- **Thanh toán** (`thanhtoan/`): tóm tắt đơn hàng, nhiều phương thức thanh toán, mã QR, màn hình thành công

</details>

<details>
<summary><b>👤 Người dùng (feature: nguoidung)</b></summary>

- Trang cá nhân, cập nhật tài khoản, đổi mật khẩu
- Lịch sử đặt vé, mã QR thành viên, thống kê tài khoản

</details>

<details>
<summary><b>🎁 Khuyến mãi (feature: khuyenmai) & 🎬 Lịch chiếu (feature: lichchieu)</b></summary>

- Danh sách & chi tiết khuyến mãi, chia sẻ voucher
- Lịch chiếu theo rạp/theo phim, tab theo ngày

</details>

<details>
<summary><b>📰 Tin tức, 🏢 Rạp, 📞 Liên hệ, 💼 Tuyển dụng</b></summary>

- Các feature độc lập: `tintuc`, `rap`, `lienhe`, `tuyendung`

</details>

<details>
<summary><b>🔐 Xác thực (feature: auth)</b></summary>

- Đăng ký, đăng nhập, quên mật khẩu, đặt lại mật khẩu
- `ProtectedRoute` / `PublicRoute` bảo vệ route theo trạng thái đăng nhập

</details>

---

## 🏗️ Kiến Trúc & Quy Ước

- **Feature-based architecture**: mỗi nghiệp vụ nằm gọn trong `src/features/<feature>` với `components/`, `hooks/`, `pages/`, `constants.js`/`hangSo.js`, `utils.js` và `index.js` export công khai.
- **Quản lý state**: qua Context API + custom hooks trong `src/providers` (không dùng Redux) — `auth`, `datve`, `theme`, `thongbao`.
- **Tách bạch tầng**: `api/` (gọi API thô) → `services/` (logic nghiệp vụ) → `features/*/hooks` (state cho UI) → `features/*/pages` & `components` (hiển thị).
- **UI dùng chung**: `components/ui` (Button, Card, Input, Modal, Select, Skeleton, Spinner, Toast, Badge) và `components/shared` (Accordion, Breadcrumb, Carousel, PhanTrang, Tabs, ThanhTimKiem, DanhGia).
- **Layout**: `components/layout` (Header/Navbar/MenuDropdown, Footer, AuthLayout).
- **Naming**: file tiếng Việt không dấu cho trang/nghiệp vụ đặc thù (`hangSo.js`, `ChonGhePage.jsx`), tiện ích dùng tiếng Anh (`formatUtils.js`, `dateUtils.js`).
- **HOC**: `withAuth`, `withError`, `withLoading` trong `src/hoc`.

---

## 🛠️ Công Nghệ Sử Dụng

| Nhóm | Công nghệ |
|------|-----------|
| **UI Library** | React 18 |
| **Build tool** | Vite |
| **Routing** | React Router (AppRoutes, ProtectedRoute, PublicRoute) |
| **State Management** | Context API + Providers (`src/providers`) |
| **HTTP Client** | Axios (`lib/axios.js`, `api/axiosClient.js`) |
| **Styling** | CSS thuần theo module (`assets/styles`: globals, reset, variables, animations, Combo, ThanhToan) |
| **Testing** | Vitest + thư mục `tests/` (unit, integration, e2e) |
| **Utils** | dateFns wrapper riêng (`lib/dateFns.js`), logger tuỳ biến (`lib/logger.js`) |

---

## 🚀 Bắt Đầu Nhanh

### ⚡ Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | >= 18.x |
| npm / yarn | >= 9.x / >= 1.22.x |

### 📥 Installation

```bash
# 1. Clone repository
git clone <repository-url>
cd Frontend-Client

# 2. Cài đặt dependencies
npm install

# 3. Cấu hình môi trường
cp .env.example .env
# Điền các biến trong .env (xem phần Cấu hình môi trường bên dưới)

# 4. Chạy dev server (Vite)
npm run dev

# 5. Build production
npm run build

# 6. Chạy test
npm run test
```

---

## 📁 Cấu Trúc Dự Án

```
Frontend-Client/
├── 📁 docs/                         # Tài liệu dự án
│   ├── 📝 API.md
│   ├── 📝 CONTRIBUTING.md
│   └── 📝 README.md
├── 📁 public/
│   ├── 🖼️ banner12.png
│   ├── 📄 favicon.ico
│   └── 🌐 index.html
├── 📁 src/
│   ├── 📁 api/                      # Gọi API thô (theo domain)
│   │   ├── 📄 authApi.js
│   │   ├── 📄 axiosClient.js
│   │   ├── 📄 bannerApi.js
│   │   ├── 📄 cinemaApi.js
│   │   ├── 📄 contactApi.js
│   │   ├── 📄 foodAndDrinkApi.js
│   │   ├── 📄 movieApi.js
│   │   ├── 📄 newsApi.js
│   │   ├── 📄 promotionApi.js
│   │   └── 📄 index.js
│   │
│   ├── 📁 assets/                   # Ảnh, font, style dùng chung
│   │   ├── 📁 fonts/
│   │   ├── 📁 images/
│   │   │   ├── 📁 backgrounds/
│   │   │   ├── 📁 banners/
│   │   │   ├── 📁 icons/
│   │   │   ├── 📁 logos/
│   │   │   ├── 📁 payment/          # vnpay, momo, zalopay, card
│   │   │   └── 📁 phim/
│   │   │       ├── 📁 posters/
│   │   │       └── 📁 thumbnails/
│   │   └── 📁 styles/
│   │       ├── 🎨 globals.css
│   │       ├── 🎨 reset.css
│   │       ├── 🎨 variables.css
│   │       ├── 🎨 animations.css
│   │       ├── 🎨 Combo.css
│   │       └── 🎨 ThanhToan.css
│   │
│   ├── 📁 components/               # Component dùng chung toàn app
│   │   ├── 📁 layout/               # Header, Footer, AuthLayout
│   │   ├── 📁 shared/               # Accordion, Breadcrumb, Carousel, Tabs...
│   │   └── 📁 ui/                   # Button, Card, Input, Modal, Toast...
│   │
│   ├── 📁 config/                   # apiConfig, appConfig, routeConfig
│   ├── 📁 constants/                # apiConstants, appConstants, routeConstants...
│   │
│   ├── 📁 features/                 # ⭐ Kiến trúc feature-based
│   │   ├── 📁 auth/                 # Đăng nhập / đăng ký / quên mật khẩu
│   │   ├── 📁 datve/                # Đặt vé: combo, ghe (chọn ghế), thanhtoan
│   │   ├── 📁 khuyenmai/            # Khuyến mãi
│   │   ├── 📁 lichchieu/            # Lịch chiếu theo rạp/phim
│   │   ├── 📁 lienhe/               # Liên hệ
│   │   ├── 📁 nguoidung/            # Tài khoản, đổi mật khẩu, lịch sử đặt vé
│   │   ├── 📁 phim/                 # Phim đang chiếu / sắp chiếu / chi tiết
│   │   ├── 📁 rap/                  # Danh sách & chi tiết rạp
│   │   ├── 📁 tintuc/               # Tin tức điện ảnh
│   │   ├── 📁 trangchu/             # Trang chủ
│   │   └── 📁 tuyendung/            # Tuyển dụng
│   │       # Mỗi feature: components/, hooks/, pages/, constants.js|hangSo.js, index.js
│   │
│   ├── 📁 hoc/                      # withAuth, withError, withLoading
│   ├── 📁 hooks/                    # Hook dùng chung: useDebounce, useForm, usePhanTrang...
│   ├── 📁 lib/                      # axios.js, dateFns.js, logger.js
│   │
│   ├── 📁 providers/                # Context Providers (thay Redux)
│   │   ├── 📁 auth/
│   │   ├── 📁 datve/
│   │   ├── 📁 theme/
│   │   └── 📁 thongbao/
│   │
│   ├── 📁 routes/                   # AppRoutes, ProtectedRoute, PublicRoute
│   ├── 📁 services/                 # Logic nghiệp vụ: authService, datVeService...
│   ├── 📁 theme/                    # breakpoints, colors, spacing, typography
│   ├── 📁 utils/                    # dateUtils, formatUtils, priceUtils, validationUtils...
│   │
│   ├── 📄 App.jsx
│   ├── 📄 main.jsx
│   └── 📄 setupTests.js
│
├── 📁 tests/
│   ├── 📁 e2e/specs
│   ├── 📁 integration/{api,features}
│   └── 📁 unit/{components,hooks,services,utils}
│
├── ⚙️ .editorconfig
├── ⚙️ .env.example
├── 📄 .eslintrc.js
├── ⚙️ .prettierrc
├── 📄 LICENSE
├── 📝 README.md
├── 🌐 index.html
├── ⚙️ jsconfig.json
├── ⚙️ package.json
├── 📄 vite.config.js
└── 📄 vitest.config.js
```

---

## 🧩 Chi Tiết Các Module (features)

### `features/datve` — Đặt vé
```
datve/
├── components/
│   ├── combo/        # ProductGrid, ProductCard, CartDrawer, BottomBar, CountdownTimer, hooks (useCart, useComboData, useTimer)
│   ├── ghe/           # SeatMap, Seat, SeatLegend, BookingInfo, hooks (useSeatData, useSeatSelection, useCountdown)
│   └── thanhtoan/     # PaymentMethods, CardForm, BookingSummary, SuccessScreen, hooks (useBookingData, usePaymentForm, useTimer)
├── hooks/useChonGhe.js
├── pages/ChonComboPage.jsx, ChonGhePage.jsx, ThanhToanPage.jsx, DatVeThanhCongPage.jsx
└── index.js, hangSo.js
```

### `features/nguoidung` — Người dùng
```
nguoidung/
├── components/
│   ├── CapNhatTaiKhoan/   # Form cập nhật thông tin, avatar, giới tính
│   ├── DoiMatKhau/        # Form đổi mật khẩu, đánh giá độ mạnh mật khẩu
│   └── TrangCaNhan/       # Thông tin, thống kê, lịch sử giao dịch, QR thành viên
├── hooks/useCapNhatTaiKhoan.js, useDoiMatKhau.js, useNguoiDung.js
├── pages/TrangCaNhanPage.jsx, CapNhatTaiKhoanPage.jsx, DoiMatKhauPage.jsx, LichSuDatVePage.jsx
└── utils/passwordUtils.js, profileUtils.js, transactionUtils.js, userUtils.js
```

Các feature còn lại (`phim`, `lichchieu`, `khuyenmai`, `rap`, `tintuc`, `trangchu`, `auth`, `lienhe`, `tuyendung`) đều theo cùng khuôn mẫu: `components/` (chia theo trang con nếu cần) + `hooks/` + `pages/` + `constants.js`/`utils.js` + `index.js`.

---

## 🔧 Cấu Hình Môi Trường

Tạo file `.env` từ `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Gấu Phim
VITE_APP_LOCALE=vi-VN
VITE_APP_TIMEZONE=Asia/Ho_Chi_Minh
VITE_APP_CURRENCY=VND
```

> Lưu ý: với Vite, biến môi trường phía client phải có tiền tố `VITE_` (thay vì `REACT_APP_` như CRA).

---

## 🧪 Testing

```bash
# Chạy toàn bộ test
npm run test

# Chạy với coverage
npm run test:coverage

# Chạy ở chế độ watch
npm run test:watch
```

Cấu trúc test tách theo loại trong `tests/`:
- `tests/unit/` — component, hook, service, util
- `tests/integration/` — API & feature-level
- `tests/e2e/specs/` — kịch bản end-to-end

---

## 🚢 Deployment

```bash
# Build production
npm run build
# Output nằm trong thư mục dist/ (Vite)

# Preview bản build
npm run preview
```

Triển khai lên Vercel / Netlify: trỏ build command là `npm run build`, output directory là `dist`.

---

## 🤝 Đóng Góp

1. **Fork** repository
2. Tạo **branch** mới: `git checkout -b feature/TenTinhNang`
3. Tuân thủ kiến trúc feature-based: nghiệp vụ mới → thêm thư mục trong `src/features/<feature>`
4. **Commit** theo convention: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
5. **Push** & tạo **Pull Request**

### Coding Standards
- Tuân thủ `.eslintrc.js` và `.prettierrc`
- Component dùng chung → `components/ui` hoặc `components/shared`, không đặt trong `features`
- Gọi API qua `services/`, không gọi `api/` trực tiếp từ component

---

## 📞 Liên Hệ

<div align="center">

### Hoàng Đạt (Hoàng Phùng Thanh Đạt)

[![GitHub](https://img.shields.io/badge/GitHub-HoangPhungThanhDat-181717?style=for-the-badge&logo=github)](https://github.com/HoangPhungThanhDat)

</div>

---

## 📄 License

Dự án này được phân phối dưới **MIT License**. Xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

<div align="center">

**Nếu dự án này hữu ích, đừng quên cho một ⭐ nhé!**

*© 2026 Gấu Phim - Frontend Client.*

</div>