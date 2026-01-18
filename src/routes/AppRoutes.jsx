import React from "react";
import { Routes, Route } from "react-router-dom";
import withLoader from "../components/withLoader";

// Import các components...
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
import PhimSapChieuPage01 from "../pages/PhimSapChieuPage";
import KhuyenMaiPage from "../pages/KhuyenMaiPage";
import DangKyUser from "../pages/DangKy";
import DangNhapUser from "../pages/DangNhap";
import DienAnh from "../pages/DienAnh";
import LienHe from "../pages/LienHe";
import UuDaiDetail from "../components/UuDai-Detail";
import ChiTietTinTuc from '../components/ChiTietTinTuc';
import ChiTietLichChieu from '../components/LichChieu-Detail';
import ThongTinCaNhanPage01 from '../components/ThongTinCaNhan';
import ChonGhe01  from '../components/ChonGhe';






// Các page components
function HomePage() {
  return (
    <div>
      <Menu />
      <Header />
      <TimRap />
      <PhimDangChieu />
      <PhimSapChieu />
      <PhimMoi />
      <KhuyenMai />
      <PhimHot />
      <TinTuc />
      <Footer />
    </div>
  );
}

function LichChieuPage() {
  return (
    <>
      <Menu />
      <LichChieu />
      <Footer />
    </>
  );
}

function PhimDangChieuPage() {
  return (
    <>
      <Menu />
      <PhimDangChieuPage01 />
      <Footer />
    </>
  );
}

function PhimSapChieuPage() {
  return (
    <>
      <Menu />
      <PhimSapChieuPage01 />
      <Footer />
    </>
  );
}

function KhuyenMaiPageWrapper() {
  return (
    <>
      <Menu />
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
      <Menu />
      <DangKyUser />
      <Footer />
    </>
  );
}

function DangNhap() {
  return (
    <>
      <Menu />
      <DangNhapUser />
      <Footer />
    </>
  );
}

function DienAnh01() {
  return (
    <>
      <Menu />
      <DienAnh />
      <Footer />
    </>
  );
}

function LienHe01() {
  return (
    <>
      <Menu />
      <LienHe />
      <Footer />
    </>
  );
}

function UuDaiDetail01() {
  return (
    <>
      <Menu />
      <UuDaiDetail />
      <Footer />
    </>
  );
}

function TinTucDetail() {
  return (
    <>
      <Menu />
      <ChiTietTinTuc />
      <Footer />
    </>
  );
}

function LichChieuDetail() {
  return (
    <>
      <Menu />
      <ChiTietLichChieu />
      <Footer />
    </>
  );
}
function ThongTinCaNhanPage() {
  return (
    <>
      <Menu />
      <ThongTinCaNhanPage01 />
      <Footer />
    </>
  );
}
function ChonGhe() {
  return (
    <>
      <Menu />
      <ChonGhe01 />
      <Footer />
    </>
  );
}

// Wrap các page với loader
const HomePageWithLoader = withLoader(HomePage);
const LichChieuPageWithLoader = withLoader(LichChieuPage);
const PhimDangChieuPageWithLoader = withLoader(PhimDangChieuPage);
const PhimSapChieuPageWithLoader = withLoader(PhimSapChieuPage);
const KhuyenMaiPageWithLoader = withLoader(KhuyenMaiPageWrapper);
const DangKyWithLoader = withLoader(DangKy);
const DangNhapWithLoader = withLoader(DangNhap);
const DienAnh01WithLoader = withLoader(DienAnh01);
const LienHe01WithLoader = withLoader(LienHe01);
const UuDaiDetail01WithLoader = withLoader(UuDaiDetail01);
const TinTucDetailWithLoader = withLoader(TinTucDetail);
const LichChieuDetailWithLoader = withLoader(LichChieuDetail);
const ThongTinCaNhanWithLoader = withLoader(ThongTinCaNhanPage);
const ChonGheWithLoader = withLoader(ChonGhe);





export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePageWithLoader />} />
      <Route path="/lich-chieu" element={<LichChieuPageWithLoader />} />
      <Route path="/phim-dang-chieu" element={<PhimDangChieuPageWithLoader />} />
      <Route path="/phim-sap-chieu" element={<PhimSapChieuPageWithLoader />} />
      <Route path="/khuyen-mai" element={<KhuyenMaiPageWithLoader />} />
      <Route path="/dang-ky" element={<DangKyWithLoader />} />
      <Route path="/dang-nhap" element={<DangNhapWithLoader />} />
      <Route path="/dien-anh" element={<DienAnh01WithLoader />} />
      <Route path="/lien-he" element={<LienHe01WithLoader />} />
      <Route path="/uu-dai/:id" element={<UuDaiDetail01WithLoader />} />
      <Route path="/tin-tuc/:slug" element={<TinTucDetailWithLoader />} />
      <Route path="/lich-chieu-detail" element={<LichChieuDetailWithLoader />} />
      <Route path="/thong-tin-ca-nhan" element={<ThongTinCaNhanWithLoader />} />
      <Route path="/chon-ghe" element={<ChonGheWithLoader />} />
    </Routes>
  );
}