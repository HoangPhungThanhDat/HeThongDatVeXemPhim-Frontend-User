import React, { useEffect } from 'react';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

import TimRap from "../pages/TimRap";
import PhimDangChieu from "../pages/PhimDangChieu";
import PhimSapChieu from "../pages/PhimSapChieu";
import PhimMoi from "../pages/PhimMoi";
import KhuyenMai from "../pages/KhuyenMai";
import PhimHot from "../pages/PhimHot";
import TinTuc from "../pages/TinTuc";
import Footer from "../layouts/Footer";
import LichChieu from "../pages/LichChieu";
import PhimDangChieuPage01 from "../pages/PhimDangChieuPage";
import KhuyenMaiPage from "../pages/KhuyenMaiPage";
import DangKyUser from "../pages/DangKy";
import DangNhapUser from "../pages/DangNhap";

import DienAnh from "../pages/DienAnh";
import LienHe from "../pages/LienHe";













function HomePage() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* Trang chủ */}
    //     <Route path="/" element={<HomePage />} />
    //     {/* Trang không tìm thấy */}
    //     <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
    //   </Routes>
    // </BrowserRouter>
    <div>
       <Menu/>
       <Header />
       <TimRap />
       <PhimDangChieu/>
       <PhimSapChieu/>
       <PhimMoi/>
       <KhuyenMai/>
       <PhimHot/>
       <TinTuc/>
       <Footer/>
    </div>
  );
};

function LichChieuPage() {
  return (
    <>
       <Menu/>
      <Header />
      <LichChieu />
    
      <Footer />
    </>
  );
}

function PhimDangChieuPage() {
  return (
    <>
       <Menu/>
      <Header />
      <PhimDangChieuPage01 />
      <Footer />
    </>
  );
}

function KhuyenMaiPageWrapper() {
  return (
    <>
       <Menu/>
      <Header />
      <KhuyenMai />
      <KhuyenMaiPage />
      <Footer />
    </>
  );
}
function DangKy() {
  return (
    <>
      <Menu/>
      <DangKyUser />
      <Footer />
    </>
  );
}
function DangNhap() {
  return (
    <>
      <Menu/>
      <DangNhapUser />
      <Footer />
    </>
  );
}
function DienAnh01() {
  return (
    <>
     <Menu/>
     <Header />
      <DienAnh />
      <Footer />
    </>
  );
}
function LienHe01() {
  return (
    <>
     <Menu/>
      <LienHe />
      <Footer />
    </>
  );
}
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lich-chieu" element={<LichChieuPage />} />
      <Route path="/phim-dang-chieu" element={<PhimDangChieuPage />} />
      <Route path="/khuyen-mai" element={<KhuyenMaiPageWrapper />} />
      <Route path="/dang-ky" element={<DangKy />} />
      <Route path="/dang-nhap" element={<DangNhap />} />

      <Route path="/dien-anh" element={<DienAnh01 />} />
      <Route path="/lien-he" element={<LienHe01 />} />

    </Routes>
  );
}
