// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { MenuDropdown, Header, Footer } from './components/layout';
import { TrangChuPage } from './features/trangchu';
import { LichChieuPage, LichChieuDetailPage } from './features/lichchieu';
import { PhimDangChieuPage, PhimSapChieuPage, ChiTietPhimPage } from './features/phim';
import { DanhSachKhuyenMaiPage, ChiTietKhuyenMaiPage } from './features/khuyenmai';
import { DanhSachTinTucPage, ChiTietTinTucPage } from './features/tintuc';
import { LienHePage } from './features/lienhe';
import { TuyenDungPage } from './features/tuyendung';
import { DangNhapPage, DangKyPage } from './features/auth';
import { ChonGhePage, ChonComboPage, ThanhToanPage } from './features/datve';
import { TrangCaNhanPage, DoiMatKhauPage, CapNhatTaiKhoanPage } from './features/nguoidung';
import KetQuaThanhToanPage from './features/datve/pages/KetQuaThanhToanPage';
import { queryClient } from './lib/queryClient';
import './assets/styles/globals.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <MenuDropdown />

          <Routes>
            <Route path="/" element={<TrangChuPage />} />
            <Route path="/trang-chu" element={<TrangChuPage />} />
            <Route path="/lich-chieu" element={<LichChieuPage />} />
            <Route path="/lich-chieu-detail/:cinemaId" element={<LichChieuDetailPage />} />
            <Route path="/phim-dang-chieu" element={<PhimDangChieuPage />} />
            <Route path="/phim-sap-chieu" element={<PhimSapChieuPage />} />
            <Route path="/chi-tiet-phim/:slugOrId" element={<ChiTietPhimPage />} />
            <Route path="/khuyen-mai" element={<DanhSachKhuyenMaiPage />} />
            <Route path="/uu-dai/:id" element={<ChiTietKhuyenMaiPage />} />
            <Route path="/dien-anh" element={<DanhSachTinTucPage />} />
            <Route path="/tin-tuc/:slug" element={<ChiTietTinTucPage />} />
            <Route path="/lien-he" element={<LienHePage />} />
            <Route path="/tuyen-dung" element={<TuyenDungPage />} />
            <Route path="/dang-nhap" element={<DangNhapPage />} />
            <Route path="/dang-ky" element={<DangKyPage />} />
            <Route path="/thong-tin-ca-nhan" element={<TrangCaNhanPage />} />
            <Route path="/cap-nhat-mat-khau" element={<DoiMatKhauPage />} />
            <Route path="/cap-nhat-tai-khoan" element={<CapNhatTaiKhoanPage />} />
            <Route path="/chon-ghe" element={<ChonGhePage />} />
            <Route path="/combo" element={<ChonComboPage />} />
            <Route path="/thanh-toan" element={<ThanhToanPage />} />
            <Route path="/thanh-toan-ket-qua" element={<KetQuaThanhToanPage />} />
            {/* Thêm các route khác sau */}
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>

      {/* DevTools chỉ hiển thị khi dev, tự ẩn khi build production */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);