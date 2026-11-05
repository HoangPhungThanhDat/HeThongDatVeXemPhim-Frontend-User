// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuDropdown, Header, Footer } from './components/layout';
import { TrangChuPage } from './features/trangchu';
import { LichChieuPage } from './features/lichchieu';
import { DanhSachPhimPage, PhimSapChieuPage } from './features/phim';
import './assets/styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MenuDropdown />

        <Routes>
          <Route path="/" element={<TrangChuPage />} />
          <Route path="/trang-chu" element={<TrangChuPage />} />
          <Route path="/lich-chieu" element={<LichChieuPage />} />
          <Route path="/phim-dang-chieu" element={<DanhSachPhimPage />} />
          {/* Thêm các route khác sau */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
